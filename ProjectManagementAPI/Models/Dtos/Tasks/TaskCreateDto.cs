using System.ComponentModel.DataAnnotations;

namespace ProjectManagementAPI.Models.Dtos.Tasks
{
    public class TaskCreateDto
    {
        [Required, MaxLength(150)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public int AssignedToId { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } // ToDo/InProgress/Done

        [Required, MaxLength(20)]
        public string Priority { get; set; } // Low/Medium/High

        [Required]
        public DateTime DueDate { get; set; }
    }
}
