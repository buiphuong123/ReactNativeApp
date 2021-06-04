import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
const {width: WIDTH}= Dimensions.get('window');
const {height: HEIGHT}= Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class ListAttr extends Component{
    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value= 0;
        this.animatedValue.addListener(({ value })=> {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }
    flipCard(){
        if (this.value >= 90 ) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
	            useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
	            useNativeDriver: true,
            }).start();
        }

    }
    render() {
        const frontAnimateStyle = {
            transform: [
                { rotateY: this.frontInterpolate}
            ]
        }
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}
            ]
        }
         return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={this.flipCard.bind(this)}>
                        <Animated.View style={[frontAnimateStyle, styles.flipCard]}>
                            <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between' , flex: 1}}>
                                    <TouchableOpacity>
                                        <Icon style={{marginTop: 13, marginLeft: 15 }} name="mail" size={28}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon style={{marginTop: 13, marginRight: 15}} name="mail" size={28}/>
                                    </TouchableOpacity>
                                </View>
                                <View />
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                                    <Text style={styles.flipText1}>
                                        わたし
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flashcardStyle, styles.flashcardStyledowm]}>
                                <Icon style={{marginLeft: (WIDTH-50)/2, marginTop: -60}} name="mail" size={28}/>
                                <Text style={{marginLeft: (WIDTH-50)/2, marginBottom: -40}}>kdad</Text>
                            </View>
                        </Animated.View>

                        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                            <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between' , flex: 1}}>
                                    <TouchableOpacity>
                                        <Icon style={{marginTop: 13, marginLeft: 15 }} name="mail" size={28}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon style={{marginTop: 13, marginRight: 15}} name="mail" size={28}/>
                                    </TouchableOpacity>
                                </View>
                                <View />
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3 }}>
                                    <Text style={styles.flipText1}>
                                        Toi
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flashcardStyle, styles.flashcardStyledowm], {flex: 4}}>
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginTop: -30, flex: 1}}>
                                    <Icon style={{}} name="mail" size={28}/>
                                </TouchableOpacity>
                                <View style={{flex: 4, width: WIDTH-50, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 30}}>わたし</Text>
                                    <Text style={{fontSize: 20}}>tooi</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>

                </View>
                <View style={styles.stylebutton}>
                    <TouchableOpacity style={[styles.keepStyle, {backgroundColor: 'red', marginRight: 110}]}>
                        <Text>memized</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keepStyle, {backgroundColor: 'green',}]}>
                        <Text>memized</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    flipCard: {width: WIDTH-50, height: HEIGHT-180, flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backfaceVisibility: 'hidden', },
    flipCardBack: {backgroundColor: 'gray', position: 'absolute', top: 0},
    stylebutton: {flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20},
    flipText1: {fontSize: 50, },
    flashcardStyle: {width: WIDTH-50,},
    flashcardStyletop: {height: HEIGHT/5, backgroundColor: 'white', flex: 2},
    flashcardStyledowm: {flex: 1, backgroundColor: 'gray', flexDirection: 'column', justifyContent: 'space-around'},
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5},

})
