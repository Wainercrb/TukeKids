import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../app/lib/user'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
    private toastr: ToastrService) { }
  ngOnInit() {
    // initial load
    this.getUsers();
  }
  // crud methods
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: users => { this.users = users, this.toastr.success('Usuarios cargados', 'Exito!!')},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {},
    });
  }
  // function dete user by id
  // @id -> item select
  // @position -> array postition
  deleteUser(id: string, position: number):void {
    this.userService.deleteUser(id).subscribe({
      next: response =>  this.toastr.success('Usuario eliminado', 'Exito!!'),
      error: error => this.toastr.error(error, "Error x("),
      complete: () => this.users.splice(position, 1)
    });
  }

}