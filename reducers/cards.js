import {RECEIVE_CARDS} from "../actions/cards";

export default function cards(state = {}, action) {
    switch(action.type) {
        case RECEIVE_CARDS:
            return {
                ...state,
                ...action.cards
            };

        default:
            return state;
    }
}
