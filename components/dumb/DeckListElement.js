import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const DeckListElement = (props) => {
    const {id, name, cardCount, onPress} = props;

    return(
        <TouchableOpacity onPress={() => onPress(id)}>
            <Text>{name}</Text>
            <Text>{cardCount} card(s)</Text>
        </TouchableOpacity>
    )
};

DeckListElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cardCount: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
};

export default DeckListElement;
