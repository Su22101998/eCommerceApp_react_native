import React,{useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Colours from '../constants/Colours';
import { authenticate } from '../store/actions/auth';



const StartUpScreen = ({props,navigation}) =>{
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                navigation.navigate('Authenticate');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryData,registered} = transformedData;
            const expirationDate = new Date (expiryData);

            if(expirationDate <= new Date() || !token || !userId ||!registered){
                navigation.navigate('Authenticate');
                return
            }
            
            dispatch(authenticate(userId,token,registered))
        }
        tryLogin();
},[dispatch])

    return(
        <View style ={styles.screen}>
            <ActivityIndicator size = 'large'  color={Colours.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StartUpScreen;