import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
class Contact extends Component{
    render() {
        return(
            <View>
                <Text>kaka</Text>
                <Text>{this.props.usernamess}</Text>
                <Text>mama</Text>
            </View>
        )
    }
}
function mapDispatchToProps(state) {
    return {
        usernamess: state.userReducer.username,
        email: state.userReducer.email,
        password: state.userReducer.password,
    }
}

export default connect(mapDispatchToProps, null)(Contact);