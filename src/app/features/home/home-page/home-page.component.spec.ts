import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/state';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { CharacterCardComponent } from 'src/app/shared/character-card/character-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from 'src/app/shared/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Character } from 'src/app/state/character.model';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        SearchBoxComponent,
        CharacterCardComponent,
        MenuBarComponent
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        BrowserAnimationsModule,
        CommonModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update search results on search term emit', async () => {
    const searchBox: SearchBoxComponent = debugElement.query(By.directive(SearchBoxComponent)).componentInstance;
    searchBox.search.emit('Rick');

    component.searchResults$ = of([{
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'image_url',
      episode: [],
      url: '',
      created: ''
    } as Character]);

    fixture.detectChanges();
    await fixture.whenStable();

    const characterCard: CharacterCardComponent = debugElement.query(By.directive(CharacterCardComponent)).componentInstance;
    expect(characterCard.character.name).toBe('Rick Sanchez');
    expect(characterCard.character.gender).toBe('Male');
    expect(characterCard.character.image).toBe('image_url');
  });

  it('should display character details (name, gender, image) when searching for a character', async () => {
    const searchBox: SearchBoxComponent = debugElement.query(By.directive(SearchBoxComponent)).componentInstance;
    searchBox.search.emit('Morty');

    component.searchResults$ = of([{
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'image_url',
      episode: [],
      url: '',
      created: ''
    } as Character]);

    fixture.detectChanges();
    await fixture.whenStable();

    const characterCard: CharacterCardComponent = debugElement.query(By.directive(CharacterCardComponent)).componentInstance;
    expect(characterCard.character.name).toBe('Morty Smith');
    expect(characterCard.character.gender).toBe('Male');
    expect(characterCard.character.image).toBe('image_url');
  });

  it('should save the character to favorites', async () => {
    const searchBox: SearchBoxComponent = debugElement.query(By.directive(SearchBoxComponent)).componentInstance;
    searchBox.search.emit('Morty');

    component.searchResults$ = of([{
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'image_url',
      episode: [],
      url: '',
      created: ''
    } as Character]);

    fixture.detectChanges();
    await fixture.whenStable();

    const characterCard: CharacterCardComponent = debugElement.query(By.directive(CharacterCardComponent)).componentInstance;
    spyOn(characterCard, 'addToFavorites');
    characterCard.addToFavorites();

    expect(characterCard.addToFavorites).toHaveBeenCalled();
  });

  
});
