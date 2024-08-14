import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'art-galleries', component: GalleryComponent },
  { path: 'art-galleries/details/:id', component: GalleryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
