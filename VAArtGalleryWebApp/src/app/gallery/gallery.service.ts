import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery, GalleryDto } from './models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseUrl = 'https://localhost:7042/api/art-galleries'
  constructor(private http: HttpClient) { }

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.baseUrl}`);
  }
  
  createGallery(data: GalleryDto): Observable<Gallery[]>{
    return this.http.post<Gallery[]>(`${this.baseUrl}`, data);
  }

  updateGallery(data: GalleryDto): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.baseUrl}`);
  }
  
}
