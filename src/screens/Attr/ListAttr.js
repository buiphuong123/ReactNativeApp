import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
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
        console.log('ok nha');
        if (this.value >= 90 ) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
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
                    <TouchableOpacity onPress={() => this.flipCard()}>
                        <Animated.View style={[styles.flipCard, frontAnimateStyle]}>
                            <Text style={styles.flipText}>
                                This text is flipping on the front
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => this.flipCard()}>
                        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                            <Text style={styles.flipText}>
                                this text is flipping on the back
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>

                </View>
                {/* <TouchableOpacity onPress={() => this.flipCard()}>
                    <Text>Flip</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    flipCard: {width: 200, height: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', backfaceVisibility: 'hidden'},
    flipCardBack: {backgroundColor: 'red', position: 'absolute', top: 0},
    flipText: {color: 'white'}

})