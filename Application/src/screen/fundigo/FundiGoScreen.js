import React from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/action/Index';

class FundiGoScreen extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!this.props.auth.isLogin){
            return this.props.navigation.navigate("Login",{path:"fundigo"});
        }
    }

    render(){
        return(
            <View>
                <Text>FundiGoScreen</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(FundiGoScreen);