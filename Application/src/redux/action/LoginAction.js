import type from'./Type';

function Login(payload){
    return {
        type : type.LOGIN,
        auth : {isLogin:true,user:payload}
    }
}

export {Login};