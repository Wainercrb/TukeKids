import { Component, OnInit, NgZone } from '@angular/core'; 
import { Video } from '../../app/lib/video'
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../services/video.service';


@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css'],
  
})


export class AdminVideosComponent implements OnInit {

  YTsnippet:any = [];
  videos: Video[];
  private API = 'AIzaSyDQFJdLinZ94oC6GJD3s_IuxhBJuPRgtjM';

  constructor(private videoService: VideoService,
              private toastr: ToastrService) {}

  ngOnInit(){
    this.getVideos();
  }
  // crud methods
  //get all videos
  getVideos(): void {
    this.videoService.getVideosAdmin().subscribe({
      next: response => { this.buildVideos(response), this.toastr.success('Usuarios cargados', 'Exito!!')},
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => {},
    });
  }
  // build dom videos
  buildVideos(videos){ 
    for (let index in videos) {
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videos[index].url}&key=${this.API}`)
      .then(response => response.json())
      .then(data => {
        this.YTsnippet.push(data.items[0]);
      }).catch(err => {
        this.toastr.error('Error al cargar el video', err);
      });
    }
  }

}


