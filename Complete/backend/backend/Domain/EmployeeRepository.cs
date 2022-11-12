using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Domain
{
    /// <summary>
    /// Класс содержит набор методов, для работы с EntityFrameworkCore
    /// </summary>
    public class EmployeeRepository
    {
        private readonly AppDbContext context;

        public EmployeeRepository(AppDbContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Получить всех сотрудников из БД
        /// </summary>
        /// <returns>Список сотрудников</returns>
        public IQueryable<Employee> GetEmployees()
        {
            return context.Employees.OrderBy(x => x.EmployeeName);
        }

        /// <summary>
        /// Получить Сотрудника по ID
        /// </summary>
        /// <param name="id">ID Сотрудника, которого нужно получить</param>
        /// <returns>Сотрудника по ID</returns>
        public Employee GetEmployeeById(int id)
        {
            return context.Employees.Single(x => x.EmployeeID == id);
        }

        /// <summary>
        /// Сохранение Сотрудника в БД
        /// Обновление/Создание нового
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>ID Сохраненного сотрудника</returns>
        public int SaveEmployee(Employee entity)
        {
            if (entity.EmployeeID == default)
                context.Entry(entity).State = EntityState.Added;
            else
                context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
            return entity.EmployeeID;
        }

        /// <summary>
        /// Удаление Сотрудника из Базы Данных
        /// </summary>
        /// <param name="entity">Удаляемый сотрудник</param>
        public void DeleteEmployee(Employee entity)
        {
            context.Employees.Remove(entity);
            context.SaveChanges();
        }

    }
}
