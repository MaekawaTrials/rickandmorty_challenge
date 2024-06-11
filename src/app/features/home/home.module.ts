import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RandomCharactersComponent } from './random-characters/random-characters.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    RandomCharactersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class HomeModule {}
