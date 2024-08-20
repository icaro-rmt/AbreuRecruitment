import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtWork } from './models';

@Injectable({
  providedIn: 'root'
})
export class ArtWorkService {
  private baseUrl = 'http://localhost:5184/api/art-work'
  constructor(private http: HttpClient) { }

  getArtWorks(galleryId: string): Observable<ArtWork[]> {
    const url = `${this.baseUrl}/${galleryId}`;
    console.log(url);
    var result = this.http.get<ArtWork[]>(url);
    
    return result;
  }
  
  teste: ArtWork[] = [{
    id: "4ea72d5b-ef7c-4492-91ca-744ca896a73e",
    name: "A persistência da amnésia",
    author: "Salvador Daqui",
    creationYear: 1931,
    askPrice: 150000000
  },
  {
    id: "6b81da53-f5d5-48b5-b9da-5d50129651e5",
    name: "Moças do Tahiti",
    author: "Paulo Gogã",
    creationYear: 1891,
    askPrice: 45000000
  },
  {
    id: "47cd0c50-db2c-4234-a30e-83a8d77f49a4",
    name: "Caveira",
    author: "João Miguel Basqueiro",
    creationYear: 1981,
    askPrice: 35000000
  }]

}
