import React from 'react';
import { View, Text , StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../../components/Button2';
import { useSelector, useDispatch } from 'react-redux';
import Colours from '../../constants/Colours';
import * as cartActions from '../../store/actions/cart'


const ProductDetailScreen = ({props,route}) => {
    const {productId} = route.params
    const availableProducts = useSelector(state =>state.products.availableProducts)
    const product = availableProducts.find(product =>product.id==productId)

    const cartProducts = useSelector(state =>state.cart.items)
    
    const dispatch = useDispatch()
    console.log(cartProducts)
    return(
        
        <ScrollView style={{backgroundColor:Colours.accent}}>
            <View style={styles.imageContainer}>
                <Image source={{uri:product.imageUrl}} style={styles.image}/>
            </View>
            <View style={styles.textContainer} >
                <Text style={styles.title}>
                    {product.title}
                </Text>
                <Text style={styles.description}>
                    {product.description}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                    </Text>
                    <Text style={styles.sale}>
                        ${product.sale.toFixed(2)}
                    </Text>
                    <Text style={styles.off}>
                        ({product.off}% OFF)
                    </Text>
                </View>
                <Text style={styles.tax}>Inclusive of all taxes</Text>
                <Text style={styles.few}>Only a few left!</Text>
            </View>
            <View style ={styles.buttonContainer}>
                <Button title='ADD TO CART' disabled={false} onPress={()=>{dispatch(cartActions.addToCart(product))}}/>
            </View>
            
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:500,
        borderRadius:10
    },
    imageContainer:{
        margin:10,
        overflow:'hidden',
    },
    textContainer:{
        marginTop:20,
        marginHorizontal:20
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    description:{
        fontSize:16,
        color:'#333'
    },
    priceContainer:{
        flexDirection:'row',
        marginTop:10
    },
    price:{
        fontWeight:'bold',
        fontSize:16,

    },
    sale:{
        paddingLeft:10,
        textDecorationLine:'line-through',
        color:'#666',
        fontSize:16,
    },
    off:{
        paddingLeft:10,
        fontWeight:'bold',
        color:"green",
        fontSize:16,
    },
    tax:{
        fontWeight:'bold',
        color:"green",
        fontSize:15,
    },
    few:{
        fontWeight:'bold',
        color:"red",
        fontSize:18,
        marginTop:10
    },
    buttonContainer:{
        marginVertical:20
    }
    
})

export default ProductDetailScreen;