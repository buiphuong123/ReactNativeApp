import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Menu from '../components/Menu';
import Homepages from '../navigations/Homepages';
const Drawer = createDrawerNavigator();

export default class Main extends Component{
    render() {
        return(
            <Drawer.Navigator
                initialRouteName='Menu'
                drawerContent={props => <Menu {...props} />}
                >

                 <Drawer.Screen name="Homepages" 
                 options={{ headerShown: false }}
                 component={Homepages} 
                 />

             </Drawer.Navigator>
        )
    }
}