import React, { Component, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ListWord from './ListWord';
import {Header} from 'react-native-elements';

const Contact = () => {
    const [toggleWord, setToggleWord] = useState(false);
    const [toggleHira, setToggleHira] = useState(false);
    const [toggleKanji, setToggleKanji] = useState(false);
    const [toggleMeans, setToggleMeans] = useState(false);
    const [toggleReverse, setToggleReverse] = useState(false);
    const [toggleAll, setToggleAll] = useState(false);
    const [toggleMemerize, setToggleMemerize] = useState(false);
    const [toggleNotMemerize, setToggleNotMemerize] = useState(false);
    const [toggleLike, setToggleLike] = useState(false);
    
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
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleWord}
                        onValueChange={(newValue) => setToggleWord(newValue)}
                    />
                    <Text style={styles.label}>Tu</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleHira}
                        onValueChange={(newValue) => setToggleHira(newValue)}
                    />
                    <Text style={styles.label}>Hira</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleKanji}
                        onValueChange={(newValue) => setToggleKanji(newValue)}
                    />
                    <Text style={styles.label}>Han viet</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleMeans}
                        onValueChange={(newValue) => setToggleMeans(newValue)}
                    />
                    <Text style={styles.label}>Nghia</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleReverse}
                        onValueChange={(newValue) => setToggleReverse(newValue)}
                    />
                    <Text style={styles.label}>Dao</Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleAll}
                        onValueChange={(newValue) => setToggleAll(newValue)}
                    />
                    <Text style={styles.label}>Tat ca</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleNotMemerize}
                        onValueChange={(newValue) => setToggleNotMemerize(newValue)}
                    />
                    <Text style={styles.label}>Chua nho</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleMemerize}
                        onValueChange={(newValue) => setToggleMemerize(newValue)}
                    />
                    <Text style={styles.label}>Da nho</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleLike}
                        onValueChange={(newValue) => setToggleLike(newValue)}
                    />
                    <Text style={styles.label}>Thich</Text>
                </View>
                
            </View>
            <View>
                <ListWord />
            </View>

        </View>
    );

}

const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {

    },
    label: {
        margin: 8,
        marginLeft: 0
    },
});

export default Contact;