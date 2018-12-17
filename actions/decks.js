import {saveDeck, deleteDeckAndCards} from '../helpers/API';
import {deleteCardsFromDeck} from "./cards";

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
                dispatch(addDeck(deck));
            })
            .catch(error => console.log(error));
    };
}

export function deleteDeck(id) {
    return {
        type: DELETE_DECK,
        id
    }
}

export function handleDeleteDeck(id) {
    return (dispatch) => {
        deleteDeckAndCards(id)
            .then(() => {
                dispatch(deleteDeck(id));
                dispatch(deleteCardsFromDeck(id));
            })
            .catch(error => console.log(error))
    }
}