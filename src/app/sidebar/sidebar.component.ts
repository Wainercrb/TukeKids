import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  

}
