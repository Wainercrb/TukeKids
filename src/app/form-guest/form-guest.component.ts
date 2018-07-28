import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { compareValidator } from '../shared/confirm-equal-validator.directive';
import { GuestService} from '../services/guest.service';
import { Guest } from '../lib/guest';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-guest',
  templateUrl: './form-guest.component.html',
  styleUrls: ['./form-guest.component.css']
})
export class FormGuestComponent implements OnInit {

  private guest: any;
  formGuest: FormGroup;
  

  constructor(private guestService: GuestService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }
  
  ngOnInit() {
  console.log(this.route.snapshot.paramMap.get('id'));
  this.buildFormSave();
  }


   //function save guest
  // @guest -> object type array
  saveGuest(guest: Guest):void {
    this.guestService.addGuest(guest).subscribe({
      next: response => { this.buildObjectGuest(response), this.toastr.success('Invitado guardado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {this.router.navigate(['/nuevo-invitado'])},
    });
  }

  onSubmit(){
    if (this.formGuest.status != 'INVALID') {
      this.guest = {
        "_id": this.formGuest.value._id,
        "fullname": this.formGuest.value.fullname,
        "age": this.formGuest.value.age,
        "username": this.formGuest.value.username,
        "pin": this.formGuest.value.pin
      };
      this.saveGuest(this.guest);
  } else {
    this.toastr.error("Errores en el formulario", "Error !!")
  }


  }



  buildObjectGuest(response:any) {
    return this.guest = {
      "_id": response._id != undefined ? response._id : '',
      "fullname": response.fullname,
      "username": response.username,
      "age": response.age,
      "pin": response.pin,
      "user_id": response.user_id,
    };
  }


  //Build form with validations
  buildFormSave():void {
    this.formGuest = this.formBuilder.group({
      fullname: ['', Validators.required],
      age: ['', Validators.required, compareValidator("")],
      username: ['', Validators.required],
      pin: ['', [Validators.required]],
      pinConfirm: ['', [Validators.required, compareValidator('pin')]],
      _id: [],
    });
  }

  

  //function register forms control in view
  get formControls() { return this.formGuest.controls; }
  // get values
  get pin() {
    return this.formGuest.get('pin');
  }
  get pwConfirm() {
    return this.formGuest.get('pinConfirm');
  }

}
