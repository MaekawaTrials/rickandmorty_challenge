import { createAction, props } from '@ngrx/store';
import { Character } from './character.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ character: Character }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ id: number }>()
);

export const setFavorites = createAction(
  '[Favorites] Set Favorites',
  props<{ favorites: Character[] }>()
);

export const loadFavoritesFromLocalStorage = createAction('[Favorites] Load Favorites from LocalStorage');
