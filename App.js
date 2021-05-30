/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
import Home from './src/navigations/Home';
// export default class App extends Component {
//   render() {
//     return (
//       <Home />
//     )
//   }
// }
// test thu
// export default class App extends Component{
//   render() {
//     return (
//         <Home />
//     )
//   }
// }

//
 import AppTabbar from './src/stacks/app.tabs';
 import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './src/redux/reducers';
export const store = createStore(
  appReducers
)
 export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Home />
      </Provider>
    );
  }
}


//  import {Body, Container, Content, Header, Text, Root} from 'native-base';
//  import SwitchSelector from 'react-native-switch-selector';
// import { useTranslation } from 'react-i18next';
 
//  const options =[
//    { label : 'English', value: 'en'},
//    { label : 'Vietnamese', value: 'vn'},
 
//  ];
//  const App =() => {
//    const {t, i18n}=useTranslation();
//    return (
//      <Container>
//        <Header>
//          <Body>
//            <SwitchSelector options={options} hasPadding initial={0} 
//            onPress={(language)=>{
//              i18n.changeLanguage(language);
//            }}
//            />
//          </Body>
//        </Header>
//        <Content padder>
//           <Text>
//             {t("WelcomeText")}
//           </Text>
//         </Content>
//      </Container>
//    );
//  };
  
//   export default App;
 