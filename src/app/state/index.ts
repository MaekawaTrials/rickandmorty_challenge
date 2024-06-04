import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';
import { Character } from './character.model';

export interface AppState {
  favorites: Character[];
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: fromFavorites.favoritesReducer
};

export const selectFavoritesState = createFeatureSelector<Character[]>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (favorites) => {
    return favorites || [];
  }
);

export const selectFavoritesCount = createSelector(
  selectAllFavorites,
  (favorites: Character[]) => {
    return favorites.length;
  }
);
