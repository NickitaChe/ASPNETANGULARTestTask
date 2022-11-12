using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Domain
{
    /// <summary>
    /// Класс для создания Базы данных и её обработки
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Employee>().HasData(new Employee
            {
                EmployeeID = 1,
                EmployeeName = "123",
                Department = "IT",
                DateOfJoining = "2020-06-06",
                Salary = 50000
            });

        }
    }
}
