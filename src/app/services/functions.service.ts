import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  //searching text er jonne global signal
  searchText = signal('');

  //kichu type hle searchtext ta set korlm
  updateSearch(text : string) {
    this.searchText.set(text);
  }


  //api ta likhlm
  private baseUrl = `http://localhost:8080/api/v1/emp`;

  // GET ALL EMPLOYEE
  // amar api call er function likhlm, eta ekta promise return korche , of employee jeta ki array
  // The function returns a Promise that resolves to an array of Employee objects.
  async getAllEmployees(): Promise<Employee[]> {
    const res = await fetch(this.baseUrl);
    return res.json();
  }

  //passing data as param
  //like name=priyo
  //encodeURIComponent redefines text , spaces er care rakhe , different characters er kheyal rakhe
  async getAllEmployeesBySearching(searchText: string): Promise<Employee[]> {
    const url = `${this.baseUrl}/search?name=${encodeURIComponent(searchText)}`;
    const res = await fetch(url);
    return res.json();
  }



  //DELETE EMPLOYEE
  async deleteEmployee(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }


  //GET EMPLOYEE BY ID
  async getEmployeeById(id: number): Promise<Employee> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    return res.json();
  }


  async addEmployee(data: Employee): Promise<Employee> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }

  async updateEmployee(id: number, updatedData: Employee): Promise<Employee> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res.json();
  }



  // This is just an example of service used in line 8 and line 83 of HeaderComponent.ts
  // greet():void {
  //   console.log("hello im service");
  // }

  constructor() { }
}
