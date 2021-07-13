import React,{useEffect,useState,useCallback} from 'react';
import { View,FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colours from '../../constants/Colours';
import * as cartActions from '../../store/actions/cart';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/product';
import Button from '../../components/Button2';



const ProductsOverviewScreen = ({props,navigation}) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()

    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,setIsRefreshing] = useState(false);
    const [error,setError] = useState();


    const loadProducts = useCallback(async () =>{
        setError(null);
        setIsRefreshing(true)
        try{
            await dispatch(fetchProducts());
        }catch(err){
            setError(err.message);
        }
        setIsRefreshing(false)
        
        
    },[dispatch,setIsLoading,setError]);

    useEffect(()=>{
      const willSub =  navigation.addListener('willFocus',loadProducts);
      return willSub;
    },[loadProducts])

    useEffect(()=>{
        
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false);
        })
        

    },[dispatch,loadProducts]);


    if(error){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>An Error Occured</Text>
                <Button disabled={false} title='Try Again' onPress={loadProducts}/>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size='large' color={Colours.primary} />
            </View>
        )
    }

    if(!isLoading && products.length==0){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>Sorry!! No Products Found</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                price={itemData.item.price.toFixed(2)}
                title={itemData.item.title}
                sale={itemData.item.sale.toFixed(2)}
                off = {itemData.item.off}
                onButton1Press={() => {navigation.navigate('ProductDetail',{productTitle:itemData.item.title,productId:itemData.item.id}) }}
                onButton2Press={() => {
                    dispatch(addToCart(itemData.item));
                 }} 
                 button1 = 'View Details'
                 button2 = 'Cart'
                 />} 
                 
                numColumns={2}/>
                
        </View>
    )
};
const styles = StyleSheet.create({
screen:{
    backgroundColor:Colours.accent
}
})
export default ProductsOverviewScreen;