import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../lib/user';
import { Guest} from '../lib/guest';
import { throwError } from 'rxjs'
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginURL = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  //check if user is valid
  // @user -> objet from interface
  loginAdmin(newUser: User) {
    const url = `${this.loginURL}/admin/${newUser.email}&${newUser.password}`
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }


  //check if user is valid
  // @user -> objet from interface
  loginGuest(newGuest: Guest): Observable<{}> {
    const url = `${this.loginURL}/guest/${newGuest.username}&${newGuest.pin}`
    return this.http.get<Guest>(url).pipe(
      catchError(error => Observable.throw(error))
    );
  }

  //check if user is valid
  // @user -> objet from interface
  geAuthToken(token: string): Observable<{}> {
    const url = `http://localhost:3000/api/token/${token}`
    return this.http.get<Token>(url).pipe(
      catchError(error => Observable.throw(error))
    );
  }



  private handleError(error: HttpErrorResponse) {
    let msj : string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was : ${error.error}` +
        `status was : ${error.status}` +
        `headers was : ${error.headers}` +
        `text was : ${error.statusText}`);
        
      }
      if(error.error.message == undefined){
        msj = error.error.error;
      }else{
        msj = error.error.message;
      }
      console.log(error);
    // return an observable with a user-facing error message
    return throwError(
      `hubo un error al procesar la solicitud, detalles "${msj}", pudes ver más detalles enla consola.`);
  };
}
