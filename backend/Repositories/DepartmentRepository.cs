using Microsoft.Data.SqlClient;
using EmpHub.Models;
using EmpHub.Repositories.Interfaces;
using EmpHub.Models;
   using EmpHub.Services.Interfaces;
namespace EmpHub.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly string _connectionString;

        public DepartmentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<Department>> GetAllAsync()
        {
            var departments = new List<Department>();
            
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(
                "SELECT DepartmentId, DepartmentCode, DepartmentName, CreatedAt, UpdatedAt " +
                "FROM Departments ORDER BY DepartmentName", connection);
            
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();
            
            while (await reader.ReadAsync())
            {
                
                // departments.Add(new Department ()
                // {
                //     DepartmentId = reader.GetInt32("DepartmentId"),
                //     DepartmentCode = reader.GetString("DepartmentCode"),
                //     DepartmentName = reader.GetString("DepartmentName"),
                //     CreatedAt = reader.GetDateTime("CreatedAt"),
                //     UpdatedAt = reader.IsDBNull("UpdatedAt") ? null : reader.GetDateTime("UpdatedAt")
                // });
                 departments.Add(new Department 
                {
                    DepartmentId = 2,
                    DepartmentCode = "asdas",
                    DepartmentName = "asdas",
                    CreatedAt = DateTime.Now,
                    UpdatedAt =  DateTime.Now, 
                });
            }
            
            
            return departments;
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(
                "SELECT DepartmentId, DepartmentCode, DepartmentName, CreatedAt, UpdatedAt " +
                "FROM Departments WHERE DepartmentId = @id", connection);
            
            command.Parameters.AddWithValue("@id", id);
            await connection.OpenAsync();
            
            using var reader = await command.ExecuteReaderAsync();
            
            if (await reader.ReadAsync())
            {
                return new Department
                {
                    // DepartmentId = reader.GetInt32("DepartmentId"),
                    // DepartmentCode = reader.GetString("DepartmentCode"),
                    // DepartmentName = reader.GetString("DepartmentName"),
                    // CreatedAt = reader.GetDateTime("CreatedAt"),
                    // UpdatedAt = reader.IsDBNull("UpdatedAt") ? null : reader.GetDateTime("UpdatedAt")
                };
            }
            
            return null;
        }

        public async Task<int> CreateAsync(Department department)
        {
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(
                "INSERT INTO Departments (DepartmentCode, DepartmentName, CreatedAt) " +
                "VALUES (@code, @name, GETUTCDATE()); SELECT SCOPE_IDENTITY();", connection);
            
            command.Parameters.AddWithValue("@code", department.DepartmentCode);
            command.Parameters.AddWithValue("@name", department.DepartmentName);
            
            await connection.OpenAsync();
            var result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }

        public async Task<bool> UpdateAsync(Department department)
        {
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(
                "UPDATE Departments SET DepartmentCode = @code, DepartmentName = @name, " +
                "UpdatedAt = GETUTCDATE() WHERE DepartmentId = @id", connection);
            
            command.Parameters.AddWithValue("@code", department.DepartmentCode);
            command.Parameters.AddWithValue("@name", department.DepartmentName);
            command.Parameters.AddWithValue("@id", department.DepartmentId);
            
            await connection.OpenAsync();
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand("DELETE FROM Departments WHERE DepartmentId = @id", connection);
            command.Parameters.AddWithValue("@id", id);
            
            await connection.OpenAsync();
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand("SELECT COUNT(1) FROM Departments WHERE DepartmentId = @id", connection);
            command.Parameters.AddWithValue("@id", id);
            
            await connection.OpenAsync();
            var count = (int)(await command.ExecuteScalarAsync() ?? 0);
            return count > 0;
        }
    }
}