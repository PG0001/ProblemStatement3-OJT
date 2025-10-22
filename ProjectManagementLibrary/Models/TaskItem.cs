using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementLibrary.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public Project Project { get; set; }

        [Required, MaxLength(150)]
        public string Title { get; set; }

        public string Description { get; set; }

        // Foreign Key: Assigned Employee
        public int AssignedToId { get; set; }

        [ForeignKey(nameof(AssignedToId))]
        public Employee AssignedTo { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } // ToDo / InProgress / Done

        [Required, MaxLength(20)]
        public string Priority { get; set; } // Low / Medium / High

        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Relationships
        public ICollection<Comment> Comments { get; set; }
    }
}
