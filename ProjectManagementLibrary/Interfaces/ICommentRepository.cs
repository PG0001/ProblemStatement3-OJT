using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagementLibrary.Models;

namespace ProjectManagementLibrary.Interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetByTaskIdAsync(int taskId);
        Task AddAsync(Comment comment);
    }
}
