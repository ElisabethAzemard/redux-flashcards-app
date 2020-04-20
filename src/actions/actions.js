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

export const ROTATE_CARD = 'ROTATE_CARD';

export function rotateCard(id) {
    return { type: ROTATE_CARD, id: id };
}

export const TOGGLE_SUCCESS_MESSAGE = 'TOGGLE_SUCCESS_MESSAGE';

export function toggleSuccessMessage() {
    return { type: TOGGLE_SUCCESS_MESSAGE };
}
