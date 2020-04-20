require('./style.scss');

import store from './store/store';
import { addCard, removeCard, rotateCard, toggleSuccessMessage } from './actions/actions';

console.log(store.getState());

// ------ HTML references ------
let cardsUList = document.getElementById('cards');
let lessonCardsUList = document.getElementById('lesson');
let addCardForm = document.getElementById('addCard');
let addCardFormNotification = document.getElementById('addCardFormSuccessMessage');
let addCardButton = document.getElementById('addCardButton');
let addCardQuestion = addCardForm['question'];
let addCardAnswer = addCardForm['answer'];

// ------ Redux ------
store.subscribe(() => {
    rendercards();
    renderstack();
    renderSuccessMessage();
});

function rendercards() {
    let cards = store.getState().cards;
    cardsUList.innerHTML = '';
    cards.map((card, index) => {
        let cardItem = `
      <li class="column is-one-third">
        <div class="message is-primary">
            <div class="message-header">
                <p>${card.question}</p>
                <button data-id="${index}" class="delete"></button>
            </div>
            <div class="message-body">
                <span>${card.answer}</span>
            </div>
        </div>
      </li>
    `;
        cardsUList.innerHTML += cardItem;
    });

    setDeleteCardButtonsEventListeners();
}

function renderstack() {
    let lessonCards = store.getState().cards;

    lessonCardsUList.innerHTML = '';
    lessonCards.forEach((card, index) => {
        let lessoncardItem = `
        <div data-id="${index}" class="column is-one-third vertical${card.rotated ? ' rotated' : ''}">
            <div class="notification is-primary face flip ">
                <p><b>${card.question}</b></p>
            </div>
            <div class="notification is-primary face flop">
                <p><b>${card.answer}</b></p>
            </div>
        </div>
            `;
        lessonCardsUList.innerHTML += lessoncardItem;
    });

    setRotateCardButtonsEventListeners();
}

function renderSuccessMessage() {
    let notifications = store.getState().notifications;

    notifications.forEach((notif) => {
        if (notif.displayed) {
            addCardFormNotification.innerHTML = `<div class="notification is-success is-light">${notif.message}</div>`;
        } else {
            addCardFormNotification.innerHTML = '';
        }
    });
}

// ------ Event Listeners ------
addCardForm.addEventListener('input', () => {
    if (addCardQuestion.value && addCardAnswer.value) {
        addCardButton.disabled = false;
    }
});

addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let question = addCardQuestion.value;
    let answer = addCardAnswer.value;

    if (question && answer) {
        store.dispatch(addCard(question, answer));
        store.dispatch(toggleSuccessMessage());
    }

    addCardButton.classList.add('is-success');
    setTimeout(resetForm, 2000);
});

function setDeleteCardButtonsEventListeners() {
    let buttons = document.querySelectorAll('ul#cards li button');

    for (let button of buttons) {
        button.addEventListener('click', () => {
            store.dispatch(removeCard(button.dataset.id));
        });
    }
}

function setRotateCardButtonsEventListeners() {
    let cards = document.querySelectorAll('div#lesson .vertical');

    for (let card of cards) {
        card.addEventListener('click', () => {
            store.dispatch(rotateCard(card.dataset.id));

        });

    }
}

function resetForm() {
    addCardForm.reset();
    addCardButton.classList.remove('is-success');
    addCardButton.disabled = true;
    store.dispatch(toggleSuccessMessage());
}

// ------ Render the initial cards ------
rendercards();
renderstack();
renderSuccessMessage();
