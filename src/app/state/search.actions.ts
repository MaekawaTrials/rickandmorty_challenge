import { createAction, props } from '@ngrx/store';
import { Character } from './character.model';

export const searchCharacters = createAction(
  '[Search] Search Characters',
  props<{ query: string }>()
);

export const searchCharactersSuccess = createAction(
  '[Search] Search Characters Success',
  props<{ characters: Character[] }>()
);

export const searchCharactersFailure = createAction(
  '[Search] Search Characters Failure',
  props<{ error: any }>()
);
