import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private API = 'AIzaSyDQFJdLinZ94oC6GJD3s_IuxhBJuPRgtjM';

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.buildVideo(this.route.snapshot.paramMap.get('id'));
    this.buildVideosInfo(this.route.snapshot.paramMap.get('id'));
  }

  buildVideo(id: string) {
    if (id !== undefined || id !== null) {
      const video = document.createElement('iframe');
      video.src = video.src = `https://www.youtube.com/embed/${id}`;
      video.frameBorder = '0';
      video.allowFullscreen = true;
      video.className = 'embed-responsive-item';
      video.title = 'waoner';
      document.getElementById('videoContainer').appendChild(video);
    }
  }


  buildVideosInfo(url) {

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${url}&key=${this.API}`)
      .then(response => response.json())
      .then(data => {
        const p = document.createElement('p');
        p.textContent = data.items[0].snippet.description;
        
        document.getElementById('footer-video').appendChild(p);
      }).catch(err => {
        this.toastr.error('Error al cargar el video', err);
      });

  }
}
