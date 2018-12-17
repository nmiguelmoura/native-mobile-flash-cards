import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleSaveDeck} from "../actions/decks";

class AddDeck extends Component {
    state = {
        name: ''
    };

    onChangeText = (text) => {
        this.setState({
            name: text
        });
    };

    submitDeck = () => {
        this.props.saveDeck(this.state.name);
        this.setState({
            name: ''
        });
        this.props.navigation.navigate('Decks');
    };

    render() {
        return (
            <View>
                <Text>Add new Deck</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={this.onChangeText}
                />
                <TouchableOpacity
                    onPress={this.submitDeck}>
                    <Text>Add deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
        return {
            saveDeck: (name) => {
                dispatch(handleSaveDeck(name))
            }
        }
}

function mapStateToProps(state, props) {
        return {
            ...state,
            ...props
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
