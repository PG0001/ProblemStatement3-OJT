using ProjectManagementLibrary.Models;

namespace ProjectManagementAPI.Models.Dtos.Authentication
{
    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public RoleType Role { get; set; }
    }
}
