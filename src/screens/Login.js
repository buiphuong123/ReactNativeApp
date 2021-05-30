import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import AppText from '../components/app-text';
import login from '../../res/api/login';
import Account from './Account';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            showPass: true, 
            press: false,
            email: '',
            password: '',
        }
    }

    showPass=()=>{
        if(this.state.press==false){
            this.setState({showPass: false, press: true})  
        }
        else{
            this.setState({showPass: true, press: false})
        }
    }
    loginUser(){
        const {email, password} = this.state;
        login(email, password)
        .then(res=>{
            console.log(res);
        });// thanh cong hay khong thanh cong
    }
    render() {
        const { navigation } = this.props;
        return(
            <ScrollView style={{ backgroundColor: 'black', }}>
                <View style={{justifyContent: 'space-around'}}>
                    <View style={styles.container}>
                        <Image 
                            source={require('../../res/images/admin.png')}
                            resizeMode="center"
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.boxLogin}>
                            <View style={[styles.container1, {borderColor: this.state.isFocused? '#0779ef' : 'black'}]}>
                                <Input 
                                    placeholder='email'
                                    inputStyle={styles.input1}
                                    value={this.state.email}
                                    onChangeText={text=> this.setState({ email : text})}
                                    leftIcon ={
                                        <Icon
                                            name="mail"
                                            size={22}
                                            color='black'
                                        />
                                    }
                                />
                            </View>

                            <View style={[styles.container1, {borderColor: this.state.isFocused? '#0779ef' : 'black'}]}>
                                <Input 
                                    placeholder='password'
                                    inputStyle={styles.input1}
                                    value={this.state.password}
                                    secureTextEntry={this.state.showPass}
                                    onChangeText={text=> this.setState({ password : text})}
                                    leftIcon ={
                                        <Icon
                                            name="key"
                                            size={22}
                                            color='black'
                                        />
                                    }
                                    rightIcon ={
                                        <TouchableOpacity onPress={this.showPass.bind()}>
                                            <Icon
                                            name={this.state.press == false ? 'eye-off': 'eye'}
                                            size={22}
                                            color='black'
                                        />
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        
                       
                        <View style={{width: '90%'}}>
                                <AppText i18nKey={'forgot pass'} style={[styles.textBody], {alignSelf: 'flex-end'}}>Forgot password</AppText>
                        </View>
                        <TouchableOpacity style={[styles.container3, {backgroundColor: "black"}]} onPress={this.loginUser.bind(this)}>
                                <AppText i18nKey={"Login"} style={styles.submitText}>Login</AppText>
                        </TouchableOpacity>
                        <AppText i18nKey={'account'} style={'styles.textBody'} >Or connect using</AppText>
                        <View style={{flexDirection: "row"}}>
                            <Account color="#3b5c8f" icon ="facebook" title="Facebook" />
                            <Account color="#ec482f" icon ="google" title="Google" />
                        </View>
                            <AppText i18nKey={'dontaccount'} style={styles.textBody}>Don't have account</AppText>
                            <TouchableOpacity style={[styles.container3, {backgroundColor: "black"}]} onPress={()=> this.props.navigation.navigate("SignUp")}>
                                <AppText i18nKey={"SignUp"} style={styles.submitText}>SignUp</AppText>
                            </TouchableOpacity>
                            
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems : 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100, 
        height: 150, 
        marginVertical: 10
    },
    buttonText:{color: 'white', fontFamily: 'Avenir', fontWeight: '500'},
    buttonLogin:{height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'black', backgroundColor:'black', margin: 20},
    boxLogin : {backgroundColor: 'white',  borderRadius: 10, marginTop: 5, marginLeft: 20, marginRight: 20},
    textBody: {textAlign: 'center', alignItems: 'center', fontSize: 16},
    boxinput: {backgroundColor: 'black'},
    input:{color: 'white'},
    container1: {width: '90%', height: 50, borderRadius: 100, marginVertical: 10},
    input1: { marginLeft: 5, fontSize: 16},
    container3: {width: '90%', height: 50, borderColor: 'black', borderRadius: 10, marginVertical: 10, borderWidth: 0, backgroundColor: 'black', margin: 20},
    submitText: {fontSize: 18,  color: 'white', alignSelf: 'center', marginVertical: 10}
});
