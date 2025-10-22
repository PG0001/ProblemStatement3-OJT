using Microsoft.EntityFrameworkCore;
using ProjectManagementLibrary.Interfaces;
using ProjectManagementLibrary.Models;
using System;

namespace ProjectManagementLibrary
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly ProjectManagementDbContext _context;
        public EmployeeRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<Employee?> GetByEmailAsync(string email)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<Employee?> GetByIdAsync(string id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }
    }
}
