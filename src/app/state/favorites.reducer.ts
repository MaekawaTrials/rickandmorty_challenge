import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Character } from './character.model';

export const initialState: Character[] = [];

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorite, (state, { character }) => [...state, character]),
  on(FavoritesActions.removeFavorite, (state, { id }) => state.filter(character => character.id !== id)),
  on(FavoritesActions.setFavorites, (state, { favorites }) => favorites)
);
