import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN ='LOGIN';
export const AUTHENTICATE ='AUTHENTICATE'
export const LOGOUT = 'LOGOUT'


export const authenticate = (userId, token ,registered) =>{
    return{
        type: AUTHENTICATE, userId:userId, token:token, registered:registered
    }
}

export const signup =(email,password)=>{

    return async dispatch =>{

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9nQgu577jTzU8ABi_ATzH4k2z0Tqtt04'
        ,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResponseData = await response.json();
            const errorId = errorResponseData.error.message;
            console.log(errorId)
            let message ='Something went wrong!'
            if( errorId=== 'EMAIL_EXISTS'){
                message = 'This email already exists. Try loging in'
            }else if( errorId === 'WEAK_PASSWORD : Password should be at least 6 characters'){
                message ='Weak Password. Password should be atleast 6 characters'
            }else if(errorId === 'INVALID_EMAIL'){
                message ='Email is not valid. make sure you signup with proper email'
            }else if(errorId === 'MISSING_PASSWORD'){
                message ='Password is not valid.Your password should be atleast 6 characters long.Make sure to use Uppercase , numbers and special characters like # * $ % to make your password strong'
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData)

        dispatch(authenticate(responseData.localId,responseData.idToken,responseData.registered));
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        const registered = responseData.registered
        saveDataToStorage(responseData.idToken,responseData.localId,expirationDate,registered)
    }
}


export const login =(email,password)=>{

    return async dispatch =>{

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9nQgu577jTzU8ABi_ATzH4k2z0Tqtt04'
        ,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResponseData = await response.json();
            const errorId = errorResponseData.error.message;
            let message ='Something went wrong!'
            if( errorId=== 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found. Try Signing up'
            }else if( errorId === 'INVALID_PASSWORD'){
                message = 'Incorrect Password'
            }else if( errorId == 'WEAK_PASSWORD'){
                message ='Weak Password. Password should be atleast 6 characters'
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData.registered)

        dispatch(authenticate(responseData.localId,responseData.idToken,responseData.registered));
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        const registered = responseData.registered
        saveDataToStorage(responseData.idToken,responseData.localId,expirationDate,registered)
    }
}

export const logout = () =>{
    return {
        type: LOGOUT
    }
}

const saveDataToStorage = (token, userId, expirationDate,registered) =>{
    AsyncStorage.setItem('userData',JSON.stringify({
        token:token,
        userId: userId,
        expiryDate :expirationDate.toISOString(),
        registered : registered
    }))
}