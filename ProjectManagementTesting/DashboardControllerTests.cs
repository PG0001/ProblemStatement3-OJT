using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Controllers;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementAPI.Models.Dtos.Summary_Dashboard;
using System.Threading.Tasks;

namespace ProjectManagementAPI.Tests.Controllers
{
    public class DashboardControllerTests
    {
        private readonly Mock<IDashBoardService> _dashboardServiceMock;
        private readonly DashboardController _controller;

        public DashboardControllerTests()
        {
            _dashboardServiceMock = new Mock<IDashBoardService>();
            _controller = new DashboardController(_dashboardServiceMock.Object);
        }

        [Fact]
        public async Task GetProjectSummary_ShouldReturnOk_WhenSummaryExists()
        {
            // Arrange
            int projectId = 1;
            var summaryDto = new ProjectSummaryDto
            {
                ProjectId = projectId,
                ProjectName = "AI Development",
                TotalTasks = 10,
                ToDoCount = 3,
                InProgressCount = 4,
                DoneCount = 3,
                OverdueCount = 1,
                CompletionPercentage = 30
            };

            _dashboardServiceMock
                .Setup(s => s.GetProjectSummaryAsync(projectId))
                .ReturnsAsync(summaryDto);

            // Act
            var result = await _controller.GetProjectSummary(projectId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedSummary = Assert.IsType<ProjectSummaryDto>(okResult.Value);

            Assert.Equal(projectId, returnedSummary.ProjectId);
            Assert.Equal("AI Development", returnedSummary.ProjectName);
            Assert.Equal(10, returnedSummary.TotalTasks);
            Assert.Equal(3, returnedSummary.ToDoCount);
            Assert.Equal(4, returnedSummary.InProgressCount);
            Assert.Equal(3, returnedSummary.DoneCount);
            Assert.Equal(30, returnedSummary.CompletionPercentage);
        }

        [Fact]
        public async Task GetProjectSummary_ShouldReturnNotFound_WhenSummaryIsNull()
        {
            // Arrange
            int projectId = 99;

            _dashboardServiceMock
                .Setup(s => s.GetProjectSummaryAsync(projectId))
                .ReturnsAsync((ProjectSummaryDto?)null);

            // Act
            var result = await _controller.GetProjectSummary(projectId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Project not found", notFoundResult.Value);
        }
    }
}
