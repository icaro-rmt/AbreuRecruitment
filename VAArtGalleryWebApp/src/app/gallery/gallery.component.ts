import { Component, OnInit } from '@angular/core';
import { Gallery } from './models';
import { GalleryService } from './gallery.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {
  galleries: Gallery[] = [];
  displayedColumns: string[] = ['name', 'city', 'manager', 'nbrWorks', 'actions'];
  showModal: boolean = false;
  selectedGallery: Gallery | null = null;

  constructor(
    private galleryService: GalleryService,
    private router: Router) { }

  ngOnInit(): void {
    this.galleryService.getGalleries().subscribe(
      galleries => {
        this.galleries = galleries;
      });
  }
  createNewGallery() {
    this.selectedGallery = {id:'', name: '', city: '', manager: '', nbrOfArtWorksOnDisplay: 0 };
    this.showModal = true;
  }

  editGalleryClick(galleryId: string) {
    console.log(galleryId);
  }

  openArtWorksList(galleryId: string) {
    this.router.navigate(['art-galleries/details', galleryId]);
    
  }

  closeModal(){
    this.showModal = false;
    this.selectedGallery = null;
    this.ngOnInit();
  }
}
