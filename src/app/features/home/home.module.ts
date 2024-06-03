import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CharacterCardComponent } from './character-card/character-card.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CharacterCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }