import React from 'react';
import {Text,View,Image,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/action/Index';
import Icon from 'react-native-vector-icons/Ionicons';

import {fetchGetHomeImageList,GetHomeMainImage} from '../../api/HomeImageApi';

const screenWidth = Math.round(Dimensions.get('window').width);

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[" "]
        }
    }

    async componentWillMount(){
        let result = await fetchGetHomeImageList();
        let imageList = new Array();
        for(let i = 0 ; i<result.list.length;i++){
            imageList.push(await GetHomeMainImage(result.list[i]));
        }

        this.setState({list:imageList})
    }

    _renderItem = ({item, index}) => {
        return (
            <View>
                <Image source = {{uri:item}} style={{width:"100%",height:"100%"}}></Image>
            </View>
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Carousel data = {this.state.list} renderItem = {this._renderItem} sliderWidth={screenWidth} sliderHeight={200} itemHeigh={200} itemWidth={screenWidth}
                        loop={true} autoplay={true} autoplayInterval={5000} activeAnimationType="spring"/>
                </View>
                <View style={{flex:1.5}}>
                    <View style={{flex:1.8,justifyContent:"center"}}>
                        {
                            this.props.auth.isLogin ? 
                            <Text style={styles.text}>안녕하세요.{"\n"}{this.props.auth.user.name}님, 어디로{"\n"}여행하시나요?</Text> : 
                            <Text style={styles.text}>오늘은 어디로 가볼까요?</Text>
                        }
                    </View>
                    <View style={{flex:3}}>
                        <TouchableOpacity style={styles.searchBox} onPress={()=>this.props.navigation.navigate("search")}>
                            <Icon name="ios-paper-plane" size={25} color="gray" style={{margin:"5%"}}></Icon>
                            <Text style={{fontSize:15,color:"gray",padding:"5%",marginTop:"0.5%"}}>무엇을 찾아볼까요?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text : {
        margin:"5%",
        fontSize: 25,
        fontWeight:'bold'
    },
    searchBox:{
        borderTopWidth:1,
        borderTopColor:"gray",
        borderLeftWidth:1,
        borderLeftColor:"gray",
        borderBottomWidth:2,
        borderBottomColor:"black",
        borderRightWidth:2,
        borderRightColor:"black",
        marginHorizontal:"10%",
        borderRadius:10,
        flexDirection:"row"
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);