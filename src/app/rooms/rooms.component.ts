import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomsService } from './services/rooms.service';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'] // Corrected property name to 'styleUrls'
  ,
  providers: [RoomsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RoomsListComponent, HeaderComponent]
})

export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {


  hotelName = "Hotel Uma";
  noOfRooms = 10;
  hideRooms = false;

  selectedRoom!: RoomList;

  title: string = "Room List";

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }
  totalBytes = 0;

  roomList: RoomList[] = [];

  subscription!: Subscription;

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  @ViewChild(HeaderComponent,) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomsService()

  constructor(@SkipSelf() private roomsService: RoomsService) {
  }


  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    // this.headerComponent.title = "Rooms View";

    // this.headerChildrenComponent.last.title = "Last Title";
    // this.headerChildrenComponent.get
  }

  ngDoCheck(): void {
    //  console.log('Do check')
  }



  ngOnInit(): void {
    // console.log(this.headerComponent);

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          // console.log(this.totalBytes);
          break;
        }
        case HttpEventType.Response: {
          // console.log(event.body);
        }
      }
    })

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => { console.log(data); });

    // this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomList = rooms;
    //   // console.log('Get Rooms :', this.roomList);
    // });

   this.subscription= this.roomsService.getRooms$().subscribe((rooms:RoomList[]) => {
      this.roomList = rooms;
    });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List'
  }


  selectRoom(room: RoomList) {
    this.selectedRoom = room
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Ultra Deulx Room',
      amenities: 'AC, Free WiFi, TV, Bathroom',
      price: 5000,
      photos: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
      checkinTime: new Date('10/11/2021'),
      checkoutTime: new Date('23/11/2021'),
      rating: 5,
    };

    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  };


  editRoom() {
    const room: RoomList = {
      roomNumber: "3",
      roomType: 'Ultra Deulx Room',
      amenities: 'AC, Free WiFi, TV, Bathroom',
      price: 50000,
      photos: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
      checkinTime: new Date('10/11/2021'),
      checkoutTime: new Date('23/11/2021'),
      rating: 5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
      console.log(this.roomList);
    });
  }


  deletRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
