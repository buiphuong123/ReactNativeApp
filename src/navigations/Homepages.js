import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ListAttr from '../screens/Attr/ListAttr';
import Cart from '../screens/Cart/Cart';
import NewWords from '../screens/Words/NewWords';
import FlashCard from '../screens/FlashCard/FlashCard';
const Tab = createBottomTabNavigator();
export default class Homepages extends Component{
    render() {
        return (
           
                <Tab.Navigator
                        screenOptions={({route})=>({
                            tabBarIcon: ({focused, color, size})=>{
                                let iconName;
                                if(route.name==='ListAttr'){
                                    iconName= focused?'home' : 'home';
                                }else if (route.name === 'NewWords') {
                                    iconName = focused ? 'home' : 'home';
                                }
                                else if(route.name=== 'Cart'){
                                    iconName= focused? 'home' : 'home';
                                }
                                else if(route.name==='FlashCard'){
                                    iconName= focused? 'search': 'search';
                                }
                                return <Icon name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        }}
                    >
                        <Tab.Screen name="ListAttr" component={ListAttr} 
                        />
                        <Tab.Screen name="NewWords" component={NewWords} />
                        <Tab.Screen name="Cart" component={Cart} />
                        <Tab.Screen name="FlashCard" component={FlashCard} />

                 </Tab.Navigator>
           
        )
    }
}