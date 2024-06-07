import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { searchCharacters, loadMoreCharacters } from 'src/app/state/search.actions';
import { selectSearchResults, selectSearchLoading, selectSearchQuery, selectHasMoreCharacters } from 'src/app/state/search.selectors';

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
  hasMoreCharacters$: Observable<boolean>;
  private searchSubject = new Subject<string>();

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.isLoading$ = this.store.pipe(select(selectSearchLoading));
    this.currentSearchTerm$ = this.store.pipe(select(selectSearchQuery));
    this.hasMoreCharacters$ = this.store.pipe(select(selectHasMoreCharacters));
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.store.dispatch(searchCharacters({ query: term })))
    ).subscribe();

    const initialSearch = localStorage.getItem('lastSearchTerm') || '';
    this.searchSubject.next(initialSearch);
  }

  ngAfterViewInit(): void {
    if (this.searchBox) {
      this.searchBox.focusInput();
    }
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
