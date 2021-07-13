import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Colours from '../constants/Colours';
import { View ,StyleSheet} from 'react-native';



const CustomHeaderButton = (props) => {
    return(
        <View style={styles.container}>
        <HeaderButton 
        {...props} 
        IconComponent = {Icon} 
        iconSize = {30} 
        color ={Colours.accent} />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(100,100,100,0.5)',
        borderRadius:20,
        right:10,
        top:2
    }
})
export default CustomHeaderButton;