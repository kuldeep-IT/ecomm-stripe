import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItem = state.cartItems
                .find(item => item.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += 1
                existingItem.totalPrice += action.payload.price
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price
                })
            }

            state.totalPrice += action.payload.price
            state.totalQuantity += 1
        },

        removeFromCart(state, action) {
            const existingItem = state.cartItems
                .find(item => item.id === action.payload.id)

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
                } else {
                    existingItem.quantity -= 1
                    existingItem.totalPrice -= action.payload.price
                }
                state.totalPrice -= action.payload.price
                state.totalQuantity -= 1

                // state.totalPrice -= existingItem.quantity;
                // state.totalQuantity -= existingItem.totalPrice;
            }
        },

        updateQuantity(state, action) {
            const { id, quantity } = action.payload
            const existingItem = state.cartItems
                .find(item => item.id === id)

            if (existingItem) {
                state.totalQuantity += quantity - existingItem.quantity
                state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;

                existingItem.quantity = quantity
                existingItem.totalPrice = existingItem.price * quantity
            }
        },

        clearCart(state) {
            state.cartItems = []
            state.totalQuantity = 0
            state.totalPrice = 0
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer
