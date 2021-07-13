import React,{useState} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Colours from '../../constants/Colours';
import Button from '../Button';
import CartItem from './CartItem';


const OrderItem = (props) =>{ 
    const [showDetails,setShowDetails] = useState(false)
    return(
    <View style={styles.screen}>
        <View style={styles.amountContainer}>
            <Text style={styles.amount}>$ {props.amount.toFixed(2)}{props.items.quantity}</Text>
            <Text >{props.date}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button title= {showDetails?'hide details':'Show details'} onPress={()=>{
                setShowDetails(prevState=>!prevState)
                }} />
        </View>
            {showDetails && (
            <View style ={styles.orderDetail}>
                {props.items.map(cartItem=>( 
                <CartItem 
                    key = {cartItem.productId}
                    quantity={cartItem.quantity}
                    amount={cartItem.sum}
                    title={cartItem.productTitle}
                    image = {cartItem.image}
                                                />))}

                <Button title="Proceed to checkout >>"/>
            </View>) }

    </View>
);}

const styles = StyleSheet.create({
   screen:{
       alignItems:'center' ,
       margin:20,
       backgroundColor:Colours.accent,
       elevation:10,
       borderRadius:10,
       flex:1,
   },
    amountContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        
   },
    amount:{
       fontWeight:'bold',
       fontSize:15,
       paddingRight:30
   } ,
   buttonContainer:{
    paddingBottom:20,
   },
   orderDetail:{
       alignItems:'center',
       paddingBottom:20,
       flex:1,
       width:'100%'
      
       
   }
})

export default OrderItem;
