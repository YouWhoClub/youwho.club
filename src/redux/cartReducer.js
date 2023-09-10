import { ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART, EMPTY_CART, SET_CART } from "./actions";
// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         cart: [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             console.log(state.cart)
//             const itemInCart = state.cart.find((item) => item.id === action.payload.nft_id);
//             if (itemInCart) {
//                 itemInCart.quantity++;
//             } else {
//                 state.cart.push({ ...action.payload, quantity: 1 });
//             }
//         },
//         incrementQuantity: (state, action) => {
//             const item = state.cart.find((item) => item.id === action.payload);
//             item.quantity++;
//         },
//         decrementQuantity: (state, action) => {
//             const item = state.cart.find((item) => item.id === action.payload);
//             if (item.quantity === 1) {
//                 item.quantity = 1
//             } else {
//                 item.quantity--;
//             }
//         },
//         removeItem: (state, action) => {
//             const removeItem = state.cart.filter((item) => item.id !== action.payload);
//             state.cart = removeItem;
//         },
//     },
// });

// export const cartReducer = cartSlice.reducer;
// export const {
//     addToCart,
//     incrementQuantity,
//     decrementQuantity,
//     removeItem,
// } = cartSlice.actions;






const initialState = {
    products: [],
};

function cartReducer(state = initialState, action) {
    var cart = state.products
    switch (action.type) {
        case ADD_TO_CART:
            console.log(state)
            // state = {
            //     products: [],
            // };
            // cart = state.products
            var itemInCart = cart.find((item) => item.nft_id === action.payload.nft_id);
            if (itemInCart) {
                var index = cart.indexOf(itemInCart)
                // console.log(index, cart[index])
                // cart[index].quantity++;
                itemInCart.quantity++;
            } else {
                cart.push({ ...action.payload, quantity: 1 });
                // cart.push({ id: action.payload.nft_id, quantity: 1 });
            }
            // return state;
            return {
                ...state,
                products: cart
            };

        case REMOVE_FROM_CART:
            // cart = state.products
            // const index = cart.indexOf(action.payload);
            // if (index > -1) { // only splice array when item is found
            //     cart.splice(index, 1); // 2nd parameter means remove one item only
            // }
            console.log(action.payload)
            const removeItem = cart.filter((item) => item.nft_id !== action.payload.nft_id);
            cart = removeItem;
            console.log(state)
            return {
                ...state,
                products: cart
            };
        case INCREMENT_QUANTITY:
            // cart = state.products
            const ItemI = cart.find((item) => item.nft_id === action.payload.nft_id);
            ItemI.quantity++;
            // return state;
            return {
                ...state,
                products: cart
            };
        case DECREMENT_QUANTITY:
            const item = cart.find((item) => item.nft_id === action.payload.nft_id);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
            return {
                ...state,
                products: cart
            };
        case EMPTY_CART:
            cart = []
            return {
                ...state,
                products: cart
            };
        case SET_CART:
            return {
                ...state,
                products: action.payload
            };

        default:
            return state;
    }
}

export default cartReducer;
