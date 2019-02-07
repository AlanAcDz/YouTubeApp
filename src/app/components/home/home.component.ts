import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  videos: any[] = [];
  videoSel: any;
  constructor(private ytServ: YoutubeService) {
    this.ytServ.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }
  verVideo(video: any) {
    this.videoSel = video;
    $('#exampleModal').modal();
  }
  cerrarModal() {
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }
  cargarMas() {
    this.ytServ.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }
}
