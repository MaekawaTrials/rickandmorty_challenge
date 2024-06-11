import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Character } from 'src/app/state/character.model';
import { addFavorite, removeFavorite } from 'src/app/state/favorites.actions';
import { AppState, selectAllFavorites } from 'src/app/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent  implements OnChanges {
  @Input() character!: Character;
  @Input() isFavorite:boolean = false;
  @Input() launchAnimation:boolean = false;
  private delayApplied:number = 0;

  favorites$: Observable<Character[]>;

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      this.checkIfFavorite();
    }
  }


  checkIfFavorite(): void {
    this.favorites$.pipe(
      map(favorites => favorites.some(fav => fav.id === this.character.id))
    ).subscribe(isFav => this.isFavorite = isFav);
  }

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
