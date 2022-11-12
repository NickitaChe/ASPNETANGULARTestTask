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
  DepartmentFilter: string = "";
  EmployeeNameFilter: string = "";
  SalaryFilter!: number;
  DateOfJoiningFilter!: Date;


  //Кнопка добавления нового сотрудника
  addClick(){
    this.Employee={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"1900-01-01",
      Salary:0
    }
    this.ModalTitle="Добавить сотрудника"
    this.ActivateAddEditEmployee=true;
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
  }

  //Кнопка удаления сотрудника
  deleteClick(item:any){
    if(confirm("Действие безвозвратно удалит сотрудника "+ item.EmployeeName)){
      this.ModalTitle="Сотрудник удален"
      this.service.deleteEmployee(item.EmployeeID).subscribe();
      this.refreshEmployeeList();
    }else{
      this.ModalTitle="Действие отмененно"
    }
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

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
      return el.Department?.toString().toLowerCase().includes(
        DepartmentFilter.toString().trim().toLowerCase()
      )
        &&
        el.EmployeeName?.toString().toLowerCase().includes(
          EmployeeNameFilter.toString().trim().toLowerCase()
        )
        &&
        el.Salary >= SalaryFilter
        &&
        DateOfJoiningFilter == null? true:el.DateOfJoining >= DateOfJoiningFilter
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
        default:
          return 0;
      }
    });
  }

}
