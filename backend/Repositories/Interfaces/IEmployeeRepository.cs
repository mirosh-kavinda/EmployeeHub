using EmpHub.Models;

namespace EmpHub.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<List<Employee>> GetByIdAsync(int id);
        Task<int> CreateAsync(Employee employee);
        Task<bool> UpdateAsync(UpdateEmployeeDto employee);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
