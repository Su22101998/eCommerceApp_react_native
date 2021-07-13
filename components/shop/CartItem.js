import React from 'react';
import { View, Text , StyleSheet, TouchableOpacity ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colours from '../../constants/Colours';



const CartItem = (props) => {
    const myIcon = <Icon name="trash" size={20} color='#CD113B' />;
    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Image source={{uri:props.image}} style={{height:100,width:100,borderRadius:5}}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.title}>$ {props.amount.toFixed(2)}</Text>               
                </View>
                {props.deletable &&(<TouchableOpacity onPress={props.onRemove} style={styles.delete} >
                    {myIcon}
                </TouchableOpacity>)}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cartItem:{
        backgroundColor:Colours.accent,
        elevation:10,
        margin:20,
        borderRadius:10, 
        
    },
    itemData:{
        flexDirection:'row',
        padding:20,
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'100%'
    },
    quantity:{
        fontWeight:'bold',
        fontSize:17
    },
    titleContainer:{
        width:'30%'
    },
    title:{
        fontWeight:'bold',
        fontSize:15
    },
})
export default CartItem;