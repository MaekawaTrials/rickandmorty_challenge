import * as fromReducer from './favorites.reducer';
import * as fromActions from './favorites.actions';
import { Character } from './character.model';

describe('Favorites Reducer', () => {
  it('should return the default state', () => {
    const { initialState, favoritesReducer } = fromReducer;
    const action = {} as any;
    const state = favoritesReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a favorite to the state', () => {
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

    const { initialState, favoritesReducer } = fromReducer;
    const action = fromActions.addFavorite({ character });
    const state = favoritesReducer(initialState, action);

    expect(state).toEqual([character]);
  });

  it('should remove a favorite from the state', () => {
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

    const { initialState, favoritesReducer } = fromReducer;
    const addAction = fromActions.addFavorite({ character });
    let state = favoritesReducer(initialState, addAction);

    const removeAction = fromActions.removeFavorite({ id: character.id });
    state = favoritesReducer(state, removeAction);

    expect(state).toEqual([]);
  });
});
