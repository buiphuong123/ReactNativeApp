import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
export default class Inputs extends Component{
    constructor(props){
        super(props);
        this.state={
            showPass: true, 
            press: false,
            email: '',
            password: '',
            Repassword: '',
        }
    }
    state = {isFocused: false, };

    onFocusChange= () => {
        this.setState({isFocused: true})
    }
    showPass=()=>{
        if(this.state.press==false){
            this.setState({showPass: false, press: true})  
        }
        else{
            this.setState({showPass: true, press: false})
        }
    }
    render() {
        return(
            <View style={[styles.container, {borderColor: this.state.isFocused? '#0779ef' : 'black'}]}>
                <Input 
                    placeholder={this.props.name}
                    onFocus={this.onFocusChange}
                    inputStyle={styles.input}
                    value={this.state.name}
                    secureTextEntry={this.state.showPass}
                    onChangeText={text=> this.setState({ name : text})}
                    leftIcon ={
                        <Icon
                            name={this.props.icon}
                            size={22}
                            color={this.state.isFocused?'#0779e4': 'black'}
                        />
                    }
                    rightIcon ={
                        <TouchableOpacity onPress={this.showPass.bind()}>
                            <Icon
                            name={this.state.press == false ? this.props.name1: this.props.name2}
                            size={22}
                            color={this.state.isFocused?'#0779e4': 'black'}
                        />
                        </TouchableOpacity>
                    }
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {width: '90%', height: 50, borderRadius: 100, marginVertical: 10},
    input: { marginLeft: 5, fontSize: 16},
})