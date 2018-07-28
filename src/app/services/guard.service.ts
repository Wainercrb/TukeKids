import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Guest} from '../lib/guest';
import { GuestService } from '../services/guest.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('access-token')
  })
};



@Injectable({
  providedIn: 'root'
})
export class GuardService {

   //Guest URL API
   private userURL = 'http://localhost:3000/api/users';
  constructor() { }
}
