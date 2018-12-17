import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {handleAddCard} from "../actions/cards";

class AddCard extends Component {
    state = {
        question: '',
        optionOne: '',
        optionTwo: '',
        correct: ''
    };

    onChangeText = (text, input) => {
        console.log(text, input);
        this.setState({
            [input]: text
        });
    };

    submit = () => {
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
            <View>
                <Text>{deckName}</Text>

                <View>
                    <Text>Question</Text>
                    <TextInput
                    value={this.state.question}
                    onChangeText={(text) => this.onChangeText(text, 'question')}/>
                </View>

                <View>
                    <Text>Option one</Text>
                    <TextInput
                        value={this.state.optionOne}
                        onChangeText={(text) => this.onChangeText(text, 'optionOne')}/>
                </View>

                <View>
                    <Text>Option two</Text>
                    <TextInput
                        value={this.state.optionTwo}
                        onChangeText={(text) => this.onChangeText(text, 'optionTwo')}/>
                </View>

                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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