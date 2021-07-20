import {async, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';
import { Employee } from '../employee';
import { componentFactoryName } from '@angular/compiler';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
describe('EmployeeListComponent', () => {
  let empService: EmployeeService;
  let empList: EmployeeListComponent;

  beforeEach(async(() => {
    empList = new EmployeeListComponent(empService);
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('Should edit employee compensation', async(() => {
    const newCompensation = 100000;
    const employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 0
    };

    const sub = [
      {
        id: 1,
        firstName: 'first',
        lastName: 'last',
        position: 'jobTitle',
        compensation: 0
      }
    ]
    empList.editReport(employee, sub, newCompensation);
    expect(empList.editReport).toHaveBeenCalled;
    expect(sub[0].compensation).toBe(newCompensation);
  }));

  it('Should delete the direct report', async(() => {
    const employee = {
      id: 1,
      firstName: 'john',
      lastName: 'doe',
      position: 'tester',
      compensation: 0
    };

    const sub = [
      {
        id: 1,
        firstName: 'john',
        lastName: 'doe',
        position: 'tester',
        compensation: 0
      },
      {
        id: 2,
        firstName: 'fred',
        lastName: 'barnett',
        position: 'dev',
        compensation: 0
      }
    ]

    length = sub.length;
    empList.deleteReport(employee, sub);
    expect(empList.deleteReport).toHaveBeenCalled;
    expect(sub.length).toBe(length-1);
    expect(sub[0].id).toBe(2);
  }));

  it('Should not delete the direct report', async(() => {
    const employee = {
      id: 3,
      firstName: 'john',
      lastName: 'doe',
      position: 'tester',
      compensation: 0
    };

    const sub = [
      {
        id: 1,
        firstName: 'john',
        lastName: 'doe',
        position: 'tester',
        compensation: 0
      },
      {
        id: 2,
        firstName: 'fred',
        lastName: 'barnett',
        position: 'dev',
        compensation: 0
      }
    ]

    length = sub.length;
    empList.deleteReport(employee, sub);
    expect(empList.deleteReport).toHaveBeenCalled;
    expect(sub.length).toBe(length);
    expect(sub[0].id).toBe(1);
  }));
});
