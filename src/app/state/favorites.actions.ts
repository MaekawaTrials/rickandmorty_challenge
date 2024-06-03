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
