using EmpHub.Models;

namespace EmpHub.Services.Interfaces
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAllDepartmentsAsync();
        Task<Department?> GetDepartmentByIdAsync(int id);
        Task<Department> CreateDepartmentAsync(CreateDepartmentDto createDto);
        Task<bool> UpdateDepartmentAsync(int id, UpdateDepartmentDto updateDto);
        Task<bool> DeleteDepartmentAsync(int id);
    }
}