import React,{useState,useEffect} from 'react';
import { View } from 'react-native';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colours from "../constants/Colours";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import HeaderButton2 from '../components/HeaderButton2';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { createDrawerNavigator,
        DrawerContentScrollView,
        DrawerItemList,
        DrawerItem, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import { LogBox } from 'react-native';
import AuthScreen from '../screens/user/AuthScreen';
import { useSelector, useDispatch } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';
import {logout} from '../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';




LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

// header left menu icon component
const HeaderLeftIcon = (props) => {
    
    return (<HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item
            title='Menu'
            iconName='menu'
            onPress={() => {
                props.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>)
}


const ShopStackNavigator = ({props}) => {
    return (
        
            <Stack.Navigator
                screenOptions={{
                    headerStyle:
                        { backgroundColor: Colours.accent },
                    headerTintColor: Colours.primary
                }}
                >
                <Stack.Screen
                    name="ProductsOverview"
                    component={ProductsOverviewScreen}
                    options={({navigation}) => ({
                        title: 'The Shop',
                        headerRight: ()=>(
                        <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                            <Item 
                            title='Cart' 
                            iconName = {'cart'}
                            onPress={() =>{navigation.navigate('CartScreen')}}
                            />
                        </HeaderButtons>),
                        headerLeft: () => (
                            <HeaderLeftIcon navigation={navigation} />)
                    })} />
                <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({route,navigation})=>({
                    title: '',
                    headerTransparent : true,
                    headerRight: ()=>(
                        <HeaderButtons HeaderButtonComponent = {HeaderButton2}>
                            <Item 
                            title='Cart' 
                            iconName = {'cart-outline'}
                            onPress={() =>{navigation.navigate('CartScreen')}}
                            />
                        </HeaderButtons>)
                })} />

                <Stack.Screen 
                name='CartScreen'
                component ={CartScreen}
                options={{
                    title:'Your Cart'
                }} />
            
                
            </Stack.Navigator>
        
    )
}


const orderStackNavigator = (props) =>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name='Orders'
            component = {OrdersScreen}
            options={({navigation}) => ({
                title: 'Your Orders',
                headerRight: ()=>(
                <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                    <Item 
                    title='Cart' 
                    iconName = {'cart'}
                    onPress={() =>{navigation.navigate('CartScreen')}}
                    />
                </HeaderButtons>),
                headerLeft: () => (
                    <HeaderLeftIcon navigation={navigation} />)
            })} 
            />
            <Stack.Screen 
                name='CartScreen'
                component ={CartScreen} 
                options={{
                    title:'Your Cart'
                }}/>
        </Stack.Navigator>
    )
}


const userStackNavigator = (props)=>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name='Admin'
            component={UserProductsScreen}
            options={({navigation})=>({
                title:'Admin',
                headerRight:()=>(
                    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                    <Item 
                    title='Edit' 
                    iconName = {'add-circle'}
                    onPress={() =>{navigation.navigate('Edit',{productName:''})}}
                    />
                    </HeaderButtons>

                ),
                headerLeft: () => (
                    <HeaderLeftIcon navigation={navigation} />)
            })}
            />
            <Stack.Screen 
            name='Edit'
            component={EditProductScreen}
            options={({route})=>({
                title: (route.params.productId?'Edit '+ route.params.productName:'Add New Product') ,
                headerRight:()=>(
                    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                    <Item 
                    title='Save' 
                    iconName = {'checkmark-circle'}
                    color={'green'}
                    onPress={() =>route.params.submit()}
                    />
                    </HeaderButtons>

                )
            })}
            />
        </Stack.Navigator>
    )
}



const CustomDrawerContent = (props) => {
    const dispatch = useDispatch()
    return (
      

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem 
        icon = {({color,size})=> (
            <Icon 
            name='log-out-outline'
            color={color}
            size={size}
            />
        )}
        label="Logout" 
        onPress={() =>{dispatch(logout());AsyncStorage.clear()}} />
        
        
      </DrawerContentScrollView>
       
    );
  }



const orderDrawerNavigator = (props) =>{
    const logged = useSelector(state => state.auth.registered)


    if(logged){
    return(
        <NavigationContainer>
        <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
            name = 'Shop'
            component = {ShopStackNavigator} 
            options={{
                drawerIcon:({color}) => (
                    <Icon
                       name="cart-outline" size={25} color={color}
                    />)
            }}/>
            <Drawer.Screen
            name = "Orders"
            component={orderStackNavigator}
            options={{
                drawerIcon:({color}) => (
                    <Icon
                       name="receipt-outline" size={20} color={color}
                    />)
            }}
             />

            <Drawer.Screen
            name = "Admin"
            component={userStackNavigator}
            options={{
                drawerIcon:({color}) => (
                    <Icon
                       name="person-outline" size={20} color={color}
                    />)
            }}
             />
             
        </Drawer.Navigator>
        </NavigationContainer>
    )}
    else{
        return(
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen 
                name = 'StartUp'
                component ={StartUpScreen}
                options={({route,navigation})=>({
                    title: '',
                    headerTransparent : true,
                })} 
                />
                <Stack.Screen 
                name='Authenticate' 
                component = {AuthScreen}
                 />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}



export default orderDrawerNavigator;