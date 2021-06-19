import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ListWord from './ListWord';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import AppText from '../../components/app-text';
class NewWords extends Component  {
    seletwordall(value){
        this.props.setAllword(value);
        if(value===true) {
            this.props.setMemerizeword(false);
            this.props.setNotMemerizeword(false);
            this.props.setLikeword(false);
        }
        
    }
    seletMemerizedall(value){
        this.props.setMemerizeword(value);
        if(value===true) {
            this.props.setAllword(false);
            this.props.setNotMemerizeword(false);
            this.props.setLikeword(false);
        }
        
    }
    seletNotMemerizedall(value){
        this.props.setNotMemerizeword(value);
        if(value===true) {
            this.props.setAllword(false);
            this.props.setMemerizeword(false);
            this.props.setLikeword(false);
        }
        
    }
    seletLikeall(value){
        this.props.setLikeword(value);
        if(value===true) {
            this.props.setAllword(false);
            this.props.setMemerizeword(false);
            this.props.setNotMemerizeword(false);
        }
        
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={ this.props.isWord}
                            onValueChange={(value) => this.props.setword(value)}
                        />
                        <AppText i18nKey={"word"} style={styles.label} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isHira}
                            onValueChange={(value) => this.props.setHiraword(value)}
                        />
                        <AppText i18nKey={"hira"} style={styles.label} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isKanji}
                            onValueChange={(value) => this.props.setKanjiword(value)}
                        />
                        <AppText i18nKey={"kanji"} style={styles.label} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isMean}
                            onValueChange={(value) => this.props.setMeanword(value)}
                        />
                        <AppText i18nKey={"mean"} style={styles.label} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isReverse}
                            onValueChange={(value) => this.props.setReverseword(value)}
                        />
                        <AppText i18nKey={"reverse"} style={styles.label} />
                    </View>

                </View>

                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isAll}
                            onValueChange={(value) => this.seletwordall(value)}

                        />
                        <AppText i18nKey={"all"} style={styles.label}  />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isMemerize}
                            onValueChange={(value) => this.seletMemerizedall(value)}
                        />
                        <AppText i18nKey={"memerize"} style={styles.label} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isNotMemerize}
                            onValueChange={(value) => this.seletNotMemerizedall(value)}
                        />
                        <AppText i18nKey={"not memerize"} style={styles.label} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isLike}
                            checked={this.props.isLike}
                            onValueChange={(value) => this.seletLikeall(value)}
                        />
                        <AppText i18nKey={"like"} style={styles.label} />
                    </View>

                </View>
                <View style={{flex: 1}}>
                    <ListWord  />
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
    },
    
    label: {
        margin: 8,
        marginLeft: 0
    },
});

const mapStateToProps = state => {
    return {
        isWord: state.wordReducer.isWord,
        isAll: state.wordReducer.isAll,
        isHira: state.wordReducer.isHira,
        isKanji: state.wordReducer.isKanji,
        isMean: state.wordReducer.isMean,
        isReverse: state.wordReducer.isReverse,
        isMemerize: state.wordReducer.isMemerize,
        isNotMemerize: state.wordReducer.isNotMemerize,
        isLike: state.wordReducer.isLike,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setword: (isWord) => {
            dispatch(actions.RemoteWord(isWord));
        },
        setAllword: (isAll) => {
            dispatch(actions.RemoteAllWord(isAll));
        },
        setHiraword: (isHira) => {
            dispatch(actions.RemoteHiraWord(isHira));
        },
        setKanjiword: (isKanji) => {
            dispatch(actions.RemoteKanjiWord(isKanji));
        },
        setMeanword: (isMean) => {
            dispatch(actions.RemoteMeanWord(isMean));
        },
        setReverseword: (isReverse) => {
            dispatch(actions.RemoteReverseWord(isReverse));
        },
        setMemerizeword: (isMemerize) => {
            dispatch(actions.RemoteMemerizeWord(isMemerize));
        },
        setNotMemerizeword: (isNotMemerize) => {
            dispatch(actions.RemoteNotMemerizeWord(isNotMemerize));
        },
        setLikeword: (isLike) => {
            dispatch(actions.RemoteLikeWord(isLike));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWords);
