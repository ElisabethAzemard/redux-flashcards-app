import { ADD_CARD, REMOVE_CARD, SHOW_CARD, ROTATE_CARD } from '../actions/actions';

const initialList = [
    {
        question: "Where is Brian?",
        answer: "Brian is in the kitchen.",
        rotated: false
    },
    {
        question: "Where's my brolly?",
        answer: "Home, obviously.",
        rotated: false
    },
    {
        question: "Who are you?",
        answer: "Who am I? Who am I? I am the guardian of lost souls! I am the powerful, the pleasurable, the indestructible Mushu! I'm pretty hot, uh?",
        rotated: false
    },
];

function cardsReducer(cards = initialList, action) {
    switch (action.type) {
        case ADD_CARD:
            return [
                ...cards,
                {
                    question: action.question,
                    answer: action.answer,
                    rotated: false
                }
            ];

        case REMOVE_CARD:
            return cards.filter((card, index) => index != action.id);

        case ROTATE_CARD:
            return cards.map((card, index) => {
                if (index != action.id) {
                    return card;
                } else {
                    return {
                        ...card,
                        rotated: !card.rotated
                    }
                }
            });

        default:
            return cards;
    };
}

export default cardsReducer;

