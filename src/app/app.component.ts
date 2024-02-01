import { AfterViewInit, Component, ElementRef, Inject, NgModule, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from "./rooms/rooms.component";
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from './employee/employee.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { HttpClientModule } from '@angular/common/http';
import { RoomsService } from './rooms/services/rooms.service';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  // template:`<h1>Hello world from template</h1>
  // <p>hi</p>
  // `,
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, RoomsComponent, ContainerComponent, EmployeeComponent,HttpClientModule],
  providers:[RoomsService],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  role = "Users";

  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {

  //   const componentRef = this.vcr.createComponent(RoomsComponent);

  //   componentRef.instance.noOfRooms=50;
  // }


  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService, @Inject(localStorageToken) private localStorage: Storage) {
  }

  ngOnInit() {
    this.name.nativeElement.innerText = "Hotel Uma";
    // this.loggerService.Log("AppComponent.ngOnInit()");
    // this.localStorage.setItem('name', 'Dev Patel');
  
  }

}
