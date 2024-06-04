import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Character } from 'src/app/state/character.model';
import { AppState, selectAllFavorites } from 'src/app/state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  searchResults$: Observable<Character[]> = of([]);
  favorites$: Observable<Character[]>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.favorites$ = this.store.pipe(select(selectAllFavorites));
  }

  onSearch(term: string) {
    this.searchResults$ = of(term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => this.searchCharacters(searchTerm))
    );
  }

  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Character[]>(`https://rickandmortyapi.com/api/character/?name=${term}`).pipe(
      map((response: any) => response.results || []),
      catchError(() => of([]))
    );
  }

  isFavorite(character: Character, favorites: Character[]): boolean {
    return favorites.some(fav => fav.id === character.id);
  }
}
