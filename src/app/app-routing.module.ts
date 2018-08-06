import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginUserComponent} from './login-user/login-user.component';
import { LoginGuestComponent } from './login-guest/login-guest.component'
import { HomeComponent } from './home/home.component';
import { GuestComponent  } from "./guest/guest.component";
import { AuthGuard } from './services/auth.guard';
import { FormGuestComponent } from './form-guest/form-guest.component'
import { FormUserComponent } from './form-user/form-user.component'
import { AdminVideosComponent } from './admin-videos/admin-videos.component'
import { PublicVideosComponent } from './public-videos/public-videos.component'
import { FormVideoComponent } from  './form-video/form-video.component';
import { GuestVideosComponent } from './guest-videos/guest-videos.component';
import { VideoComponent}  from './video/video.component';


const routes: Routes = [
    // root route
    { path: '', redirectTo: 'inico', pathMatch: 'full' },
    //videos routes
    { path: 'mis-videos', component: GuestVideosComponent, canActivate: [AuthGuard] },
    { path: 'ver/:id', component: VideoComponent, canActivate: [AuthGuard] },
    { path: 'administrar-videos', component: AdminVideosComponent, canActivate: [AuthGuard] },
    { path: 'nuevo-video', component: FormVideoComponent, canActivate: [AuthGuard] },
    { path: 'actualizar-video', component: FormVideoComponent, canActivate: [AuthGuard] },
    // user routes
    { path: 'usuarios', component: UsersComponent,canActivate: [AuthGuard] },
    { path: 'nuevo-usuario', component: FormUserComponent,canActivate: [AuthGuard] },
    { path: 'actualizar-usuario/:id', component: FormUserComponent,canActivate: [AuthGuard] },
    // guest routes
    { path: 'invitados', component: GuestComponent,canActivate: [AuthGuard] },
    { path: 'nuevo-invitado', component: FormGuestComponent,canActivate: [AuthGuard] },
    { path: 'actualizar-invitado/:id', component: FormGuestComponent,canActivate: [AuthGuard] },
    // logis routes
    { path: 'login-usuario', component: LoginUserComponent},
    { path: 'login-invitado', component: LoginGuestComponent},
    // home routes
    { path: 'inicio', component: HomeComponent, canActivate:[AuthGuard]},
    
  ]
  @NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
  })
export class AppRoutingModule { }
