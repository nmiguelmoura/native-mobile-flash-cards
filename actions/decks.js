import {saveDeck} from '../helpers/API';

export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function handleSaveDeck(name) {
    return (dispatch) => {
        saveDeck(name)
            .then(deck => {
                console.log("######");
                console.log(deck);
                dispatch(addDeck(deck));
            })
            .catch(error => console.log(error));
    };
}
