using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BackendWebApi.Domain
{
    public class EmployeeRepository
    {
        private readonly AppDbContext context;
        public EmployeeRepository(AppDbContext context)
        {
            this.context = context;
        }
        public IQueryable<Employee> GetEmployees()
        {
            return context.Employees.OrderBy(x => x.EmployeeName);
        }
        public Employee GetEmployeeById(int id)
        {
            return context.Employees.Single(x => x.EmployeeID == id);
        }
        public int SaveEmployee(Employee entity)
        {
            if (entity.EmployeeID == default)
                context.Entry(entity).State = EntityState.Added;
            else
                context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
            return entity.EmployeeID;
        }

        public void DeleteEmployee(Employee entity)
        {
            context.Employees.Remove(entity);
            context.SaveChanges();
        }

    }
}
