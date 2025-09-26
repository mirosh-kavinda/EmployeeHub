using EmpHub.Models;
using EmpHub.Repositories.Interfaces;
using EmpHub.Services.Interfaces;

namespace EmpHub.Services
{
    public class EmployeeService(IEmployeeRepository employeeRepository) : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository =
            employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<List<Employee>?> GetEmployeeByIdAsync(int id)
        {
            if (id <= 0)
                return null;

            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> CreateEmployeeAsync(CreateEmployeeDto createDto)
        {
            // Business validation
            if (string.IsNullOrWhiteSpace(createDto.FirstName))
                throw new ArgumentException("First name is required");

            if (string.IsNullOrWhiteSpace(createDto.LastName))
                throw new ArgumentException("Last name is required");

            if (string.IsNullOrWhiteSpace(createDto.Email))
                throw new ArgumentException("Email is required");

            if (createDto.Salary == null || createDto.Salary <= 0)
                throw new ArgumentException("Salary must be greater than zero");

            if (createDto.DepartmentId == null || createDto.DepartmentId <= 0)
                throw new ArgumentException("Valid Department ID is required");

            var employee = new Employee
            {
                FirstName = createDto.FirstName.Trim(),
                LastName = createDto.LastName.Trim(),
                Email = createDto.Email.Trim(),
                DateOfBirth = createDto.DateOfBirth,
                Salary = createDto.Salary,
                DepartmentId = createDto.DepartmentId,
            };

            var id = await _employeeRepository.CreateAsync(employee);
            employee.EmployeeId = id!;

            return employee;
        }

        public async Task<bool> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateDto)
        {
            if (id <= 0 || id != updateDto.EmployeeId)
                return false;

            // Business validation
            if (string.IsNullOrWhiteSpace(updateDto.FirstName))
                throw new ArgumentException("First name is required");

            if (string.IsNullOrWhiteSpace(updateDto.LastName))
                throw new ArgumentException("Last name is required");

            if (string.IsNullOrWhiteSpace(updateDto.Email))
                throw new ArgumentException("Email is required");

            if (updateDto.Salary == null || updateDto.Salary <= 0)
                throw new ArgumentException("Salary must be greater than zero");

            if (updateDto.DepartmentId == null || updateDto.DepartmentId <= 0)
                throw new ArgumentException("Valid Department ID is required");

            if (!await _employeeRepository.ExistsAsync(id))
                return false;

            var employee = new UpdateEmployeeDto
            {
                FirstName = updateDto.FirstName.Trim(),
                LastName = updateDto.LastName.Trim(),
                Email = updateDto.Email.Trim(),
                DateOfBirth = updateDto.DateOfBirth,
                Salary = updateDto.Salary,
                DepartmentId = updateDto.DepartmentId,
            };

            return await _employeeRepository.UpdateAsync(employee);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            if (id <= 0)
                return false;

            return await _employeeRepository.DeleteAsync(id);
        }
    }
}
