import {ADD_DECK, RECEIVE_DECKS, DELETE_DECK} from '../actions/decks';

export default function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };

        case ADD_DECK:
            const {deck} = action;
            return {
                ...state,
                [deck.id]: action.deck
            };

        case DELETE_DECK:
            const newDecks = {
                ...state
            };

            delete newDecks[action.id];

            return {
                ...newDecks
            };

        default:
            return state;
    }
}
