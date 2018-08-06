import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { Observable } from 'rxjs';
import { Video } from '../lib/video';

//Header backend
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  //Video URL API
  private videoURL = 'http://localhost:3000/api/videos';

  constructor(private http: HttpClient) { }


  //add new video to db
  //@video -> object to front-end
  addVideo(video: Video) {
    alert();
    return this.http.post(`${this.videoURL}`, video, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  //get all videos by role
  getVideosGuests(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoURL, httpOptions).
      pipe(
        catchError(this.handleError)
      );
  }

  //get all videos by role
  getVideosAdmin(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoURL, httpOptions).
      pipe(
        catchError(this.handleError)
      );
  }


  //ge all videos
  getUserss(id): Observable<Video[]> {
    return this.http.get<any>('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=' + id + '&key=AIzaSyDQFJdLinZ94oC6GJD3s_IuxhBJuPRgtjM').
      pipe(
        catchError(this.handleError)
      );
  }

  //update video
  //@video -> object from front-end
  //@id -> id from front-end
  updateVideo(video: Video, id: string) {
    return this.http.put(this.videoURL, video).pipe(
      catchError(this.handleError)
    );
  }

  //get backed erros
  //@HttpErrorResponse -> angular error object
  private handleError(error: HttpErrorResponse) {
    let msj: string;
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
    if (error.error.message == undefined) {
      msj = error.error.error;
    } else {
      msj = error.error.message;
    }
    console.log(error);
    // return an observable with a user-facing error message
    return throwError(
      `hubo un error al procesar la solicitud, detalles "${msj}", pudes ver más detalles enla consola.`);
  };
}
