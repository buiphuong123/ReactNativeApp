import React, { Component } from 'react';
import { View,  Alert, Modal, Pressable, Text, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import admin from '../../res/images/admin.png';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            usernames: '',
        }
    }
    logout = async (value) => {
        this.props.setUserLogout(value);
        try {
        //   const valueusers = await AsyncStorage.getItem('@user')
          const valueuser= await AsyncStorage.removeItem('@user');
        } catch(e) {
           console.log('get data error', e);
        }
      }
      openedit = () => {
        this.setState({modalVisible: true});
        this.setState({usernames : this.props.username});
      }
    
    render() {
        const { navigation, username } = this.props;
        const loginJs = (
            <View style={styles.header}>
                    <View>
                        <Image style={styles.image} source={admin} />
                    </View>
                    <View style={styles.setaccount}>
                        <AppText i18nKey={'Gest Account'} style={styles.account}>Gest Account</AppText>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                                <AppText i18nKey={'Login'} style={styles.login}>Login</AppText>
                            </TouchableOpacity>

                            <Text style={styles.login}>|</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                                <AppText i18nKey={'SignUp'} style={styles.login}>SignUp</AppText>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
        )
        const logoutJs = (
            <View style={styles.header}>
                    <View>
                        <Image style={styles.image} source={admin} />
                    </View>
                    <View style={styles.setaccount}>
                        <Text style={styles.account}>{this.props.username}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={()=> this.openedit()}>
                                <Text style={styles.login}>Edit</Text>
                            </TouchableOpacity>

                            <Text style={styles.login}>|</Text>
                            <TouchableOpacity onPress={()=>this.logout('')}>
                                <Text style={styles.login}>Logout</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
            </View>
        )
        
        const mainUser= username==''? loginJs: logoutJs
        return (
            <View style={styles.container}>
                {mainUser}
                <View style={styles.footer}>

                    <View style={{ margin: 5, zIndex: 1 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>Setting</Text>
                                    <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <Icon name="language" size={28} />
                                        <TouchableOpacity style={styles.language} onPress= {()=> navigation.navigate("Language")}>
                                            <AppText i18nKey={'Your language'}>Your language</AppText>
                                            <Text>{this.props.language}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 10}}>
                                        <Icon name="settings" size={28} />
                                        <TouchableOpacity style={styles.language}>
                                            <AppText i18nKey={'setting'}>Setting</AppText>
                                        </TouchableOpacity>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={styles.centeredView}>  
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({modalVisible: !this.state.modalVisible})
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change your name</Text>
                            <View style={{marginBottom: 10}}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(usernames)=>this.setState({usernames})}
                                    value={ this.state.usernames }
                                />
                            </View>
                            
                            <View style={{flexDirection: 'row'}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                                >
                                <Text style={styles.textStyle}>Cacel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                                >
                                <Text style={styles.textStyle}>Update</Text>
                                </Pressable>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
                    
                </View>

                
               
            </View>
        )

    }
}

var styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    header: { flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 20 },
    footer: { flex: 8, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 0 },
    image: { height: 45, width: 50 , borderRadius: 30},
    setaccount: { marginLeft: 20 },
    account: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    login: { color: '#fff', marginRight: 10 },
    button: { width: 500 },
    language: {height: 50, padding: 5},
    input:{width: 200,height: 45, borderRadius: 25, marginHorizontal: 25, borderColor: 'black', borderWidth: 1},
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        marginRight: 10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

});

const mapStateToProps = state => {
	return {
		username: state.userReducer.username,
        language: state.languageReducer.language
	};
};

const mapDispatchToProps = dispatch => {
    return {
        setUserLogout: username => {
            dispatch(actions.logoutUser(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);