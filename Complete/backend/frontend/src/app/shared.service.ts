import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://localhost:5000"

  constructor(private http:HttpClient) { }

  //ЗАПРСОС: получить сотрудников
  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/api/employees');
  }

  //ЗАПРСОС: Добавить сотрудника
  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/api/employees',val);
  }

  //ЗАПРСОС: Изменить сотрудника
  editEmployee(val:any){
    return this.http.put(this.APIUrl+'/api/employees',val);
  }

  //ЗАПРСОС: Удалить сотрудника
  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/api/employees?id='+val);
  }
}
