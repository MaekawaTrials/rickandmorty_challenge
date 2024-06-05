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
  @Input() isFavorite:boolean = false;
  @Input() launchAnimation:boolean = false;
  private delayApplied:number = 0;

  constructor(private store: Store<AppState>) {}

  addToFavorites() {
    this.launchAnimation = true;
    this.store.dispatch(addFavorite({ character: this.character }));
  }

  removeFromFavorites() {
    this.launchAnimation = true;
    this.store.dispatch(removeFavorite({ id: this.character.id }));
  }

  getRandomDelay(): number {
    if(this.delayApplied==0){
      this.delayApplied = Math.floor(Math.random() * 800) + 1;
    }
    return this.delayApplied; 
  }
}
