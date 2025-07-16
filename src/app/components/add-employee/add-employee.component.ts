import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//REACTIVE FORM GROUP WITH VALIDATION

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form action="" [formGroup]="profileForm" (ngSubmit)="showValue()">
      <label>Name: </label>
        <input class="p-3 border-2 b-black" type="text" placeholder="enter your name" formControlName="name"/>
        <!-- showing error messages based on form validation -->
        <span *ngIf="name?.hasError('required')">Name is Required</span>
        <span class="text-red-600" *ngIf="name?.invalid && (name?.dirty || name?.touched)">Please fill name</span>
        <br>
        <br>
         <label>Password: </label>
        <input class="p-3 border-2 b-black" type="password" placeholder="enter your password" formControlName="password"/>
                <span *ngIf="password?.hasError('required')">Password is Required</span>
        <span class="text-red-600" *ngIf="password?.invalid && (password?.dirty || password?.touched)">Please fill password</span>
        <br>
        <br>
         <label>Email: </label>
        <input class="p-3 border-2 b-black" type="text" placeholder="enter your email" formControlName="email"/>
                <span *ngIf="email?.hasError('required')">Email is Required</span>
        <span class="text-red-600" *ngIf="email?.invalid && (email?.dirty || email?.touched)">Please give correct mail</span>
        <br>
        <button class="p-3 bg-blue-500 text-white rounded-sm cursor-pointer ms-3">Login</button>
    </form>
  `,
  styles: ``
})
export class AddEmployeeComponent {

  profileForm = new FormGroup({
    //adding validations on form
    name: new FormControl('', [Validators.required]),
    //required field + min length should be 5
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    //mail validation based on regex
    email : new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  })


  get name() {
    return this.profileForm.get('name');
  }

  get password() {
    return this.profileForm.get('password');
  }

   get email(){
    return this.profileForm.get('email');
  }


  showValue() {
    console.log(this.profileForm.value);

  }

}



//NORMAL REACTIVE FORMS

// import { Component } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';

// //form

// @Component({
//   selector: 'app-add-employee',
//   imports: [ReactiveFormsModule],
//   template: `
//     <form action="">
//       <label>Name: </label>
//         <input class="p-3 border-2 b-black" type="text" placeholder="enter your name" [formControl]="name"/>
//         <br>
//         <br>
//          <label>Password: </label>
//         <input class="p-3 border-2 b-black" type="password" placeholder="enter your password" [formControl]="password"/>
//         <br>
//         <button type="button" class="p-3 bg-blue-500 text-white rounded-sm cursor-pointer ms-3" (click)="showValue()">Login</button>
//     </form>
//   `,
//   styles: ``
// })
// export class AddEmployeeComponent {
//   //setting default value
//   // name = new FormControl('anil');
//   name = new FormControl();
//   password = new FormControl();

//   showValue() {
//     console.log(this.name.value);
//     console.log(this.password.value);
//   }

// }
