using Microsoft.AspNetCore.Http.HttpResults;
using ProjectManagementAPI.Models.Dtos.Tasks;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;
        private readonly IEmployeeRepository _employeeRepo;

        public TaskService(ITaskRepository taskRepo, IEmployeeRepository employeeRepo)
        {
            _taskRepo = taskRepo;
            _employeeRepo = employeeRepo;
        }

        public async Task<TaskDto> CreateTaskAsync(int projectId, TaskCreateDto dto)
        {
            if (dto.DueDate < DateTime.UtcNow.Date)
                throw new ArgumentException("DueDate cannot be in the past");

            var employee = await _employeeRepo.GetByIdAsync(dto.AssignedToId);
            if (employee == null)
                throw new ArgumentException("Assigned employee not found");

            var task = new TaskItem
            {
                ProjectId = projectId,
                Title = dto.Title,
                Description = dto.Description,
                AssignedToId = dto.AssignedToId,
                Status = dto.Status,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _taskRepo.AddAsync(task);

            return new TaskDto
            {
                TaskId = task.TaskId,
                ProjectId = task.ProjectId,
                Title = task.Title,
                Description = task.Description,
                AssignedToId = task.AssignedToId,
                AssignedToName = employee.Name,
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
        }

        public async Task<IEnumerable<TaskDto>> GetTasksAsync(int projectId, string? status = null, int? assigneeId = null, int page = 1, int pageSize = 10)
        {
            if (projectId <= 0)
                return null;
            var tasks = await _taskRepo.GetByProjectIdAsync(projectId, status, assigneeId ?? 0, page, pageSize);
            return tasks.Select(t => new TaskDto
            {
                TaskId = t.TaskId,
                ProjectId = t.ProjectId,
                Title = t.Title,
                Description = t.Description,
                AssignedToId = t.AssignedToId,
                AssignedToName = t.AssignedTo.Name,
                Status = t.Status,
                Priority = t.Priority,
                DueDate = t.DueDate,
                CreatedAt = t.CreatedAt,
                UpdatedAt = t.UpdatedAt
            });
        }

        public async Task<TaskDto> GetTaskByIdAsync(int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId);
            if (task == null) return null;

            return new TaskDto
            {
                TaskId = task.TaskId,
                ProjectId = task.ProjectId,
                Title = task.Title,
                Description = task.Description,
                AssignedToId = task.AssignedToId,
                AssignedToName = task.AssignedTo.Name,
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
        }

        public async Task UpdateTaskAsync(int taskId, TaskCreateDto dto)
        {
            var task = await _taskRepo.GetByIdAsync(taskId);
            if (task == null) throw new KeyNotFoundException("Task not found");

            if (dto.DueDate < DateTime.UtcNow.Date)
                throw new ArgumentException("DueDate cannot be in the past");

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.AssignedToId = dto.AssignedToId;
            task.Status = dto.Status;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;
            task.UpdatedAt = DateTime.UtcNow;

            await _taskRepo.UpdateAsync(task);
        }

        public async Task DeleteTaskAsync(int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId);
            if (task == null) throw new KeyNotFoundException("Task not found");

            await _taskRepo.DeleteAsync(task);
        }
    }

}
