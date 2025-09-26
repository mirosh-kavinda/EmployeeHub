using Microsoft.AspNetCore.Mvc;
using EmpHub.Models;
using EmpHub.Services.Interfaces;

namespace EmpHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController(IEmployeeService employeeService) : ControllerBase
    {
        private readonly IEmployeeService _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));

        //--- Get All Employee Records ---//
        // GET: api/employees
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = await _employeeService.GetEmployeesAsync();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while retrieving employees",
                    error = ex.Message
                });
            }
        }

        //--- Get Employee By ID ---//
        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            try
            {
                var employee = await _employeeService.GetEmployeeByIdAsync(id);

                if (employee == null)
                    return NotFound(new { message = $"Employee with ID {id} not found" });

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while retrieving the employee",
                    error = ex.Message
                });
            }
        }

        //--- Create Employee Record ---//
        // POST: api/employees
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var employee = await _employeeService.CreateEmployeeAsync(createDto);
                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while creating the employee",
                    error = ex.Message
                });
            }
        }

        //--- Update Employee Record ---//
        // PUT: api/employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] UpdateEmployeeDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

         
            try
            {
                var success = await _employeeService.UpdateEmployeeAsync(id, updateDto);

                if (!success)
                    return NotFound(new { message = $"Employee with ID {id} not found" });

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while updating the employee",
                    error = ex.Message
                });
            }
        }

        //--- Delete Employee Record ---//
        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var success = await _employeeService.DeleteEmployeeAsync(id);

                if (!success)
                    return NotFound(new { message = $"Employee with ID {id} not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while deleting the employee",
                    error = ex.Message
                });
            }
        }
    }
}
