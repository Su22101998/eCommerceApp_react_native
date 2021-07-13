import { DrawerContentScrollView } from '@react-navigation/drawer';
import React,{useState,useCallback,useEffect} from 'react';
import { Text, View,StyleSheet ,TextInput} from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import Colours from '../../constants/Colours';
import { createProduct, updateProduct } from '../../store/actions/product';



const EditProductScreen = ({props,route,navigation}) =>{
    const {productId} = route.params
    const editProduct = useSelector(state =>state.products.userProducts.find(prod =>prod.id === productId))

    const dispatch = useDispatch();

    const[title,setTitle] =useState(editProduct?editProduct.title:'')
    const[imageUrl,setImageUrl] =useState(editProduct?editProduct.imageUrl:'')
    const[description,setDescription] =useState(editProduct?editProduct.description:'')
    const[price,setPrice] =useState(editProduct?editProduct.price:'')
    const[sale,setSale] =useState(editProduct?editProduct.sale:'')
    const[off,setOff] =useState(editProduct?editProduct.off:'')
    const [error, setError] = useState();


    useEffect(() => {
        if (error) {
          Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);
      
    const submitHandler = useCallback( async () =>{
        try{if(editProduct){
            await dispatch(updateProduct(productId,title,imageUrl,description,+sale,+off))
        }
        else{
            await dispatch(createProduct(productId,title,imageUrl,description,+price,+sale,+off))
        }
        navigation.goBack()}
        catch (err) {
            setError(err.message)
        }
    },[productId,title,imageUrl,description,price,sale,off]);

    useEffect(() =>{
        navigation.setParams({ submit: submitHandler })
    },[submitHandler])

  return(
    <View style={styles.screen}>
        <View style={styles.screenComponent}>
            <View>
                <Text style={styles.text}>Title</Text>
                <TextInput 
                value = {title} 
                autoCorrect={false} 
                onChangeText={text =>setTitle(text)}
                />
            </View>
            <View>
                <Text style={styles.text}>Image Url</Text>
                <TextInput 
                value = {imageUrl} 
                autoCorrect={false} 
                onChangeText={text =>setImageUrl(text)}
                />
            </View>
            <View>
                <Text style={styles.text}>Description</Text>
                <TextInput 
                value = {description} 
                autoCorrect={false} 
                onChangeText={text =>setDescription(text)}
                />
            </View>
            {!editProduct? (<View>
                <Text style={styles.text}>Price</Text>
                <TextInput 
                value = {price} 
                onChangeText={text =>setPrice(text)}
                keyboardType = 'decimal-pad'
                />
            </View>):null}
            
            <View>
                <Text style={styles.text}>Sale</Text>
                <TextInput 
                value = {sale.toString()} 
                onChangeText={text =>setSale(text)}
                keyboardType = 'decimal-pad'
                />
            </View>
            <View>
                <Text style={styles.text}>Off</Text>
                <TextInput 
                value = {off.toString()} 
                onChangeText={text =>setOff(text)}
                keyboardType = 'decimal-pad'
                />
            </View>
        </View>

    </View>
)
};
const styles = StyleSheet.create({
    screen:{
        margin:10,
        backgroundColor:Colours.accent
    },
    screenComponent:{
        padding:20,
        elevation:10,
        backgroundColor:Colours.accent,
        borderRadius:10
    },
    text:{
        fontWeight:'bold'
    }
})

export default EditProductScreen;
