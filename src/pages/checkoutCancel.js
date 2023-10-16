import React from 'react'
import {useSelector } from "react-redux";
import { Cancel } from '@mui/icons-material';
import { Box, Typography } from "@mui/material";
import ButtonPurple from "../components/buttons/buttonPurple";
import { useNavigate } from "react-router";

const CheckoutCancel = () => {
    const navigate = useNavigate()
    const globalUser = useSelector(state => state.userReducer)

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
            <Cancel sx={{ fontSize: '64px', color: '#cf142b ' }} />
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Charging your wallet has been cancelled.</Typography>
            <ButtonPurple text={'Return to Main Page'} w={'200px'} onClick={() => navigate('/')} />
        </Box>
    )
}

export default CheckoutCancel