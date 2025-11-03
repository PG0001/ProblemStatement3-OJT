using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ProjectManagementLibrary.Models;
using ProjectManagementLibrary.Interfaces;

namespace ProjectManagementLibrary
{
    public class TaskRepository :ITaskRepository
    {
        private readonly ProjectManagementDbContext _context;
        public TaskRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem?> GetByIdAsync(int taskId)
        {
            return await _context.TaskItems
                .Include(t => t.AssignedTo)
                .Include(t => t.Project)
                .Include(t => t.Comments)
                .ThenInclude(c => c.Employee)
                .FirstOrDefaultAsync(t => t.TaskId == taskId);
        }

        public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(
         int projectId,
         string? status = null,
         int? assigneeId = null,
         int page = 1,
         int pageSize = 10)
        {
            var query = _context.TaskItems
                .Include(t => t.AssignedTo)
                .Include(t => t.Project)
                .Where(t => t.ProjectId == projectId)
                .AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            // ✅ Only apply filter if assigneeId is valid (> 0)
            if (assigneeId.HasValue && assigneeId.Value > 0)
                query = query.Where(t => t.AssignedToId == assigneeId.Value);

            return await query
                .OrderByDescending(t => t.CreatedAt) // optional: newest first
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }



        public async Task AddAsync(TaskItem task)
        {
            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TaskItem task)
        {
            _context.TaskItems.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TaskItem task)
        {
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

}
