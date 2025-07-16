import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

export const routes: Routes = [
    {
    //home page
    path: '',
    pathMatch: 'full',
    component: EmployeeListComponent
},{
    //dynammic route
    path : 'viewEmployee/:id',
    component: SingleEmployeeComponent
},{
    path: 'addEmployee',
    component : NewEmployeeComponent
},{
    path : 'editEmployee/:id',
    component: EditEmployeeComponent
}
// },{
//     path: 'addEmployee',
//     component : AddEmployeeComponent
// }
];
