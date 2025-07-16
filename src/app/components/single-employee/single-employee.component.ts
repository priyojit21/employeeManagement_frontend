import { Component, inject, signal } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-employee',
  imports: [CommonModule],
  template: `
      <div *ngIf="emp() as e" class="h-screen w-full flex items-center justify-center ">
  <!-- product card -->
  <article  class="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 cursor-pointer">
    <div>
      <img class="object-cover h-64 w-full" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxzbmVha2Vyc3xlbnwwfDB8fHwxNzEyMjIzNDAyfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Converse sneakers" />
    </div>

    <div class="flex flex-col gap-1 mt-4 px-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-50">{{e.name}}</h2>
      <span class="font-normal text-gray-600 dark:text-gray-300">{{e.jobTitle}}</span>
      <span class="font-semibold text-gray-800 dark:text-gray-50">{{e.email}}</span>
      <span class="font-semibold text-gray-800 dark:text-gray-50">Phone : {{e.phone}}</span>
    </div>

    <div class="flex gap-4 mt-4 px-4">
      <span class="text-gray-600">{{e.employeeCode}}</span>
    </div>
  </article>
</div>
  `,
  styles: ``
})
export class SingleEmployeeComponent {

  // same work as useParams in react
  route = inject(ActivatedRoute)
  empService = inject(FunctionsService);
  //initial Value of employee is null so use *ngIf
  emp = signal<Employee|null>(null);

  async ngOnInit() {
    //http://localhost:3000/6 
    //6 ta newar jonne ei syntax
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // id ta as a number pathacchi tai +id(initialy id was string )
      const data = await this.empService.getEmployeeById(+id);
      this.emp.set(data);
    }
  }

}
