import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { UsersComponent } from '../users/users.component';
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

  private guest:any;
  private guests: Guest[];  
  registerForm: FormGroup;
  itemSelected: number;
  
  constructor(private guestService: GuestService, 
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit():void {
    this.getGuests();
  }


  getGuests(): void {
    this.guestService.getGuest().subscribe({
      next: guests => { this.guests = guests, this.toastr.success('Invitados cargados', 'Exito!!')},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {},
    });
  }
  // funtion edit user by id
  // @id item selected
  public editUser(id: string, position: number):void {
    let element: HTMLElement = document.getElementById("modalShow") as HTMLElement;
    //call user by id
    this.getUserById(id);
    // get item 
    this.itemSelected = position;
    //call click modal button
    element.click();

  }
  //function save guest
  // @guest -> object type array
  saveUser(guest: Guest):void {
    this.guestService.addGuest(guest).subscribe({
      next: response => { this.buildUser(response), this.toastr.success('Invitado guardado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {this.guest.push(this.guest)},
    });
  }
  //function update guest
  // @guest -> object type array
  updateUser(guest: Guest):void {
    this.guestService.updateGuest(guest, guest._id).subscribe({
      next: newUser => { this.buildUser(newUser),  this.toastr.success('Usuario actualizado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => { this.guest.splice(this.itemSelected, 1),this.guest.push(this.guest), this.itemSelected = undefined},
    });
  }
  // function delete guest by id
  // @id -> item select
  // @position -> array postition
  deleteUser(id: string, position: number):void {
    this.guestService.deleteGuest(id).subscribe({
      next: x => {  this.toastr.success('Usuario eliminado', 'Exito!!')},
      error: error => this.toastr.error(error, "Error :C"),
      complete: () => {this.guests.splice(position, 1), this.ngOnInit },
    });
  }
  //function get guest by id
  //@id-> item to edit from guest table 
  getUserById(id: string):void {
    this.guestService.getGuestById(id).subscribe({
      next: newUser => { this.buildUser(newUser), this.toastr.success('Usuario cargado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error :("),
      complete: () => {this.buildModal(this.guest) },
    });
  }
  //Submit modal
  onSubmit():void {
    if (this.registerForm.status != 'INVALID') {
        this.guest = {
          "_id": this.registerForm.value._id,
          "name": this.registerForm.value.name,
          "surnames": this.registerForm.value.surnames,
          "email": this.registerForm.value.email,
          "password": this.registerForm.value.password,
          "country": this.registerForm.value.country,
          "birthDate": this.registerForm.value.birthDate
        };
      if (this.itemSelected == undefined){this.saveUser(this.guest)}
      else {this.updateUser(this.guest);}
      this.clearModal();
    } else {
      this.toastr.error("Errores en el formulario", "Error !!")
    }
  }
  //Build form with validations
  buildFormSave():void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surnames: ['', Validators.required],
      country: ['', Validators.required],
      // birthDate: ['', [Validators.required, Validators.pattern("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // passwordConfirm: ['', [Validators.required, compareValidator('password')]],
      // _id: [],
    });
  }
   //Build form with validations
   buildFormUPdate():void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surnames: ['', Validators.required],
      country: ['', Validators.required],
      // birthDate: ['', [Validators.required, Validators.pattern("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      // password: ['000000', [Validators.required, Validators.minLength(6)]],
      // passwordConfirm: ['000000', [Validators.required, compareValidator('password')]],
      _id: [],
    });
  }
  // clear all modal
  clearModal():void {
    let element: HTMLElement = document.getElementById("closeModal") as HTMLElement;
    element.click();
    this.registerForm.get('_id').setValue('');
    this.registerForm.get('name').setValue('');
    this.registerForm.get('surnames').setValue('');
    this.registerForm.get('email').setValue('');
    this.registerForm.get('country').setValue('');
    this.registerForm.get('birthDate').setValue('');
    this.registerForm.get('password').setValue('');
    this.registerForm.get('passwordConfirm').setValue('');
  }
  // function open modal
  // @content -> modal content
  newUser(content):void {
    // if (this.itemSelected == undefined){this.buildFormSave()}
    // else {this.buildFormUPdate()}
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).
    //   result.then((result) => { }, (reason) => {
    //     this.user = new User();
    //     this.itemSelected = undefined;
    //   });
    this.router.navigate(['/nuevo-invitado']);
  }
  //Load items to modal
  // @user -> items from database
  buildModal(guest: Guest):void {
  //   const date = new Date(user.birthDate);
  //   this.registerForm.get('_id').setValue(user._id);
  //   this.registerForm.get('name').setValue(user.name);
  //   this.registerForm.get('surnames').setValue(user.surnames);
  //   this.registerForm.get('email').setValue(user.email);
  //   this.registerForm.get('country').setValue(user.country);
  //   this.registerForm.get('birthDate').setValue(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}`);
  // 
}

  buildUser<User>(user: any) {
    return this.guest = {
      "_id": user._id != undefined ? user._id : '',
      "name": user.name,
      "surnames": user.surnames,
      "email": user.email,
      "password": user.password,
      "country": user.country,
      "birthDate": user.birthDate
    };
  }
  //function register forms control in view
  get f() { return this.registerForm.controls; }
  // get values
  get password() {
    return this.registerForm.get('password');
  }
  get pwConfirm() {
    return this.registerForm.get('passwordConfirm');
  }


}
