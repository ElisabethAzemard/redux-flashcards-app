import store from './store/store';
import { addCard, removeCard, rotateCard } from './actions/actions';

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
});

function deleteCard(index) {
    store.dispatch(removeCard(index));
}

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
    let cards = store.getState().cards;

    lessonCardsUList.innerHTML = '';
    cards.map((card, index) => {
        if (card.rectoShown) {
            let cardItem = `
            <div data-id="${index}" class="column is-one-quarter">
                <div class="notification is-primary">
                    <p>${card.question}</p>
                </div>
            </div>
                `;
            lessonCardsUList.innerHTML += cardItem;
        } else {
            let cardItem = `
                <li data-id="${index}" class="is-parent ">
                    <div class="tile">
                        <p>${card.answer}</p>
                    </div>
                </li>
            `;
            lessonCardsUList.innerHTML += cardItem;
        }
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
            deleteCard(button.dataset.id);
        });
    }
}

function setRotateCardButtonsEventListeners() {
    let cards = document.querySelectorAll('ul#lesson > li');

    for (let card of cards) {
        card.addEventListener('click', () => {
            rotateCard(card.dataset.id);
        });
    }
}

// ------ Render the initial cards ------
rendercards();
renderstack();
