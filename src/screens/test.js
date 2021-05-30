import {
    View, Text, TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';

import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {
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
        const { language } = this.props;
        const isVNLang = language === 'vi' ? true : false;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AppText i18nKey={'this-is-home-page'}>This is home screen</AppText>
                <View style={{ flexDirection: 'row' }}>
                    <AppText i18nKey={'set-language'}>Chọn ngôn ngữ</AppText>
                    <TouchableOpacity onPress={() => this.setLanguage('vi', 'vi')}
                        style={{ marginLeft: 20 }}>
                        <Text style={{ color: isVNLang ? 'blue' : 'grey' }}>Việt Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setLanguage('en', 'en')}
                        style={{ marginLeft: 5 }}>
                        <Text style={{ color: !isVNLang ? 'blue' : 'grey' }}>England</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> this.takeDatainredux()}>
                        <Text>redux</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);