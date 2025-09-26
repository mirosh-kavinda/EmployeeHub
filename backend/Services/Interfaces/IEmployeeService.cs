using EmpHub.Models;

namespace EmpHub.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployeesAsync();
        Task<List<Employee>?> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(CreateEmployeeDto createDto);
        Task<bool> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateDto);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}
