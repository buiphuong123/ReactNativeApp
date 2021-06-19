import React, { Component } from 'react'
import { FlatList, View } from 'react-native';
import axios from 'axios';
import Word from './Word';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { ScrollView } from 'react-native-gesture-handler';
class ListWord extends Component{
    constructor(props){
        console.log('load nhe');
        super(props);
        this.state = {
            WordSr: [],
            WordSr1: [],
            WordLike: [],
            WordMemerize: [],
            WordNotMemerize: [],
            colorLike: false,
            LikeMem: [],
        }
        
    } 
    
     
     wordUserLike= (id) => {
        axios.get("https://language-backend.vercel.app/findUserLike/"+id)

        .then(response => {
            var i;
            for(i=0;i<response.data.length;i++) {
                response.data[i].wordId.isLike = response.data[i].isLike;
                this.setState({WordLike: this.state.WordLike.concat(response.data[i].wordId)});
            }
            // this.setState({colorLike: true});
            this.props.setUserLike(this.state.WordLike);
        })
        .catch(error => {
            console.log(error);
        })
     }

     showWord= (id) => {
        axios.get("https://language-backend.vercel.app/getWord/"+ id)
        .then(response => {
            this.setState({WordSr: response.data.wordData});
            this.props.setListCard(this.state.WordSr);
        })
        .catch(error => {
            console.log(error);
        })
     }


     wordUserMemerize = (id) => {
        axios.get("https://language-backend.vercel.app/findUserMemerize/"+id)

        .then(response => {
            var i;
            for(i=0;i<response.data.length;i++) {
                response.data[i].wordId.isMemerize = response.data[i].isMemerize;
                this.setState({WordMemerize: this.state.WordMemerize.concat(response.data[i].wordId)});
            }
            this.props.setUserMemerize(this.state.WordMemerize);
        })
        .catch(error => {
            console.log(error);
        })
     }

     wordUserNotMemerize = (id) => {
        axios.get("https://language-backend.vercel.app/listWordNotMemerize/"+id)

        .then(response => {
            this.props.setnotUserMemerize(response.data.result);
        })
        .catch(error => {
            console.log(error);
        })
     }

     wordUserMemLike = (id) => {
        axios.get("https://language-backend.vercel.app/listWordLikeMem/"+id)

        .then(response => {
            var i;
            for(i=0;i<response.data.result.length;i++) {
                response.data.result[i].wordId.isLike = response.data.result[i].isLike;
                response.data.result[i].wordId.isMemerize = true;
                this.setState({LikeMem: this.state.LikeMem.concat(response.data.result[i].wordId)});
            }
            for(i=0;i<response.data.memer.length;i++) {
                response.data.memer[i].wordId.isMemerize = response.data.memer[i].isMemerize;
                this.setState({LikeMem: this.state.LikeMem.concat(response.data.memer[i].wordId)});
            }
            for(i=0;i<response.data.onlyLike.length;i++) {
                response.data.onlyLike[i].wordId.isLike = response.data.onlyLike[i].isLike;
                this.setState({LikeMem: this.state.LikeMem.concat(response.data.onlyLike[i].wordId)});
            }
            this.props.setwordLikeMem(this.state.LikeMem);
            console.log('all day nhes: ' + JSON.stringify(this.props.checkwordArr));
        })
        .catch(error => {
            console.log(error);
        })
     }
     UNSAFE_componentWillMount() {
         console.log('vao 1');
        this.wordUserLike(this.props.id);
        this.showWord(this.props.id);
        this.wordUserMemerize(this.props.id);
        this.wordUserNotMemerize(this.props.id);
        // this.wordUserMemLike(this.props.id);
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     console.log('vao 2');
    //     const { id } = nextProps;
    //     console.log('vao 2 id=' + id);
    //    if(id !== this.props.id){
    //        this.wordUserLike(this.props.id);
    //        this.wordUserMemerize(this.props.id);
    //        this.wordUserNotMemerize(this.props.id);
    //    }
    //  }
    render() {
       
        const {WordSr, WordLike, WordMemerize} = this.state;
        const {isReverse, isLike, isMemerize, isNotMemerize, likewordAttr, memerizewordAttr, notmemerizewordAttr} = this.props;
        return(
            <FlatList
                inverted ={isReverse? true: false }
                data = {isMemerize ? memerizewordAttr: WordSr && isLike? likewordAttr: WordSr && isNotMemerize? notmemerizewordAttr: WordSr }
                renderItem={({ item, index }) => <Word word = {item} count={index} />}
                keyExtractor={(item, index) => index.toString()}
               
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        isReverse: state.wordReducer.isReverse,
        id: state.userReducer.id,
        isLike: state.wordReducer.isLike,
        isNotMemerize: state.wordReducer.isNotMemerize,
        isMemerize: state.wordReducer.isMemerize,
        likewordAttr: state.likeReducer.likewordAttr,
        memerizewordAttr: state.memerizeReducer.memerizewordAttr,
        notmemerizewordAttr: state.notMemerizeReducer.notmemerizewordAttr,
        checkwordArr: state.tickReducer.checkwordArr,
    }
  };
const mapDispatchToProps = dispatch => {
    return {
        setListCard: (cartwordAttr) => {
            dispatch(actions.showCard(cartwordAttr));
        },
        setUserLike: (likewordAttr) => {
            dispatch(actions.showLike(likewordAttr));
        },
        setUserMemerize: (memerizewordAttr) => {
            dispatch(actions.showNotMemerize(memerizewordAttr));
        },
        setnotUserMemerize: (notmemerizewordAttr) => {
            dispatch(actions.showWordNotMemerize(notmemerizewordAttr));
        },
        setwordLikeMem : (checkwordArr) => {
            dispatch(actions.likeMem(checkwordArr));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListWord);