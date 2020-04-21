import { ADD_CARD, REMOVE_CARD, SHOW_CARD, ROTATE_CARD } from '../actions/actions';

const initialList = [
    {
        question: "Where is Brian?",
        answer: "Brian is in the kitchen.",
        rotated: false
    },
    {
        question: "Where's my brawley?",
        answer: "Home, obviously.",
        rotated: false
    },
    {
        question: "Qui je suis ?!",
        answer: "Je suis le gardien des âmes perdues, je suis le très puissant, le très agréable, le très indestructible... Mushu.",
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

