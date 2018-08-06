import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './/app-routing.module';
import {DataTableModule} from "angular-6-datatable";
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { GuestComponent } from './guest/guest.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { FormGuestComponent } from './form-guest/form-guest.component';
import { FormUserComponent } from './form-user/form-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginGuestComponent } from './login-guest/login-guest.component';
import { PublicVideosComponent } from './public-videos/public-videos.component';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { FormVideoComponent } from './form-video/form-video.component';
import { GuestVideosComponent } from './guest-videos/guest-videos.component';
import { VideoComponent } from './video/video.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { FormPlaylistComponent } from './form-playlist/form-playlist.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    GuestComponent,
    SideBarComponent,
    FormGuestComponent,
    FormUserComponent,
    LoginUserComponent,
    LoginGuestComponent,
    PublicVideosComponent,
    AdminVideosComponent,
    FormVideoComponent,
    GuestVideosComponent,
    VideoComponent,
    PlaylistComponent,
    FormPlaylistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTableModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })    
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }