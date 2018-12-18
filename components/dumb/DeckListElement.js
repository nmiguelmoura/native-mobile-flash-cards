import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {THEME_COLOR} from "../../helpers/config";

const DeckListElement = (props) => {
    const {id, name, cardCount, onPress} = props;

    return(
        <TouchableOpacity
            style={styles.btn}
            onPress={() => onPress(id, name)}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.count}>{cardCount} card(s)</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 3,
        paddingTop: 8
    },
    title: {
        color: THEME_COLOR,
        fontWeight: "bold",
        textAlign: 'center',
    },
    count: {
        textAlign: 'center'
    }
});

DeckListElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cardCount: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
};

export default DeckListElement;
