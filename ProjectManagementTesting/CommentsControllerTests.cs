using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Controllers;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementAPI.Models.Dtos.Comments;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ProjectManagementAPI.Tests.Controllers
{
    public class CommentsControllerTests
    {
        private readonly Mock<ICommentService> _commentServiceMock;
        private readonly CommentsController _controller;

        public CommentsControllerTests()
        {
            _commentServiceMock = new Mock<ICommentService>();
            _controller = new CommentsController(_commentServiceMock.Object);
        }

        [Fact]
        public async Task AddComment_ShouldReturnCreatedAtAction_WhenSuccessful()
        {
            // Arrange
            int taskId = 1;
            int empId = 5;
            var dto = new CommentCreateDto { Text = "Looks good!" };

            var createdCommentDto = new CommentDto
            {
                CommentId = 10,
                TaskId = taskId,
                EmployeeId = empId,
                EmployeeName = "John Doe",
                Text = dto.Text,
                CreatedAt = DateTime.UtcNow
            };

            _commentServiceMock
                .Setup(s => s.AddCommentAsync(taskId, empId, dto))
                .ReturnsAsync(createdCommentDto); // ✅ matches ICommentService return type

            // Act
            var result = await _controller.AddComment(taskId, empId, dto);

            // Assert
            var createdAtResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(_controller.GetComments), createdAtResult.ActionName);

            var comment = Assert.IsType<CommentDto>(createdAtResult.Value); // ✅ correct type
            Assert.Equal(taskId, comment.TaskId);
            Assert.Equal(empId, comment.EmployeeId);
            Assert.Equal("Looks good!", comment.Text);
        }

        [Fact]
        public async Task GetComments_ShouldReturnOk_WithListOfComments()
        {
            // Arrange
            int taskId = 1;
            var comments = new List<CommentDto>
            {
                new CommentDto { CommentId = 1, TaskId = taskId, EmployeeId = 5, Text = "Test 1" },
                new CommentDto { CommentId = 2, TaskId = taskId, EmployeeId = 6, Text = "Test 2" }
            };

            _commentServiceMock
                .Setup(s => s.GetCommentsByTaskAsync(taskId))
                .ReturnsAsync(comments);

            // Act
            var result = await _controller.GetComments(taskId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedComments = Assert.IsType<List<CommentDto>>(okResult.Value);

            Assert.Equal(2, returnedComments.Count);
            Assert.Equal("Test 1", returnedComments[0].Text);
            Assert.Equal("Test 2", returnedComments[1].Text);
        }
    }
}
