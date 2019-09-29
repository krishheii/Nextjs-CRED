import {
  CREATE_USER,
  DELETE_USER,
  EDIT_USER
} from '../actions/type';

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter(item => item != state[action.payload])
    case EDIT_USER:
      return state.map(function(item) { return item == state[action.payload[0]] ? action.payload[1] : item; });
    default:
      return state;
  }
};