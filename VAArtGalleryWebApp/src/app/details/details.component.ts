import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from './artwork.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtWork } from './models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class GalleryDetailsComponent implements OnInit {
  galleryId: string | null = null;
  displayedColumns: string[] = ['name', 'author', 'year', 'price'  ];
  artWorks: ArtWork[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtWorkService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('id');

    if(this.galleryId != null){
      var result =  this.artworkService.getArtWorks(this.galleryId)
      result.subscribe({
      next: (artworks) => this.artWorks = artworks,
      error: (err) => console.error('Error fetching artworks', err)
      });    
    }
    
  }
  returToMainPage(){
    this.router.navigate(['art-galleries']);
  }


}
