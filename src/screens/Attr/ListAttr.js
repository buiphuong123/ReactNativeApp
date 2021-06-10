import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux';
class ListAttr extends Component{
    render() {
        // const user = this.props.userAttr.JSON.parse(userAttr);
        return (
           <View>
               <Text>Userinfo</Text>
               <Text>{this.props.id}</Text>
               <Text>{this.props.username}</Text>
               <Text>{this.props.email}</Text>
           </View>
        )
    }
}

const mapStateToProps = state => {
	return {
		id: state.userReducer.id,
        username: state.userReducer.username,
        email: state.userReducer.email,
	};
};
export default connect(mapStateToProps, null)(ListAttr);
