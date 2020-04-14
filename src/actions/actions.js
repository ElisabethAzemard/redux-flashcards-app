export const ADD_CARD = 'ADD_CARD';

export function addCard(question, answer) {
    return { type: ADD_CARD, question: question, answer: answer };
}

export const REMOVE_CARD = 'REMOVE_CARD';

export function removeCard(id) {
    return { type: REMOVE_CARD, id: id };
}

export const SHOW_ALL = 'SHOW_ALL';

export function showAll() {
    return { type: SHOW_ALL };
}

export const SHOW_CARD = 'SHOW_CARD';

export function showCard(id) {
    return { type: SHOW_CARD, id: id };
}

export const ROTATE_CARD = 'ROTATE_CARD';

export function rotateCard(id, rectoShown) {
    return { type: ROTATE_CARD, id: id, rectoShown: rectoShown };
}
