using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;
namespace ProjectManagementLibrary
{
    public class CommentRepository:ICommentRepository
    {
        private readonly ProjectManagementDbContext _context;
        public CommentRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetByTaskIdAsync(int taskId)
        {
            return await _context.Comments
                .Where(c => c.TaskId == taskId)
                .Include(c => c.Employee)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task AddAsync(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
        }
    }
}
