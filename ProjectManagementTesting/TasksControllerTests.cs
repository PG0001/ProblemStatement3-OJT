using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Controllers;
using ProjectManagementAPI.Models.Dtos.Tasks;
using ProjectManagementAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManagementAPI.Tests.Controllers
{
    public class TasksControllerTests
    {
        private readonly Mock<ITaskService> _taskServiceMock;
        private readonly TasksController _controller;

        public TasksControllerTests()
        {
            _taskServiceMock = new Mock<ITaskService>();
            _controller = new TasksController(_taskServiceMock.Object);
        }

        [Fact]
        public async Task CreateTask_ShouldReturnCreatedAtAction_WhenSuccessful()
        {
            // Arrange
            int projectId = 1;
            var dto = new TaskCreateDto
            {
                Title = "Implement API",
                Description = "Build task management API",
                AssignedToId = 2,
                Status = "ToDo",
                Priority = "High",
                DueDate = DateTime.UtcNow.AddDays(7)
            };

            var createdTask = new TaskDto
            {
                TaskId = 10,
                ProjectId = projectId,
                Title = dto.Title,
                Description = dto.Description,
                AssignedToId = dto.AssignedToId,
                Status = dto.Status,
                Priority = dto.Priority,
                DueDate = dto.DueDate
            };

            _taskServiceMock
                .Setup(s => s.CreateTaskAsync(projectId, dto))
                .ReturnsAsync(createdTask);

            // Act
            var result = await _controller.CreateTask(projectId, dto);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnedTask = Assert.IsType<TaskDto>(createdResult.Value);
            Assert.Equal("Implement API", returnedTask.Title);
            Assert.Equal(projectId, returnedTask.ProjectId);
        }

        [Fact]
        public async Task CreateTask_ShouldReturnBadRequest_WhenArgumentException()
        {
            int projectId = 1;
            var dto = new TaskCreateDto
            {
                Title = "Invalid",
                AssignedToId = 2,
                Status = "ToDo",
                Priority = "Low",
                DueDate = DateTime.UtcNow
            };

            _taskServiceMock
                .Setup(s => s.CreateTaskAsync(projectId, dto))
                .ThrowsAsync(new ArgumentException("Invalid task data"));

            var result = await _controller.CreateTask(projectId, dto);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid task data", badRequest.Value);
        }

        [Fact]
        public async Task GetTasks_ShouldReturnBadRequest_WhenProjectIdInvalid()
        {
            var result = await _controller.GetTasks(0);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid projectId", badRequest.Value.GetType().GetProperty("message")?.GetValue(badRequest.Value));
        }

        [Fact]
        public async Task GetTasks_ShouldReturnOk_WithTasksList()
        {
            int projectId = 1;
            var tasks = new List<TaskDto>
            {
                new TaskDto { TaskId = 1, ProjectId = projectId, Title = "Design DB", Status = "ToDo" },
                new TaskDto { TaskId = 2, ProjectId = projectId, Title = "Setup API", Status = "InProgress" }
            };

            _taskServiceMock
                .Setup(s => s.GetTasksAsync(projectId, null, null, 1, 10))
                .ReturnsAsync(tasks);

            var result = await _controller.GetTasks(projectId);

            var ok = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<List<TaskDto>>(ok.Value);
            Assert.Equal(2, returned.Count);
        }

        [Fact]
        public async Task GetTaskById_ShouldReturnOk_WhenTaskExists()
        {
            var task = new TaskDto { TaskId = 10, Title = "Unit Testing" };
            _taskServiceMock
                .Setup(s => s.GetTaskByIdAsync(10))
                .ReturnsAsync(task);

            var result = await _controller.GetTaskById(10);

            var ok = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<TaskDto>(ok.Value);
            Assert.Equal("Unit Testing", returned.Title);
        }

        [Fact]
        public async Task GetTaskById_ShouldReturnNotFound_WhenTaskMissing()
        {
            _taskServiceMock
                .Setup(s => s.GetTaskByIdAsync(10))
                .ReturnsAsync((TaskDto?)null);

            var result = await _controller.GetTaskById(10);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateTask_ShouldReturnNoContent_WhenSuccessful()
        {
            var dto = new TaskCreateDto
            {
                Title = "Updated Task",
                AssignedToId = 3,
                Status = "InProgress",
                Priority = "Medium",
                DueDate = DateTime.UtcNow.AddDays(5)
            };

            _taskServiceMock
                .Setup(s => s.UpdateTaskAsync(1, dto))
                .Returns(Task.CompletedTask);

            var result = await _controller.UpdateTask(1, dto);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UpdateTask_ShouldReturnNotFound_WhenTaskMissing()
        {
            var dto = new TaskCreateDto
            {
                Title = "Not Found Task",
                AssignedToId = 2,
                Status = "ToDo",
                Priority = "High",
                DueDate = DateTime.UtcNow
            };

            _taskServiceMock
                .Setup(s => s.UpdateTaskAsync(99, dto))
                .ThrowsAsync(new KeyNotFoundException());

            var result = await _controller.UpdateTask(99, dto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteTask_ShouldReturnNoContent_WhenSuccessful()
        {
            _taskServiceMock
                .Setup(s => s.DeleteTaskAsync(1))
                .Returns(Task.CompletedTask);

            var result = await _controller.DeleteTask(1);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteTask_ShouldReturnNotFound_WhenKeyNotFound()
        {
            _taskServiceMock
                .Setup(s => s.DeleteTaskAsync(99))
                .ThrowsAsync(new KeyNotFoundException());

            var result = await _controller.DeleteTask(99);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
