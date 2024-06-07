import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesReducer, FavoritesState } from './favorites.reducer';
import { searchReducer, SearchState } from './search.reducer';
import { Character } from './character.model';

export interface AppState {
  search: SearchState;
  favorites: FavoritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  search: searchReducer,
  favorites: favoritesReducer
};

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.favorites
);

export const selectFavoritesCount = createSelector(
  selectAllFavorites,
  (favorites: Character[]) => favorites.length
);
