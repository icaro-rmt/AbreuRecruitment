import { Component, OnInit } from '@angular/core';
import { Gallery } from './models';
import { GalleryService } from './gallery.service';



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

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    console.log('cenas');
    this.galleryService.getGalleries().subscribe(
      galleries => {
        this.galleries = galleries;
        console.log(this.galleries);
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
    console.log(galleryId);
  }

  closeModal(){
    this.showModal = false;
    this.selectedGallery = null;
    this.ngOnInit();
  }
}
