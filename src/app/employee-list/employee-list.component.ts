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

  //loop through directReports until we find id of employee we want to delete
  deleteReport(employee, sub):void{
      for(var i=0; i<sub.length; i++){
        if(sub[i].id == employee.id){
          sub.splice(i, 1);
        }
      }
  }

  //loop through directReports until we find id of employee we want to edit
  editReport(employee, sub, compensation){
    for(var i=0; i<sub.length; i++){
      if(sub[i].id == employee.id){
        sub[i].compensation = compensation;
      }
    }
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
