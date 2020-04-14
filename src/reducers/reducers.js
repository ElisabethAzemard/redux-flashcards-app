import cardsReducer from './cardsReducer';
import visibilityFilter from './visibilityFilter';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cards: cardsReducer,
    visibility: visibilityFilter
});

export default reducers;
