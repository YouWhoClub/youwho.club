import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from "@mui/material";
import ButtonPurple from "../components/buttons/buttonPurple";
import { updateBalance } from "../redux/actions";
import { useNavigate } from "react-router";





const CheckoutSuccess = ({ switchTheme, theme }) => {
    const navigate = useNavigate()
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const getBalance = (token) => dispatch(updateBalance(token));

    useEffect(() => {
        if (globalUser.token)
            getBalance(globalUser.token)
    }, [globalUser.token])



    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
            <CheckCircle sx={{ fontSize: '64px', color: '#4BB543' }} />
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Your wallet has been successfully charged!</Typography>
            <ButtonPurple text={'Return to Main Page'} w={'200px'} onClick={() => navigate('/')} />
        </Box>
    )
}

export default CheckoutSuccess