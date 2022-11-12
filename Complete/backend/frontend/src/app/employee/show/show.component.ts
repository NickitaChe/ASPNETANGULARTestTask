import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export  class ShowComponent implements OnInit {

  constructor(private service:SharedService) { }

  //Список Сотрудников и Список отфильтрованных сотрудников
  EmployeeList:any=[];
  EmployeeListWithoutFilter!:Employee[];

  //При открытии страницы
  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  //Название Содального окна
  ModalTitle?: string;
  //Статус Модального окна
  ActivateAddEditEmployee:boolean= false;
  Employee:any;


  //Фильтры
  DepartmentFilter: string ='';
  EmployeeNameFilter: string ='';
  SalaryFilter: number = 0;
  DateOfJoiningFilter!: Date;
  DateOfBirthFilter!: Date;


  //Кнопка добавления нового сотрудника
  addClick(){
    this.Employee={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"1900-01-01",
      DateOfBirth:"1900-01-01",
      Salary:0
    }
    this.ModalTitle="Добавить сотрудника"
    this.ActivateAddEditEmployee=true;
    this.refreshEmployeeList();
  }

  //Закрытие модального окна
  closeClick(){
    this.ActivateAddEditEmployee=false;
    this.refreshEmployeeList();
  }

  //Кнопка изменить сотрудника
  editClick(item:any){
    this.Employee=item;
    this.ModalTitle="Добавить сотрудника"
    this.ActivateAddEditEmployee=true;
    this.refreshEmployeeList();
  }

  //Кнопка удаления сотрудника
  deleteClick(item:any){
    if(confirm("Действие безвозвратно удалит сотрудника "+ item.EmployeeName)){
      this.ModalTitle="Сотрудник удален"
      this.service.deleteEmployee(item.EmployeeID).subscribe();
    }else{
      this.ModalTitle="Действие отмененно"
    }
    this.refreshEmployeeList();
  }

  //Получение данных с сервера
  refreshEmployeeList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    });
  }

  //Обработка фильтров
  FilterFn(){
    var DepartmentFilter = this.DepartmentFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var DateOfJoiningFilter = this.DateOfJoiningFilter;
    var SalaryFilter = this.SalaryFilter;
    var DateOfBirthFilter = this.DateOfBirthFilter;

    
    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
      return el.EmployeeName?.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase())
        &&
        el.Department?.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase())
        &&
        el.Salary >= SalaryFilter
        &&
        (DateOfBirthFilter == null? true: el.DateOfBirth>=DateOfBirthFilter)
        &&
        (DateOfJoiningFilter == null? true: el.DateOfJoining>=DateOfJoiningFilter)
    });
    
  }

  //Обработка сортировки
  sortResult(prop: string, asc: boolean) {
    this.EmployeeList = this.EmployeeList?.sort(function (a:any, b:any) {
      switch (prop) {
          case 'EmployeeName': {
            if (asc) {
              return (a.EmployeeName > b.EmployeeName) ? 1 : ((a.EmployeeName < b.EmployeeName) ? -1 : 0);
            }
            return (b.EmployeeName > a.EmployeeName) ? 1 : ((b.EmployeeName < a.EmployeeName) ? -1 : 0);
          }
          case 'Department': {
            if (asc) {
              return (a.Department > b.Department) ? 1 : ((a.Department < b.Department) ? -1 : 0);
            }
            return (b.Department > a.Department) ? 1 : ((b.Department < a.Department) ? -1 : 0);
          }
        case 'DateOfJoining': {
            if (asc) {
              return (a.DateOfJoining > b.DateOfJoining) ? 1 : ((a.DateOfJoining < b.DateOfJoining) ? -1 : 0);
            }
              return (b.DateOfJoining > a.DateOfJoining) ? 1 : ((b.DateOfJoining < a.DateOfJoining) ? -1 : 0);
          }
        case 'Salary': {
            if (asc) {
              return (a.Salary > b.Salary) ? 1 : ((a.Salary < b.Salary) ? -1 : 0);
            }
              return (b.Salary > a.Salary) ? 1 : ((b.Salary < a.Salary) ? -1 : 0);
        }
        case 'DateOfBirth': {
          if (asc) {
            return (a.DateOfBirth > b.DateOfBirth) ? 1 : ((a.DateOfBirth < b.DateOfBirth) ? -1 : 0);
          }
            return (b.DateOfBirth > a.DateOfBirth) ? 1 : ((b.DateOfBirth < a.DateOfBirth) ? -1 : 0);
        }
        default:
          return 0;
      }
    });
  }

}
