require('./style.scss');

import store from './store/store';
import { addCard, removeCard, rotateCard, setCardTransition } from './actions/actions';

console.log(store.getState());

// ------ HTML references ------
let cardsUList = document.getElementById('cards');
let lessonCardsUList = document.getElementById('lesson');
let addCardForm = document.getElementById('addCard');
let addCardQuestion = addCardForm['question'];
let addCardAnswer = addCardForm['answer'];

// ------ Redux ------
store.subscribe(() => {
    rendercards();
    renderstack();
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
    console.log("lessonCards:", lessonCards);

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

// ------ Event Listeners ------
addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let question = addCardQuestion.value;
    let answer = addCardAnswer.value;

    if (question && answer) {
        // document.getElementById('addCardButton').setAttribute('disabled', false);
        store.dispatch(addCard(question, answer));
    }
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

// ------ Render the initial cards ------
rendercards();
renderstack();
