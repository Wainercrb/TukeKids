import { Component, OnInit } from '@angular/core';
import { Video } from '../../app/lib/video'
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-public-videos',
  templateUrl: './public-videos.component.html',
  styleUrls: ['./public-videos.component.css']
})
export class PublicVideosComponent implements OnInit {

  videos: Video[];


  constructor(private videoService: VideoService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    // this.getVideos();
  }
  // // crud methods
  // //get all videos
  // getVideos(): void {
  //   this.videoService.getUsers().subscribe({
  //     next: response => { this.videos = response, this.toastr.success('Usuarios cargados', 'Exito!!') },
  //     error: error => this.toastr.error(error, "Error !!"),
  //     complete: () => { this.buildVideos() },
  //   });
  // }
  // //buil videos in dom
  // buildVideos():void {
  //   this.videos.forEach((item) => {
  //     let url = item.url;
  //     $("#video").append(this.buildCtVideo(url));
  //   });
  // }


  // jaja() {
  //   alert("wainer");
  // }


  // buildCtVideo(url: string): JQuery<HTMLElement> {
  //   return $('<div>', {
  //     class: 'col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'
  //   }).append(this.buildBodyVideoElement(url)).append(this.buildFooterVideoElement(url));
  // }

  // buildVideoElement(url: string): JQuery<HTMLElement> {
  //   let embed = `https://www.youtube.com/embed/${url}`;
  //   return $('<iframe>', {
  //     src: embed,
  //     width: '200',
  //     height: '200',
  //     frameborder: '0',
  //     allowfullscreen: ''
  //   });
  // }

  // buildBodyVideoElement(url: string): JQuery<HTMLElement> {

  //   return $('<div>', {
  //     class: 'bodyVideo',
  //   }).append(this.buildVideoElement(url));

  // }

  // buildFooterVideoElement(url: string): JQuery<HTMLElement> {
  //   return $('<div>', {
  //     class: 'footerVideo',
  //   }).append(this.buildBtnVideoElement(url));
  // }
  // buildBtnVideoElement(url: string): JQuery<HTMLElement> {
  //   let deleteUrl = `delete/${url}`;
  //   return $('<a>', {
  //     class: 'btn btn-block',
  //     url: deleteUrl,
  //     text: 'Eliminar'
  //   });
  // }


  // getVideoId(videoUrl: String): SafeUrl {
  //   return this.domSanitizar.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoUrl}`);
  // }
  

}
