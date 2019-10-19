import React from 'react'
import { StyleSheet, View, Text, WebView, BackHandler , Dimensions} from 'react-native'
//import { ScreenOrientation } from 'expo';
//import { StackNavigator } from 'react-navigation'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
const { width, height } = Dimensions.get('window');
//import { Video } from 'expo-av';
//import WebView from 'react-native-android-fullscreen-webview-video';
export default class PremiumContent extends React.Component{
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    
    componentWillUnmount() {
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        
    }
    
    handleBackButtonClick() {
     //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.props.navigation.goBack(null);
        return true;
    }
    /*componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }*/
    /*static navigationOptions = {
        headerTitle: 'YouTube',
        headerStyle: {
            backgroundColor: '#000'
        }, 
        headerTitleStyle: {
            color: '#fff'
        }
    }*/
    static navigationOptions = {
        header: null
    }

    render() {
        return (
         
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
           /* <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls={true}
            //resizeMode={true}
            style={{ width: height, height: width }}
            />*/
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: width,
        width: height
        
    }
})