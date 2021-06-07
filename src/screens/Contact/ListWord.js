import React, { Component } from 'react'
import { FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Word from './Word';

class ListWord extends Component{
    constructor(props){
        super(props);
        this.state = {
            WordSr: []
        }
    } 
      showWord= () => {
        axios.get("https://language-backend.vercel.app/getWord")
        .then(response => {
            // console.log(response);
            this.setState({WordSr: response.data.wordData});
        })
        .catch(error => {
            console.log(error);
        })
     }
    
    render() {
        this.showWord();
        const {WordSr} = this.state;
        return(
            <FlatList
                data = {WordSr}
                renderItem={({ item, index }) => <Word word = {item} count={index}/>}
                keyExtractor={item => item._id}
            />
        );
    }
}

export default ListWord;