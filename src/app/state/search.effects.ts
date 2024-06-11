import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { searchCharacters, searchCharactersSuccess, searchCharactersFailure, loadMoreCharacters } from './search.actions';
import { Character } from './character.model';
import { Store } from '@ngrx/store';
import { AppState } from '.';
import { SearchCacheService } from './search-cache.service';

@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private cacheService: SearchCacheService
  ) {}

  searchCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCharacters),
      mergeMap(action => {
        console.log('searchCharacters effect', { action });
        const cachedResults = this.cacheService.getResults(action.query);
        if (cachedResults) {
          console.log('Using cached results for query:', action.query);
          return of(searchCharactersSuccess({ characters: cachedResults.results, totalPages: cachedResults.totalPages }));
        } else {
          return this.fetchCharacters(action.query, 1).pipe(
            map(response => {
              console.log('API response for searchCharacters', { response });
              this.cacheService.setResults(action.query, response.results, response.info.pages);
              return searchCharactersSuccess({ characters: response.results, totalPages: response.info.pages });
            }),
            catchError(error => of(searchCharactersFailure({ error })))
          );
        }
      })
    )
  );

  loadMoreCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreCharacters),
      withLatestFrom(this.store.select(state => state.search)),
      mergeMap(([action, searchState]) => {
        console.log('loadMoreCharacters effect', { searchState });
        return this.fetchCharacters(searchState.query, searchState.page).pipe( // Alterado de searchState.page + 1 para searchState.page
          map(response => {
            console.log('API response for loadMoreCharacters', { response });
            return searchCharactersSuccess({ characters: response.results, totalPages: response.info.pages });
          }),
          catchError(error => of(searchCharactersFailure({ error })))
        );
      })
    )
  );

  fetchCharacters(query: string, page: number): Observable<any> {
    console.log('fetchCharacters called', { query, page });
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`);
  }
}
