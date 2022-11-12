import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EmployeeComponent } from './employee/employee.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
{path:'employee',component:EmployeeComponent},
{path:'about',component:AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
