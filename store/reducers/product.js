import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from "../actions/product";

const initialState = {
    availableProducts: [],
    userProducts: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return{
                availableProducts : action.products,
                userProducts: action.userProducts
            }


        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.despriction,
                action.productData.price,
                action.productData.sale,
                action.productData.off
                );
            return{
                ...state,
                availableProducts : state.availableProducts.concat(newProduct),
                userProducts : state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            const productIndex =state.userProducts.findIndex(
                prod => prod.id === action.pid
    
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.despriction,
                state.userProducts[productIndex].price,
                action.productData.sale,
                action.productData.off
            )

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
    
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return{
                ...state,
                availableProducts : updatedAvailableProducts,
                userProducts : updatedUserProducts
            }


        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts: state.userProducts.filter(
                    product=>product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product=>product.id !== action.pid
                ),
            }
        default:
            return state;
    }

};
export default productReducer