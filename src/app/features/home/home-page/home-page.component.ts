import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, delay, map, scan, shareReplay, switchMap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { searchCharacters } from 'src/app/state/search.actions';
import { selectSearchResults, selectSearchQuery } from 'src/app/state/search.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox!: SearchBoxComponent;

  searchResults$: Observable<Character[]>;
  favorites$: Observable<Character[]>;
  private initialSearch: string = '';
  private minLoadingTime: number = 500;
  isLoading: boolean = false;
  currentSearchTerm$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.currentSearchTerm$ = this.store.pipe(select(selectSearchQuery));
  }

  ngOnInit(): void {
    this.store.dispatch(searchCharacters({ query: this.initialSearch }));
  }

  ngAfterViewInit(): void {
    this.searchBox.focusInput();
  }
  
  onSearch(term: string) {
    this.store.dispatch(searchCharacters({ query: term }));
  }

  isFavorite(character: Character, favorites: Character[]): boolean {
    return favorites.some(fav => fav.id === character.id);
  }
}
