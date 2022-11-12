export class Employee {
    //Класс сотрудник
    constructor(
      public EmployeeID: number = 0,
      public EmployeeName: string = "",
      public Department: string = "",
      public DateOfJoining: Date = new Date(),
      public Salary: number = 0
    ) { }
  }