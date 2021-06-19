import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions, Animated } from 'react-native';
import vietnam from '../../../res/images/vietnam.png';
const {width: WIDTH}= Dimensions.get('window');
const {height: HEIGHT}= Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Container, DeckSwiper, Card, Text, } from 'native-base';

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            WordSr: [],
            isChange: true,
        }
        
    } 
    
    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
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
    trc = () => {
        
    }
    flipCard = () => {
        this.setState({isChange: !this.state.isChange});
        if (this.value >= 90){
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
    render () {
        const {item} = this.props;
       
        return (
            <Card style={{ elevation: 3, height: HEIGHT, backgroundColor: '#f5f5f0' }}>
                {/* <CardItem>
                    
                </CardItem> */}
                {/* <CardItem> */}
                    {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity onPress={() =>this.flipCard()}>
                                <Animated.View style={styles.flipCard}>
                                    <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                            <TouchableOpacity>
                                                <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
                                            </TouchableOpacity>
                                        </View>
                                        <View />
                                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                                            <Text style={styles.flipText1}>
                                                {item.hira}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.flashcardStyle, styles.flashcardStyledowm]}>
                                        <Icon style={{ marginLeft: (WIDTH - 50) / 2, marginTop: -70, alignItems: 'center', color:'#999999'  }} name="volume-up" size={45} />
                                        <Text style={{ marginLeft: (WIDTH - 50) / 2, marginBottom: -40 }}>1/60</Text>
                                    </View>
                                </Animated.View>
                                
                                
                                
                                <Animated.View style={styles.flipCard, styles.flipCardBack}>
                                    <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                            <TouchableOpacity>
                                                <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
                                            </TouchableOpacity>
                                        </View>
                                        <View />
                                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3 }}>
                                            <Text style={styles.flipText1}>
                                            {item.vn}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.flashcardStyle, styles.flashcardStyledowm], { flex: 4 }}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: -30, flex: 1 }}>
                                            <Icon style={{ color:'#999999'}} name="volume-up" size={45} />
                                        </TouchableOpacity>
                                        <View style={{ flex: 4, width: WIDTH - 50, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 30 }}>{item.kanji}</Text>
                                            <Text style={{ fontSize: 20 }}>{item.hira}</Text>
                                            <Text style={{ fontSize: 20 }}>{item.vn}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                                
                            
                            </TouchableOpacity>

                        </View>
                        <View style={styles.stylebutton}>
                            <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#ff0000', marginRight: 110 }]}>
                                <Text>memized</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#5cd65c', }]}>
                                <Text>memized</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                {/* </CardItem> */}
                
            </Card>
        );
    };
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    flipCard: {width: WIDTH-50, height: HEIGHT-180, flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backfaceVisibility: 'hidden' },
    flipCardBack: {backgroundColor: '#e6e6e6', position: 'absolute', top: 0},
    stylebutton: {flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20},
    flipText1: {fontSize: 50, },
    flashcardStyle: {width: WIDTH-50,},
    flashcardStyletop: {height: HEIGHT/5, backgroundColor: 'white', flex: 2},
    flashcardStyledowm: {flex: 1, backgroundColor: '#e6e6e6', flexDirection: 'column', justifyContent: 'space-around'},
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5},

})

export default Item;
