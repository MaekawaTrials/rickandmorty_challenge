// home-page.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, delay, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { searchCharacters, loadMoreCharacters } from 'src/app/state/search.actions';
import { selectSearchResults, selectSearchLoading, selectSearchQuery } from 'src/app/state/search.selectors';

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
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox!: SearchBoxComponent;

  searchResults$: Observable<Character[]> = of([]);
  favorites$: Observable<Character[]>;
  isLoading$: Observable<boolean>;
  currentSearchTerm$: Observable<string>;
  private initialSearch: string = '';
  private searchSubject = new Subject<string>();

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.isLoading$ = this.store.pipe(select(selectSearchLoading));
    this.currentSearchTerm$ = this.store.pipe(select(selectSearchQuery));
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.store.dispatch(searchCharacters({ query: term })))
    ).subscribe();

    this.searchBox.searchTerm$.next(this.initialSearch);
  }

  ngAfterViewInit(): void {
    this.searchBox.focusInput();
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  onLoadMore() {
    this.store.dispatch(loadMoreCharacters());
  }

  isFavorite(character: Character, favorites: Character[]): boolean {
    return favorites.some(fav => fav.id === character.id);
  }
}
