import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../../config";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import ButtonPurple from "../../buttons/buttonPurple";



const Card = styled(Box)(({ theme }) => ({
    width: '90%',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    transition: '400ms ease',
    gap:'10px',
}))
const Bold = styled(Typography)(() => ({
    fontWeight:'700',
    display:'inline-block',
    padding:'3px 5px',
    borderRadius:'10px'
}))

const PaidCheckouts = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [paidCheckouts, setPaidCheckouts] = useState(null)
    const navigate = useNavigate()

    const getPaidCheckouts = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/checkout/get/paid/user/${globalUser.cid}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
                'Content-Type': 'application/json',
            }
        })

        let response = await request.json()
        console.log(',,,,,,,,,,,,,,,,,,',response);
        if (response.status === 200) {
            setPaidCheckouts(response.data)
        } else {
            console.log(response)
        }
    }


    useEffect(() => {

        if (globalUser.cid && globalUser.token) {
            getPaidCheckouts()
        }

    }, [globalUser.cid, globalUser.token])

    return (
        <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
            <Typography sx={{ color: 'primary.text' }}>Paid Checkouts</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                {
                    paidCheckouts && paidCheckouts.map(checkout => {
                        return (
                            <Card>
                                <Typography sx={{ color: 'primary.text' }}>payment status: <Bold>{checkout.payment_status}</Bold></Typography>
                                <Typography sx={{ color: 'primary.text' }}>tokens: <Bold>{checkout.tokens}</Bold></Typography>
                                <Typography sx={{ color: 'primary.text' }}>usd token price: <Bold>{checkout.usd_token_price}</Bold></Typography>
                                <Typography sx={{ color: 'primary.text' }}>status: <Bold sx={{backgroundColor:'#4BB543', color:'#ffffff'}}>{checkout.c_status}</Bold></Typography>
                                <Typography sx={{ color: 'primary.text' }}>at: <Bold>{checkout.iat.substring(0, 16)}</Bold></Typography>
                            </Card>
                        )
                    })
                }
            </Box>
        </Box>
    )
}



export default PaidCheckouts