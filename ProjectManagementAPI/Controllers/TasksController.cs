using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Models.Dtos.Tasks;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("projects/{projectId}/tasks")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> CreateTask(int projectId, [FromBody] TaskCreateDto dto)
        {
            try
            {
                var task = await _taskService.CreateTaskAsync(projectId, dto);
                return CreatedAtAction(nameof(GetTaskById), new { taskId = task.TaskId }, task);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("projects/{projectId}/tasks")]
        public async Task<IActionResult> GetTasks(int projectId, [FromQuery] string? status = null, [FromQuery] int? assigneeId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
                if (projectId <= 0)
                    return BadRequest(new { message = "Invalid projectId" });


            var tasks = await _taskService.GetTasksAsync(projectId, status, assigneeId, page, pageSize);
            return Ok(tasks);
        }

        [HttpGet("tasks/{taskId}")]
        public async Task<IActionResult> GetTaskById(int taskId)
        {
            var task = await _taskService.GetTaskByIdAsync(taskId);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPut("tasks/{taskId}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> UpdateTask(int taskId, [FromBody] TaskCreateDto dto)
        {
            try
            {
                await _taskService.UpdateTaskAsync(taskId, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("tasks/{taskId}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            try
            {
                await _taskService.DeleteTaskAsync(taskId);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }

}
