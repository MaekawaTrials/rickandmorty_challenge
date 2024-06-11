import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.characters
);

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading
);

export const selectSearchQuery = createSelector(
  selectSearchState,
  (state: SearchState) => state.query
);

export const selectHasMoreCharacters = createSelector(
  selectSearchState,
  (state: SearchState) => state.page < state.totalPages
);
