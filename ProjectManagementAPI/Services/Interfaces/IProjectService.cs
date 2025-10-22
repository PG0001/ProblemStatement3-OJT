using ProjectManagementAPI.Models.Dtos.Projects;

namespace ProjectManagementAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectDto> CreateProjectAsync(ProjectCreatedDto dto);
        Task<IEnumerable<ProjectDto>> GetProjectsAsync(int page, int pageSize, int? managerId, string? search);
        Task<ProjectDto> GetProjectByIdAsync(int id);
        Task UpdateProjectAsync(int id, ProjectCreatedDto dto);
        Task DeleteProjectAsync(int id);
    }
}
