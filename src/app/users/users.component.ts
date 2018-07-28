import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { compareValidator } from '../shared/confirm-equal-validator.directive';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../app/lib/user'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  user: User;
  users: User[];
  itemSelected: number;
  registerForm: FormGroup;

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    // initial load
    this.getUsers();
  }
  // crud methods
  getUsers(): void {
    // const that = this;
    // const norwegian = {
    //   'emptyTable': 'Ningún dato disponible en esta tabla',
    //   'info': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    //   'infoEmpty': 'ostrando registros del 0 al 0 de un total de 0 registros',
    //   'infoFiltered': '(filtrado de un total de _MAX_ registros)',
    //   'infoPostFix': '',
    //   'infoThousands': ' ',
    //   'loadingRecords': 'Cargando...',
    //   'lengthMenu': 'Mostrar _MENU_ registros',
    //   'processing': 'Procesando...',
    //   'search': 'Buscar:',
    //   'url': '',
    //   'zeroRecords': 'No se encontraron resultados',
    //   'paginate': {
    //     'first': 'Primero',
    //     'previous': 'Anterior',
    //     'next': 'Siguiente',
    //     'last': 'Último'
    //   },
    //   'aria': {
    //     'sortAscending': ': Activar para ordenar la columna de manera ascendente',
    //     'sortDescending': ': Activar para ordenar la columna de manera descendente'
    //   }
    // };
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2,
    //   serverSide: false,
    //   processing: false,
    //   language: norwegian

    // };
    this.userService.getUsers().subscribe({
      next: users => { this.users = users, this.toastr.success('Usuarios cargados', 'Exito!!')},
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
  //function save user
  // @user -> object type array
  saveUser(user: User):void {
    this.userService.addUser(user).subscribe({
      next: newUser => { this.buildUser(newUser), this.toastr.success('Usuario guardado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {this.users.push(this.user)},
    });
  }
  //function save user
  // @user -> object type array
  updateUser(user: User):void {
    this.userService.updateUser(user, user._id).subscribe({
      next: newUser => { this.buildUser(newUser),  this.toastr.success('Usuario actualizado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => { this.users.splice(this.itemSelected, 1),this.users.push(this.user), this.itemSelected = undefined},
    });
  }
  // function dete user by id
  // @id -> item select
  // @position -> array postition
  deleteUser(id: string, position: number):void {
    this.userService.deleteUser(id).subscribe({
      next: x => {  this.toastr.success('Usuario eliminado', 'Exito!!')},
      error: error => this.toastr.error(error, "Error :C"),
      complete: () => {this.users.splice(position, 1), this.ngOnInit },
    });
  }
  //function get user by id
  //@id-> item to edit from users table 
  getUserById(id: string):void {
    this.userService.getUserById(id).subscribe({
      next: newUser => { this.buildUser(newUser), this.toastr.success('Usuario cargado', 'Exito!!');},
      error: error => this.toastr.error(error, "Error :("),
      complete: () => {this.buildModal(this.user) },
    });
  }
  //Submit modal
  onSubmit():void {
    if (this.registerForm.status != 'INVALID') {
        this.user = {
          "_id": this.registerForm.value._id,
          "name": this.registerForm.value.name,
          "surnames": this.registerForm.value.surnames,
          "email": this.registerForm.value.email,
          "password": this.registerForm.value.password,
          "country": this.registerForm.value.country,
          "birthDate": this.registerForm.value.birthDate
        };
      if (this.itemSelected == undefined){this.saveUser(this.user)}
      else {this.updateUser(this.user);}
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
      passwordConfirm: ['', [Validators.required, compareValidator('password')]],
      _id: [],
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
      password: ['000000', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['000000', [Validators.required, compareValidator('password')]],
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
  openModal(content):void {
    if (this.itemSelected == undefined){this.buildFormSave()}
    else {this.buildFormUPdate()}
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).
      result.then((result) => { }, (reason) => {
        this.user = new User();
        this.itemSelected = undefined;
      });
  }
  //Load items to modal
  // @user -> items from database
  buildModal(user: User):void {
    const date = new Date(user.birthDate);
    this.registerForm.get('_id').setValue(user._id);
    this.registerForm.get('name').setValue(user.name);
    this.registerForm.get('surnames').setValue(user.surnames);
    this.registerForm.get('email').setValue(user.email);
    this.registerForm.get('country').setValue(user.country);
    this.registerForm.get('birthDate').setValue(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}`);
  }

  buildUser<User>(user: any) {
    return this.user = {
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