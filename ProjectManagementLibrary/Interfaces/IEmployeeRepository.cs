using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagementLibrary.Models;

namespace ProjectManagementLibrary.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<Employee?> GetByEmailAsync(string email);
        Task<Employee?> GetByIdAsync(int id);
        Task AddAsync(Employee employee);
        Task<IEnumerable<Employee>> GetAllAsync();
    }
}
