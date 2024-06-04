import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/state';
import { MatCardModule } from '@angular/material/card';
import { Character } from 'src/app/state/character.model';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterCardComponent],
      imports: [
        StoreModule.forRoot(reducers),
        MatCardModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: { name: 'Citadel of Ricks', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    } as Character;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
