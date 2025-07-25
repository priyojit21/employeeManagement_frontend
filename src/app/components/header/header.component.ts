import { Component, effect, inject, input, signal } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


    // ngmodel has its own variant of ngmodelchange whwnver any change takes place in input function called
    // [ngModel]="searchText"
    // (ngModelChange)="onSearchChange($event)"

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule],
  template: `
  <!-- <button (click)="functionService.greet()">Hello</button> -->
    <div class="px-4 py-3 bg-gray-200 text-black flex justify-between items-center">
     <div class="flex gap-6 justify-center items-center">
      <span routerLink="/" class="font-bold text-2xl cursor-pointer">{{title()}}</span>  
      <button routerLink="/addEmployee" class="text-md text-gray-800 font-bold cursor-pointer" (click)="handleClick()">Add Employee</button>
      <!-- <span  class="text-md text-gray-800 font-bold cursor-pointer">Form</span> -->
     </div>
    <div class="relative">
  <input
    class="bg-white border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
    id="username"
    type="text"
    placeholder="Search..."
    [ngModel]="searchText"
    (ngModelChange)="onSearchChange($event)"
    
  />
  <div class="absolute right-0 inset-y-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>

  <div class="absolute left-0 inset-y-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>
    
</div>
  `,
  styles: ``
})
export class HeaderComponent {
  title = signal("Employee Management")
  empService = inject(FunctionsService);

  searchText = ''


  handleClick() {
    console.log("I am clicked"); 
  }

  onSearchChange(value : string){
    this.searchText = value.trim();
    this.empService.updateSearch(this.searchText);
  }


}
