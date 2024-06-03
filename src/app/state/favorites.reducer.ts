import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';
import { Character } from './character.model';

export const initialState: Character[] = [];

const _favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { character }) => [...state, character]),
  on(removeFavorite, (state, { id }) => state.filter(character => character.id !== id))
);

export function favoritesReducer(state: any, action: any) {
  return _favoritesReducer(state, action);
}
