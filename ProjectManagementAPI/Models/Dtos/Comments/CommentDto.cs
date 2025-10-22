namespace ProjectManagementAPI.Models.Dtos.Comments
{
    public class CommentDto
    {
        public int CommentId { get; set; }

        public int TaskId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
