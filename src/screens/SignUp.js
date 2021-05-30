import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import black from '../../res/images/black.jpg';
import register from '../../res/api/register';
import AppText from '../components/app-text';
      
export default class SignUp extends Component{
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

    registerUser(){
        const {email, password} = this.state;
        register(email, password)
        .then(res=>{
            console.log(res);
        });// thanh cong hay khong thanh cong
    }
    render() {
        return(
            <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'space-around' }}>
                
                    <View style={styles.container}>
                            <Image 
                                source={require('../../res/images/admin.png')}
                                resizeMode="center"
                                style={styles.image}
                    />
                    </View>
                        <View style={styles.boxLogin}>
                             <View style={styles.container1}>
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

                                <Input 
                                    placeholder='password'
                                    onFocus={this.onFocusChange}
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
                               
                            
                            <TouchableOpacity style={[styles.container3, {backgroundColor: "black"}]} onPress={()=> this.registerUser()}>
                                <AppText i18nKey={"SignUp"} style={styles.submitText}>SignUp</AppText>
                            </TouchableOpacity>
                            
                    </View>
                    <View style={{ flex: 2}}>
                        <ImageBackground source={black} style={styles.imageCloud}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}>
                                <Text style={styles.textImage}>account exsist</Text>
                            </TouchableOpacity>

                        </ImageBackground>
                    </View>
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2, 
        alignItems : 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100, 
        height: 150, 
        marginVertical: 10
    },
    textImage: {color: 'black', textAlign: 'center', justifyContent: 'space-between', alignItems : 'center', fontWeight: 'bold', fontSize: 18},
    imageCloud: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'},
    buttonText:{color: 'white', fontFamily: 'Avenir', fontWeight: '500'},
    buttonLogin:{height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'black', backgroundColor:'black', margin: 20},
    boxLogin : {backgroundColor: 'white',  borderRadius: 10, marginTop: 5, marginLeft: 20, marginRight: 20, flex: 4},
    textBody: {textAlign: 'center', alignItems: 'center', fontSize: 16},
    boxinput: {backgroundColor: 'black'},
    input:{color: 'white'},
    container1: {width: '90%', height: 50, borderRadius: 100, marginVertical: 10},
    input1: { marginLeft: 5, fontSize: 16},
    container3: {width: '90%', height: 50, borderColor: 'black', borderRadius: 10, marginVertical: 10, borderWidth: 0, backgroundColor: 'black', margin: 20},
    submitText: {fontSize: 18,  color: 'white', alignSelf: 'center', marginVertical: 10}
});
