import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure } from './search.actions';
import { Character } from './character.model';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  searchCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(searchCharacters),
    mergeMap(action =>
      this.http.get<Character[]>(`https://rickandmortyapi.com/api/character/?name=${action.query}`).pipe(
        map((response: any) => searchCharactersSuccess({ characters: response.results || [] })),
        catchError(error => of(searchCharactersFailure({ error })))
      )
    )
  ));
}
