import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  status: string = 'pending';
  
  changeStatus = (newStatus: string) => this.status = newStatus;

  loadData = () => console.log('heavy content loaded')
}
