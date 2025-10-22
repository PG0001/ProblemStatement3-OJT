using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProjectManagementLibrary.Models
{
   
        public class ProjectManagementDbContext : DbContext
        {
            public ProjectManagementDbContext(DbContextOptions<ProjectManagementDbContext> options)
                : base(options)
            {
            }

            public DbSet<Employee> Employees { get; set; }
            public DbSet<Project> Projects { get; set; }
            public DbSet<TaskItem> TaskItems { get; set; }
            public DbSet<Comment> Comments { get; set; }
        public ProjectManagementDbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=ProjectManagementDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                // Project - Manager (1:M)
                modelBuilder.Entity<Project>()
                    .HasOne(p => p.Manager)
                    .WithMany(e => e.ManagedProjects)
                    .HasForeignKey(p => p.ManagerId)
                    .OnDelete(DeleteBehavior.Restrict);

                // TaskItem - AssignedTo (1:M)
                modelBuilder.Entity<TaskItem>()
                    .HasOne(t => t.AssignedTo)
                    .WithMany(e => e.AssignedTasks)
                    .HasForeignKey(t => t.AssignedToId)
                    .OnDelete(DeleteBehavior.Restrict);

                // TaskItem - Project (1:M)
                modelBuilder.Entity<TaskItem>()
                    .HasOne(t => t.Project)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(t => t.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Comment - TaskItem (1:M)
                modelBuilder.Entity<Comment>()
                    .HasOne(c => c.Task)
                    .WithMany(t => t.Comments)
                    .HasForeignKey(c => c.TaskId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Comment - Employee (1:M)
                modelBuilder.Entity<Comment>()
                    .HasOne(c => c.Employee)
                    .WithMany(e => e.Comments)
                    .HasForeignKey(c => c.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);
            }
        }
    }


