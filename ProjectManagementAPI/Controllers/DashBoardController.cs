using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementAPI.Models.Dtos.Summary_Dashboard;
using ProjectManagementAPI.Services.Interfaces;
using ProjectManagementLibrary.Interfaces;

namespace ProjectManagementAPI.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashBoardService _dashboardService;

        public DashboardController(IDashBoardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("project-summary/{projectId}")]
        public async Task<IActionResult> GetProjectSummary(int projectId)
        {
            var summary = await _dashboardService.GetProjectSummaryAsync(projectId);
            if (summary == null) return NotFound("Project not found");

            return Ok(summary);
        }
    }
}
