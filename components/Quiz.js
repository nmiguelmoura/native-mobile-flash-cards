import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Card from './dumb/Card';
import {CORRECT_GREEN, INCORRECT_RED, THEME_COLOR} from "../helpers/config";
import {reScheduleLocalNotification} from "../helpers/notifications";

class Quiz extends Component {
    state = {
        originalCards: [],
        cards: [],
        totalCards: 0,
        correctGuesses: 0,
        showingAnswer: false
    };

    static navigationOptions = ({navigation}) => {
        const {deckName} = navigation.state.params;

        return {
            title: `Quizz - ${deckName}`
        }
    };

    componentDidMount() {
        this.setState({
            originalCards: this.props.cards,
            cards: [...this.props.cards],
            totalCards: this.props.cards.length
        });
    }

    showAnswer = () => {
        this.setState({
            showingAnswer: true
        });
    };

    registerGuess = (correct) => {
        this.setState(prev => {
            const cards = prev.cards;
            cards.pop();

            return {
                cards,
                showingAnswer: false,
                correctGuesses: correct ? prev.correctGuesses + 1 : prev.correctGuesses
            };
        });
    };

    goBackToDeck = () => {
        reScheduleLocalNotification();
        this.props.navigation.goBack();
    };

    restart = () => {
        reScheduleLocalNotification();
        this.setState(prev => ({
            cards: [...prev.originalCards],
            correctGuesses: 0,
            showingAnswer: false
        }));
    };

    render() {
        const {totalCards, correctGuesses} = this.state;

        if (totalCards === 0) {
            return (
                <View style={styles.noCards}>
                    <Text style={styles.noCardsText}>
                        There are no cards in this deck
                    </Text>
                </View>
            );
        }

        const count = this.state.cards.length;
        const percent = Math.round((correctGuesses / totalCards) * 1000) / 10;
        if (count === 0) {
            return (
                <View
                    style={styles.results}>
                    <Text style={styles.resultsText}>You guessed {percent}% of all cards.</Text>
                    <View style={styles.btns}>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnFill]}
                            onPress={this.restart}>
                            <Text
                                style={[styles.btnText, styles.btnTextWhite]}>
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.goBackToDeck}>
                            <Text
                                style={styles.btnText}>
                                Back to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        const card = this.state.cards[count - 1];

        return (
            <View style={styles.card}>
                <Card
                    card={card}
                    showingAnswer={this.state.showingAnswer}
                    showAnswer={this.showAnswer}
                    registerGuess={this.registerGuess}
                />
                <Text
                    style={styles.cardsRemaining}>
                    {count - 1} card(s) remaining
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCardsText: {
        fontWeight: 'bold'
    },
    card: {
        flex: 1
    },
    cardsRemaining: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: "#EEEEEE",
        fontSize: 10,
        fontWeight: 'bold',
        padding: 5
    },
    results: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
    },
    resultsText: {
        fontWeight: 'bold'
    },
    btns: {
        width: '70%',
        marginTop: 20,
        alignItems: 'center'
    },
    btn: {
        width: '100%',
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
    },
});

function mapStateToProps({cards}, {navigation}) {
    const {deckId} = navigation.state.params;
    let deckCards = [];
    Object.getOwnPropertyNames(cards)
    .forEach((cardId) => {
        const card = cards[cardId];

        if (card.deck === deckId) {
            deckCards.push(card);
        }
    });

    return {
        cards: deckCards,
        deckId,
        navigation
    };
}

export default connect(mapStateToProps)(Quiz);
