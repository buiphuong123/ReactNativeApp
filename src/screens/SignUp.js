import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import black from '../../res/images/black.jpg';
import AppText from '../components/app-text';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            showPass: true, 
            press: false,
            timePass: false,
            username: '',
            email: '',
            password: '',
            successmess: '',
            errormess: '',
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

    register(){
        axios.post("https://language-backend.vercel.app/register", {  
            "username": this.state.username,
            "email": this.state.email, 
            "password": this.state.password,
        }, {headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },})
        .then((response)=>{
            this.setState({successmess: response.data.message});
            this.setState({errormess: response.data.error});
            setTimeout(()=> {
                this.setState({successmess: ''});
                this.setState({errormess: ''});
            }, 2000)
            // this.setState({result: response.data.id})  
            if (response.data.message != undefined){
                setTimeout(()=> {
                    this.props.navigation.navigate("Login" );
                }, 2000)
                
            }
        })
        .catch((error)=>{console.log('https://language-backend.vercel.app/register', JSON.stringify(error))});
    }


    render() {
        // setTimeout(function(){this.setState({timePassed: true})}, 1000);
        const { navigation } = this.props;
        const sucessmessage = (
            <View style={[styles.alertmess, {backgroundColor: "blue"}]}>
                <Text style={{color: 'white'}}>{this.state.successmess}</Text>
            </View>
        );
        const errormessage = (
            <View style={[styles.alertmess, {backgroundColor: "red"}]}>
                <Text style={{color: 'white'}}>{this.state.errormess}</Text>
            </View>
        );
        return(
            <ScrollView style={{backgroundColor: 'black',}} contentContainerStyle={{flex: 1 }}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <Icon name="md-chevron-back" size={28} color='white' style={{marginTop: 20, marginLeft: 10}} />
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
                                    onChangeText={text=> this.setState({ username: text })}
                                    leftIcon ={
                                        <Icon
                                            name="mail"
                                            size={22}
                                            color='black'
                                        />
                                    }
                                />
                            </View> 
                             <View style={styles.container1}>
                                <Input 
                                    placeholder='email'
                                    inputStyle={styles.input1}
                                    value={this.state.email}
                                    onChangeText={text=> this.setState({ email: text })}
                                    leftIcon ={
                                        <Icon
                                            name="mail"
                                            size={22}
                                            color='black'
                                        />
                                    }
                                />
                            </View> 
                            <View style={styles.container1}>
                                <Input 
                                    placeholder='password'
                                    onFocus={this.onFocusChange}
                                    inputStyle={styles.input1}
                                    value={this.state.password}
                                    secureTextEntry={this.state.showPass}
                                    onChangeText={text=> this.setState({ password: text })}
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
                            
                            <TouchableOpacity style={[styles.container3, {backgroundColor: "black"}]} onPress={this.register.bind(this)} >
                                <AppText i18nKey={"SignUp"} style={styles.submitText}>SignUp</AppText>
                            </TouchableOpacity>
                            
                    </View>

                    <View style={{position: 'relative'}}>
                        <ImageBackground source={black} style={styles.imageCloud}>
                            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                                <Text style={styles.textImage}>account exsist</Text>
                            </TouchableOpacity>

                        </ImageBackground>
                        {this.state.errormess == ''|| this.state.errormess == undefined? null : errormessage}
                        {this.state.successmess == '' || this.state.successmess == undefined ? null : sucessmessage}
                        
                        

                    </View>
                </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between', color: 'white',
    },
    image: {
        width: 100, 
        height: 150, 
        marginVertical: 10,
        
    },
    textImage: {color: 'black', textAlign: 'center', justifyContent: 'space-between', alignItems : 'center', fontWeight: 'bold', fontSize: 18},
    imageCloud: { width: '100%', height: 200, alignItems: 'center', justifyContent: 'center', zIndex: 1},
    buttonText:{color: 'white', fontFamily: 'Avenir', fontWeight: '500'},
    buttonLogin:{height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'black', backgroundColor:'black', margin: 20},
    boxLogin : {backgroundColor: 'white',  borderRadius: 10, marginTop: 5, marginLeft: 20, marginRight: 20, },
    textBody: {textAlign: 'center', alignItems: 'center', fontSize: 16},
    boxinput: {backgroundColor: 'black'},
    input:{color: 'white'},
    container1: {width: '90%', height: 50, borderRadius: 100, marginVertical: 10},
    input1: { marginLeft: 5, fontSize: 16},
    container3: {width: '90%', height: 50, borderColor: 'black', borderRadius: 10, marginVertical: 10, borderWidth: 0, backgroundColor: 'black', margin: 20},
    submitText: {fontSize: 18,  color: 'white', alignSelf: 'center', marginVertical: 10},
    alertmess: {position: 'absolute', zIndex: 2, height: 50, marginTop: 130, width: '100%', alignItems: 'center', justifyContent: 'center'}
   
});
