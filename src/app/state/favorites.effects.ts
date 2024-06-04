import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { addFavorite, removeFavorite, setFavorites, loadFavoritesFromLocalStorage } from './favorites.actions';
import { Character } from './character.model';
import { AppState } from './index';

@Injectable()
export class FavoritesEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoritesFromLocalStorage),
      tap(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.length > 0) {
          this.store.dispatch(setFavorites({ favorites }));
        }
      })
    ),
    { dispatch: false }
  );

  saveFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFavorite, removeFavorite),
      tap(() => {
        this.store.select('favorites').subscribe((favorites: Character[]) => {
          localStorage.setItem('favorites', JSON.stringify(favorites));
        });
      })
    ),
    { dispatch: false }
  );
}
