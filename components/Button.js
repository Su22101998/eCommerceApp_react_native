import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';

const Button = (props) =>{
return(
    <TouchableOpacity onPress={props.onPress}>
        <View>
            <Text style={{...styles.text,...props.style}}>
                {props.title}
            </Text>
        </View>
    </TouchableOpacity>
)
}
const styles = StyleSheet.create({
    text:{
        color:'#39A2DB',
        fontSize:15,
        fontWeight:'bold'
    }
})
export default Button;