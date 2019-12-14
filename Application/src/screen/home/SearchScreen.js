import React from 'react';
import {Text,View,AsyncStorage} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search:""
        }
    }

    //과거검색기록 구현중
    async _submit(){
        AsyncStorage.clear();
        let list = await AsyncStorage.getItem("pastSearchList")
        try{
            if(list == null){
                await AsyncStorage.setItem('pastSearchList', this.state.search);
            }
        
            console.log(await AsyncStorage.getItem("pastSearchList"))
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1,justifyContent:"center"}}>
                    <Input placeholder="무엇을 찾으시나요?" inputContainerStyle={{marginLeft:"5%",marginRight:"5%"}} 
                        rightIcon={<Icon name="ios-search" size={25} color="gray" onPress={()=>this._submit()}></Icon>}
                        onSubmitEditing = {()=>this._submit()} onChangeText={(text)=>this.setState({search:text})}>
                    </Input>
                </View>
                <View style={{flex:5}}>

                </View>
            </View>
        )
    }
}

export default SearchScreen;