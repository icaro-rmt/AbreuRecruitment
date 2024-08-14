import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from './artwork.service';
import { ActivatedRoute } from '@angular/router';
import { ArtWork } from './models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class GalleryDetailsComponent implements OnInit {

  galleryId: string | null = null;
  artWorks: Array<ArtWork> | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtWorkService
  ){}


  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('id');

    if(this.galleryId != null){
     var result =  this.artworkService.getArtWorks(this.galleryId);
     console.log(result);
      
      // .subscribe(
      //   artWorks =>{
      //     this.artWorks = artWorks;
      //   },
      //   error => console.error("Error loading Art Works", error)
      // )
      console.log(this.artWorks);
    }
    
  }


}
