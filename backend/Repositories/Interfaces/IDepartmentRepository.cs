using EmpHub.Models;

namespace EmpHub.Repositories.Interfaces
{
    public interface IDepartmentRepository
    {
         Task<List<Department>> GetAllAsync();
        Task<Department?> GetByIdAsync(int id);
        Task<int> CreateAsync(Department department);
        Task<bool> UpdateAsync(Department department);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}