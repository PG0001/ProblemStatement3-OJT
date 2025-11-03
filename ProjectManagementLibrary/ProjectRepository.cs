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
    public class ProjectRepository:IProjectRepository
    {
        private readonly ProjectManagementDbContext _context;
        public ProjectRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<Project?> GetByIdAsync(int projectId)
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .ThenInclude(t => t.AssignedTo)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);
        }

        public async Task<(IEnumerable<Project>, int)> GetAllAsync(int page, int pageSize, int? managerId, string? search)
        {
            var query = _context.Projects.AsQueryable();

            if (managerId.HasValue)
                query = query.Where(p => p.ManagerId == managerId.Value);

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

            var totalCount = await query.CountAsync();

            var projects = await query
                .OrderByDescending(p => p.StartDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(p => p.Tasks)
                .ToListAsync();

            return (projects, totalCount);
        }

        public async Task AddAsync(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Project project)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}
