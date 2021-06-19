import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';

class ListAttr extends Component {
    

render() {
    // this.wordUserLike(this.props.id);
    return (
        <View>
            <Text>Userinfo</Text>
            <Text>{this.props.id}</Text>
            <Text>{this.props.username}</Text>
            <Text>{this.props.email}</Text>
            <Text>rong </Text>
        </View>
    )
}
}

const mapStateToProps = state => {
    return {
        id: state.userReducer.id,
        username: state.userReducer.username,
        email: state.userReducer.email,
        cartwordAttr: state.cartReducer.cartwordAttr,
    };
};
export default connect(mapStateToProps, null)(ListAttr);
