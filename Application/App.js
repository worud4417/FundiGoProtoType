import React from 'react';
import {Text, View,Image} from 'react-native';
import AppContainer from './src/Navigation';
import {SplashScreen} from 'expo';
import {Asset} from 'expo-asset';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isReady : false
    }
  }

  componentDidMount(){
    SplashScreen.preventAutoHide();
  }

  render(){
    if(!this.state.isReady){
      return(
        <View style={{flex:1}}>
          <Image source={require('./assets/background.png')} onLoad={this._cacheResourcesAsync} style={{width:"100%",height:"100%"}}></Image>
        </View>
      )
    }
    else{
      return (
        <AppContainer></AppContainer>
      );
    }
  }

  _cacheResourcesAsync =  () => {
    setTimeout(()=>{
      SplashScreen.hide();
      const images = [
        require('./assets/background.png')
      ];
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
  
      Promise.all(cacheImages);
      this.setState({ isReady: true });
    },3000)
  }
}

export default App;