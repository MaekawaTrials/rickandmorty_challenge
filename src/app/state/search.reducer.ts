import { createReducer, on } from '@ngrx/store';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure } from './search.actions';
import { Character } from './character.model';

export interface SearchState {
  characters: Character[];
  query: string;
  error: any;
}

export const initialState: SearchState = {
  characters: [],
  query: '',
  error: null
};

export const searchReducer = createReducer(
  initialState,
  on(searchCharacters, (state, { query }) => ({ ...state, query })),
  on(searchCharactersSuccess, (state, { characters }) => ({ ...state, characters })),
  on(searchCharactersFailure, (state, { error }) => ({ ...state, error }))
);
