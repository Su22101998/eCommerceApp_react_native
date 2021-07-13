import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colours from '../constants/Colours';
import LinearGradient from 'react-native-linear-gradient';


const Button = (props) =>{
return(
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <LinearGradient colors={[Colours.secondary, Colours.primary,Colours.primary, Colours.secondary]} style={{...styles.buttonContainer,...props.style}}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
)
}
const styles = StyleSheet.create({
    text:{
        color:Colours.accent,
        fontSize:15,
        fontWeight:'bold'
    },
    buttonContainer:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        elevation:6,
        margin:10,
        paddingHorizontal:20,
        marginHorizontal:40
    }
})
export default Button;