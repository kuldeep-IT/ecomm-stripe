import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';


const CartPage = () => {

    const cartItems = useSelector(state => state.cart.cartItems)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51PolRmAXXvw8YucZN4kWNeA0rNfBY237bmCSseE45VhduXniuVEomRDdv3LcFxPkALyrnzeoKMQrKC07eBADMWIg00Y3X6geKC");

        const body = {
            products: cartItems
        }

        const header = {
            "Content-Type": "application/json"
        }

        const response = await fetch("http://localhost:7000/api/create-checkout-session", {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        })

        const session = await response.json()

        const result = await stripe.redirectToCheckout({ sessionId: session.id })

        if (result.error) {
            console.log(result.error)
            alert(result.error.message)
        }

    }

    return (
        <Box sx={{
            marginTop: "20px",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography variant='h6'>totalQuantity: {totalQuantity}</Typography>
                    <Typography variant='h6'>totalPrice: {totalPrice}</Typography>
                </Box>
                <Button sx={{ backgroundColor: "blue", color: "white", px: "20px" }}
                    onClick={makePayment}>Checkout</Button>
            </Box>

            {
                cartItems.length > 0 ?
                    <>
                        {
                            <Grid mt={2} container spacing={3}>
                                {
                                    cartItems.map((item, key) =>
                                        <Box key={key} sx={{
                                            padding: "10px",
                                            backgroundColor: "white ",
                                            flexDirection: "column",
                                            margin: "10px",
                                            width: "300px",
                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                            borderRadius: "10px"
                                        }}>
                                            <img src={item.images[0]} style={{ height: "200px" }} alt={item.title} />
                                            <Typography variant='h5'>Product ID: {item.id}</Typography>
                                            <Typography variant='h5'>Name: {item.title}</Typography>
                                            <Typography variant='h6'>Quantity: {item.quantity}</Typography>
                                            <Typography variant='h6'>Price: {item.price}</Typography>
                                        </Box>
                                    )}
                            </Grid>
                        }
                    </> :
                    <Typography variant='h1'>Cart is Empty</Typography>
            }

        </Box>
    )
}

export default CartPage