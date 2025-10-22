using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagementLibrary.Models;

namespace ProjectManagementLibrary.Interfaces
{
    public interface ITaskRepository
    {

        Task<TaskItem?> GetByIdAsync(int taskId);
        Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int projectId, string? status = null, int? assigneeId = null, int page = 1, int pageSize = 10);
        Task AddAsync(TaskItem task);
        Task UpdateAsync(TaskItem task);
        Task DeleteAsync(TaskItem task);
    }
}
