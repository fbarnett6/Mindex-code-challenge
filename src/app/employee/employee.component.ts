import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {Employee} from '../employee';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import {EmployeeService} from '../employee.service';
import { ModalService } from '../modal';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  @Input() employee: Employee;
  employees: Employee[];
  directReports = 0;
  directReportsArr = [];
  directReportsArrName = []
  firstName = '';
  lastName = '';
  private sub:any[];
  emp;

	// GetEmployee(): void{
  //   this.employeeservice.getAll().subscribe(employees => employees = employees);
  // };

  constructor(private employeeservice : EmployeeService, private modalService: ModalService, private employeeList: EmployeeListComponent){}


  //setup field to get number of employees
  //get employee.directReports length
  //also we need to store these employees somewhere to display later
  ngOnInit(){
    this.sub = [];
    //this.GetEmployee();
    // this.employees.push(this.employee);
    if(this.employee.directReports === undefined){
      this.directReports = 0; 
    } else {
      this.directReports = this.employee.directReports.length;
      this.directReportsArr = this.employee.directReports;
      //this.directReportsArrName = [this.employee.firstName, this.employee.lastName];
      //now that we have directReports containing id # of each employee
      //we can utilize that to get the names and positions of these employees by id
      // this.employeeservice.getAll().subscribe(employees => { this.employee = employees;
      //   for(let emp of this.employees){
      //     if(emp.id == this.employee.id){
      //       this.directReportsArrName.push(this.employee.firstName);
      //     }
      //   }
      // });
      
      for(var i=0; i<this.directReports; i++){
        // this.employeeservice.get(this.directReportsArr[i]).subscribe(data => console.log(JSON.stringify(data)));
        // console.log(JSON.stringify(this.sub));
        this.employeeservice.get(this.directReportsArr[i]).subscribe((data) => {
          this.sub.push(data);
          console.log(this.sub);
          // this.subs = data;
          // console.log(this.subs);
        });
      }
    }
  }
  

  deleteReport(employee):void{
    this.employeeList.deleteReport(employee, this.sub);
  }

  editReport(){
    console.log('edit');
  }

  openModal(id: string, emp) {
    // this.emp = {id: emp.id, firstName: emp.firstName, lastName: emp.lastName, position: emp.positon};
    this.modalService.open(id, emp);
    console.log(emp);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
