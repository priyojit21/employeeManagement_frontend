import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FunctionsService } from '../../services/functions.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  imports: [RouterLink],
  template: `
  <div class="h-screen w-full flex items-center justify-center ">
  <!-- product card -->
  <article class="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 cursor-pointer">
    <div [routerLink]="['/viewEmployee', message().id]">
      <img class="object-cover h-64 w-full" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxzbmVha2Vyc3xlbnwwfDB8fHwxNzEyMjIzNDAyfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Converse sneakers" />
    </div>

    <div class="flex flex-col gap-1 mt-4 px-4" [routerLink]="['/viewEmployee', message().id]">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-50">{{message().name}}</h2>
      <span class="font-normal text-gray-600 dark:text-gray-300">{{message().jobTitle}}</span>
      <span class="font-semibold text-gray-800 dark:text-gray-50">{{message().email}}</span>
      <span class="font-semibold text-gray-800 dark:text-gray-50">Phone : {{message().phone}}</span>
    </div>

    <div class="flex gap-4 mt-4 px-4">
      <span class="text-gray-600">{{message().employeeCode}}</span>
    </div>

    <div class="mt-4 p-4 border-t border-gray-200 dark:border-gray-500 flex flex-end gap-4 items-end">
      <button routerLink="/editEmployee/{{message().id}}" class="cursor-pointer">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
      </button>

      <button class="cursor-pointer" (click)="handleDelete(message().id)">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
    </div>
  </article>
</div>


`,
  styles: ``
})
export class EmployeeCardComponent {
  message = input.required<Employee>();

  //child(employee card) theke parent(employee list) k pathacchi id ta
  @Output() deleted = new EventEmitter<number>();

  empService = inject(FunctionsService);

  async handleDelete(id: number) {
    await this.empService.deleteEmployee(id);
    this.deleted.emit(id);
  }

}
