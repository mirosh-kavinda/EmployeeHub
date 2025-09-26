using EmpHub.Models;
using EmpHub.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace EmpHub.Repositories
{
    public class DepartmentRepository(IConfiguration configuration) : IDepartmentRepository
    {
        private readonly string _conn =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));

        public async Task<List<Department>> GetAllAsync()
        {
            var departments = new Dictionary<int, Department>();

            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                @"SELECT d.DepartmentId, d.DepartmentCode, d.DepartmentName, d.CreatedAt, d.UpdatedAt,
                 e.EmployeeId, e.FirstName, e.LastName, e.Email
          FROM Departments d
          LEFT JOIN Employees e ON d.DepartmentId = e.DepartmentId
          ORDER BY d.DepartmentName, e.FirstName",
                connection
            );

            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                int deptId = reader.GetInt32(reader.GetOrdinal("DepartmentId"));

                if (!departments.ContainsKey(deptId))
                {
                    var department = new Department
                    {
                        DepartmentId = deptId,
                        DepartmentCode = reader.GetString(reader.GetOrdinal("DepartmentCode")),
                        DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName")),
                        CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                        UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt"))
                            ? null
                            : reader.GetDateTime(reader.GetOrdinal("UpdatedAt")),
                        Members = [],
                    };

                    departments.Add(deptId, department);
                }

                // Handle employees (nullable since LEFT JOIN)
                if (!reader.IsDBNull(reader.GetOrdinal("EmployeeId")))
                {
                    var member = new Member
                    {
                        FirstName = reader.IsDBNull(reader.GetOrdinal("FirstName"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.IsDBNull(reader.GetOrdinal("LastName"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("LastName")),
                        Email = reader.IsDBNull(reader.GetOrdinal("Email"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("Email")),
                    };

                    departments[deptId].Members!.Add(member);
                }
            }
            return [.. departments.Values];
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                "SELECT DepartmentId, DepartmentCode, DepartmentName, CreatedAt, UpdatedAt "
                    + "FROM Departments WHERE DepartmentId = @id",
                connection
            );

            command.Parameters.AddWithValue("@id", id);
            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Department
                {
                    DepartmentId = reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                    DepartmentCode = reader.GetString(reader.GetOrdinal("DepartmentCode")),
                    DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName")),
                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                    // UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt")) ? null
                    //     : reader.GetDateTime(reader.GetOrdinal("UpdatedAt"))
                };
            }

            return null;
        }

        public async Task<int> CreateAsync(Department department)
        {
            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                "INSERT INTO Departments (DepartmentCode, DepartmentName, CreatedAt) "
                    + "VALUES (@code, @name, GETUTCDATE()); SELECT SCOPE_IDENTITY();",
                connection
            );

            command.Parameters.AddWithValue("@code", department.DepartmentCode);
            command.Parameters.AddWithValue("@name", department.DepartmentName);

            await connection.OpenAsync();
            var result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }

        public async Task<bool> UpdateAsync(Department department)
        {
            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                "UPDATE Departments SET DepartmentCode = @code, DepartmentName = @name, "
                    + "UpdatedAt = GETUTCDATE() WHERE DepartmentId = @id",
                connection
            );

            command.Parameters.AddWithValue("@code", department.DepartmentCode);
            command.Parameters.AddWithValue("@name", department.DepartmentName);
            command.Parameters.AddWithValue("@id", department.DepartmentId);

            await connection.OpenAsync();
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = new SqlConnection(_conn);
            await connection.OpenAsync();
            using var transaction = connection.BeginTransaction();

            try
            {
                // 1. Delete all dependent records (Employees)
                var deleteEmployeesCommand = new SqlCommand(
                    "DELETE FROM Employees WHERE DepartmentId = @id",
                    connection,
                    transaction
                );
                deleteEmployeesCommand.Parameters.AddWithValue("@id", id);

                await deleteEmployeesCommand.ExecuteNonQueryAsync();

                // 2. Delete the main record (Department)
                var deleteDepartmentCommand = new SqlCommand(
                    "DELETE FROM Departments WHERE DepartmentId = @id",
                    connection,
                    transaction
                );
                deleteDepartmentCommand.Parameters.AddWithValue("@id", id);

                var rowsAffected = await deleteDepartmentCommand.ExecuteNonQueryAsync();

                transaction.Commit();
                return rowsAffected > 0;
            }
            catch (Exception)
            {
                transaction.Rollback();
                return false;
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                "SELECT COUNT(1) FROM Departments WHERE DepartmentId = @id",
                connection
            );
            command.Parameters.AddWithValue("@id", id);

            await connection.OpenAsync();
            var count = (int)(await command.ExecuteScalarAsync() ?? 0);
            return count > 0;
        }
    }
}
