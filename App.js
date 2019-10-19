import React from 'react';
import { StyleSheet, Text, View, StatusBar,BackHandler } from 'react-native';

//import {Asset} from 'expo-asset';
//import {AppLoading} from 'expo';
import ElaxR from './app/index'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import DashBoardScreen from './screens/DashboardScreen'

import firebase from 'firebase'
import { firebaseConfig } from './config'
firebase.initializeApp(firebaseConfig)

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component{

  constructor(){
    super()
    this.state={
      isReady:false
    }
  }

  

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      
      require('./assets/beach-1853902_1920.jpg'),
      require('./assets/fantasy-4065901_1280.jpg'),
    ]);


    await Promise.all([...imageAssets]);
  }

  render(){
    /*if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <ElaxR />;*/

    return (
      [
      <StatusBar
     backgroundColor="black"
     hidden={true}
     barStyle="light-content"
   />,
    <AppNavigator />
      ]
    );
    
  }
}

const AppSwitchNavigator = createStackNavigator({
  LoadingScreen:{
    screen:  LoadingScreen,
    navigationOptions: () => ({
     header:null
    }),
  },
  
  LoginScreen: {
    screen:  ElaxR,//LoginScreen,
    navigationOptions: () => ({
     header:null
    }),
  },
   
  DashBoardScreen: {
    screen: DashBoardScreen,
    navigationOptions: () => ({
     header:null
    }),
  },
  
}

)

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
