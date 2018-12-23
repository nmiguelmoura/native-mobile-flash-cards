import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleSaveDeck} from "../actions/decks";
import {THEME_COLOR} from "../helpers/config";

class AddDeck extends Component {
    state = {
        name: ''
    };

    onChangeText = (text) => {
        this.setState({
            name: text
        });
    };

    validateFields = () => {
        const {name} = this.state;
        if(name === '') {
            alert("Provide a name for the new deck");
            return false;
        }

        return true;
    };

    deckSaved = (id, name) => {
        this.setState({
            name: ''
        });

        this.props.navigation.navigate('Deck', {
            id,
            name
        });
    };

    submitDeck = () => {
        if(!this.validateFields()) {
            return false;
        }

        this.props.saveDeck(this.state.name, this.deckSaved);
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.info}>Add new deck</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Deck Name</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={this.onChangeText}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.submitDeck}>
                        <Text style={styles.btnText}>Add deck</Text>
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
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10
    },
    info: {
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 40
    },
    form: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        marginBottom: 20,
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
        saveDeck: (name, onSaveFinished) => {
            dispatch(handleSaveDeck(name, onSaveFinished))
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
