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
            currentUser: props.id,
            array: [],
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

     wordUserMemLike = (id) => {
        axios.get("https://language-backend.vercel.app/getWord/"+id)
        .then(response => {
            var i;
           
            for(i=0;i<response.data.length;i++) {
                if(response.data[i].memerizes.length !==0){
                    response.data[i].isMemerize = response.data[i].memerizes[0].isMemerize;
                }
                if(response.data[i].likes.length !==0){
                    response.data[i].isLike = response.data[i].likes[0].isLike;
                }
                // response.data[i].isLike = response.data[i].memerizes[0].isLike;
                this.setState({LikeMem: this.state.LikeMem.concat(response.data[i])});
            }
            this.props.setwordLikeMem(this.state.LikeMem);
        })
        .catch(error => {
            console.log(error);
        })
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

     
    //  UNSAFE_componentWillReceiveProps  = nextProps => {
    //     //  console.log('nextPros la ' + nextProps.id);
    //     //  console.log('this.props.id la ' + this.props.id);
	// 	if (this.props.id !== nextProps.id) {
    //         console.log('vao day chu');
    //         this.wordUserMemLike(this.props.id);
    //         console.log('set lai roi');
    //     }
	// }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('vao 1');
        if (this.props.id !== nextProps.id) {
            console.log('vao 2');
           this.setState({LikeMem: []});
          this.wordUserMemLike(nextProps.id);
        }
      }
     UNSAFE_componentWillMount() {
         console.log('vao 0');
        this.wordUserMemLike(this.props.id);
        this.wordUserMemerize(this.props.id);
        this.wordUserNotMemerize(this.props.id);
        this.wordUserLike(this.props.id);
    }

    render() {
       
        const {WordSr, WordLike, WordMemerize} = this.state;
        const {isReverse, isLike, isMemerize, isNotMemerize, likewordAttr, memerizewordAttr, notmemerizewordAttr, checkwordArr} = this.props;
        return(
            <FlatList
                inverted ={isReverse? true: false }
                data = {isMemerize ? checkwordArr.filter(e =>e.isMemerize) : checkwordArr && isLike ? checkwordArr.filter(e =>e.isLike) : checkwordArr && isNotMemerize? checkwordArr.filter(e => !e.isMemerize) : checkwordArr }
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
        },
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListWord);