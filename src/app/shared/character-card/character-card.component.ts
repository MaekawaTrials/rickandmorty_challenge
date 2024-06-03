import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from 'src/app/state/character.model';
import { addFavorite, removeFavorite } from 'src/app/state/favorites.actions';
import { AppState } from 'src/app/state';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() isFavorite = false;

  constructor(private store: Store<AppState>) {}

  addToFavorites() {
    this.store.dispatch(addFavorite({ character: this.character }));
  }

  removeFromFavorites() {
    this.store.dispatch(removeFavorite({ id: this.character.id }));
  }
}
