import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT ='UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () =>{
    return async (dispatch,getState) =>{
        const userId = getState().auth.userId

        try{
            
            const response = await fetch('https://the-shop-app-4a047-default-rtdb.firebaseio.com/products.json');
            
            if(!response.ok){
                throw new Error ('Something went Wrong');
            }
            const responseData = await response.json();
            const loadedProducts =[];
            
            for( const key in responseData){
                loadedProducts.push(
                    new Product(
                        key,
                        responseData[key].ownerId,
                        responseData[key].title,
                        responseData[key].imageUrl,
                        responseData[key].description,
                        responseData[key].price,
                        responseData[key].sale,
                        responseData[key].off
                        ))
            }
    
    
            dispatch({type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.ownerId === userId) })
        }
        catch(err){
            // or send to custom analytics server
            throw err;
        }
    }
}

export const deleteProduct = productId =>{

    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        await fetch(
            `https://the-shop-app-4a047-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
            method: 'DELETE',
            
        });
        dispatch({
            type: DELETE_PRODUCT, 
            pid:productId
        })
    }
    
};

export const createProduct =(productId,title,imageUrl,description,price,sale, off) =>{
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://the-shop-app-4a047-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
            method: 'POST',
            headers:{
                'Content-Type':'appliation/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                sale,
                off,
                ownerId: userId
            })
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            pid:productId,
            productData: {
                id: responseData.name,
                title:title,
                imageUrl:imageUrl,
                description:description,
                price:price,
                sale:sale,
                off:off,
                ownerId:userId
        }
    })
    }

}
export const updateProduct =(productId,title,imageUrl,description,sale, off) =>{
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        await fetch(
            `https://the-shop-app-4a047-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
            method: 'PATCH',
            headers:{
                'Content-Type':'appliation/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                sale,
                off
            })
        });
        dispatch({
            type: UPDATE_PRODUCT,
            pid:productId,
            productData:{
                title:title,
                imageUrl:imageUrl,
                description:description,
                sale:sale,
                off:off}
        })
        
    }

}