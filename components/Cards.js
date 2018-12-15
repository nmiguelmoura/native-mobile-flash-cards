import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class Cards extends Component {
    render() {
        const {cards} = this.props;
        return (
            <View>
                <Text>Teste</Text>
                <Text>{JSON.stringify(cards)}</Text>
            </View>
        );
    }
}

function mapStateToProps({cards}) {
    return {
        cards
    }
}

export default connect(mapStateToProps)(Cards);
