import React, { Component } from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Language from '../screens/Language';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from './../redux/actions/index';
const Stack = createStackNavigator();
class Home extends Component {
    _isMounted = false;
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_key')
            const id = await AsyncStorage.getItem('@id')
            const username = await AsyncStorage.getItem('@username')
            const email = await AsyncStorage.getItem('@email')
            if (value !== null) {
                this.props.setLanguage(value);
            }
            // if(username === null) username===''
            this.props.setUser(id, username, email);
        } catch (e) {
            console.log('get data error', e);
        }
    }
    async UNSAFE_componentWillMount() {
        this._isMounted = false;
        await this.getData();
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Main"
                    screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name='Main'
                        component={Main}
                    />

                    <Stack.Screen
                        name='Login'
                        component={Login}
                    />

                    <Stack.Screen
                        name='SignUp'
                        component={SignUp}
                    />
                    <Stack.Screen
                        name='Language'
                        component={Language}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        },
        setUser: (id, username, email) => {
            dispatch(actions.saveUser(id, username, email));
        }
    };
};

export default connect(null, mapDispatchToProps)(Home);