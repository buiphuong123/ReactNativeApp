import { Row } from 'native-base';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH } = Dimensions.get('window');
export default function Word(props) {
  const { word, count } = props;
  return (
    <View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.word1}>{count+1}/</Text>
                <Text style={styles.word}>{word.kanji}</Text>
                <Text style={styles.word}>{word.hira}</Text>
            </View>
            <View />
            <TouchableOpacity>
              <Icon style={styles.star} name="star-outline" size={25} />
            </TouchableOpacity>
          </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ marginLeft: 10 }}>{word.vn}</Text>
            </View>
            <TouchableOpacity>
                <Icon style={styles.check} name="checkmark-circle-outline" size={25} />
            </TouchableOpacity>
          
        </View>

      </View>

    </View>

  )

}

const styles = StyleSheet.create({
  word1: {marginRight: 5, marginLeft: 5, color: "blue" },
  word: {marginRight: 10, color: "blue" },
  star: {color: '#999999', marginRight: 10},
  check: { marginRight: 10, color: '#999999' },
})