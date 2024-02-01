import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor(){

  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.employeeName = "Rajesh";
  }

}
