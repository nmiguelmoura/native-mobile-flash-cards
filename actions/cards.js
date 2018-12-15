export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';

export function receiveCards(cards) {
    return {
        type: RECEIVE_CARDS,
        cards
    }
}
