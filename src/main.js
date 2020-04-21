require('./style.scss');

import store from './store/store';
import { addCard, removeCard, rotateCard, submitForm, resetForm, fillForm, completeForm } from './actions/actions';

    console.log(store.getState());

    // ------ HTML references ------
    let cardsUList = document.getElementById('cards');
    let lessonCardsUList = document.getElementById('lesson');
    let addCardForm = document.getElementById('addCard');
    let addCardNotification = document.getElementById('addCardSuccessMessage');
    let addCardButton = document.getElementById('addCardButton');
    let addCardQuestion = addCardForm['question'];
    let addCardAnswer = addCardForm['answer'];

    // ------ Redux ------
    store.subscribe(() => {
        renderCards();
        renderStack();
        renderForm();
    });

    function renderCards() {
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
                </li>`;
            cardsUList.innerHTML += cardItem;
        });

        setDeleteCardButtonsEventListeners();
    }

    function renderStack() {
        let lessonCards = store.getState().cards;

        lessonCardsUList.innerHTML = '';

        lessonCards.forEach((card, index) => {
            let lessoncardItem = `
                <li data-id="${index}" class="column is-one-third vertical${card.rotated ? ' rotated' : ''}">
                    <div class="notification is-primary face flip">
                        <p><b>${card.question}</b></p>
                    </div>
                    <div class="notification is-primary is-light face flop">
                        <p><b>${card.answer}</b></p>
                    </div>
                </li>`;
            lessonCardsUList.innerHTML += lessoncardItem;
        });

        setRotateCardButtonsEventListeners();
    }

    function renderForm() {
        let formState = store.getState().form;

        // sync input value and form state
        addCardQuestion.value = formState.question;
        addCardAnswer.value = formState.answer;

        // toggle addCardButton color and state depending on form status
        formState.addButtonDisabled ? addCardButton.disabled = true : addCardButton.disabled = false;
        formState.submitted ? addCardButton.classList.add('is-success') : addCardButton.classList.remove('is-success');

        // display confirmation message when appropriate
        if (!formState.message) {
            addCardNotification.classList.add('d-none');
        } else {
            addCardNotification.classList.remove('d-none');
            addCardNotification.innerHTML = formState.message;
        }

        setFormEventListeners();
    }

    // ------ Event Listeners ------
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

    function setFormEventListeners() {
        addCardForm.addEventListener('input', (e) => {
            e.stopImmediatePropagation();

            console.log(e);
            store.dispatch(fillForm(addCardQuestion.value, addCardAnswer.value));

            if (addCardQuestion.value && addCardAnswer.value) {
                store.dispatch(completeForm(addCardQuestion.value, addCardAnswer.value));
            }
        });

        addCardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            let question = addCardQuestion.value;
            let answer = addCardAnswer.value;

            store.dispatch(addCard(question, answer));
            store.dispatch(submitForm(question, answer));

            setTimeout(() => {
                store.dispatch(resetForm())
            }, 2000);
        });
    }

    // ------ Render initial state ------
    renderCards();
    renderStack();
    renderForm();
