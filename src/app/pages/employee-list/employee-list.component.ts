import { Component, effect, inject, signal } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeCardComponent } from "../../components/employee-card/employee-card.component";
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeCardComponent],
  template: `
    <div class="p-4 grid grid-cols-4 gap-4">
      <!-- same as map we do in react -->
    @for (emp of employees(); track emp.id) {
    <div>
      <!-- dynamic route syntax using routerLink -->
         <app-employee-card [message]="emp" (deleted)="removeEmployee($event)" />
    </div>
    }
</div>
  `,
  styles: ``
})


export class EmployeeListComponent {

  // initially employees er structure ki hbe ota define korlam
  // employees ta ekta empty array hbe
  employees = signal<Array<Employee>>([]);

  // service ta k inject koralm from services folder jar moddhe api calls ache
  empService = inject(FunctionsService);

  // same as useeffect, empService.getAllEmployees() kore data ta nilm r next line a employees er bhetore set korlam
  // async ngOnInit() {
  //   // const data = await this.empService.getAllEmployees();
  //   const data = await this.empService.getAllEmployeesBySearching('');
  //   this.employees.set(data);
  // }

  removeEmployee(id:number) {
    const updated = this.employees().filter(emp=>emp.id!==id);
    this.employees.set(updated);
  }

  searchWord = ''

  constructor() {
    //acts as useeffect called everytime my searchText signal changes in service file
    effect(async() => {
      this.searchWord = this.empService.searchText();
      const data = await this.empService.getAllEmployeesBySearching(this.searchWord);
      console.log("updated data",data);
      this.employees.set(data);
    })
  }


}
