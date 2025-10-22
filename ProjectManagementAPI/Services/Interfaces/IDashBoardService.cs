using ProjectManagementAPI.Models.Dtos.Summary_Dashboard;

namespace ProjectManagementAPI.Services.Interfaces
{
    public interface IDashBoardService
    {
        Task<ProjectSummaryDto> GetProjectSummaryAsync(int projectId);
    }
}
