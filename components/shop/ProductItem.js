import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colours from '../../constants/Colours';
import Button from '../Button';

const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <TouchableOpacity style={{flex:1}} onPress={props.onButton1Press}>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={1} >{props.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price} >${props.price}</Text>
                    <Text style={styles.sale} >${props.sale}</Text>
                    <Text style={styles.off} >{props.off}% OFF</Text>
                </View>
                <View style={styles.buttonContainer} >
                    <Button title={props.button1} onPress={props.onButton1Press} />
                    <Button title={props.button2} onPress={props.onButton2Press} />
                </View>
            </View>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    product: {
        borderRadius: 10,
        height: 300,
        margin:10,
        overflow:'hidden',
        elevation:10,
        flex:1,
        backgroundColor:Colours.accent,
        
    },
    imageContainer:{
        height:"100%",
        width:'100%',
        flex:1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius:10,
    },
    infoContainer:{
        padding:15,
        height:90,
        backgroundColor:Colours.accent
    },
    title: {
        fontSize: 15,
        fontWeight:'bold',
        color:Colours.primary
    },
    priceContainer:{
        flexDirection: 'row',
        // justifyContent:'space-between'
    },
    price: {
        fontSize: 13,
        
    },
    sale:{
        fontSize: 11,
        textDecorationLine:'line-through',
        color:'#666',
        top:2,
        paddingLeft:5,
    },
    off:{
        color:'green',
        paddingLeft:5,
        fontSize: 13,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
})

export default ProductItem;