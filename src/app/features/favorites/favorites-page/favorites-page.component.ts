import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent {
  favorites$: Observable<Character[]>;

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
  }
}
