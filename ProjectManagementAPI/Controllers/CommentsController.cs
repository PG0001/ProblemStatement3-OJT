using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Models.Dtos.Comments;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("tasks/{taskId}/comments")]
        public async Task<IActionResult> AddComment(int taskId, [FromBody] CommentCreateDto dto)
        {
            var employee = HttpContext.Items["Employee"] as Employee;
            if (employee == null) return Unauthorized();

            try
            {
                var comment = await _commentService.AddCommentAsync(taskId, employee.EmployeeId, dto);
                return CreatedAtAction(nameof(GetComments), new { taskId = comment.TaskId }, comment);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("tasks/{taskId}/comments")]
        public async Task<IActionResult> GetComments(int taskId)
        {
            var comments = await _commentService.GetCommentsByTaskAsync(taskId);
            return Ok(comments);
        }
    }


}
