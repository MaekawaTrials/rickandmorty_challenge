import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.characters
);

export const selectSearchQuery = createSelector(
  selectSearchState,
  (state: SearchState) => state.query
);

export const selectSearchError = createSelector(
  selectSearchState,
  (state: SearchState) => state.error
);
