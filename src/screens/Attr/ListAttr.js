import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux';
class ListAttr extends Component{
    render() {
        // const user = this.props.userAttr.JSON.parse(userAttr);
        return (
           <View>
               <Text>{this.props.username}</Text>
               {/* <Text>{this.props.userAttr.username}</Text> */}
               {/* <Text>{this.props.userAttr.username}</Text> */}
           </View>
        )
    }
}

const mapStateToProps = state => {
	return {
		username: state.userReducer.username,
	};
};
export default connect(mapStateToProps, null)(ListAttr);
