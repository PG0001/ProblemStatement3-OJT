namespace ProjectManagementAPI.Models.Dtos.Summary_Dashboard
{
    public class ProjectSummaryDto
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }

        public int TotalTasks { get; set; }
        public int ToDoCount { get; set; }
        public int TodoCount { get; internal set; }
        public int InProgressCount { get; set; }
        public int DoneCount { get; set; }
        public int OverdueCount { get; set; }

        public double CompletionPercentage { get; set; } // 0–100%
        public int CompletedCount { get; internal set; }
    }
}
