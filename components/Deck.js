import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
    render() {
        const {deckId, deck} = this.props;
        return (
            <View>
                <Text>{deck.name}</Text>
                <Text>{deck.totalCards}</Text>
                <TouchableOpacity>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Delete deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps({decks, cards}, {navigation}) {
    //TODO
    // const {deckId} = navigation.state.params;
    const deckId = "jps30tg6";
    let deck = {
        ...decks[deckId]
    };

    const totalCards = Object.getOwnPropertyNames(cards)
        .map(key => cards[key])
        .filter(card => card.deck === deckId)
        .length;

    deck.totalCards = totalCards;

    return {
        deckId,
        deck
    };
    return {};
}

export default connect(mapStateToProps)(Deck);
