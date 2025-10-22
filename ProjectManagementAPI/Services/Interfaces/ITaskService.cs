using ProjectManagementAPI.Models.Dtos.Tasks;

namespace ProjectManagementAPI.Services.Interfaces
{
    public interface ITaskService
    {
        Task<TaskDto> CreateTaskAsync(int projectId, TaskCreateDto dto);
        Task<IEnumerable<TaskDto>> GetTasksAsync(int projectId, string? status = null, int? assigneeId = null, int page = 1, int pageSize = 10);
        Task<TaskDto> GetTaskByIdAsync(int taskId);
        Task UpdateTaskAsync(int taskId, TaskCreateDto dto);
        Task DeleteTaskAsync(int taskId);
    }
}
