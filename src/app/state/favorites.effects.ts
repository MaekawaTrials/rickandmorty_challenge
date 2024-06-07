import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, of } from 'rxjs';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure } from './search.actions';
import { Character } from './character.model';
import { AppState } from './app.state';
import { Observable } from 'rxjs';

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
      switchMap(({ query }) => this.fetchAllCharacters(query).pipe(
        map(characters => searchCharactersSuccess({ characters })),
        catchError(error => of(searchCharactersFailure({ error })))
      ))
    )
  );

  fetchAllCharacters(query: string, page: number = 1, accumulatedCharacters: Character[] = []): Observable<Character[]> {
    const url = query.length === 0
      ? `https://rickandmortyapi.com/api/character/?page=${page}`
      : `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`;

    return this.http.get<{ info: { next: string }, results: Character[] }>(url).pipe(
      switchMap(response => {
        const newCharacters = accumulatedCharacters.concat(response.results);
        if (response.info.next) {
          return this.fetchAllCharacters(query, page + 1, newCharacters);
        } else {
          return of(newCharacters);
        }
      })
    );
  }
}
