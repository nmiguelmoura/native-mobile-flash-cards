import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleAddCard} from "../actions/cards";
import {THEME_COLOR} from "../helpers/config";
import {FontAwesome} from '@expo/vector-icons';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    onChangeText = (text, input) => {
        this.setState({
            [input]: text
        });
    };

    validateFields = () => {
        const {question, answer} = this.state;
        if(question === '' || answer === '') {
            alert("Provide a question and the correct answer");
            return false;
        }

        return true;
    };

    submit = () => {
        if(!this.validateFields()) {
            return false;
        }

        const card = {
            ...this.state,
            deck: this.props.deckId
        };
        this.props.saveCard(card);
        this.props.navigation.goBack();
    };

    render() {
        const {deckName} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{deckName}</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Question</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={(text) => this.onChangeText(text, 'question')}/>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Answer</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={(text) => this.onChangeText(text, 'answer')}/>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.submit}>
                    <Text style={styles.btnText}>Submit card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    form: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    label: {
        width: "100%",
        textAlign: 'left',
        marginBottom: 10
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 3,
        height: 44,
        paddingLeft: 5,
        paddingRight: 5
    },
    btn: {
        backgroundColor: THEME_COLOR,
        borderRadius: 3,
        width: "100%"
    },
    btnText: {
        color: "#FFFFFF",
        paddingTop: 14,
        paddingBottom: 14,
        textAlign: 'center'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        saveCard: (card) => {
            dispatch(handleAddCard(card));
        }
    };
}

function mapStateToProps(state, {navigation}) {
    const {deckId, deckName} = navigation.state.params;

    return {
        deckId,
        deckName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);