using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using BackendWebApi.Domain;

namespace BackendWebApi.Controllers
{
    /// <summary>
    /// Контроллер, для обработки входящих на сервер запросов
    /// </summary>
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

        /// <summary>
        /// Получение полного списка сотрудников
        /// GET api/employees
        /// </summary>
        /// <returns>Всех сотрудников в списке</returns>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            Console.WriteLine("Get all employees init");
            return employeeRepository.GetEmployees().ToList();
        }

        /// <summary>
        /// Добавление/Измененние Сотрудника
        /// POST api/employees
        /// </summary>
        /// <param name="employee">Сотрудник, которого нужно добавить/изменить</param>
        /// <returns>Статус запроса</returns>
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

        /// <summary>
        /// Добавление/Измененние Сотрудника
        /// PUT api/employees
        /// </summary>
        /// <param name="employee">Сотрудник, которого нужно добавить/изменить</param>
        /// <returns>Статус запроса</returns>
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

        /// <summary>
        /// Удаление Сотрудника
        /// DELETE api/employees
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Статус запроса</returns>
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
