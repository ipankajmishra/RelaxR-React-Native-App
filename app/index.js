import React, { Component } from 'react';
import { View, Text, StyleSheet,  Dimensions,TextInput, Button, Keyboard,  TouchableWithoutFeedback, ActivityIndicator, BackHandler } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'
//import { Google } from 'expo';
//import * as Google from 'expo-google-app-auth'
const { width, height } = Dimensions.get('window');
//import Expo from "expo"
import firebase from 'firebase'
import { Chip } from 'react-native-paper';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
    email: '',
    password: ''
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class ElaxR extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  componentWillMount(){
    
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
    
}




  Login = (email, password) => {
    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res.user.email);
      });} catch (error) {
      console.log(error.toString(error));
    }
  };

  /*isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
   
  onSignIn = googleUser =>{
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(function(result){
            console.log("user signed in");
            if(result.additionalUserInfo.isNewUser)
            {
              firebase
                .database()
                .ref('/users/'+ result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function(snapshot){

                });
              }
              else{
                firebase
                .database()
                .ref('/users/'+ result.user.uid).update({
                  last_logged_in: Date.now()
                })
              }
          })
          .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  }
        
  signInWithGoogleAsync= async() => {
    try {
      const result = await Google.logInAsync({//await Google.logInAsync({
        behavior: 'web',
        androidClientId: '85648510743-sg85ujoab1r9t0t9q1nfpc6oamvto4b0.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
      
    } catch (e) {
      return { error: true };
    }
  }
*/
  constructor(props) {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      );


    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
              
            )
          ])
          
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3-55, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.TextInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, -100],
      extrapolate: Extrapolate.CLAMP
    });


    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }


  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };

  _keyboardDidHide() {
    Keyboard.dismiss();
  }
  render() {
    
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end'
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#272727',
          justifyContent: 'flex-end'
        }}
      >
      
      
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
        
        <Svg height={height+50} width={width}>
        <ClipPath id="clip">
          <Circle r={height+50} cx={width/2} />
        </ClipPath>
        
        <Image
            href={require('../assets/beach-1853902_1920.jpg')}
            height={height+50}
            width={width}
            preserveAspectRatio='xMidYMid slice'
            clipPath='url(#clip)'
          />
        <View>
        <Text style={styles.hi}>Hi, I am ElaxR. </Text>
        
        
      </View>
        </Svg>
        
         
        </Animated.View>
        
        <View style={{ height: height/3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: 'white',
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
            </Animated.View>
          </TapGestureHandler>
          <TouchableWithoutFeedback onPressIn={this.signInWithGoogleAsync}>
          <Animated.View 
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
          
            <View>
            
              <Text style={{ fontSize: 20, fontWeight: 'bold',color: 'white' }}>Sign in with Google</Text>
           
           
             
            
            </View>
            
          </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View
          style={{
              
              
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}>
            <Text style={styles.relax}>By continuing you will rotate and make me "RElax".</Text>
          </Animated.View>
          <Animated.View
          style={{
              
              alignItems:'center',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}>
            <Chip style={{backgroundColor:"grey",width:80}} onPress={() => this.props.navigation.navigate('DashBoardScreen',{isLoggedIn: 'Sign In',forwardto: "LoginScreen" })}><Text style={{fontSize:14,color:'white'}}>Skip Now</Text></Chip>
          </Animated.View>
          
          <Animated.View style={{
            zIndex:this.textInputZindex,
            opacity: this.textInputOpacity,
            transform:[{translateY:this.TextInputY}],
            height:height/3,...StyleSheet.absoluteFill,top:null,justifyContent:'center'}}>
              <TapGestureHandler  onHandlerStateChange={this.onCloseState}>
                
                <Animated.View style={styles.closebutton}>
                  <Animated.Text style={{ fontSize: 15, transform:[{rotate:concat(this.rotateCross,'deg')}]}}>X</Animated.Text>
                </Animated.View>
                
              </TapGestureHandler>
                

                
                  <TextInput
                  placeholder="Enter your email address"
                  textAlign={'center'}
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={email => this.setState({ email })}
                  placeholderTextColor="black"/>
                  


              
              
              <TextInput
              placeholder="Password"
              textAlign={'center'}
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              placeholderTextColor="black"/>
              <TouchableOpacity onPress={() => this.Login(this.state.email, this.state.password)}>
              <Animated.View style={styles.button}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Sign in
            </Text>
               

              </Animated.View>
              </TouchableOpacity>
              <Animated.View>
            <Text style={{...styles.relax,
            paddingTop:5,
            color:'white'}}>By continuing you will rotate and make me "RElax".</Text>
          </Animated.View>
          </Animated.View>
          
          
          
        </View>
      </View>
      </TouchableWithoutFeedback>
      <KeyboardSpacer />
      </View>
    );
  }
}
export default ElaxR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#2E71DC',
    height: 50,
    marginLeft:60,
    marginRight:60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    /*shadowOffset: {width:2, height:2},
    shadowColor : 'black',
    shadowOpacity : 0.2*/
    elevation: 1
  },
  closebutton:{
    height:40,width:40,
    backgroundColor : 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent : 'center',
    position : 'absolute',
    top : -30,
    left: width/2-20,
    /*shadowOffset: {width:2, height:2},
    shadowColor : 'black',
    shadowOpacity : 0.2*/
    elevation: 1
  },
  textInput:{
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'white'
  },
  hi:{
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: 80,
    paddingLeft: 25,
    color: 'grey'
  },
  relax:{
    fontSize: 17,
    paddingTop: 20,
    paddingLeft: 16,
    color: '#F9F9F9'
    
  }
});