using EmpHub.Models;
using EmpHub.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace EmpHub.Repositories
{
    public class EmployeeRepository(IConfiguration config) : IEmployeeRepository
    {
        private readonly string _conn =
            config.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(config));

        private static int CalculateAge(DateTime dob)
        {
            var today = DateTime.UtcNow.Date;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age))
                age--;
            return age;
        }

        //--- Get All Employee Records ---//
        // GET: api/employees
        public async Task<List<Employee>> GetAllAsync()
        {
            var list = new List<Employee>();
            using var connection = new SqlConnection(_conn);
            var command = new SqlCommand(
                "SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, e.DepartmentId, d.DepartmentName "
                    + "FROM Employees e "
                    + "INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId",
                connection
            );
            // The command needs the connection object passed to its constructor

            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var dob = (DateTime)reader["DateOfBirth"];
                list.Add(
                    new Employee
                    {
                        EmployeeId = reader.GetInt32(reader.GetOrdinal("EmployeeId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                        DateOfBirth = dob,
                        Age = CalculateAge(dob),
                        Salary = reader.GetDecimal(reader.GetOrdinal("Salary")),
                        DepartmentId = (int)reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                        DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName")),
                    }
                );
            }
            return list;
        }

        //--- Get Employee By ID ---//
        // GET: api/employees/{id}
        public async Task<List<Employee>> GetByIdAsync(int id)
        {
            var list = new List<Employee>();
            using var conn = new SqlConnection(_conn);
            var sql =
                @"SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, e.DepartmentId
                        FROM Employees e
                        INNER JOIN Departments d  ON e.DepartmentId = d.DepartmentId
                        WHERE d.DepartmentId= @id";
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await conn.OpenAsync(); // Use async open

            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var dob = (DateTime)reader["DateOfBirth"];
                list.Add(
                    new Employee
                    {
                        EmployeeId = reader.GetInt32(reader.GetOrdinal("EmployeeId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                        DateOfBirth = dob,
                        Salary = reader.GetDecimal(reader.GetOrdinal("Salary")),
                        DepartmentId = (int)reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                    }
                );
            }
            return list;
        }

        // --- Create Employee Records ---//
        // POST: api/employees
        public async Task<int> CreateAsync(Employee e)
        {
            using var conn = new SqlConnection(_conn);
            var sql =
                @"INSERT INTO Employees (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
                        VALUES (@FirstName, @LastName, @Email, @DateOfBirth, @Salary, @DepartmentId) ";
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@FirstName", e.FirstName);
            cmd.Parameters.AddWithValue("@LastName", e.LastName);
            cmd.Parameters.AddWithValue("@Email", e.Email);
            cmd.Parameters.AddWithValue("@DateOfBirth", e.DateOfBirth);
            cmd.Parameters.AddWithValue("@Salary", e.Salary);
            cmd.Parameters.AddWithValue("@DepartmentId", e.DepartmentId);
            await conn.OpenAsync(); // Use async open
            var result = await cmd.ExecuteScalarAsync(); // Use async execute
            return Convert.ToInt32(result);
        }

        //--- Update Employee Records ---//
        // PUT: api/employees/{id}
        public async Task<bool> UpdateAsync(UpdateEmployeeDto e)
        {
            using var conn = new SqlConnection(_conn);
            var command = new SqlCommand(
                @"
        UPDATE Employees
        SET FirstName   = @fname,
            LastName    = @lname,
            Email       = @Email,
            DateOfBirth = @DateOfBirth,
            Salary      = @Salary,
            DepartmentId = @DepartmentId
        WHERE EmployeeId = @EmployeeId;",
                conn
            );

            command.Parameters.AddWithValue("@fname", e.FirstName ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@lname", e.LastName ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Email", e.Email ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@DateOfBirth", e.DateOfBirth ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Salary", e.Salary ?? (object)DBNull.Value);
            command.Parameters.AddWithValue(
                "@DepartmentId",
                e.DepartmentId ?? (object)DBNull.Value
            );
            command.Parameters.AddWithValue("@EmployeeId", e.EmployeeId);

            await conn.OpenAsync();
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        //--- Delete Employee Records ---//
        // DELETE: api/employees/{id}
        public async Task<bool> DeleteAsync(int id)
        {
            using var conn = new SqlConnection(_conn);
            var sql = "DELETE FROM Employees WHERE EmployeeId = @id";
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await conn.OpenAsync();
            var rowsAffected = await cmd.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        //-- To get the existence
        public async Task<bool> ExistsAsync(int id)
        {
            using var conn = new SqlConnection(_conn);
            var sql = "SELECT COUNT(1) FROM Employees WHERE EmployeeId = @id";
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await conn.OpenAsync();
            var count = (int)(await cmd.ExecuteScalarAsync() ?? 0);
            return count > 0;
        }
    }
}
