using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementLibrary.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; }

        [Required]
        public RoleType Role { get; set; } // Employee / Manager / Admin

        // Relationships
        public ICollection<Project> ManagedProjects { get; set; }
        public ICollection<TaskItem> AssignedTasks { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
