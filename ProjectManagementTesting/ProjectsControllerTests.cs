using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Controllers;
using ProjectManagementAPI.Models.Dtos.Projects;
using ProjectManagementAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManagementAPI.Tests.Controllers
{
    public class ProjectsControllerTests
    {
        private readonly Mock<IProjectService> _serviceMock;
        private readonly ProjectsController _controller;

        public ProjectsControllerTests()
        {
            _serviceMock = new Mock<IProjectService>();
            _controller = new ProjectsController(_serviceMock.Object);
        }

        [Fact]
        public async Task CreateProject_ShouldReturnCreatedAtAction_WhenSuccessful()
        {
            // Arrange
            var dto = new ProjectCreatedDto
            {
                Name = "AI Platform",
                Description = "Deep learning infra",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddMonths(6),
                ManagerId = 10
            };

            var createdProject = new ProjectDto
            {
                ProjectId = 1,
                Name = dto.Name,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                ManagerId = dto.ManagerId
            };

            _serviceMock
                .Setup(s => s.CreateProjectAsync(dto))
                .ReturnsAsync(createdProject);

            // Act
            var result = await _controller.CreateProject(dto);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var project = Assert.IsType<ProjectDto>(createdResult.Value);
            Assert.Equal("AI Platform", project.Name);
        }

        [Fact]
        public async Task CreateProject_ShouldReturnBadRequest_WhenArgumentExceptionThrown()
        {
            var dto = new ProjectCreatedDto
            {
                Name = "Test",
                StartDate = DateTime.UtcNow,
                ManagerId = 2
            };

            _serviceMock
                .Setup(s => s.CreateProjectAsync(dto))
                .ThrowsAsync(new ArgumentException("Invalid project data"));

            var result = await _controller.CreateProject(dto);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid project data", badRequest.Value);
        }

        [Fact]
        public async Task GetProjects_ShouldReturnOk_WithPaginatedProjects()
        {
            var projects = new List<ProjectDto>
            {
                new ProjectDto { ProjectId = 1, Name = "Alpha" },
                new ProjectDto { ProjectId = 2, Name = "Beta" }
            };

            var paginatedResult = new PaginatedResult<ProjectDto>
            {
                Items = projects,
                TotalCount = 2
            };

            _serviceMock
                .Setup(s => s.GetProjectsAsync(1, 10, null, ""))
                .ReturnsAsync(paginatedResult);

            var result = await _controller.GetProjects();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<PaginatedResult<ProjectDto>>(okResult.Value);

            Assert.Equal(2, returned.TotalCount);
            Assert.Equal("Alpha", ((List<ProjectDto>)returned.Items)[0].Name);
        }

        [Fact]
        public async Task GetProjectById_ShouldReturnOk_WhenProjectExists()
        {
            var project = new ProjectDto { ProjectId = 5, Name = "Gamma" };
            _serviceMock
                .Setup(s => s.GetProjectByIdAsync(5))
                .ReturnsAsync(project);

            var result = await _controller.GetProjectById(5);

            var ok = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<ProjectDto>(ok.Value);
            Assert.Equal("Gamma", returned.Name);
        }

        [Fact]
        public async Task GetProjectById_ShouldReturnNotFound_WhenProjectNotExists()
        {
            _serviceMock
                .Setup(s => s.GetProjectByIdAsync(5))
                .ReturnsAsync((ProjectDto?)null);

            var result = await _controller.GetProjectById(5);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateProject_ShouldReturnNoContent_WhenSuccessful()
        {
            var dto = new ProjectCreatedDto
            {
                Name = "Updated Project",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddMonths(3),
                ManagerId = 3
            };

            _serviceMock
                .Setup(s => s.UpdateProjectAsync(1, dto))
                .Returns(Task.CompletedTask);

            var result = await _controller.UpdateProject(1, dto);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UpdateProject_ShouldReturnNotFound_WhenKeyNotFound()
        {
            var dto = new ProjectCreatedDto
            {
                Name = "Nonexistent Project",
                StartDate = DateTime.UtcNow,
                ManagerId = 1
            };

            _serviceMock
                .Setup(s => s.UpdateProjectAsync(99, dto))
                .ThrowsAsync(new KeyNotFoundException());

            var result = await _controller.UpdateProject(99, dto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteProject_ShouldReturnNoContent_WhenSuccessful()
        {
            _serviceMock
                .Setup(s => s.DeleteProjectAsync(1))
                .Returns(Task.CompletedTask);

            var result = await _controller.DeleteProject(1);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteProject_ShouldReturnNotFound_WhenKeyNotFound()
        {
            _serviceMock
                .Setup(s => s.DeleteProjectAsync(99))
                .ThrowsAsync(new KeyNotFoundException());

            var result = await _controller.DeleteProject(99);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
