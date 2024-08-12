import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gallery, GalleryDto } from '../../gallery/models';
import { GalleryService } from '../../gallery/gallery.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() gallery: GalleryDto = {name:'', city:'', manager:'', nbrOfArtWorksOnDisplay:0}
  @Output() close = new EventEmitter<void>();

  constructor(private galleryService: GalleryService){}

  onSubmit() {
      this.galleryService.createGallery(this.gallery).subscribe(() => {
        this.closeModal();
      });    
  }

  closeModal() {
    this.close.emit();
  }

}
