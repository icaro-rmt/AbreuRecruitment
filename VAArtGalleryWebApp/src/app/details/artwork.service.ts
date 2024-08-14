import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtWork } from './models';

@Injectable({
  providedIn: 'root'
})
export class ArtWorkService {
  private baseUrl = 'http://localhost:7042/api/art-work'
  constructor(private http: HttpClient) { }

  getArtWorks(galleryId: string): Observable<Array<ArtWork>> {
    const url = `${this.baseUrl}/${galleryId}`;
    console.log(url);
    return this.http.get<Array<ArtWork>>(url);
  }

}
