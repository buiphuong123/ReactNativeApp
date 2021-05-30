import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Menu from '../components/Menu';
import User from '../components/User.js'
const Drawer = createDrawerNavigator();

export default class Main extends Component{
    render() {
        return(
            <Drawer.Navigator
                initialRouteName='Menu'
                drawerContent={props => <Menu {...props} />}
                >

                 <Drawer.Screen name="User" initialRouteName 
                 options={{ headerShown: false }}
                 component={User} 
                 />
             </Drawer.Navigator>
        )
    }
}