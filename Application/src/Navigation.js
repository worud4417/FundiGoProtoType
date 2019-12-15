import React from 'react';
import {Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Color from './resource/Color';

import FeedScreen from './screen/feed/FeedScreen';

import HomeScreen from './screen/home/HomeScreen';
import SearchScreen from './screen/home/SearchScreen';

import ProfileScreen from './screen/profile/ProfileScreen';

import StoreScreen from './screen/store/StoreScreen';

import FundiGoScreen from './screen/fundigo/FundiGoScreen';

import LoginScreen from './screen/LoginScreen';

const profileSwitchNavigator = createSwitchNavigator({
    profile : {
        screen : ProfileScreen
    }
})

const storeSwitchNavigator = createSwitchNavigator({
    store : {
        screen : StoreScreen
    }
})

const feedSwitchNavigator = createSwitchNavigator({
    feed : {
        screen : FeedScreen
    }
})

const homeSwitchNavigator = createSwitchNavigator({
    home : {
        screen : HomeScreen
    },
    search:{
        screen : SearchScreen
    }
})

const fundigoSwitchNavigator = createSwitchNavigator({
    fundigo : {
        screen : FundiGoScreen
    }
})

const rootMaterialBottomNavigator = createMaterialBottomTabNavigator({
    home :{
        screen : homeSwitchNavigator,
        navigationOptions : {
            tabBarColor : Color.mainColor,
            tabBarIcon:({focused,horizontal,tintColor})=>{
                return <Icon name="ios-home" size={25} color={tintColor}></Icon>
            },
            title:""
        }
    },
    feed : {
        screen : feedSwitchNavigator,
        navigationOptions : {
            tabBarColor : Color.mainColor,
            tabBarIcon:({focused,horizontal,tintColor})=>{
                return <Icon name="ios-chatboxes" size={25} color={tintColor}></Icon>
            },
            title:""
        }
    },
    fundigo : {
        screen : fundigoSwitchNavigator,
        navigationOptions : {
            tabBarColor : Color.mainColor,
            tabBarIcon:({focused,horizontal,tintColor})=>{
                return <Image source={require("../assets/Slice.png")} style={{resizeMode:"cover",height:70,width:70,bottom:"80%"}}></Image>
            },
            title:""
        }
    },
    store : {
        screen : storeSwitchNavigator,
        navigationOptions : {
            tabBarColor : Color.mainColor,
            tabBarIcon:({focused,horizontal,tintColor})=>{
                return <Icon name="ios-cart" size={25} color={tintColor}></Icon>
            },
            title:""
        }
    },
    profile : {
        screen : profileSwitchNavigator,
        navigationOptions : {
            tabBarColor : Color.mainColor,
            tabBarIcon:({focused,horizontal,tintColor})=>{
                return <Icon name="ios-person" size={25} color={tintColor}></Icon>
            },
            title:""
        }
    }
}) 

const switchNavigator = createSwitchNavigator({
    root : {
        screen : rootMaterialBottomNavigator
    },
    login : {
        screen : LoginScreen
    }
})

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;