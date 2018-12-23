import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CORRECT_GREEN, INCORRECT_RED, THEME_COLOR} from "../../helpers/config";

const Card = (props) => {
    const {question, answer} = props.card;
    const {showAnswer, showingAnswer, registerGuess} = props;
    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.label}>Question</Text>
                <Text style={styles.content}>{question}</Text>
                {!showingAnswer && (
                    <View style={styles.btns}>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnFill]}
                            onPress={showAnswer}>
                            <Text
                                style={[styles.btnText, styles.btnTextWhite]}>
                                Show answer
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {showingAnswer && (
                <View style={styles.group}>
                    <Text style={styles.label}>Answer</Text>
                    <Text style={styles.content}>{answer}</Text>
                    <View style={styles.btns}>
                        <Text style={styles.guessText}>My guess was</Text>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnCorrect]}
                            onPress={() => registerGuess(true)}>
                            <Text
                                style={[styles.btnText, styles.btnTextWhite]}>
                                Correct
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnIncorrect]}
                            onPress={() => registerGuess(false)}>
                            <Text
                                style={[styles.btnText, styles.btnTextWhite]}>
                                Incorrect
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    label: {
        color: THEME_COLOR,
        marginBottom: 5
    },
    group: {
        width: '100%',
        alignItems: 'center'
    },
    content: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
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
    btnCorrect: {
        borderColor: CORRECT_GREEN,
        backgroundColor: CORRECT_GREEN
    },
    btnIncorrect: {
        borderColor: INCORRECT_RED,
        backgroundColor: INCORRECT_RED
    },
    btnText: {
        flex: 1,
        textAlign: 'center',
        color: THEME_COLOR
    },
    btnTextWhite: {
        color: '#FFFFFF'
    },
    guessText: {
        marginBottom: 10
    }
});

export default Card;