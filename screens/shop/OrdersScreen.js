import React,{useEffect,useState} from 'react';
import { FlatList, Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import Colours from '../../constants/Colours';
import { fetchOrders } from '../../store/actions/orders';


const OrdersScreen = (props) => {

const orders =  useSelector (state => state.orders.orders)
const [isLoading,setIsLoading] = useState(false);
const dispatch = useDispatch()

useEffect(async()=>{
    setIsLoading(true)
    await dispatch(fetchOrders())
    setIsLoading(false)
},[dispatch])



if(isLoading){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size='large' color ={Colours.primary}/>
        </View>
    )
}
    return(
        <View style={styles.screen}>

        
        <FlatList
        data={orders}
        keyExtractor ={item =>item.id}
        renderItem ={itemData =><OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items ={itemData.item.items}/>}
        />
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        backgroundColor:Colours.accent,
        flex:1
    }
})

export default OrdersScreen;