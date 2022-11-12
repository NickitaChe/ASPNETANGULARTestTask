using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendWebApi.Domain;

namespace BackendWebApi.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly EmployeeRepository employeeRepository;

        public EmployeeController(ILogger<EmployeeController> logger, EmployeeRepository employeeRepository)
        {
            _logger = logger;
            this.employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            Console.WriteLine("Get all employees init");
            return employeeRepository.GetEmployees().ToList();
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            try { 
            Console.WriteLine("Post employees init");
            if (ModelState.IsValid)
            {
                employeeRepository.SaveEmployee(employee);
                return Ok();
            }
            return BadRequest(ModelState);
        }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }

}
        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            Console.WriteLine("Put init");

            if (ModelState.IsValid)
            {
                employeeRepository.SaveEmployee(employee);
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                Console.WriteLine("Delete at" + id.ToString());
                Employee product = employeeRepository.GetEmployeeById(id);
                if (product != null)
                {
                    employeeRepository.DeleteEmployee(product);
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

    }
}
