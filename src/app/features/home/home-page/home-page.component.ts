import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, delay, map, scan, shareReplay, switchMap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';
import { SearchBoxComponent } from '../search-box/search-box.component';

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

export class HomePageComponent  implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox!: SearchBoxComponent;

  searchTerm$ = new Subject<string>();
  searchResults$: Observable<Character[]> = of([]);
  favorites$: Observable<Character[]>;
  private initialSearch:string = '';
  private minLoadingTime:number = 500;
  isLoading:boolean = false;
  currentSearchTerm:string = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
    
    this.searchResults$ = this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      //filter(term => term.length >= 3),
      scan((state: SearchState, term: string) => {
        this.currentSearchTerm = term;
        if (state.cache[term]) {
          return { ...state, current: state.cache[term], term };
        }
        return { ...state, current: [], term };
      }, { cache: {}, current: [], term: '' } as SearchState),
      switchMap(state => {
        if (state.current.length > 0) {
          this.isLoading = false;
          return of(state.current);
        }
        this.isLoading = true;
        return this.searchCharacters(state.term).pipe(
          delay(this.minLoadingTime),
          map(results => {
            state.cache[state.term] = results;
            this.isLoading = false;
            return results;
          }),
          catchError(() => {
            this.isLoading = false;
            return of([]);
          })
        );
      }),
      catchError(() => {
        this.isLoading = false;
        return of([]);
      }),
      shareReplay(1)
    );

    this.searchResults$.subscribe(results => {
      //console.log('Resultados da pesquisa:', results);
    });
  }

  ngOnInit(): void {
    this.searchTerm$.next(this.initialSearch);
  }

  ngAfterViewInit(): void {
    this.searchBox.focusInput();
  }
  
  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  searchCharacters(term: string): Observable<Character[]> {
    let URL = `https://rickandmortyapi.com/api/character/?name=${term}`
    if (term.length == 0)
      URL = 'https://rickandmortyapi.com/api/character'

    return this.http.get<Character[]>(URL).pipe(
      map((response: any) => response.results || [])
    );
  }

  isFavorite(character: Character, favorites: Character[]): boolean {
    return favorites.some(fav => fav.id === character.id);
  }


}
