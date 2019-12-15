import React from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/action/Index';

class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!this.props.auth.isLogin){
            return this.props.navigation.navigate("login",{path:"profile"});
        }
    }

    render(){
        return(
            <View>
                <Text>ProfileScreen</Text>
            </View>
        )
    }
}

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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);