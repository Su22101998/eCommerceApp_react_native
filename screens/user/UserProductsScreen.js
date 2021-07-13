import React from 'react';
import { Text, View, StyleSheet, FlatList,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from '../../store/actions/product';



const UserProductsScreen = ({navigation}) => {

    const userProducts = useSelector(state=>state.products.userProducts);
    const dispatch = useDispatch()

    return (
    <View>
        <FlatList 
        data={userProducts}
        keyExtractor={item =>item.id}
        renderItem={itemData=>(<ProductItem 
                                image={itemData.item.imageUrl}
                                title={itemData.item.title}
                                price={itemData.item.price}
                                sale={itemData.item.sale}
                                off={itemData.item.off}
                                button1="Edit"
                                button2= "Delete"
                                onButton1Press={()=>{navigation.navigate('Edit',{productId:itemData.item.id
                                , productName:itemData.item.title})}}
                                onButton2Press={()=>{
                                    Alert.alert(
                                                'Delete Item',
                                                'Do you want to delete this item permanently?',
                                                [
                                                    {
                                                        text:'No',
                                                        style:'cancel'
                                                    },
                                                    {
                                                        text:'yes' ,
                                                        style:'destructive',
                                                        onPress:()=>dispatch(deleteProduct(itemData.item.id))
                                                    }
                                                ]
                                                )
                                            }}
                                

                                 />)}
        
        />
    </View>
)
}

const styles = StyleSheet.create({
    
})

export default UserProductsScreen;
