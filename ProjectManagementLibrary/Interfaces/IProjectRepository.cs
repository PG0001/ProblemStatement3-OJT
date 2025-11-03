using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagementLibrary.Models;

namespace ProjectManagementLibrary.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project?> GetByIdAsync(int projectId);
        Task<(IEnumerable<Project>, int)> GetAllAsync(int page, int pageSize, int? managerId, string? search);
        Task AddAsync(Project project);
        Task UpdateAsync(Project project);
        Task DeleteAsync(Project project);
    }
}
