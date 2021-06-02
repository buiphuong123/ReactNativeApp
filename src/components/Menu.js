import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import admin from '../../res/images/admin.png';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
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
                            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                                <Text style={styles.login}>Edit</Text>
                            </TouchableOpacity>

                            <Text style={styles.login}>|</Text>
                            <TouchableOpacity onPress={()=> this.props.setUserLogout(this.state.username)}>
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
                    <View style={{ margin: 5 }}>
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
                </View>
            </View>
        )

    }
}
const { height } = Dimensions.get("screen");

var styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    header: { flex: 1, flexDirection: 'row', marginTop: 0, marginLeft: 20 },
    footer: { flex: 8, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 0 },
    image: { height: 45, width: 50 , borderRadius: 30},
    setaccount: { marginLeft: 20, },
    account: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    login: { color: '#fff', marginRight: 10 },
    button: { width: 500 },
    language: {height: 50, padding: 5}

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


