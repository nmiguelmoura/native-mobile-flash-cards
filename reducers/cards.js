import {RECEIVE_CARDS, ADD_CARD, DELETE_CARDS_FROM_DECK} from "../actions/cards";

export default function cards(state = {}, action) {
    switch(action.type) {
        case RECEIVE_CARDS:
            return {
                ...state,
                ...action.cards
            };

        case ADD_CARD: {
            const card = action.card;
            return {
                ...state,
                [card.id]: card
            }
        }

        case DELETE_CARDS_FROM_DECK:
            const {deckId} = action;

            let cards = {};
            const listOfCards = Object.getOwnPropertyNames(state);
            let card;
            for(const cardId of listOfCards) {
                card = state[cardId];
                if(card.deck !== deckId) {
                    cards[cardId] = card;
                }
            }

            return {
                ...cards
            };

        default:
            return state;
    }
}
