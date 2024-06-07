import { createReducer, on } from '@ngrx/store';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure, loadMoreCharacters } from './search.actions';
import { Character } from './character.model';

export interface SearchState {
  query: string;
  characters: Character[];
  loading: boolean;
  error: any;
  page: number;
  totalPages: number;
}

export const initialState: SearchState = {
  query: '',
  characters: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1
};

export const searchReducer = createReducer(
  initialState,
  on(searchCharacters, (state, { query }) => {
    console.log('searchCharacters action', { query, state });
    return {
      ...state,
      query,
      characters: [],
      loading: true,
      error: null,
      page: 1,
      totalPages: 1
    };
  }),
  on(searchCharactersSuccess, (state, { characters, totalPages }) => {
    console.log('searchCharactersSuccess action', { characters, totalPages, state });
    return {
      ...state,
      characters: state.characters.concat(characters),
      loading: false,
      totalPages
    };
  }),
  on(searchCharactersFailure, (state, { error }) => {
    console.log('searchCharactersFailure action', { error, state });
    return {
      ...state,
      loading: false,
      error
    };
  }),
  on(loadMoreCharacters, (state) => {
    console.log('loadMoreCharacters action', { state });
    return {
      ...state,
      loading: true,
      page: state.page + 1
    };
  })
);
