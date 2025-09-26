using Microsoft.Data.SqlClient;
using EmpHub.Models;

public class EmployeeRepository
{
    private readonly string _conn;
    public EmployeeRepository(IConfiguration config)
    {
        _conn = config.GetConnectionString("DefaultConnection");
    }

    private int CalculateAge(DateTime dob)
    {
        var today = DateTime.UtcNow.Date;
        var age = today.Year - dob.Year;
        if (dob.Date > today.AddYears(-age)) age--;
        return age;
    }

    //--- Get All Employee Records ---//
    // GET: api/employees
    public List<Employee> GetAll()
    {
        var list = new List<Employee>();
        using var conn = new SqlConnection(_conn);
        var sql = @"SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, e.DepartmentId, d.DepartmentName
                    FROM Employees e
                    INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId
                    ORDER BY e.LastName, e.FirstName";
        using var cmd = new SqlCommand(sql, conn);
        conn.Open();
        using var r = cmd.ExecuteReader();

        while (r.Read())
        {
            var dob = (DateTime)r["DateOfBirth"];
            list.Add(new Employee
            {
                EmployeeId = (int)r["EmployeeId"],
                FirstName = r["FirstName"].ToString()!,
                LastName = r["LastName"].ToString()!,
                Email = r["Email"].ToString()!,
                DateOfBirth = dob,
                Age = CalculateAge(dob),
                Salary = (decimal)r["Salary"],
                DepartmentId = (int)r["DepartmentId"],
                DepartmentName = r["DepartmentName"].ToString()!
            });
        }
        return list;
    }

    //--- Get Employee By ID  ---//
    // GET: api/employees/{id}
    public Employee? GetById(int id)
    {
        using var conn = new SqlConnection(_conn);
        var sql = @"SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, e.DepartmentId, d.DepartmentName
                    FROM Employees e
                    INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId
                    WHERE e.EmployeeId = @id";
        using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@id", id);
        conn.Open();
        using var r = cmd.ExecuteReader();

        if (r.Read())
        {
            var dob = (DateTime)r["DateOfBirth"];
            return new Employee
            {
                EmployeeId = (int)r["EmployeeId"],
                FirstName = r["FirstName"].ToString()!,
                LastName = r["LastName"].ToString()!,
                Email = r["Email"].ToString()!,
                DateOfBirth = dob,
                Age = CalculateAge(dob),
                Salary = (decimal)r["Salary"],
                DepartmentId = (int)r["DepartmentId"],
                DepartmentName = r["DepartmentName"].ToString()!
            };
        }
        return null;
    }

    //--- Create Employee Records ---//
    // POST: api/employees
    public void Create(Employee e)
    {
        using var conn = new SqlConnection(_conn);
        var sql = @"INSERT INTO Employees (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
                    VALUES (@FirstName, @LastName, @Email, @DateOfBirth, @Salary, @DepartmentId)";
        using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@FirstName", e.FirstName);
        cmd.Parameters.AddWithValue("@LastName", e.LastName);
        cmd.Parameters.AddWithValue("@Email", e.Email);
        cmd.Parameters.AddWithValue("@DateOfBirth", e.DateOfBirth);
        cmd.Parameters.AddWithValue("@Salary", e.Salary);
        cmd.Parameters.AddWithValue("@DepartmentId", e.DepartmentId);
        conn.Open();
        cmd.ExecuteNonQuery();
    }

    //--- Update Employee Records ---//
    // PUT: api/employees/{id}
    public void Update(Employee e)
    {
        using var conn = new SqlConnection(_conn);
        var sql = @"UPDATE Employees
                    SET FirstName = @FirstName,
                        LastName = @LastName,
                        Email = @Email,
                        DateOfBirth = @DateOfBirth,
                        Salary = @Salary,
                        DepartmentId = @DepartmentId
                    WHERE EmployeeId = @EmployeeId";
        using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@FirstName", e.FirstName);
        cmd.Parameters.AddWithValue("@LastName", e.LastName);
        cmd.Parameters.AddWithValue("@Email", e.Email);
        cmd.Parameters.AddWithValue("@DateOfBirth", e.DateOfBirth);
        cmd.Parameters.AddWithValue("@Salary", e.Salary);
        cmd.Parameters.AddWithValue("@DepartmentId", e.DepartmentId);
        cmd.Parameters.AddWithValue("@EmployeeId", e.EmployeeId);
        conn.Open();
        cmd.ExecuteNonQuery();
    }

    //--- Delete Employee Records ---//
    // DELETE: api/employees/{id}
    public void Delete(int id)
    {
        using var conn = new SqlConnection(_conn);
        var sql = "DELETE FROM Employees WHERE EmployeeId = @id";
        using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@id", id);
        conn.Open();
        cmd.ExecuteNonQuery();
    }
}
