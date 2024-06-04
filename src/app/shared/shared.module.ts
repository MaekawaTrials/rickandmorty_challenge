import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    RouterModule
  ],
  declarations: [
    MenuBarComponent,
    CharacterCardComponent
  ],
  exports: [
    MenuBarComponent,
    CharacterCardComponent
  ]
})
export class SharedModule {}
