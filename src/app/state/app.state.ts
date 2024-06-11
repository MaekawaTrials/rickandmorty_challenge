import { Character } from './character.model';
import { FavoritesState } from './favorites.reducer';
import { SearchState } from './search.reducer';

export interface AppState {
  search: SearchState;
  favorites: FavoritesState;
}
