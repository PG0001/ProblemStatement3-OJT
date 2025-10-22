namespace ProjectManagementAPI.Models.Dtos.Tasks
{
    public class TaskDto : TaskCreateDto
    {
        public int TaskId { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AssignedToId { get; set; }
        public string AssignedToName { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
