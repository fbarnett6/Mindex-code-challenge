import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {EmployeeComponent} from './employee.component';
import {EmployeeService} from '../employee.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EmployeeListComponent} from '../employee-list/employee-list.component';
import { compileComponentFromMetadata } from '@angular/compiler';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService, EmployeeListComponent],
      imports: [HttpClientTestingModule],
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      directReports: [1,2],
      compensation: 'compensation'
    };

    expect(comp).toBeTruthy();
  }));
});
