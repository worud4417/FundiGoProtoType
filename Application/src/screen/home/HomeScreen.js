import React from 'react';
import {Text,View,Image,Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {fetchGetHomeImageList,GetHomeMainImage} from '../../api/HomeImageApi';

const screenWidth = Math.round(Dimensions.get('window').width);

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[" "],
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
        console.log(item)
        return (
            <View>
                <Image source = {{uri:item}} style={{width:"100%",height:"100%"}}></Image>
            </View>
        );
    }

    //Image cache 조사 - 2019.12.8
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Carousel data = {this.state.list} renderItem = {this._renderItem} sliderWidth={screenWidth} sliderHeight={200} itemHeigh={200} itemWidth={screenWidth}
                        loop={true} autoplay={true} autoplayInterval={5000} activeAnimationType="spring"/>
                </View>
                <View style={{flex:1.5}}>
                    <Text>안녕하세요.{"\n"}proring님, 어디로{"\n"}여행하시나요?</Text>
                </View>
            </View>
        )
    }
}

export default HomeScreen;