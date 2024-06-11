import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Character } from './character.model';
import { AppState } from './app.state';
import { addFavorite, removeFavorite, loadFavoritesFromLocalStorage, setFavorites } from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoritesFromLocalStorage),
      map(() => {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
      }),
      map((favorites: Character[]) => setFavorites({ favorites }))
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFavorite),
      switchMap(() =>
        this.store.select(state => state.favorites.favorites).pipe(
          map(favorites => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            return { type: '[Favorites] Add Favorite Success' };
          })
        )
      )
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFavorite),
      switchMap(() =>
        this.store.select(state => state.favorites.favorites).pipe(
          map(favorites => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            return { type: '[Favorites] Remove Favorite Success' };
          })
        )
      )
    )
  );
}
