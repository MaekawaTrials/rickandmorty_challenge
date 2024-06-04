import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';
import { Character } from './character.model';

export interface AppState {
  favorites: Character[];
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: fromFavorites.favoritesReducer
};

export const selectFavoritesState = createFeatureSelector<AppState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: AppState) => state.favorites || []
);

export const selectFavoritesCount = createSelector(
  selectAllFavorites,
  (favorites: Character[]) => favorites.length
);
