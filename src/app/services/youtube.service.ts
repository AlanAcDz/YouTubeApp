import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAFZCfMl0ejWM0-aAupwxIISE5yZi_o7OQ';
  private playlist = 'UUI06ztiuPl-F9cSXsejMV8A';
  private nextPageToken: string;
  constructor(private http: HttpClient) { }
  getVideos() {
    let params = new HttpParams();
    params = params.set('part', 'snippet');
    params = params.set('maxResults', '10');
    params = params.set('playlistId', this.playlist);
    params = params.set('key', this.apiKey);
    if (this.nextPageToken) {
      params = params.set('pageToken', this.nextPageToken);
    }
    const url = `${ this.youtubeUrl }/playlistItems`;
    return this.http.get(url, { params }).pipe(map((res: any) => {
      this.nextPageToken = res.nextPageToken;
      const videos: any[] = [];
      for (const video of res.items) {
        videos.push(video.snippet);
      }
      return videos;
    }));
  }
}
