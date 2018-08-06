import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { compareValidator } from '../shared/confirm-equal-validator.directive';
import { UserService } from '../services/user.service';
import { User } from '../lib/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  users: User[];
  user: any;
  formUser: FormGroup;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildingForms(this.route.snapshot.paramMap.get('id'));
  }


  //function save user
  // @user -> object type array
  saveUser(user: User): void {
    this.userService.addUser(user).subscribe({
      next: response => this.buildObjectUser(response),
      error: error => this.toastr.error(error, "Error X("),
      complete: () => this.router.navigate(['/usuarios']),
    });
  }
  //function save user
  // @user -> object type array
  updateUser(user: User): void {
    this.userService.updateUser(user, user._id).subscribe({
      next: response => this.buildObjectUser(response),
      error: error => this.toastr.error(error, "Error x("),
      complete: () => this.router.navigate(['/usuarios'])
    });
  }
  //function get user by id
  //@id-> item to edit from users table 
  getUserById(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: newUser => { this.buildObjectUser(newUser), this.toastr.success('Usuario cargado', 'Exito!!'); },
      error: error => this.toastr.error(error, "Error :("),
      complete: () => this.buildForm(this.user)
    });
  }
  //Build form with validations
  buildFormToSave(): void {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      country: ['', Validators.required],
      birthDate: ['', Validators.required],
      // birthDate: ['', [Validators.required, Validators.pattern("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, compareValidator('password')]]
    });
  }
  //Build form with validations
  buildFormToUpdate(): void {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      country: ['', Validators.required],
      birthDate: ['', Validators.required],
      // birthDate: ['', [Validators.required, Validators.pattern("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['000000', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['000000', [Validators.required, compareValidator('password')]]
    });
  }


  //Crate validations
  buildingForms(id: any): void {
    if (id === null) {
      this.buildFormToSave();
    } else {
      this.buildFormToUpdate();
      this.getUserById(this.route.snapshot.paramMap.get('id'));
    }
  }
  //Submit modal
  onSubmit(): void {
    if (this.formUser.status != 'INVALID') {
      this.user = {
        "_id": this.route.snapshot.paramMap.get('id') !== null ? this.route.snapshot.paramMap.get('id') : null,
        "name": this.formUser.value.name,
        "surnames": this.formUser.value.surnames,
        "email": this.formUser.value.email,
        "password": this.formUser.value.password,
        "country": this.formUser.value.country,
        "birthDate": this.formUser.value.birthDate
      };
      if (this.route.snapshot.paramMap.get('id') === null) {
        this.saveUser(this.user);
      } else {
        this.updateUser(this.user);
      }
    } else {
      this.toastr.error("Errores en el formulario", "Error !!")
    }
  }
  //create user object
  buildObjectUser(response: any) {
    return this.user = {
      "_id": response._id !== undefined ? response._id : '',
      "name": response.name,
      "surnames": response.surnames,
      "email": response.email,
      "country": response.country,
      "birthDate": response.birthDate,
      "password": response.password,
    };
  }
  //Load items to form
  // @user -> items from database
  buildForm(user: User): void {
    const date = new Date(user.birthDate);
    this.formUser.get('name').setValue(user.name);
    this.formUser.get('surnames').setValue(user.surnames);
    this.formUser.get('email').setValue(user.email);
    this.formUser.get('country').setValue(user.country);
    this.formUser.get('birthDate').setValue(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}`);
  }

  //function register forms control in view
  get formControls() { return this.formUser.controls; }
  // get values
  get password() {
    return this.formUser.get('password');
  }
  get pwConfirm() {
    return this.formUser.get('passwordConfirm');
  }
}
