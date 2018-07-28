import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../lib/user';
import { Guest } from '../lib/guest';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminForm: FormGroup;
  guestForm: FormGroup;
  user: User;
  guest: Guest;
  token: any;
 
  constructor(private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildAdminForm();
    this.buildGuestForm();
  }

  loginAdmin():void {
    this.authService.loginAdmin(this.buildAdminObject()).subscribe({
      next: result => { this.token = result, this.buildToken(this.token) },
      error: error => { this.toastr.error(error, 'Error !!'); },
      complete: () => { this.closeModal(),this.toastr.success('Bienvenido', 'TukeKids'); },
    });
  }
  loginGuest():void {
    this.authService.loginGuest(this.buildGuestObject()).subscribe({
      next: result => { this.token = result, this.buildToken(this.token) },
      error: error => { this.toastr.error(error, 'Error !!'); },
      complete: () => { this.closeModal(), this.toastr.success('Bienvenido', 'TukeKids'); },
    });
  }
  saveToken(_toke: string): void {
    sessionStorage.setItem("_token", _toke);
  }
  //Build message
  // @msj -> array with data message
  buildMessage(msj: any = {}):void {
    if (msj.title == "Error !!") {
      this.toastr.error(msj.body, msj.title);
    } else {
      this.toastr.success(msj.body, msj.title);
    }
  }
  //build admin object
  buildAdminObject():User {
    return this.user = {
      "_id": this.adminForm.value._id != undefined ? this.adminForm.value._id : "",
      "name": this.adminForm.value.name != undefined ? this.adminForm.value.name : "",
      "surnames": this.adminForm.value.surnames != undefined ? this.adminForm.value.surnames : "",
      "email": this.adminForm.value.email != undefined ? this.adminForm.value.email : "",
      "password": this.adminForm.value.password != undefined ? this.adminForm.value.password : "",
      "country": this.adminForm.value.country != undefined ? this.adminForm.value.country : "",
      "birthDate": this.adminForm.value.birthDate != undefined ? this.adminForm.value.birthDate : ""
    };
  }
  //build guest object
  buildGuestObject():Guest{
    return this.guest = {
      "_id": this.guestForm.value._id != undefined ? this.guestForm.value._id : "",
      "fullname": this.guestForm.value.fullname != undefined ? this.guestForm.value.fullname : "",
      "username": this.guestForm.value.username != undefined ? this.guestForm.value.username : "",
      "pin": this.guestForm.value.pin != undefined ? this.guestForm.value.pin : "",
      "age": this.guestForm.value.age != undefined ? this.guestForm.value.age : "",
      "user_id": this.guestForm.value.user_id != undefined ? this.guestForm.value.user_id : ""
    };

  }
  //build the token on session storangeer
  //@Token -> user information from db
  buildToken(token: any) {
    sessionStorage.setItem('access_token', token._token);
    sessionStorage.setItem('fullname', token.fullname);
    sessionStorage.setItem('role', token.role);
    this.router.navigate(['/home']);
  }
  //Build form with validations
  buildAdminForm() {
    this.adminForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //Build form with validations
  buildGuestForm() {
    this.guestForm = this.formBuilder.group({
      username: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }
  //open login modal
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).
      result.then((result) => { }, (reason) => {
        this.user = new User();
        this.guest = new Guest();
      });
  }
  //closlogin modal
  closeModal() {
    const element: HTMLElement = document.getElementById("closeModal") as HTMLElement;
    element.click();
  }
  //admin login controls 
  get adminFrmControls() { return this.adminForm.controls; }

}
