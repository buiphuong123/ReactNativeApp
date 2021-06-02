import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from './../redux/actions/index';

const Tab = createBottomTabNavigator();
class AppTabbar extends Component{
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_key')
          if(value !== null) {
            this.props.setLanguage(value);
          } 
        } catch(e) {
           console.log('get data error', e);
        }
      }
    async UNSAFE_componentWillMount() {
        await this.getData(); 
    }
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Settings" component={SettingScreen} />
                    <Tab.Screen name="Contact" component={ContactScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    };
};

export default connect(null, mapDispatchToProps)(AppTabbar);
