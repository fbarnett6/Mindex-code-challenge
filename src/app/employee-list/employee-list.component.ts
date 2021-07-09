import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  deleteReport(employee, sub):void{
    // if(confirm("Delete "+employee.firstName+" "+employee.lastName+"?")){
      for(var i=0; i<sub.length; i++){
        if(sub[i].id == employee.id){
          sub.splice(i, 1);
        }
      }
  }

  editReport(employee, sub, compensation){
    console.log(compensation);
    for(var i=0; i<sub.length; i++){
      if(sub[i].id == employee.id){
        console.log(sub[i].compensation);
        sub[i].compensation = compensation;
        console.log(sub[i].compensation);
      }
    }
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
