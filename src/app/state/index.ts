import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';

export interface AppState {
  favorites: fromFavorites.Character[];
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: fromFavorites.favoritesReducer
};

export const selectFavoritesState = createFeatureSelector<AppState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: AppState) => state.favorites
);

export const selectFavoritesCount = createSelector(
  selectFavoritesState,
  (state: AppState) => state.favorites.length
);
