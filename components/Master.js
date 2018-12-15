import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {handleInitialData} from "../actions/shared";
import Deck from "./Deck";
import Cards from "./Cards";
import * as API from '../helpers/API';

class Master extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());

        // API.saveDeck("deck 2");
        // API.saveCard({
        //     deck: "jpgtlyox",
        //     question: "Test question 1",
        //     optionOne: "option one",
        //     optionTwo: "option two",
        //     correct: "optionOne"
        // })
        // API.clearStorage();
    }

    render() {
        return (
            <View>
                <Deck/>
            </View>
        );
    }
}

export default connect()(Master);
