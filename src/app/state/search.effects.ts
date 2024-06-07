import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure, loadMoreCharacters } from './search.actions';
import { Character } from './character.model';
import { Store } from '@ngrx/store';
import { AppState } from '.';

@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  searchCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCharacters),
      mergeMap(action =>
        this.fetchCharacters(action.query, 1).pipe(
          map(response => searchCharactersSuccess({ characters: response.results, totalPages: response.info.pages })),
          catchError(error => of(searchCharactersFailure({ error })))
        )
      )
    )
  );

  loadMoreCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreCharacters),
      withLatestFrom(this.store.select(state => state.search)),
      mergeMap(([action, searchState]) =>
        this.fetchCharacters(searchState.query, searchState.page).pipe(
          map(response => searchCharactersSuccess({ characters: [...searchState.characters, ...response.results], totalPages: response.info.pages })),
          catchError(error => of(searchCharactersFailure({ error })))
        )
      )
    )
  );

  fetchCharacters(query: string, page: number): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`);
  }
}
