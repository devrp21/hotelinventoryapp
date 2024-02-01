import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService],  // comment it to see it fo @Host
})
export class EmployeeComponent {

  employeeName:string="Dev";

  constructor(@Self() private roomService: RoomsService) {
    // Remove @self to see the use of @Host
    console.log('@self');
  }

}
