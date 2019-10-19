import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Dimensions
} from "react-native";

import firebase from 'firebase'


const { width, height } = Dimensions.get('window');

class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user)
            {
                this.props.navigation.navigate('DashBoardScreen',{isLoggedIn: 'Sign Out',forwardto: 'LogOut' });
            }
            else{
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        )
    }

    render() {
        return (
            
            
            <ImageBackground  style={{width:width,height:height}} source={require('../assets/splash.png')} >
            <View style={styles.container}>
                        <ActivityIndicator style={{marginTop:height/3+height/3}} size='large' />
            </View>
             </ImageBackground>
            
            
            
        );
    }
}
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
    }
});