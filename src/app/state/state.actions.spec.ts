import * as fromActions from './favorites.actions';
import { Character } from './character.model';

describe('Favorites Actions', () => {
  it('should create an action to add a favorite', () => {
    const character: Character = {
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
    };

    const action = fromActions.addFavorite({ character });
    expect(action.type).toEqual('[Favorites] Add Favorite');
    expect(action.character).toEqual(character);
  });

  it('should create an action to remove a favorite', () => {
    const id = 1;

    const action = fromActions.removeFavorite({ id });
    expect(action.type).toEqual('[Favorites] Remove Favorite');
    expect(action.id).toEqual(id);
  });
});
