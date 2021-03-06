import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import {createMaterialTopTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AppStatusBar from './components/dumb/AppStatusBar';
import {THEME_COLOR, TAB_ACTIVE_COLOR} from "./helpers/config";
import {handleInitialData} from "./actions/shared";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {setLocalNotification} from './helpers/notifications';

// DEV ONLY
// TODO: REMOVE CALLS FOR REACTOTRON
// import Reactotron from './ReactotronConfig';

// DEV ONLY
// TODO: REMOVE CALLS FOR REACTOTRON
const store = createStore(reducer, middleware);

const Tabs = createMaterialTopTabNavigator({
        Decks: {
            screen: Decks,
            navigationOptions: {
                tabBarLabel: 'Decks',
                // tabBarIcon: ({tintColor}) => <Ionicons
                //     name='ios-bookmarks'
                //     size={30}
                //     color={tintColor}/>
            }
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'Add Deck'
            }
        }
    },
    {
        navigationOptions: {
            headers: null
        },
        tabBarOptions: {
            activeTintColor: TAB_ACTIVE_COLOR,
            style: {
                height: 56,
                backgroundColor: THEME_COLOR
            }
        }
    });

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: "#FFFFFF",
            headerStyle: {
                backgroundColor: THEME_COLOR
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: "#FFFFFF",
            headerStyle: {
                backgroundColor: THEME_COLOR
            },
            title: 'Add card'
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: "#FFFFFF",
            headerStyle: {
                backgroundColor: THEME_COLOR
            }
        }
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    componentDidMount() {
        store.dispatch(handleInitialData());
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={THEME_COLOR}/>
                    <AppContainer/>
                </View>
            </Provider>
        );
    }
}
