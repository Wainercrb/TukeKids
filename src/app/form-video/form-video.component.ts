import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Video } from '../lib/video';
import { Router } from '@angular/router'
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { Guest } from '../lib/guest';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css']
})
export class FormVideoComponent implements OnInit {

  videoForm: FormGroup;
  guests: Guest[];
  submitted = false;
  video: Video;

  constructor(private videoService: VideoService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private guestService: GuestService) { }

  ngOnInit() {
    this.buildVideoForm();
    this.getGuests();
  }
  //function save user
  // @user -> object type array
  saveUser(video: Video): void {
    this.videoService.addVideo(video).subscribe({
      next: response => this.buildObjectVideo(response),
      error: error => this.toastr.error(error, "Error X("),
      complete: () => this.router.navigate(['/administrar-videos']),
    });
  }
  //get guest
  getGuests(): void {
    this.guestService.getGuest().subscribe({
      next: guests => { this.guests = guests, this.toastr.success('Invitados cargados', 'Exito!!') },
      error: error => this.toastr.error(error, "Error !!"),
      complete: () => { },
    });
  }
  //function save video
  // @video -> object type array
  updateVideo(video: Video): void {
    this.videoService.updateVideo(video, video._id).subscribe({
      next: response => this.buildObjectVideo(response),
      error: error => this.toastr.error(error, "Error x("),
      complete: () => this.router.navigate(['/administrar-videos'])
    });
  }

  //Build form with validations
  buildVideoForm() {
    this.videoForm = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')]],
      guest: ['', [Validators.required]]
    });
  }

  //Submit modal
  onSubmit(): void {
    if (this.videoForm.status != 'INVALID') {
      this.video = {
        '_id': this.route.snapshot.paramMap.get('id') !== null ? this.route.snapshot.paramMap.get('id') : null,
        'url': this.YouTubeGetID(this.videoForm.value.url),
        'guest': this.videoForm.value.guest
      };
      if (this.route.snapshot.paramMap.get('id') === null) {
        this.saveUser(this.video);
      } else {
        this.updateVideo(this.video);
      }
    } else {
      this.toastr.error("Errores en el formulario", "Error !!")
    }
  }

  YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  }
  //create user object
  buildObjectVideo(response: any): Video {
    return this.video = {
      "_id": response._id !== undefined ? response._id : '',
      "url": response.url,
      'guest': response.guest
    };
  }
  //admin login controls 
  get formControls() { return this.videoForm.controls; }
}
