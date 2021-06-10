import React, { Component } from 'react';
import { View, Alert, Modal, Pressable, Text, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import admin from '../../res/images/admin.png';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Validation from './Validation';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            usernames: '',
            errors: '',
            alert: '',
            successmess: '',
            errormess: '',
        }
    }
    logout = (value) => {
        this.props.setUserLogout(value);
        AsyncStorage.setItem('@username', '');
    }
    openedit = () => {
        this.setState({ modalVisible: true });
        this.setState({ usernames: this.props.username });
    }
    updateNameUser = (id) => {
        if (this.state.usernames == '') {
            this.setState({ errors: Validation(this.state.usernames) });
        }
        else {
            axios.put("http://192.168.1.8:3001/updateUser/" + id, {
                "username": this.state.usernames,
                "username1": this.props.username,
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    console.log(response.data.message);
                    console.log(response.data.error);
                    this.setState({successmess: response.data.message});
                    this.setState({errormess: response.data.error});
                    if(this.state.successmess !=undefined) {
                        this.props.setUser(this.props.id, this.state.usernames, this.props.email);
                        console.log('redux update' + this.props.username);
                        AsyncStorage.setItem('@username', this.state.usernames);
                    }
                    setTimeout(() => {
                        this.setState({ successmess: '' });
                        this.setState({ errormess: '' });
                    }, 2000)
                })
                .catch((error) => { console.log("http://192.168.1.8:3001/updateUser/" + id, JSON.stringify(error)) });
        }
    }

    render() {
        const sucessmessage = (
            <View style={[styles.alertmess, {backgroundColor: 'blue'}]}>
                <Text style={{ color: 'white' }}>{this.state.successmess}</Text>
            </View>
        );
        const errormessage = (
            <View style={[styles.alertmess, {backgroundColor: 'red'}]}>
                <Text style={{ color: 'white' }}>{this.state.errormess}</Text>
            </View>
        );
        const { navigation, id } = this.props;
        const loginJs = (
            <View style={styles.header}>
                <View>
                    <Image style={styles.image} source={admin} />
                </View>
                <View style={styles.setaccount}>
                    <AppText i18nKey={'Gest Account'} style={styles.account}>Gest Account</AppText>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <AppText i18nKey={'Login'} style={styles.login}>Login</AppText>
                        </TouchableOpacity>

                        <Text style={styles.login}>|</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
                        <TouchableOpacity onPress={() => this.openedit()}>
                            <Text style={styles.login}>Edit</Text>
                        </TouchableOpacity>

                        <Text style={styles.login}>|</Text>
                        <TouchableOpacity onPress={() => this.logout('')}>
                            <Text style={styles.login}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )

        const mainUser = this.props.username === '' || this.props.username === null? loginJs : logoutJs
        return (
            <View style={styles.container}>
                {mainUser}
                <View style={styles.footer}>

                    <View style={{ margin: 5, zIndex: 1 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>Setting</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Icon name="language" size={28} />
                                        <TouchableOpacity style={styles.language} onPress={() => navigation.navigate("Language")}>
                                            <AppText i18nKey={'Your language'}>Your language</AppText>
                                            <Text>{this.props.language}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                                this.setState({ modalVisible: !this.state.modalVisible })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Change your name</Text>
                                    <View style={{ marginBottom: 10 }}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(usernames) => this.setState({ usernames })}
                                            value={this.state.usernames}
                                        />
                                        {this.state.errors.usernames && <Text style={{ color: 'red', marginLeft: 30 }}>{this.state.errors.usernames}</Text>}
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                        >
                                            <Text style={styles.textStyle}>Cacel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.updateNameUser(id)}
                                        >
                                            <Text style={styles.textStyle}>Update</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>
                {this.state.errormess == '' || this.state.errormess == undefined ? null : errormessage}
                {this.state.successmess == '' || this.state.successmess == undefined ? null : sucessmessage}
            </View>
        )

    }
}

var styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    header: { flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 20 },
    footer: { flex: 8, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 0 },
    image: { height: 45, width: 50, borderRadius: 30 },
    setaccount: { marginLeft: 20 },
    account: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    login: { color: '#fff', marginRight: 10 },
    button: { width: 500 },
    language: { height: 50, padding: 5 },
    input: { width: 200, height: 45, borderRadius: 25, marginHorizontal: 25, borderColor: 'black', borderWidth: 1 },
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
    },
    alertmess: { width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }


});

const mapStateToProps = state => {
    return {
        id: state.userReducer.id,
        username: state.userReducer.username,
        language: state.languageReducer.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUser: (id, username, email) =>{
            dispatch(actions.saveUser(id, username, email));
        }, 
        setUserLogout: username => {
            dispatch(actions.logoutUser(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);