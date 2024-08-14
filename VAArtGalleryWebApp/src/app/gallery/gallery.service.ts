import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery, GalleryDto } from './models';
import { ArtWork } from '../details/models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseUrl = 'http://localhost:5184/api/art-galleries'
  private baseUrl2 = 'http://localhost:5184/api/art-work'
  constructor(private http: HttpClient) { }

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.baseUrl}`);
  }
  
  getArtWorks(galleryId: string): Observable<Array<ArtWork>> {
    const url = `${this.baseUrl2}/${galleryId}`;
    console.log(url);
    return this.http.get<Array<ArtWork>>(url);
  }

  createGallery(data: GalleryDto): Observable<Gallery[]>{
    // return this.http.post<Gallery>(`${this.baseUrl}`,data);
    console.log("Sending data to Create Gallery", data);
    return this.http.post<Gallery[]>(`${this.baseUrl}`, data);
  }

  updateGallery(data: GalleryDto): Observable<Gallery[]> {
    // return this.http.put<Gallery[]>(`${this.baseUrl}`,data);
    console.log("Sending data to Create Gallery", data);
    return this.http.get<Gallery[]>(`${this.baseUrl}`);
    
  }
}
