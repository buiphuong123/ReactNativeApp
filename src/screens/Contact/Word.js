import { Row } from 'native-base';
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { renderNode } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import axios from 'axios';
import ListWord from './ListWord';
import * as actions from '../../redux/actions/index';
const { width: WIDTH } = Dimensions.get('window');


class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isColor: false,
      isCheck: false,
    }
  }
  setStar(userId, wordId) {
    // this.setState({ isColor: true });
    this.props.word.isLike = true;
    axios.post("http://192.168.1.8:3001/userLike", {
      "userId": userId,
      "wordId": wordId,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        console.log(response.data.message);
        response.data.userLike[0].wordId.isLike = true;
        this.props.setUserLike(this.props.likewordAttr.concat(response.data.userLike[0].wordId));
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userLike', JSON.stringify(error)) });
  }

  deleteStar(userId, wordId) {
    // this.setState({ isColor: false });
    this.props.word.isLike = false;
    axios.post("http://192.168.1.8:3001/userDisLike", {
      "userId": userId,
      "wordId": wordId,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        console.log(response.data.message);
        response.data.userDis[0].wordId.isLike = false;
        this.props.setUserLike(this.props.likewordAttr.filter(item => item._id !== response.data.userDis[0].wordId._id));
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userDisLike/', JSON.stringify(error)) });
  }
  setMemerize(userId, wordId) {
    // this.setState({ isCheck: !this.state.isCheck });
    this.props.word.isMemerize = true;
    axios.post("http://192.168.1.8:3001/userMemerize", {
      "userId": userId,
      "wordId": wordId,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        console.log(response.data.message);
        response.data.usermemerize[0].wordId.isMemerize = true;
        this.props.setUserMemerize(this.props.memerizewordAttr.concat(response.data.usermemerize[0].wordId));
        this.props.setnotUserMemerize(this.props.notmemerizewordAttr.filter(item => item._id !==wordId));
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userMemerize', JSON.stringify(error)) });
  }
  deleteMemerize(userId, wordId) {
    this.props.isMemerize = false;
    axios.post("http://192.168.1.8:3001/userNotMemerize", {
      "userId": userId,
      "wordId": wordId,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        console.log(response.data.message);
        response.data.userNotMem[0].wordId.isMemerize = false;
        this.props.setUserMemerize(this.props.memerizewordAttr.filter(item => item._id !== response.data.userNotMem[0].wordId._id));
        // this.props.setnotUserMemerize(this.props.notmemerizewordAttr.concat(response.data.));
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userNotMemerize', JSON.stringify(error)) });
  }
 onPress = () => {

 }
  render() {
    const { count, word } = this.props;
    const { userId } = this.props;
    const { isWord, isAll, isHira, isKanji, isMean, isMemerize, isNotMemerize, isLike, isReverse } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress()}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.word1}>{count + 1}/</Text>
              {isWord ? <Text style={styles.word}>{word.kanji}</Text> : null}
              {isHira ? <Text style={styles.word}>{word.hira}</Text> : null}
            </View>
            <View />
            <TouchableOpacity onPress={() => { word.isLike ? this.deleteStar(userId, word._id) : this.setStar(userId, word._id) }}>
              {/* <Icon style={[styles.star, { color: this.state.isColor ? 'blue' : '#999999' }]} name="star-outline" size={25} /> */}
              <Icon style={[styles.star, { color: word.isLike ? 'blue' : '#999999' }]} name="star-outline" size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row'}}>
                {isKanji ? <Text style={{ marginLeft: 5, textTransform:'uppercase' }}>[{word.amhan==''? '' : word.amhan}]</Text> : null}
                {isMean ? <Text style={{ marginLeft: 5 }}>{word.vn}</Text> : null}
                <Text>{word.userLike}</Text>
                <Text>nulll</Text>
            </View>
            <TouchableOpacity  onPress={() => { this.state.isCheck ? this.deleteMemerize(userId, word._id) : this.setMemerize(userId, word._id) }}>
              <Icon style={[styles.check, { color: word.isMemerize ? 'green' : '#999999' }]} name="checkmark-circle-outline" size={25} />
            </TouchableOpacity>

          </View>

        </View>

      </TouchableOpacity>

    )
  }

}

const styles = StyleSheet.create({
  word1: { marginLeft: 5, color: "blue" },
  word: { marginLeft: 5, color: "blue" },
  star: { marginRight: 10 },
  check: { marginRight: 10 },
});

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    isWord: state.wordReducer.isWord,
    isAll: state.wordReducer.isAll,
    isHira: state.wordReducer.isHira,
    isKanji: state.wordReducer.isKanji,
    isMean: state.wordReducer.isMean,
    isReverse: state.wordReducer.isReverse,
    isMemerize: state.wordReducer.isMemerize,
    isNotMemerize: state.wordReducer.isNotMemerize,
    isLike: state.wordReducer.isLike,
    id: state.userReducer.id,
    likewordAttr: state.likeReducer.likewordAttr,
    memerizewordAttr: state.memerizeReducer.memerizewordAttr,
    notmemerizewordAttr: state.notMemerizeReducer.notmemerizewordAttr,
  }
};

const mapDispatchToProps = dispatch => {
  return {
      setUserLike: (likewordAttr) => {
          dispatch(actions.showLike(likewordAttr));
      },
      setUserMemerize: (memerizewordAttr) => {
        dispatch(actions.showNotMemerize(memerizewordAttr));
      },
      setnotUserMemerize: (notmemerizewordAttr) => {
        dispatch(actions.showWordNotMemerize(notmemerizewordAttr));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Word);
// export default Word;