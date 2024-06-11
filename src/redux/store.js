import { devToolsEnhancer } from '@redux-devtools/extension';
import { createStore, combineReducers } from 'redux';
import { nanoid } from 'nanoid';

const initialState = {
  phonenote: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filters: { status: 'all' },
};
const initialPhoneState = {
  book: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const initialFilterState = { filters: { status: 'all' } };
// const addContact = {
//   type: 'phonenote/add',
//   payload: { id: nanoid(), name: 'name', number: 'number' },

// };

export const addContact = (name, number) => {
  return {
    type: 'phonenote/add',
    payload: { id: nanoid(), name: name, number: number },
  };
};

export const delContact = id => {
  return {
    type: 'phonenote/del',
    payload: id,
  };
};

export const filtrContact = arr => {
  return {
    type: 'phonenote/filtr',
    payload: arr,
  };
};

const phonenoteReducer = (state = initialPhoneState, action) => {
  console.log('state in reducer', state);
  switch (action.type) {
    case 'phonenote/add':
      state.book.push(action.payload);
      return { ...state, book: state.book };
    case 'phonenote/del':
      return { book: state.book.filter(el => el.id !== action.payload) };
    case 'phonenote/filtr':
      return { book: action.payload };
    default:
      return state;
  }
};

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case 'filter':
      return { filter: { status: 'all' } };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  phonenote: phonenoteReducer,
  filters: filterReducer,
});

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
