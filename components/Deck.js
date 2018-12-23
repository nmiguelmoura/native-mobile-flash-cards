import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleDeleteDeck} from "../actions/decks";
import {THEME_COLOR} from "../helpers/config";

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

    startQuiz = () => {
        this.props.navigation.navigate("Quiz", {
            deckId: this.props.id, deckName: this.props.deck.name
        })
    };

    deleteDeck = () => {
        this.props.deleteDeck(this.props.id);
        this.props.navigation.goBack();
    };

    render() {
        const {deck} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{deck.name}</Text>
                    <Text style={styles.count}>This deck has {deck.totalCards} card(s).</Text>
                </View>
                <View style={styles.btns}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnFill]}
                        onPress={this.addCard}>
                        <Text style={[styles.btnText, styles.btnTextWhite]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnFill]}
                        onPress={this.startQuiz}>
                        <Text style={[styles.btnText, styles.btnTextWhite]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.deleteDeck}>
                        <Text style={styles.btnText}>Delete deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5
    },
    count: {
        textAlign: 'center',
        marginBottom: 30
    },
    btns: {
        width: "70%",
        height: 160,
        marginTop: 20
    },
    btn: {
        height: 44,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 3,
        paddingTop: 10,
        marginBottom: 10
    },
    btnFill: {
        backgroundColor: THEME_COLOR
    },
    btnText: {
        flex: 1,
        textAlign: 'center',
        color: THEME_COLOR
    },
    btnTextWhite: {
        color: '#FFFFFF'
    }
});

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
