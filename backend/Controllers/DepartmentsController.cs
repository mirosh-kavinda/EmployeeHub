    using Microsoft.AspNetCore.Mvc;
    using EmpHub.Models;
    using EmpHub.Services.Interfaces;

    namespace EmpHub.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class DepartmentsController : ControllerBase
        {
            private readonly IDepartmentService _departmentService;

            public DepartmentsController(IDepartmentService departmentService)
            {
                _departmentService = departmentService ?? throw new ArgumentNullException(nameof(departmentService));
            }


            //--- Get All Department Records ---//
            // GET: api/departments
            
            [HttpGet]
            public async Task<IActionResult> GetAllDepartments()
            {
                try
                {
                    var departments = await _departmentService.GetAllDepartmentsAsync();
                    return Ok(departments);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while retrieving departments", error = ex.Message });
                }
            }


            //--- Get  Department By ID  ---//
            // GET: api/departments/{id}

            [HttpGet("{id}")]
            public async Task<IActionResult> GetDepartmentById(int id)
            {
                try
                {
                    var department = await _departmentService.GetDepartmentByIdAsync(id);
                    
                    if (department == null)
                        return NotFound(new { message = $"Department with ID {id} not found" });
                    
                    return Ok(department);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while retrieving the department", error = ex.Message });
                }
            }

        //--- Create  Department Records ---//
        // POST: api/departments
            [HttpPost]
            public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDto createDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    var department = await _departmentService.CreateDepartmentAsync(createDto);
                    return CreatedAtAction(nameof(GetDepartmentById), new { id = department.DepartmentId }, department);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while creating the department", error = ex.Message });
                }
            }

        //--- Update  Department Records ---//
        // PUT: api/departments/{id}
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateDepartment(int id, [FromBody] UpdateDepartmentDto updateDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (id != updateDto.DepartmentId)
                    return BadRequest(new { message = "ID in URL does not match ID in request body" });

                try
                {
                    var success = await _departmentService.UpdateDepartmentAsync(id, updateDto);
                    
                    if (!success)
                        return NotFound(new { message = $"Department with ID {id} not found" });
                    
                    return NoContent();
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while updating the department", error = ex.Message });
                }
            }

        //--- Delete  Department Records ---//
        // DELETE: api/departments/{id}
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteDepartment(int id)
            {
                try
                {
                    var success = await _departmentService.DeleteDepartmentAsync(id);
                    
                    if (!success)
                        return NotFound(new { message = $"Department with ID {id} not found" });
                    
                    return NoContent();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "An error occurred while deleting the department", error = ex.Message });
                }
            }
        }

        
    }