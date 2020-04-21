import cardsReducer from './cardsReducer';
import visibilityFilter from './visibilityFilter';
import setFormState from './formReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cards: cardsReducer,
    visibility: visibilityFilter,
    form: setFormState
});

export default reducers;
