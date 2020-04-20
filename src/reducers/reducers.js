import cardsReducer from './cardsReducer';
import visibilityFilter from './visibilityFilter';
import notificationsReducer from './notificationsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cards: cardsReducer,
    visibility: visibilityFilter,
    notifications: notificationsReducer
});

export default reducers;
