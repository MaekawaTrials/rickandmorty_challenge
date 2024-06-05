import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class FavoritesModule {}
