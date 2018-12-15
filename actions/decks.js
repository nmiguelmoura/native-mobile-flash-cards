export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}