import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../components/app-text';

export default class Submit extends Component{
render(){
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: this.props.color}]} onPress={()=> this.props.navigation.navigate("SignUp")}>
            <AppText i18nKey={this.props.title} style={styles.submitText}>{this.props.title}</AppText>
        </TouchableOpacity>
    );
}
};
const styles= StyleSheet.create({
    container: {width: '90%', height: 50, borderColor: 'black', borderRadius: 10, marginVertical: 10, borderWidth: 0, backgroundColor: 'black', margin: 20},
    submitText: {fontSize: 18,  color: 'white', alignSelf: 'center', marginVertical: 10}
})
