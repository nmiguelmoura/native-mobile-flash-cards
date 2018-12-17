import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import DeckListElement from "./dumb/DeckListElement";

class Decks extends Component {

    onButtonPress = (id, name) => {
        this.props.navigation.navigate('Deck', {
            id,
            name
        });
    };

    render() {
        const {decks, cardsGrouped} = this.props;
        const list = Object.getOwnPropertyNames(decks);

        if(list.length === 0) {
            return (
                <View>
                    <Text>No decks available!</Text>
                </View>
            );
        }

        return (
            <View>
                {list.length > 0 && list.map(deckId => {
                    const deck = decks[deckId];

                    return (
                        <DeckListElement
                            key={deckId}
                            id={deckId}
                            name={deck.name}
                            cardCount={cardsGrouped[deckId] || 0}
                            onPress={this.onButtonPress}
                        />
                    );
                })}
            </View>
        );
    }
}

function mapStateToProps({decks, cards}) {

    const cardsGrouped = {};

    Object.getOwnPropertyNames(cards).map(cardId => {
        const card = cards[cardId];
        cardsGrouped[card.deck] = cardsGrouped[cardId] ? cardsGrouped[cardId] + 1 : 1;
    });

    return {
        decks,
        cardsGrouped
    }
}

export default connect(mapStateToProps)(Decks);
