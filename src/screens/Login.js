import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import AppText from '../components/app-text';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Account from './Account';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            username: '',
            password: '',
            successmess: '',
            errormess: '',
            errorusername: '',
            errorpassword: '',
        }
    }
    
    // luu obj user in localstorage
    objectUsersave = async (value) => {
        try {
            const valuesaver = JSON.stringify(value);
            await AsyncStorage.setItem('@userIf', valuesaver);
        } catch (e) {
            console.log('error save user');
        }
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        }
        else {
            this.setState({ showPass: true, press: false })
        }
    }

    Login() {
        const { username, password } = this.state;
        if (username == '' || password == '' || password.length <= 3) {
            if (username == '') {
                this.setState({ errorusername: 'username required' });
            }
            if (password.length <= 3) {
                this.setState({ errorpassword: 'password must longer 3' });
            }
            if (password == '' && password.length <= 3) {
                this.setState({ errorpassword: 'password required' });
            }
        }
        else {
            axios.post("http://192.168.1.8:3001/login", {
                "username": this.state.username,
                "password": this.state.password,
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    console.log('data user' + response.data.user);
                    this.setState({ successmess: response.data.message });
                    this.setState({ errormess: response.data.error });
                    setTimeout(() => {
                        this.setState({ successmess: '' });
                        this.setState({ errormess: '' });
                    }, 2000);
                    if (response.data.message != undefined) {
                        this.props.setUser(response.data.user._id, this.state.username, response.data.user.email);
                        AsyncStorage.setItem('@id', response.data.user._id);
                        AsyncStorage.setItem('@username', this.state.username);
                        AsyncStorage.setItem('@email', response.data.user.email);
                        setTimeout(() => {
                            this.props.navigation.navigate("Contact");
                        }, 2000)



                    }
                })
                .catch((error) => { console.log(error) });
        }
    }


    render() {
        const { navigation } = this.props;
        const sucessmessage = (
            <View style={[styles.alertmess, { backgroundColor: "blue" }]}>
                <Text style={{ color: 'white' }}>{this.state.successmess}</Text>
            </View>
        );
        const errormessage = (
            <View style={[styles.alertmess, { backgroundColor: "red" }]}>
                <Text style={{ color: 'white' }}>{this.state.errormess}</Text>
            </View>
        );
        return (
            <ScrollView style={{ backgroundColor: 'black', }}>
                <View style={{ justifyContent: 'space-around' }}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="md-chevron-back" size={28} color='white' style={{ marginTop: 20, marginLeft: 10 }} />
                        </TouchableOpacity>
                        <Image
                            source={require('../../res/images/admin.png')}
                            resizeMode="center"
                            style={styles.image}
                        />
                        <View />
                    </View>

                    <View style={styles.boxLogin}>
                        <View style={styles.container1}>
                            <Input
                                placeholder='username'
                                inputStyle={styles.input1}
                                value={this.state.username}
                                onChangeText={(username) => this.setState({ username })}
                                leftIcon={
                                    <Icon
                                        name="mail"
                                        size={22}
                                        color='black'
                                    />
                                }
                            />
                        </View>
                        {this.state.errorusername == '' ?
                            null
                            :
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'red' }}>{this.state.errorusername}</Text>
                            </View>
                        }


                        <View style={styles.container1}>
                            <Input
                                placeholder='password'
                                inputStyle={styles.input1}
                                value={this.state.password}
                                secureTextEntry={this.state.showPass}
                                onChangeText={text => this.setState({ password: text })}
                                leftIcon={
                                    <Icon
                                        name="key"
                                        size={22}
                                        color='black'
                                    />
                                }
                                rightIcon={
                                    <TouchableOpacity onPress={this.showPass.bind()}>
                                        <Icon
                                            name={this.state.press == false ? 'eye-off' : 'eye'}
                                            size={22}
                                            color='black'
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                        {this.state.errorpassword == '' ?
                            null
                            :
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'red' }}>{this.state.errorpassword}</Text>
                            </View>
                        }


                        <View style={{ width: '90%' }}>
                            <AppText i18nKey={'forgot pass'} style={[styles.textBody], { alignSelf: 'flex-end' }}>Forgot password</AppText>
                        </View>
                        <TouchableOpacity style={[styles.container3, { backgroundColor: "black" }]} onPress={this.Login.bind(this)}>
                            <AppText i18nKey={"Login"} style={styles.submitText}>Login</AppText>
                        </TouchableOpacity>
                        <AppText i18nKey={'account'} style={styles.textBody} >Or connect using</AppText>
                        <View style={{ flexDirection: "row", }}>
                            <Account color="#3b5c8f" icon="facebook" title="Facebook" />
                            <Account color="#ec482f" icon="google" title="Google" />
                        </View>
                        <AppText i18nKey={'dontaccount'} style={styles.textBody}>Don't have account</AppText>
                        <TouchableOpacity style={[styles.container3, { backgroundColor: "black" }]} onPress={() => navigation.navigate("SignUp")}>
                            <AppText i18nKey={"SignUp"} style={styles.submitText}>SignUp</AppText>
                        </TouchableOpacity>

                    </View>
                    {this.state.errormess == '' || this.state.errormess == undefined ? null : errormessage}
                    {this.state.successmess == '' || this.state.successmess == undefined ? null : sucessmessage}

                </View>


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between', color: 'white'
    },
    image: {
        width: 100,
        height: 150,
        marginVertical: 10
    },
    buttonText: { color: 'white', fontFamily: 'Avenir', fontWeight: '500' },
    buttonLogin: { height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'black', backgroundColor: 'black', },
    boxLogin: { backgroundColor: 'white', borderRadius: 10, marginLeft: 20, marginRight: 20 },
    textBody: { textAlign: 'center', alignItems: 'center', fontSize: 16 },
    boxinput: { backgroundColor: 'black' },
    input: { color: 'white' },
    container1: { width: '90%', height: 50, borderRadius: 100, marginVertical: 10 },
    input1: { marginLeft: 5, fontSize: 16 },
    container3: { width: '90%', height: 50, borderColor: 'black', borderRadius: 10, marginVertical: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginLeft: 15 },
    submitText: { fontSize: 18, color: 'white', alignSelf: 'center', marginVertical: 10 },
    alertmess: { height: 40, alignItems: 'center', justifyContent: 'center' },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});



const mapDispatchToProps = dispatch => {
    return {
        setUser: (id, username, email) => {
            dispatch(actions.saveUser(id, username, email));
        }
    }
}


export default connect(null, mapDispatchToProps)(Login);