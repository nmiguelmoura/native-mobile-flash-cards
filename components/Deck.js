import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
    render() {
        const {decks, cards} = this.props;
        return (
            <View></View>
        );
    }
}

function mapStateToProps({decks, cards}, {navigation}) {
    // const {deckId} = navigation.state.params || "jpgtlyox";
    // const deck = decks[id];
    //
    // const totalCards = Object.getOwnPropertyNames(cards)
    //     .map(key => cards[key])
    //     .filter(card => card.deck === deckId)
    //     .length;
    //
    // deck.totalCards = totalCards;
    //
    // return {
    //     deckId: navigation.state.params,
    //     deck
    // };
    return {};
}

export default connect(mapStateToProps)(Deck);
