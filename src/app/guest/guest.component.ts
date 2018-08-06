import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { GuestService} from '../services/guest.service';
import { Guest} from '../lib/guest'
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    GuestComponent,
  ],
  imports: []
})
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  private guests: Guest[];   
 
  constructor(private guestService: GuestService, 
              private toastr: ToastrService){ }

  ngOnInit():void {
    this.getGuests();
  }

  //delete user
  getGuests(): void {
    this.guestService.getGuest().subscribe({
      next: guests => { this.guests = guests, this.toastr.success('Invitados cargados', 'Exito!!')},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {},
    });
  }
  // function delete guest by id
  // @id -> item select
  // @position -> array postition
  deleteGuest(id: string, position: number):void {
    this.guestService.deleteGuest(id).subscribe({
      next: x => {  this.toastr.success('Invitado eliminado', 'Exito!!')},
      error: error => this.toastr.error(error, "Error :C"),
      complete: () => {this.guests.splice(position, 1), this.ngOnInit },
    });
  } 
}
