import '../../src/App.css';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

function HomePage() {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const fetchProducts = async () => {
        try {
            const data = await fetch("https://dummyjson.com/products")
            // const data = await fetch(`https://dummyjson.com/products?limit=10?skip=${(page*10)-10}`)
            const res = await data.json()
            setProducts(res.products)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const ItemComponent = ({ product }) => {

        console.log("in product", product)

        return (
            <Box sx={{
                padding: "10px",
                backgroundColor: "white ",
                flexDirection: "column",
                margin: "10px",
                width: "300px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "10px"
            }}>

                <img
                    src={product.images[0]}
                    style={{ height: "200px", width: "200px" }}
                    alt={product.title}
                />

                <Typography
                    variant='h1'
                    sx={{ color: "black", fontSize: "20px" }}>{product.id} {product.title}</Typography>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                }}>
                    <Typography
                        variant='h4'
                        sx={{ color: "black", fontSize: "20px" }}>{product.price}</Typography>

                    <Button sx={{
                        mr: "10px",
                        backgroundColor: "blue",
                        color: "white",
                        px: "20px",
                        "&:hover": {
                            backgroundColor: "lightblue"
                        }
                    }} onClick={() => handleAddToCart(product)}>Add To Cart</Button>
                </Box>
            </Box>
        )
    }

    return (
        <div className="App">
            <Grid container spacing={2}>
                {
                    products &&
                    products.slice((page * 10) - 10, page * 10).map((product, index) => {
                        return (
                            <Grid item md={4} key={index}>
                                <ItemComponent product={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {
                products.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                        <Box onClick={() => page === 1 ? null : setPage(page - 1)}>Left</Box>
                        {[...Array(products.length / 10)].map((_, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        border: "1px solid black",
                                        padding: "5px",
                                        margin: "15px",
                                        backgroundColor: page === (index + 1) ? "red" : "white",
                                        color: page === (index + 1) ? "white" : "black"
                                    }}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </Box>
                            )
                        })

                        }
                        <Box onClick={() => page === (Math.ceil(products.length / 10)) ? null : setPage(page + 1)}>Right</Box>
                    </Box>
                )
            }
        </div>
    );
}

export default HomePage;
