"use client"
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Construction Company Resource Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;