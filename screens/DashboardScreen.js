import React, { Component } from "react";
import styled from 'styled-components';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'; // 3.6.0
import { Chip } from 'react-native-paper';
import YouTubeVideo from './YouTubeVideo'
import PremiumContent from './PremiumContent'
import LogOut from './LogOut'
//import * as Permissions from 'expo-permissions';
//import * as Location from 'expo-location';
import {Platform, 
    InteractionManager,
    Header
} from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
//import { createStackNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { YellowBox,ImageBackground,Image } from "react-native";
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;

const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions,
    ScrollView,
  BackHandler,
    WebView,
    TouchableHighlight,TouchableOpacity
    
} from "react-native";
//import { ScreenOrientation } from 'expo';
const { width, height } = Dimensions.get('window');

import firebase from 'firebase'

numberquote = '13 June 1998 is the date of birth of my God i.e my creater. \n\n~ ElaxR - rotate to relax\n\n                         Swipe me to change!'
class DashboardScreen extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
    componentWillMount(){
        //this.getDataUsingGet();
        this.setState({myText: numberquote});
   //     this.getLocationAsync();
        this.getAdviceUsingGet();
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        );
        
    }
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true,
        isLooping: true,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        containerMounted: false,
        containerWidth: null,
      };

      

    constructor(props){
        super();
        this.state = {
            location:{},
          errors: [],
          myText: '',
          yomommaText:'',
          myAdvice:''
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      );
      //  this.props = props;
        this._carousel = {};
        this.init();
        
        //this.getDataUsingGet();
      }
     
    
      componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
      }
    
      handleBackPress = () => {
        BackHandler.exitApp(); // works best when the goBack is async
        return true;
      };

     /* getLocationAsync =async() => {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            //console.log((Location.getCurrentPositionAsync()))
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
          return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
          throw new Error('Location permission not granted');
        }
      }*/
      getDataUsingGet= () =>{
        //GET request 
        fetch('http://numbersapi.com/random', {
            method: 'GET'
            //Request Type 
        })
        .then((response) => response.text())
        //If response is in json then in success
        .then((responsetext) => {
            //Success 
            numberquote=responsetext;
            console.log(responsetext);
            this.setState({myText: numberquote})
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            
            console.error(error);
            //return "Error";
        });
        //return <Text>{numberquote}</Text>;
      }

      
      

      getAdviceUsingGet= () =>{
        //GET request 
        fetch('https://api.adviceslip.com/advice', {
            method: 'GET'
            //Request Type 
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responsetext) => {
            //Success 
            let advicequote=responsetext;
            //console.log(responsetext);
            this.setState({myAdvice: JSON.stringify(advicequote.slip.advice)})
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            
            console.error(error);
            //return "Error";
        });
        //return <Text>{numberquote}</Text>;
      }
      
    
      init(){
        this.state = {
          videos: [
            {
              id: "59ZYlQh32FM",
              thumbnail: "http://i3.ytimg.com/vi/59ZYlQh32FM/maxresdefault.jpg",
              title: "BREAKING STUFF OVER IT ..",
              forwardto: "numbers"
            }, {
              id: "DKfNWkzr9Rs",
              thumbnail: "http://i3.ytimg.com/vi/DKfNWkzr9Rs/maxresdefault.jpg",
              title: "Sharing a Mutual friend's party.."
            }, {
              id: "AeFoZY0HLHs",
              thumbnail: "http://i3.ytimg.com/vi/AeFoZY0HLHs/maxresdefault.jpg",
              title: "HOTEL Wala Experience - Stand Up.. "
            }
          ]
        };
    
        //console.log("ThumbnailCarousel Props: ", this.props)
      }
    
      handleSnapToItem(index){
       // console.log("snapped to ", index)
      }
    
      _renderItem = ( {item, index}, parallaxProps ) => {
        const {navigate} = this.props.navigation
        //console.log("rendering,", index, item)
        return (
          
         
        <ThumbnailBackgroundView>
              <CurrentVideoTO
                /* onPress={ () => { 
                    console.log("clicked to index", item.forwardto)
                    this._carousel.snapToItem(index);
                    
                  }}*/
                  onPress={() => navigate('YouTubeVideo',{youtubeId: item.id})}
              >
                <CurrentVideoImage source={{ uri: item.thumbnail }} />
              </CurrentVideoTO>
                <VideoTitleText style={{color:'white'}}>{item.title}</VideoTitleText>
            </ThumbnailBackgroundView>
            
            
        );
      }
      
     
    /*static navigationOptions = {
      
        headerTitle: <Text style={{ textAlign: 'left',
        color:'#773294',
         flex: 1,
         fontSize:38,
         fontWeight: 'bold',
         marginLeft: 15,
         marginTop: 15
         }}>ElaxR</Text> ,
        headerRight: (

            <Button
              onPress={() => firebase.auth().signOut()}
              title= 
              color="#773294"
              marginLeft='-10'
            />
          ),
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTintColor: "#773294",
        headerTitleStyle: {
          fontWeight: "bold",
          
        }
      };*/
    //navigation.navigate(navigation.state.params.forwardto)}
      static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{ textAlign: 'left',
        color:'#773294',
         flex: 1,
         fontSize:38,
         fontWeight: 'bold',
         marginLeft: 15,
         marginTop: 15
         }}>ElaxR</Text> ,
        headerRight: (

            <Button
              onPress = {()=> navigation.navigate(navigation.state.params.forwardto)}
              title= {navigation.state.params.isLoggedIn}
              color="#773294"
              marginLeft='-10'
            />
          ),
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTintColor: "#773294",
        headerTitleStyle: {
          fontWeight: "bold",
          
        }
      });

      render = () => {
        const {navigate} = this.props.navigation
      //  console.log("videos: updating")
    
        return (
         
            <ScrollView style={{backgroundColor:'black'}}>
                     
                    
                    <View >
                    <CarouselBackgroundView style={{backgroundColor:'black'}}>
                        <Carousel
                        ref={ (c) => { this._carousel = c; } }
                        data={this.state.videos}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={this.handleSnapToItem.bind(this)}
                        sliderWidth={width}
                        itemWidth={256}
                        layout={'default'}
                        firstItem={0}
                        autoplay={true}
                        autoplayDelay={1000}
                        loop={true}
                        />
                    </CarouselBackgroundView>
                </View>
                
    
   
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',marginTop:25}}>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Joke</Text></Chip>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Facts</Text></Chip>       
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Numbers</Text></Chip>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>News</Text></Chip>
                                 

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',marginTop:10}}>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Viral</Text></Chip>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Trending</Text></Chip>       
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Funny</Text></Chip>
                    <Chip style={{backgroundColor:"#773294"}} onPress={() => console.log('Pressed')}><Text style={{fontSize:18,color:'white'}}>Memes</Text></Chip>
                                 

                </View>
                
                
                    <View style={{marginTop:25}}>
                    
                        <Text style={{fontSize:21,color:'white',marginLeft:15,marginBottom:15}}>Play & Learn Number Facts</Text>
                        <TouchableOpacity onPress = {this.getDataUsingGet}>
                        <LinearGradient
                            colors={['#773294','grey']}
                            style={{ padding: 15,elevation:1, alignItems: 'center', borderRadius: 5,marginLeft:15,height:height/5,marginRight:15 }}>
                                <Text style={{...styles.numberrandomtext,height:(height/4-50),justifyContent:'center'}}>
                                    {this.state.myText}
                                </Text>
                        
                            {/*<Ionicons onPress = {this.getDataUsingGet} name="md-checkmark-circle" size={40}  />*/}
                        </LinearGradient>
                        </TouchableOpacity> 
                    </View>
                    
                    <View style={{marginTop:25}}>
                    
                        <Text style={{fontSize:21,color:'white',marginLeft:15,marginBottom:15}}>Premium Users</Text>
                        <TouchableOpacity style={{backgroundColor:'black',marginLeft:35,marginRight:35,borderRadius:20}} onPress={() => navigate('PremiumContent')} >
                        
                            <ImageBackground style={{height:height/4-40,aspectRatio:1/1, marginLeft:width/5+10}} source={require('../assets/premium.png')} >
                            <View>
                                 <Text style={{paddingTop:60,paddingLeft:30,color:'white'}}>ElaxR Premium{"\n\n     "} Click here</Text>
                            </View>
                           
                            
                        
                            {/*<Ionicons onPress = {this.getDataUsingGet} name="md-checkmark-circle" size={40}  />*/}
                            </ImageBackground>
                            
                        </TouchableOpacity> 
                    </View>

                    <View style={{marginTop:25}}>
                    
                        <Text style={{fontSize:21,color:'white',marginLeft:15,marginBottom:15}}>What we Advice ~</Text>
                        <TouchableOpacity onPress = {this.getAdviceUsingGet}>
                        

                        <ImageBackground source={require('../assets/silhouette-1082129_1920.jpg')} style={{marginLeft:15,marginBottom:25, borderRadius:30, width: width-30, height: height/4}}>
                             <View style={{...styles.numberrandomtext,backgroundColor:'rgba(0,0,0,0.6)', height:(height/4),justifyContent:'center'}}>
                             <Text style={{color:'white',marginLeft:15,marginRight:15,fontSize:16}}>
                                    {this.state.myAdvice}
                                </Text>
                             </View>
                        </ImageBackground>
                        </TouchableOpacity> 
                    </View>
                
            </ScrollView>
          
        );
      }
}
//export default DashboardScreen;

export default createStackNavigator({
    Home: {
      screen: DashboardScreen,
    },
    YouTubeVideo: { screen: YouTubeVideo },
    PremiumContent: { screen: PremiumContent},
    LogOut: {
      screen: LogOut,
      navigationOptions: () => ({
      header:null
      })
    }
  });
  
  YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader",
    "Possible Unhandled",
    "Warning"
  ]);


  
  const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`

  
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 200;
  width: 100%;
`

  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardnumber:{
        height:height/4,
        width:width
    },
    numberrandomtext:{
        fontSize: 16,
        color: 'white',
        
    },
    item: {
      width: width - 60,
      height: width - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title:{
      
    }
});