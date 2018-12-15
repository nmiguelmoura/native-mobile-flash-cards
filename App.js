import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import {createMaterialTopNavigator, createAppContainer} from 'react-navigation';

// DEV ONLY
// TODO: REMOVE CALLS FOR REACTOTRON
import Reactotron from './ReactotronConfig';
import Master from "./components/Master";

// DEV ONLY
// TODO: REMOVE CALLS FOR REACTOTRON
const store = Reactotron.createStore(reducer, middleware);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Master />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
