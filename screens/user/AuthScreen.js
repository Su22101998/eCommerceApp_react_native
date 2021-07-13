import React,{useState,useCallback,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView,KeyboardAvoidingView, TextInput,ActivityIndicator, Alert } from 'react-native';
import Colours from '../../constants/Colours';
import Button from '../../components/Button2';
import { useSelector , useDispatch} from 'react-redux';
import { signup } from '../../store/actions/auth';
import { login } from '../../store/actions/auth';


const AuthScreen = (props,navigation) =>{


    const dispatch = useDispatch();

    const[email,setEmail] =useState('')
    const[password,setPassword] =useState('')
    const[isSignup,setIsSigup] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] =useState();

    useEffect(()=>{
        if(error){
            Alert.alert('An Error Occured',error,[{text:'OK'}])
        }

    },[error])

   

    const authHandler = async ()=>{
        if(isSignup){
            setError(null)
            setIsLoading(true)
            try{
            await dispatch(signup(email,password))
            }catch (err) {
                setError(err.message)
            }
            setIsLoading(false)
        }else{
            setError(null)
            setIsLoading(true)
            try{
                await dispatch(login(email,password))
            }catch (err){
                setError(err.message)
                setIsLoading(false)
            }
        }

    }
    return(
        <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={5}
        style={styles.screen}
        >
            <View style={styles.card}>
                <ScrollView>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                    value={email}
                    autoCorrect={false} 
                    onChangeText={text =>setEmail(text)}/>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                    value={password}
                    autoCorrect={false} 
                    onChangeText={text =>setPassword(text)}
                    />
                    {isLoading?(<ActivityIndicator size='small' color={Colours.primary}/>):(<Button title={isSignup?'Signup':'Login'} onPress={authHandler}/>)}
                    <Button title={isSignup?'Switch to Login':'Switch to Signup'} onPress={()=>{setIsSigup(prevState=>!prevState)}}/>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colours.accent,
    },
    card:{
        backgroundColor:Colours.accent,
        elevation:10,
        borderRadius:10,
        padding:20,
        width:'90%',
    },
    label:{
        fontWeight:'bold',
        fontSize:20
    }
})

export default AuthScreen;