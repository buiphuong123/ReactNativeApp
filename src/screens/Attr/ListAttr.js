import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';

class ListAttr extends Component {
    wordUserLike(id) {
        axios.get("http://192.168.1.8:3001/finduserLike/"+ id, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log("http://192.168.1.8:3001/finduserLike/"+ id);
               console.log('data day nhe' + response.data);
            })
            .catch((error) => { console.log("http://192.168.1.8:3001/finduserLike/"+ id, JSON.stringify(error)) });
    }

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
