import { Character } from './character.model';

export interface AppState {
  search: SearchState;
  // Adicione outros estados aqui, se necessário
}

export interface SearchState {
  characters: Character[];
  loading: boolean;
  error: any;
}
