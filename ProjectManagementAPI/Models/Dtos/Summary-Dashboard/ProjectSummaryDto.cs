namespace ProjectManagementAPI.Models.Dtos.Summary_Dashboard
{
    public class ProjectSummaryDto
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }

        public int TotalTasks { get; set; }
        public int ToDoCount { get; set; }
        public int InProgressCount { get; set; }
        public int DoneCount { get; set; }  // ✅ use this instead of DoneCount
        public int OverdueCount { get; set; }

        public double CompletionPercentage { get; set; } // 0–100%
    }
}
