import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {Employee} from '../employee';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import {EmployeeService} from '../employee.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  @Input() employee: Employee;
  directReports = 0;
  directReportsArr = [];
  directReportsArrName = []
  private sub:any[];
  emp;

  constructor(private employeeservice : EmployeeService, private employeeList: EmployeeListComponent, private modalService: NgbModal){}

  //get direct reports and number of direct reports
  ngOnInit(){
    this.sub = [];
    //this.GetEmployee();
    // this.employees.push(this.employee);
    if(this.employee.directReports === undefined){
      this.directReports = 0; 
    } else {
      this.directReports = this.employee.directReports.length;
      this.directReportsArr = this.employee.directReports;
      
      //setup array of employees
      for(var i=0; i<this.directReports; i++){
        this.employeeservice.get(this.directReportsArr[i]).subscribe((data) => {
          this.sub.push(data);
        });
      }
    }
  }
  
  //open modal
  open(content, employee){
    this.emp = employee;
    this.modalService.open(content, employee);
  }

  //close modal
  close(){
    this.modalService.dismissAll();
  }

  //delete report and close modal
  deleteReport(employee):void{
    this.employeeList.deleteReport(employee, this.sub);
    this.close();
  }

  //edit report compensation and close modal
  editReport(employee, compensation){
    this.employeeList.editReport(employee, this.sub, compensation);
    this.close();
  }
}
