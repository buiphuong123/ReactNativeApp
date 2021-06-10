import React, { Component } from 'react'
import { FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Word from './Word';
import { connect } from 'react-redux';

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
            this.setState({WordSr: response.data.wordData});
        })
        .catch(error => {
            console.log(error);
        })
     }
     
     takeWordLike = () => {
         
     }
    
    render() {
        this.showWord();
        const {WordSr} = this.state;
        const {isReverse} = this.props;
        return(
            <FlatList
                inverted ={isReverse? true: false }
                data = {WordSr}
                renderItem={({ item, index }) => <Word word = {item} count={index}/>}
                keyExtractor={item => item._id}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
      isReverse: state.wordReducer.isReverse,
    }
  };
  export default connect(mapStateToProps, null)(ListWord);
// export default ListWord;