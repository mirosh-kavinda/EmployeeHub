using EmpHub.Models;
using EmpHub.Repositories.Interfaces;
using EmpHub.Services.Interfaces;
using EmpHub.Services;
using EmpHub.Repositories;

namespace EmpHub.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository ?? throw new ArgumentNullException(nameof(departmentRepository));
        }

        public async Task<List<Department>> GetAllDepartmentsAsync()
        {
            return await _departmentRepository.GetAllAsync();
        }

        public async Task<Department?> GetDepartmentByIdAsync(int id)
        {
            if (id <= 0)
                return null;

            return await _departmentRepository.GetByIdAsync(id);
        }

        public async Task<Department> CreateDepartmentAsync(CreateDepartmentDto createDto)
        {
            // Business validation
            if (string.IsNullOrWhiteSpace(createDto.DepartmentCode))
                throw new ArgumentException("Department code is required");
            
            if (string.IsNullOrWhiteSpace(createDto.DepartmentName))
                throw new ArgumentException("Department name is required");

            var department = new Department
            {
                DepartmentCode = createDto.DepartmentCode.Trim(),
                DepartmentName = createDto.DepartmentName.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var id = await _departmentRepository.CreateAsync(department);
            department.DepartmentId = id;
            
            return department;
        }

        public async Task<bool> UpdateDepartmentAsync(int id, UpdateDepartmentDto updateDto)
        {
            if (id <= 0 || id != updateDto.DepartmentId)
                return false;

            // Business validation
            if (string.IsNullOrWhiteSpace(updateDto.DepartmentCode))
                throw new ArgumentException("Department code is required");
            
            if (string.IsNullOrWhiteSpace(updateDto.DepartmentName))
                throw new ArgumentException("Department name is required");

            // Check if department exists
            if (!await _departmentRepository.ExistsAsync(id))
                return false;

            var department = new Department
            {
                DepartmentId = updateDto.DepartmentId,
                DepartmentCode = updateDto.DepartmentCode.Trim(),
                DepartmentName = updateDto.DepartmentName.Trim()
            };

            return await _departmentRepository.UpdateAsync(department);
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            if (id <= 0)
                return false;

            return await _departmentRepository.DeleteAsync(id);
        }
    }
}