using System.ComponentModel.DataAnnotations;

namespace ProjectManagementAPI.Models.Dtos.Projects
{
    public class ProjectCreatedDto
    {
       [Required, MaxLength(100)]
            public string Name { get; set; }

            [MaxLength(500)]
            public string Description { get; set; }

            [Required]
            public DateTime StartDate { get; set; }

            public DateTime EndDate { get; set; }

            [Required]
            public int ManagerId { get; set; }
        

    }
}
