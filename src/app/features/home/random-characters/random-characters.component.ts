import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../../state/character.model';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-random-characters',
  templateUrl: './random-characters.component.html',
  styleUrls: ['./random-characters.component.scss']
})

export class RandomCharactersComponent implements OnInit {
  characters$: Observable<Character[]> = of([]);
  @Input() numberOfCharacters: number = 3;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.characters$ = this.fetchAllCharacters().pipe(
      map(characters => this.getRandomCharacters(characters, this.numberOfCharacters))
    );
  }

  fetchAllCharacters(): Observable<Character[]> {
    const url = 'https://rickandmortyapi.com/api/character/';
    return this.http.get<any>(url).pipe(
      map(response => response.results),
      catchError(() => of([]))
    );
  }

  getRandomCharacters(characters: Character[], count: number): Character[] {
    const shuffled = characters.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
