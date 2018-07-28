import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GuestComponent  } from "./guest/guest.component";
import { AuthGuard } from './services/auth.guard';
import { FormGuestComponent} from './form-guest/form-guest.component'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent,canActivate: [AuthGuard] },
    { path: 'guests', component: GuestComponent,canActivate: [AuthGuard] },
    { path: 'nuevo-invitado', component: FormGuestComponent,canActivate: [AuthGuard] },
    { path: 'actualizar-invitado/:id', component: FormGuestComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
  ]
  @NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
  })
export class AppRoutingModule { }
