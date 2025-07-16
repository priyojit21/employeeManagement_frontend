import { Component, inject, input, signal } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  imports: [CommonModule,ReactiveFormsModule],
  template: `
  <div class="max-w-xl py-6 px-8 h-full mt-20 bg-pink-200 rounded shadow-xl flex flex-col justify-center mx-auto">
          <form [formGroup]="profileForm" (ngSubmit)="showValue()">
        <div class="mb-6">
          <label for="name" class="block text-gray-800 font-bold">Name:</label>
          <input type="text" id="name" formControlName="name" placeholder="username"
            class="w-full border-2 border-red-400 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600" />
        </div>

        <div class="mb-6">
          <label for="email" class="block text-gray-800 font-bold">Email:</label>
          <input type="text" id="email" formControlName="email" placeholder="@email"
            class="w-full border-2 border-red-400 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600" />
        </div>

        <div class="mb-6">
          <label for="jobTitle" class="block text-gray-800 font-bold">Job Title:</label>
          <input type="text" id="jobTitle" formControlName="jobTitle" placeholder="@jobTitle"
            class="w-full border-2 border-red-400 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600" />
        </div>

        <div class="mb-6">
          <label for="phone" class="block text-gray-800 font-bold">Phone:</label>
          <input type="text" id="phone" formControlName="phone" placeholder="@phone"
            class="w-full border-2 border-red-400 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600" />
        </div>

        <div class="mb-6">
          <label for="imageUrl" class="block text-gray-800 font-bold">Image URL:</label>
          <input type="text" id="imageUrl" formControlName="imageUrl" placeholder="@imageUrl"
            class="w-full border-2 border-red-400 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600" />
        </div>

        <button type="submit"
          class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
          Submit
        </button>
      </form>
  </div>
  `,
  styles: ``
})
export class EditEmployeeComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  emp = signal<Employee | null>(null);
  empService = inject(FunctionsService);
  id !: Number

  profileForm = new FormGroup({
  name: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  jobTitle: new FormControl('', { nonNullable: true }),
  phone: new FormControl('', { nonNullable: true }),
  imageUrl: new FormControl('', { nonNullable: true }),
});



  get name() {
    return this.profileForm.get('name');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get jobTitle() {
    return this.profileForm.get('jobTitle');
  }
  get phone() {
    return this.profileForm.get('phone');
  }
  get imageUrl() {
    return this.profileForm.get('imageUrl');
  }

  async ngOnInit() {
    const idfromURL = this.route.snapshot.paramMap.get('id');
    if (idfromURL) {
      //id is number so conver idfromURL string to number
      this.id = +idfromURL;
      const data = await this.empService.getEmployeeById(+this.id);
      console.log(data);
      // this.emp.set(data);


      //form values prefill korar jonne
      this.profileForm.patchValue({
        name: data.name,
        email: data.email,
        jobTitle: data.jobTitle,
        phone: data.phone,
        imageUrl: data.imageUrl
      });
    }
  }

  async showValue() {
    console.log(this.profileForm.value);
    try {
      const result = await this.empService.updateEmployee(+this.id,this.profileForm.value as Employee);
      this.router.navigate(["/"]); 
    } catch (error) {
      console.log(error);
    }
    
  }

}
