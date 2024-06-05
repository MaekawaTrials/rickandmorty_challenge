import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, scan, shareReplay, switchMap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';

interface SearchCache {
  [key: string]: Character[];
}

interface SearchState {
  cache: SearchCache;
  current: Character[];
  term: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  searchTerm$ = new Subject<string>();
  searchResults$: Observable<Character[]> = of([]);
  favorites$: Observable<Character[]>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
    
    this.searchResults$ = this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 3),
      scan((state: SearchState, term: string) => {
        if (state.cache[term]) {
          return { ...state, current: state.cache[term], term };
        }
        return { ...state, current: [], term };
      }, { cache: {}, current: [], term: '' } as SearchState),
      switchMap(state => {
        if (state.current.length > 0) {
          return of(state.current);
        }
        return this.searchCharacters(state.term).pipe(
          map(results => {
            state.cache[state.term] = results;
            return results;
          }),
          catchError(() => of([]))
        );
      }),
      catchError(() => of([])),
      shareReplay(1)
    );

    this.searchResults$.subscribe(results => {
      console.log('Resultados da pesquisa:', results);
    });
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Character[]>(`https://rickandmortyapi.com/api/character/?name=${term}`).pipe(
      map((response: any) => response.results || [])
    );
  }

  isFavorite(character: Character, favorites: Character[]): boolean {
    return favorites.some(fav => fav.id === character.id);
  }


}
