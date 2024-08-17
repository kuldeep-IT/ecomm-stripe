import React from 'react'
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar = () => {
    return (
        <Box sx={{
            display: "flex",
            background: "#eee",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            justifyContent: "space-around",
            alignItems: "center",
            p: "10px",
            width: "100%"
        }}>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
        </Box>
    )
}

export default Navbar