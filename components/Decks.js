import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import DeckListElement from "./dumb/DeckListElement";
import {THEME_COLOR} from "../helpers/config";

class Decks extends Component {

    onButtonPress = (id, name) => {
        this.props.navigation.navigate('Deck', {
            id,
            name
        });
    };

    onAddDeckPress = () => {
        this.props.navigation.navigate('AddDeck');
    };

    render() {
        const {decks, cardsGrouped} = this.props;
        const list = Object.getOwnPropertyNames(decks);

        if (list.length === 0) {
            return (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsInfo}>No decks available!</Text>
                    <TouchableOpacity
                        onPress={this.onAddDeckPress}
                        style={styles.addDeckBtn}>
                        <Text style={styles.addDeckBtnText}>
                            ADD DECK
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.results}>
                <View>
                    <Text style={styles.resultsInfo}>Pick a deck to start</Text>
                </View>
                <View style={styles.listOfDecks}>
                    {list.length > 0 && list.map(deckId => {
                        const deck = decks[deckId];

                        return (
                            <View
                                style={styles.deck}
                                key={deckId}>
                                <DeckListElement
                                    id={deckId}
                                    name={deck.name}
                                    cardCount={cardsGrouped[deckId] || 0}
                                    onPress={this.onButtonPress}
                                />
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noResults: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noResultsInfo: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    addDeckBtn: {
        backgroundColor: THEME_COLOR,
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 20,
        paddingBottom: 20
    },
    addDeckBtnText: {
        color: "#FFFFFF"
    },
    results: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    resultsInfo: {
        marginTop: 40,
        marginBottom: 40,
        fontWeight: 'bold'
    },
    listOfDecks: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    deck: {
        width: "50%",
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20
    }
});

function mapStateToProps({decks, cards}) {

    const cardsGrouped = {};

    Object.getOwnPropertyNames(cards).map(cardId => {
        const card = cards[cardId];
        console.log('»»»»', cardsGrouped);
        cardsGrouped[card.deck] = cardsGrouped[card.deck] ? cardsGrouped[card.deck] + 1 : 1;
    });

    return {
        decks,
        cardsGrouped
    }
}

export default connect(mapStateToProps)(Decks);
