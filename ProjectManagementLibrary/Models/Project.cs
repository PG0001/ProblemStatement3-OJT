using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementLibrary.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        // Foreign Key
        public int ManagerId { get; set; }

        [ForeignKey(nameof(ManagerId))]
        public Employee Manager { get; set; }

        // Relationships
        public ICollection<TaskItem> Tasks { get; set; }
    }
}
