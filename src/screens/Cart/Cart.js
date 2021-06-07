import React from "react";
import { View, Dimensions, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;

export default function MyCarousel() {
  const images = [
    { id: 1, image: "kkaa" },
    { id: 2, image: "slid 2" },
    { id: 3, image: "slid 3" },
    { id: 4, image: "slid 4" }
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text>{item.image}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Carousel
        data={images}
        renderItem={_renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 70}
        enableMomentum={false}
        lockScrollWhileSnapping
        autoplay
        useScrollView
        loop
        autoplayInterval={3000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 150
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});