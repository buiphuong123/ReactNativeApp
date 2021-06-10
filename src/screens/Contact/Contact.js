import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ListWord from './ListWord';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


class Contact extends Component  {
    render() {
        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.checkboxContainer}>
                    {/* <Text>{`[value: ${this.state.isWord}]`}</Text> */}
                        <CheckBox
                         disabled={false}
                            style={styles.checkbox}
                            value={this.props.isWord}
                            onValueChange={(value) => this.props.setword(value)}
                        />
                        <Text style={styles.label}>Tu</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                    {/* <Text>{`[value: ${this.state.isHira}]`}</Text> */}
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isHira}
                            onValueChange={(value) => this.props.setHiraword(value)}
                        />
                        <Text style={styles.label}>Hira</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isKanji}
                            onValueChange={(value) => this.props.setKanjiword(value)}
                        />
                        <Text style={styles.label}>Han viet</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isMean}
                            onValueChange={(value) => this.props.setMeanword(value)}
                        />
                        <Text style={styles.label}>Nghia</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isReverse}
                            onValueChange={(value) => this.props.setReverseword(value)}
                        />
                        <Text style={styles.label}>Dao</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isAll}
                            onValueChange={(value) => this.props.setAllword(value)}

                        />
                        <Text style={styles.label}>Tat ca</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isMemerize}
                            onValueChange={(value) => this.props.setMeanword(value)}
                        />
                        <Text style={styles.label}>Chua nho</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isNotMemerize}
                            onValueChange={(value) => this.props.setNotMemerizeword(value)}
                        />
                        <Text style={styles.label}>Da nho</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={this.props.isLike}
                            checked={this.props.isLike}
                            onValueChange={(value) => this.props.setLikeword(value)}
                        />
                        <Text style={styles.label}>Thich</Text>
                    </View>

                </View>
                <View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
