import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {connect} from 'react-redux';
import ActionCreator from '../redux/action/Index';
import {mainColor} from '../resource/Color';
import * as Facebook from 'expo-facebook';
import {SocialIcon} from 'react-native-elements'

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
    }

    _googleSignIn = async()=>{
        try{
            const {type,accessToken,user} = await Google.logInAsync({
                androidClientId:"876782387423-pg0vjmtt6bsv72udmtqcm5njfef291sk.apps.googleusercontent.com",
                iosClientId:"876782387423-mp76k7od9oedhvrtc9h0m8s2dc6tmbup.apps.googleusercontent.com"
            })
            if(type === "success"){
                this.props.Login(user)
                this.props.navigation.navigate(this.props.navigation.getParam("path"))
            }
            else{
                console.log("cancelled");
            }
        }
        catch(e){
            console.log("error",e);
        }
    }

    _facebookSignIn = async () => {
        try {
            const {
              type,
              token,
              expires
            } = await Facebook.logInWithReadPermissionsAsync( "448179712781393",{
              permissions: ['public_profile'],
            });
            if (type === 'success') {
              // Get the user's name using Facebook's Graph API
              const response = await (await fetch(`https://graph.facebook.com/me?access_token=${token}`)).json();
              if(response.error){
                    return alert("facebook login error!");
              }
              else{
                  this.props.Login(response);
                  this.props.navigation.navigate(this.props.navigation.getParam("path"))
              }
            } else {
              return false;
            }
          } catch ({ message }) {
            alert(message);
          }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:mainColor,justifyContent:"center"}}>
                    <Text style={{fontSize:40,fontWeight:"bold",color:"white",margin:"10%"}}>Your{"\n"}Fundi'Go{"\n\n"}Sing In</Text>
                </View>
                <View style={{flex:1,justifyContent:"center",marginHorizontal:"5%"}}>
                    <SocialIcon button type="facebook" title="Sing In With Facebook" onPress={()=>this._facebookSignIn()} style={{marginBottom:"7%"}}></SocialIcon>
                    <SocialIcon button type="google" title="Sing In With Google" onPress={()=>this._googleSignIn()} style={{marginBottom:"7%"}}></SocialIcon>
                    <TouchableOpacity style={styles.touchableopacity} onPress={()=>this.props.navigation.navigate("home")}>
                        <View style={{flexDirection:"row",alignSelf:"center"}}>
                            <Text style={styles.text}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableopacity:{
        marginLeft:"10%",
        backgroundColor: "white",
        padding:"3%",
        width:"80%"
    },
    text:{
        fontWeight:"bold",
        fontSize:15
    }
})

function mapStateToProps(state){
    return{
        auth:state.auth
    };
}

function mapDispatchToProps(dispatch){
    return {
        Login:(auth)=>{
            dispatch(ActionCreator.Login(auth));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);