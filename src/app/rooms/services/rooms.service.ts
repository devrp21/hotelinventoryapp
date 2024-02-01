import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { report } from 'node:process';
import { Observable, shareReplay } from 'rxjs';

@Injectable(
  // {
  // providedIn: 'root'
  // }
)
export class RoomsService {

  // roomList: RoomList[] = [

  //   {
  //     roomNumber: 1,
  //     roomType: 'Deulx Room',
  //     amenities: 'AC, Free WiFi, TV, Bathroom',
  //     price: 500,
  //     photos: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  //     checkinTime: new Date('11-11-2021'),
  //     checkoutTime: new Date('13-11-2021'),
  //     rating: 4.5
  //   },
  //   {
  //     roomNumber: 15,
  //     roomType: 'Single Room',
  //     amenities: 'AC, Free WiFi, TV, Bathroom',
  //     price: 1000,
  //     photos: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  //     checkinTime: new Date('12-11-2021'),
  //     checkoutTime: new Date('15-11-2021'),
  //     rating: 3.4
  //   },
  //   {
  //     roomNumber: 21,
  //     roomType: 'Private Suite',
  //     amenities: 'AC, Free WiFi, TV, Bathroom',
  //     price: 1500,
  //     photos: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  //     checkinTime: new Date('11-11-2021'),
  //     checkoutTime: new Date('13-11-2021'),
  //     rating: 5
  //   }

  // ];

  roomList: RoomList[] = [];


  getRooms$(): Observable<RoomList[]> {
    return this.http.get<RoomList[]>('/api/rooms').pipe(
      shareReplay(1)
    );
  }

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    // console.log(environment.apiEndpoint);
    console.log(this.config.apiEndpoint);
    console.log("Rooms services initialized...");
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`,
      { reportProgress: true });

    return this.http.request(request);

  }
}
