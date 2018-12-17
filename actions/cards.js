import {saveCard} from "../helpers/API";

export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARDS_FROM_DECK = 'DELETE_CARDS_FROM_DECK';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';

export function receiveCards(cards) {
    return {
        type: RECEIVE_CARDS,
        cards
    }
}

export function addCard(card) {
    return {
        type: ADD_CARD,
        card
    }
}

export function handleAddCard(card) {
    return (dispatch) => {
        saveCard(card)
            .then(newCard => {
                dispatch(addCard(newCard));
            })
            .catch(error => console.log(error));
    };
}

export function deleteCardsFromDeck(deckId) {
    return {
        type: DELETE_CARDS_FROM_DECK,
        deckId
    }
}