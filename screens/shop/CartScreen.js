import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector ,useDispatch } from 'react-redux';
import Button from '../../components/Button2';
import Colours from '../../constants/Colours';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';



const CartScreen = ({props,navigation}) => {
const cartTotalAmount = useSelector(state =>state.cart.totalAmount)
const cartItems =useSelector(state=>{
    const transformedCartItems = [];
    for( const key in state.cart.items){
        transformedCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum,
            image : state.cart.items[key].image,
        })
    }
    return transformedCartItems.sort((a,b) =>
     a.productId>b.productId? 1 : -1);
})

    const dispatch = useDispatch()

    let val;
    if(cartTotalAmount>0){
        val = false
    }
    else{
        val = true
    }
    
    return(
        <View style={styles.screen} >
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                </Text>
               
                <Button title="Order Now" disabled={val} style={styles.button} onPress={()=>{dispatch(addOrder(cartItems,cartTotalAmount));navigation.navigate('Orders')}}/>
               
            </View>
            <FlatList 
        
            data={cartItems} 
            keyExtractor={item =>item.productId}
            renderItem={itemData=> <CartItem 
                                    quantity={itemData.item.quantity}
                                    title={itemData.item.productTitle}
                                    amount={itemData.item.sum}
                                    image = {itemData.item.image}
                                    onRemove={()=>{dispatch(removeFromCart(itemData.item.productId))}}
                                    deletable
                                    />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        backgroundColor:Colours.accent,
        flex:1,
        alignItems:'center',
        width:'100%'
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginBottom:20,
        padding:10,
        elevation:10,
        backgroundColor:Colours.accent,
        margin:20,
        borderRadius:10,
        height:90
    },
    summaryText:{
        fontSize:18,
        fontWeight:'bold',
        padding:20
    },
    amount:{
        color:"#CD113B",
        fontWeight:'bold',
        
    },
    button:{
        paddingHorizontal:30
    }
})
export default CartScreen;