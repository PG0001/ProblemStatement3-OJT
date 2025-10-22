using ProjectManagementAPI.Models.Dtos.Comments;

namespace ProjectManagementAPI.Services.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDto> AddCommentAsync(int taskId, int employeeId, CommentCreateDto dto);
        Task<IEnumerable<CommentDto>> GetCommentsByTaskAsync(int taskId);
    }

}
