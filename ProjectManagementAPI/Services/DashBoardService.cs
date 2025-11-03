using ProjectManagementAPI.Models.Dtos.Summary_Dashboard;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Services
{
    public class DashboardService : IDashBoardService
    {
        private readonly IProjectRepository _projectRepo;

        public DashboardService(IProjectRepository projectRepo)
        {
            _projectRepo = projectRepo;
        }

        public async Task<ProjectSummaryDto> GetProjectSummaryAsync(int projectId)
        {
            var project = await _projectRepo.GetByIdAsync(projectId);
            if (project == null) return null;

            var tasks = project.Tasks ?? new List<TaskItem>();

            int totalTasks = tasks.Count;
            int completed = tasks.Count(t => t.Status == "Done");
            int inProgress = tasks.Count(t => t.Status == "In Progress" || t.Status == "Review" );
            int todo = tasks.Count(t => t.Status == "To Do");
            int overdue = tasks.Count(t => t.DueDate < DateTime.UtcNow.Date && t.Status != "Done");

            double completionPercentage = totalTasks == 0 ? 0 : ((double)completed / totalTasks) * 100;

            return new ProjectSummaryDto
            {
                ProjectId = project.ProjectId,
                ProjectName = project.Name,
                TotalTasks = totalTasks,
                DoneCount = completed,
                InProgressCount = inProgress,
                ToDoCount = todo,
                OverdueCount = overdue,
                CompletionPercentage = Math.Round(completionPercentage, 2)
            };
        }
    }

}
