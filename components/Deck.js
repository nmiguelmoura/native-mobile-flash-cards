import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {handleDeleteDeck} from "../actions/decks";

class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        const {name} = navigation.state.params;

        return {
            title: name
        }
    };

    addCard = () => {
        this.props.navigation.navigate("AddCard",
            {deckId: this.props.id, deckName: this.props.deck.name});
    };

    deleteDeck = () => {
        this.props.deleteDeck(this.props.id);
        this.props.navigation.goBack();
    }

    render() {
        const {deck} = this.props;
        return (
            <View>
                <Text>{deck.name}</Text>
                <Text>{deck.totalCards}</Text>
                <TouchableOpacity onPress={this.addCard}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deleteDeck}>
                    <Text>Delete deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteDeck: (id) => dispatch(handleDeleteDeck(id))
    }
}

function mapStateToProps({decks, cards}, {navigation}) {
    const {id} = navigation.state.params;
    let deck = {
        ...decks[id]
    };

    const totalCards = Object.getOwnPropertyNames(cards)
        .map(key => cards[key])
        .filter(card => card.deck === id)
        .length;

    deck.totalCards = totalCards;

    return {
        id,
        deck
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
