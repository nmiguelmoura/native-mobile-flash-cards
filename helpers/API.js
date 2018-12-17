import {AsyncStorage} from 'react-native';

const DECK_KEY = 'DECK_KEY';
const CARD_KEY = 'CARD_KEY';

function generateId() {
    const timestamp = +new Date();
    return timestamp.toString(36);
}

export function saveDeck(name) {
    return new Promise((res, rej) => {
        getDecks()
        .then(decks => {
            const id = generateId();
            const newDeck = {
                id,
                name
            };
            decks = JSON.parse(decks);

            if(!decks) {
                decks = {};
            }

            decks[id] = newDeck;

            decks = JSON.stringify(decks);
            AsyncStorage.setItem(DECK_KEY, decks)
            .then(() => {
                res(newDeck);
            })
            .catch(error => rej(error));
        })
        .catch(error => rej(error));
    })
}

export function getDecks() {
    return AsyncStorage.getItem(DECK_KEY);
}

export function saveCard(card) {
    return new Promise((res, rej) => {
        getCards()
            .then(cards => {
                const id = generateId();
                cards = JSON.parse(cards);

                if(!cards) {
                    cards = {};
                }

                card.id = id;
                cards[id] = card;
                cards = JSON.stringify(cards);
                AsyncStorage.setItem(CARD_KEY, cards)
                    .then(() => {
                        res(card);
                    })
                    .catch(error => rej(error));
            })
            .catch(error => rej(error));
    })
}

export function deleteCardsFromDeck(deckId) {
    return new Promise((res, rej) => {
        getCards()
            .then(cards => {
                cards = JSON.parse(cards);
                let newCards = {};
                const listOfCards = Object.getOwnPropertyNames(cards);
                let card;
                for(const cardId of listOfCards) {
                    card = cards[cardId];
                    if(card.deck !== deckId) {
                        newCards[cardId] = card
                    }
                }

                AsyncStorage.setItem(CARD_KEY, JSON.stringify(newCards))
                    .then(() => res());
            })
            .catch(error => rej(error));
    });
}

export function deleteDeckById(id) {
    return new Promise((res, rej) => {
        getDecks()
            .then(decks => {
                decks = JSON.parse(decks);
                if(id && decks[id]) {
                    delete decks[id];
                }

                console.log("$$$$$$$$$");
                console.log(decks);

                AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks))
                    .then(() => res());
            })
            .catch(error => rej(error));
    });
}

export function deleteDeckAndCards(id) {
    console.log("######");
    console.log(id);
    return new Promise((res, rej) => {
        Promise.all([deleteDeckById(id), deleteCardsFromDeck(id)])
            .then(() => {
                res();
            })
            .catch(error => rej(error));
    })
}

export function getCards() {
    return AsyncStorage.getItem(CARD_KEY)
}

export function clearStorage() {
    AsyncStorage.clear();
}
