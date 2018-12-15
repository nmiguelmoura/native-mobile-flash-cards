import * as API from '../helpers/API';
import {receiveDecks} from "./decks";
import {receiveCards} from "./cards";
import {AsyncStorage} from "react-native";

const GET_INITIAL_DATA = 'GET_INITIAL_DATA';


export function handleInitialData() {
    return (dispatch) => {
        Promise.all([
            API.getDecks(),
            API.getCards()
        ])
            .then(([decks, cards]) => {
                dispatch(receiveDecks(JSON.parse(decks)));
                dispatch(receiveCards(JSON.parse(cards)));
            })
            .catch(error => {
                //TODO: error handler
                console.log(error);
            });
    };
}
