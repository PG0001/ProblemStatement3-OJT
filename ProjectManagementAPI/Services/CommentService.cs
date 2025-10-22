using ProjectManagementAPI.Models.Dtos.Comments;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IEmployeeRepository _employeeRepo;
        private readonly ITaskRepository _taskRepo;

        public CommentService(ICommentRepository commentRepo, IEmployeeRepository employeeRepo, ITaskRepository taskRepo)
        {
            _commentRepo = commentRepo;
            _employeeRepo = employeeRepo;
            _taskRepo = taskRepo;
        }

        public async Task<CommentDto> AddCommentAsync(int taskId, int employeeId, CommentCreateDto dto)
        {
            var task = await _taskRepo.GetByIdAsync(taskId);
            if (task == null) throw new KeyNotFoundException("Task not found");

            var employee = await _employeeRepo.GetByIdAsync(employeeId);
            if (employee == null) throw new KeyNotFoundException("Employee not found");

            var comment = new Comment
            {
                TaskId = taskId,
                EmployeeId = employeeId,
                Text = dto.Text,
                CreatedAt = DateTime.UtcNow
            };

            await _commentRepo.AddAsync(comment);

            return new CommentDto
            {
                CommentId = comment.CommentId,
                TaskId = comment.TaskId,
                EmployeeId = comment.EmployeeId,
                EmployeeName = employee.Name,
                Text = comment.Text,
                CreatedAt = comment.CreatedAt
            };
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByTaskAsync(int taskId)
        {
            var comments = await _commentRepo.GetByTaskIdAsync(taskId);
            return comments.Select(c => new CommentDto
            {
                CommentId = c.CommentId,
                TaskId = c.TaskId,
                EmployeeId = c.EmployeeId,
                EmployeeName = c.Employee.Name,
                Text = c.Text,
                CreatedAt = c.CreatedAt
            });
        }
    }

}
