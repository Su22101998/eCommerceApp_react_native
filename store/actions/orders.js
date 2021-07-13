import Order from "../../models/orders";

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = ()=>{
    return async (dispatch, getState) =>{
        
        const userId = getState().auth.userId
        try{
            
            const response = await fetch(`https://the-shop-app-4a047-default-rtdb.firebaseio.com/orders/${userId}.json`);
            
            if(!response.ok){
                throw new Error ('Something went Wrong');
            }
            const responseData = await response.json();
            const loadedOrders =[];
            
            for( const key in responseData){
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].cartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date),
                        responseData[key].cartItems[0].image


                    ))
            }
        dispatch({
            type:SET_ORDERS, orders:loadedOrders
        })
    }
    catch(err){
        // or send to custom analytics server
        throw err;
    }
}
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId
        const date = new Date()
        const response = await fetch(
            `https://the-shop-app-4a047-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
            {
            method: 'POST',
            headers:{
                'Content-Type':'appliation/json'
            },
            body: JSON.stringify({
                cartItems, 
                totalAmount,
                date:date.toISOString() 
            })
        });
        if(!response.ok){
            throw new Error ('Something went Wrong');
        }

        const responseData = await response.json(); 
        dispatch({

            type:ADD_ORDER,
            orderData:{id:responseData.name ,items:cartItems,amount:totalAmount, date:date}
        })
    };
};