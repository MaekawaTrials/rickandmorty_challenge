import { createReducer, on } from '@ngrx/store';
import { Character } from './character.model';
import { addFavorite, removeFavorite, setFavorites } from './favorites.actions';

export interface FavoritesState {
  favorites: Character[];
}

export const initialState: FavoritesState = {
  favorites: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { character }) => ({
    ...state,
    favorites: [...state.favorites, character]
  })),
  on(removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(character => character.id !== id)
  })),
  on(setFavorites, (state, { favorites }) => ({
    ...state,
    favorites
  }))
);
