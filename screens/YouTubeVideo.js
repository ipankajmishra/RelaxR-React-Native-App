import React from 'react'
import { StyleSheet, View, BackHandler , Dimensions} from 'react-native'
//import { ScreenOrientation } from 'expo';
//import { StackNavigator } from 'react-navigation'
import YouTube from 'react-native-youtube';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
const { width, height } = Dimensions.get('window');
//import WebView from 'react-native-android-fullscreen-webview-video';
//import { Video } from 'expo-av';
export default class YouTubeVideo extends React.Component{

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
        playerWidth: Dimensions.get('window').width,
      };
      _youTubeRef = React.createRef();


      

    constructor(props) {
        super()
        
       // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    
    static navigationOptions = {
        header: null
    }

    render() {
        return (
          
            /* <View style={styles.container}>
             {YouTubeStandaloneAndroid.playVideo({
                apiKey: '85648510743-sg85ujoab1r9t0t9q1nfpc6oamvto4b0.apps.googleusercontent.com', // Your YouTube Developer API Key
                videoId: 'this.props.navigation.state.params.youtubeId', // YouTube video ID
                autoplay: true, // Autoplay the video
                startTime: 0, // Starting point of video (in seconds)
                isLooping: false,
                fullscreen: false
              })
                .then(() => console.log('Standalone Player Exited'))
                .catch(errorMessage => console.error(errorMessage))}
                </View>*/
           /* <WebView style={styles.container}
                
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                 domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/' + this.props.navigation.state.params.youtubeId+'?autoplay=1'}}
                />*/
                    /*<Video
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

            <View style={styles.container}>
            <YouTube
                videoId={this.props.navigation.state.params.youtubeId}   
                play={true}             
                fullscreen={true}       
                loop={false}            
                apiKey={'85648510743-sg85ujoab1r9t0t9q1nfpc6oamvto4b0.apps.googleusercontent.com'}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{width:width, height: 300 }}
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
       
        
    }
})