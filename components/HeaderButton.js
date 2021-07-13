import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Colours from '../constants/Colours';
import { View ,StyleSheet} from 'react-native';



const CustomHeaderButton = (props) => {
    return(
        <View >
        <HeaderButton 
        {...props} 
        IconComponent = {Icon} 
        iconSize = {28} 
        color ={{...Colours.primary,...props.color}} />
        </View>
    )
}
export default CustomHeaderButton;