import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Button
} from "react-native";

import firebase from 'firebase'
const { width, height } = Dimensions.get('window');
function Separator() {
    return <View style={styles.separator} />;
  }

class LogOut extends Component {
    
    render() {
        return (
            <View style={styles.container}>
            <Separator />
                <View style={styles.container1}>
                <Image source={require('../assets/fantasy-4065901_1280.jpg')} style={styles.backgroundImage} />
                <Separator />
                <Text style={{color:'white', fontSize:35, marginTop:30}}>You will be missed!</Text>
                <Text style={{color:'#773294', fontSize:22, marginTop:30}}>Are you sure you want to logout?</Text>
                </View>
               
                    <View style={{...styles.fixToText, marginTop: 35}}>
                            <View style={{marginLeft:width/4}}>
                            <Button 
                                onPress={() => firebase.auth().signOut()}
                                title= 'Logout'
                                color="red"
                                
                                />
                            </View>

                            <View style={{marginLeft: width/6}}>
                            <Button 
                                onPress = {()=> this.props.navigation.goBack()}
                                title= 'Cancel'
                                color="#773294"
                                
                                />
                            </View>
                    </View>
                
            </View>
        );
    }
}
export default LogOut;
//#773294
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'black',
        height: height,
        width: width
    },
    container1: {
        
        alignItems: 'center',
        backgroundColor:'black',
        
    },
    backgroundImage: {
        aspectRatio: 0.8/1,
        height: height/2,
        width: width/2,
        marginTop: 25,
        borderRadius:50,
        backgroundColor:'black'
      },
      submit: {
        backgroundColor: '#68a0cf',
        overflow: 'hidden'
     },
     fixToText: {
         
        flexDirection: 'row',
      },
    separator: {
    alignItems:'flex-start',
    borderColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 15
  },
});