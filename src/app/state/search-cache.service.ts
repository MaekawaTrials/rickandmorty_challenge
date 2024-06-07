import { Injectable } from '@angular/core';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class SearchCacheService {
  private cache: { [query: string]: { results: Character[], totalPages: number } } = {};

  getResults(query: string): { results: Character[], totalPages: number } | null {
    return this.cache[query] || null;
  }

  setResults(query: string, results: Character[], totalPages: number): void {
    this.cache[query] = { results, totalPages };
  }
}
