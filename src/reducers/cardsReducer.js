import { ADD_CARD, REMOVE_CARD, SHOW_CARD, ROTATE_CARD } from '../actions/actions';

const initialList = [
    {
        question: "Where is Brian?",
        answer: "Brian is in the kitchen.",
        rectoShown: true
    },
    {
        question: "Where's my brawley?",
        answer: "Home, obviously.",
        rectoShown: true
    },
];

function cardsReducer(cards = initialList, action) {
    switch (action.type) {
        case ADD_CARD:
            return [
                ...cards,
                {
                    question: action.question,
                    answer: action.answer
                }
            ];

        case REMOVE_CARD:
            return cards.filter((card, index) => index != action.id);

        case SHOW_CARD:
            return cards.filter((card, index) => index === action.id);

        case ROTATE_CARD:
            return cards.filter((card, index) => index === action.id).rectoShown === !rectoShown;

        default:
            return cards;
    };
}

export default cardsReducer;

