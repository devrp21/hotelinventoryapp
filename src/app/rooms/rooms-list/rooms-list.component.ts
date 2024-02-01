import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() rooms: RoomList[] = [];

  @Input() title:string = '';
  
  @Output() selectedRoom = new EventEmitter<RoomList>();
  
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  //  console.log(changes);
   if(changes['title']){
    this.title = changes['title'].currentValue.toUpperCase();
   }
  }
  
  ngOnInit(): void {
  }
  
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }


  ngOnDestroy(): void {
    console.log("On Destroy Called"); 
  }
}
