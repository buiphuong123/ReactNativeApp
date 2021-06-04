import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import english from '../../res/images/english.png';
import vn from '../../res/images/vn.jpg';


import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Language extends Component {
    setLanguage = async(language, value) => {
        this.setState({ language });
        this.props.setLanguage(language);
        try{
            await AsyncStorage.setItem('@storage_key', value);
            console.log('save okkkk');
        } catch(e){
            console.log('error store async storage');
        }
   }

  takeDatainredux = ()=>{
      console.log(this.props.language);
  }
    render() {
        return (
            <View style={{flexDirection: 'column', padding: 30}}>
                <AppText i18nKey={'set-language'}>Chọn ngôn ngữ</AppText>
                <AppText i18nKey={'this-is-home-page'}>This is home screen</AppText>
                <Text style={{alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', alignItems: 'center', padding: 20, fontSize: 18}}> CHOOSE LANGUAGE</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: "center"}}>
                    <Image source={english} style={styles.image} />
                    <TouchableOpacity style={styles.language}>
                        <Text>japan</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: "center"}}>
                    <Image source={vn} style={styles.image} />
                    <TouchableOpacity style={styles.language} onPress={() => this.setLanguage('vi', 'vi')}>
                        <Text>Vietnamese</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: "center"}}>
                    <Image source={english} style={styles.image} />
                    <TouchableOpacity style={styles.language} onPress={() => this.setLanguage('en', 'en')}>
                        <Text>English</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={()=> this.takeDatainredux()}>
                        <Text>redux</Text>
                    </TouchableOpacity>

                </View>

            </View>
            
        )
    }
}
var styles = StyleSheet.create({
    image: {width: 50, height: 50}
});

const mapStateToProps = state => {
	return {
		language: state.languageReducer.language
	};
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Language);