using System.ComponentModel.DataAnnotations;

namespace BackendWebApi.Domain
{
    /// <summary>
    /// Класс Сотрудник
    /// </summary>
    public class Employee
    {
        [Required]
        public int EmployeeID { get; set; }

        [Required]
        [Display(Name ="Ф.И.О")]
        public string EmployeeName { get; set; }
        
        [Display(Name = "Отдел")]
        public string Department { get; set; }

        [Display(Name = "Дата устройства на работу")]
        public string DateOfJoining { get; set; }

        [Display(Name = "Зарплата")]
        public int Salary { get; set; }
    }
}
