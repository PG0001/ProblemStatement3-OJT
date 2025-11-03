using ProjectManagementAPI.Models.Dtos.Projects;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repo;

        public ProjectService(IProjectRepository repo)
        {
            _repo = repo;
        }

        public async Task<ProjectDto> CreateProjectAsync(ProjectCreatedDto dto)
        {
            if (dto.EndDate < dto.StartDate)
                throw new ArgumentException("EndDate cannot be before StartDate");

            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                ManagerId = dto.ManagerId
            };

            await _repo.AddAsync(project);

            return new ProjectDto
            {
                ProjectId = project.ProjectId,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                ManagerId = project.ManagerId,
                TaskCount = project.Tasks?.Count ?? 0
            };
        }
        public async Task<PaginatedResult<ProjectDto>> GetProjectsAsync(int page, int pageSize, int? managerId, string? search)
        {
            var (projects, totalCount) = await _repo.GetAllAsync(page, pageSize, managerId, search);

            var projectDtos = projects.Select(p => new ProjectDto
            {
                ProjectId = p.ProjectId,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                ManagerId = p.ManagerId,
                TaskCount = p.Tasks?.Count ?? 0
            });

            return new PaginatedResult<ProjectDto>
            {
                Items = projectDtos,
                TotalCount = totalCount
            };
        }


        public async Task<ProjectDto> GetProjectByIdAsync(int id)
        {
            var p = await _repo.GetByIdAsync(id);
            if (p == null) return null;

            return new ProjectDto
            {
                ProjectId = p.ProjectId,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                ManagerId = p.ManagerId,
                TaskCount = p.Tasks?.Count ?? 0
            };
        }

        public async Task UpdateProjectAsync(int id, ProjectCreatedDto dto)
        {
            var project = await _repo.GetByIdAsync(id);
            if (project == null) throw new KeyNotFoundException("Project not found");
            if (dto.EndDate < dto.StartDate) throw new ArgumentException("EndDate cannot be before StartDate");

            project.Name = dto.Name;
            project.Description = dto.Description;
            project.StartDate = dto.StartDate;
            project.EndDate = dto.EndDate;
            project.ManagerId = dto.ManagerId;

            await _repo.UpdateAsync(project);
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _repo.GetByIdAsync(id);
            if (project == null) throw new KeyNotFoundException("Project not found");

            await _repo.DeleteAsync(project);
        }
    }

}
