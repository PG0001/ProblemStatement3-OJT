using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using ProjectManagementAPI.Controllers;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;
using ProjectManagementAPI.Models.Dtos.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class AuthenticationControllerTests
{
    private readonly Mock<IEmployeeRepository> _employeeRepoMock;
    private readonly Mock<IConfiguration> _configMock;
    private readonly AuthenticationController _controller;

    public AuthenticationControllerTests()
    {
        _employeeRepoMock = new Mock<IEmployeeRepository>();
        _configMock = new Mock<IConfiguration>();

        _configMock.Setup(c => c["Jwt:Key"]).Returns("supersecretkey123456");
        _configMock.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        _configMock.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");

        _controller = new AuthenticationController(_employeeRepoMock.Object, _configMock.Object);
    }

    [Fact]
    public async Task Register_ShouldReturnOk_WhenEmployeeCreated()
    {
        // Arrange
        var request = new RegisterRequest
        {
            Name = "John",
            Email = "john@example.com",
            Role = RoleType.Admin // ✅ still string here (like frontend)
        };

        _employeeRepoMock.Setup(r => r.GetByEmailAsync(request.Email))
            .ReturnsAsync((Employee?)null);

        _employeeRepoMock.Setup(r => r.AddAsync(It.IsAny<Employee>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Register(request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Employee created successfully", okResult.Value);
    }

    [Fact]
    public async Task Register_ShouldReturnBadRequest_WhenEmployeeExists()
    {
        // Arrange
        var request = new RegisterRequest
        {
            Name = "Existing User",
            Email = "existing@example.com",
            Role = RoleType.Employee,
        };

        _employeeRepoMock.Setup(r => r.GetByEmailAsync(request.Email))
            .ReturnsAsync(new Employee
            {
                Name = "Existing User",
                Email = "existing@example.com",
                Role = RoleType.Employee
            });

        // Act
        var result = await _controller.Register(request);

        // Assert
        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Employee already exists", badRequest.Value);
    }
}
