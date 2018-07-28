import { Component, OnInit } from '@angular/core';
import { Token } from '../lib/token';
import { LoginService } from '../services/login.service';
import {AuthService} from '../services/auth.service';
import { NgModule } from '@angular/core';
import {SideBarComponent} from '../sidebar/sidebar.component'


@NgModule({
  declarations: [
    SideBarComponent,
  ],
  imports: [],
  providers: []
})


@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private auth: AuthService) { }

  ngOnInit() {
 
  }
  
  openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
  }

  
}
