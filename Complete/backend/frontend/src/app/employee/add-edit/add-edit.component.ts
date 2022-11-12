import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private service: SharedService) { 
  }

  //Получаем сотрудника, открывая модальное окно
  @Input() 
    Employee!:Employee;

  //Кнопка для добавления Сотрудника
  addEmployee(){
    this.service.addEmployee(this.Employee).subscribe(res=>{
      alert("Сохраненно")
    }
    )
  }
  //Кнопка для обновления Сотрудника
  updateEmployee(){
    this.service.editEmployee(this.Employee).subscribe(res=>{
      alert("Обновленно")
    }
      )
  }

  ngOnInit(): void {
  }

}
