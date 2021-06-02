import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import vietnam from '../../../res/images/vietnam.png';

import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../../../res/images/vietnam.png'),
  },
  {
    text: 'Card two',
    name: 'Two',
    image: require('../../../res/images/english.png'),
  },
];
export default class Cart extends Component {
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
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  {/* <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left> */}
                </CardItem>
                <CardItem cardBody>
                  {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
                  <View style={styles.container}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimateStyle]}>
                        <Text style={styles.flipText}>
                            This text is flipping on the front
                        </Text>
                    </Animated.View>
                    
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipText}>
                            this text is flipping on the back
                        </Text>
                    </Animated.View>

                </View>
                <TouchableOpacity onPress={() => this.flipCard()}>
                    <Text>Flip</Text>
                </TouchableOpacity>
            </View>
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flipCard: {width: 200, height: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', backfaceVisibility: 'hidden'},
  flipCardBack: {backgroundColor: 'red', position: 'absolute', top: 0},
  flipText: {color: 'white'}

})