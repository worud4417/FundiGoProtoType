import Type from '../action/Type';

const auth = {
    isLogin : false,
    user :{
        
    }
}

export default (state = auth,action) => {
    switch(action.type){
        case Type.LOGIN :
            return state = action.auth;
        default :
            return state;
    }
}