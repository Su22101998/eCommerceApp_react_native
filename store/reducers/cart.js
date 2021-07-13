import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/product";


const initialState = {
    items:{},
    totalAmount:0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const prodImg = addedProduct.imageUrl

            if(state.items[addedProduct.id]){
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum+ prodPrice,
                    prodImg
                )
                return{
                    ...state,
                    items:{...state.items,[addedProduct.id]: updatedCartItem},
                    totalAmount: state.totalAmount +prodPrice
                }
            }
            else{
                const newCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice,prodImg)
                return{
                    ...state,
                    items:{...state.items , [addedProduct.id]: newCartItem},
                    totalAmount: state.totalAmount +prodPrice
                }
            }
        case REMOVE_FROM_CART:
            const selectedCartItem =state.items[action.pid];
            const currentQty = state.items[action.pid].quantity;
            let updatedCartItem;
            if(currentQty > 1){
                    updatedCartItem = new CartItem (
                    selectedCartItem.quantity-1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice,
                    selectedCartItem.image
                    )
                updatedCartItem = {...state.items, [action.pid]: updatedCartItem}
            }
            else{
                updatedCartItem = {...state.items};
                delete updatedCartItem[action.pid];
            }
            return{
                ...state,
                items: updatedCartItem,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState;


        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];
            return{
                ...state,
                items: updatedItems,
                totalAmount : state.totalAmount- itemTotal
            }

        default:
            return state;
    }

};
export default cartReducer;