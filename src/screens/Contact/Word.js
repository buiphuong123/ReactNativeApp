import { Row } from 'native-base';
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { renderNode } from 'react-native-elements/dist/helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import axios from 'axios';

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
    this.setState({ isColor: !this.state.isColor });
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
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userLike', JSON.stringify(error)) });
  }

  deleteStar(userId, wordId) {
    console.log(userId);
    this.setState({ isColor: !this.state.isColor });
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
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userDisLike/', JSON.stringify(error)) });
  }
  setMemerize(userId, wordId) {
    this.setState({ isCheck: !this.state.isCheck });
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
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userMemerize', JSON.stringify(error)) });
  }
  deleteMemerize(userId, wordId) {
    console.log(userId);
    this.setState({ isCheck: !this.state.isCheck });
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
      })
      .catch((error) => { console.log('http://192.168.1.8:3001/userNotMemerize', JSON.stringify(error)) });
  }

  render() {
    const { count, word } = this.props;
    const { userId } = this.props;
    const { isWord, isAll, isHira, isKanji, isMean, isMemerize, isNotMemerize, isLike, isReverse } = this.props;
    return (
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.word1}>{count + 1}/</Text>
              {isWord ? <Text style={styles.word}>{word.kanji}</Text> : null}
              {isHira ? <Text style={styles.word}>{word.hira}</Text> : null}
            </View>
            <View />
            <TouchableOpacity onPress={() => { this.state.isColor ? this.deleteStar(userId, word._id) : this.setStar(userId, word._id) }}>
              <Icon style={[styles.star, { color: this.state.isColor ? 'blue' : '#999999' }]} name="star-outline" size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row'}}>
                {isKanji ? <Text style={{ marginLeft: 5, textTransform:'uppercase' }}>[{word.amhan==''? '' : word.amhan}]</Text> : null}
                {isMean ? <Text style={{ marginLeft: 5 }}>{word.vn}</Text> : null}
            </View>
            <TouchableOpacity  onPress={() => { this.state.isCheck ? this.deleteMemerize(userId, word._id) : this.setMemerize(userId, word._id) }}>
              <Icon style={[styles.check, { color: this.state.isCheck ? 'green' : '#999999' }]} name="checkmark-circle-outline" size={25} />
            </TouchableOpacity>

          </View>

        </View>

      </View>

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
  }
};
export default connect(mapStateToProps, null)(Word);
// export default Word;