import { Box, Typography } from "@mui/material";
import GiftCard from "../../nft market/giftCard";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../../utils/data/public_api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';


const WithdrawPanel = () => {
    const apiCall = useRef(undefined)
    const [dollarValue, setDollarValue] = useState(undefined)
    const [irrValue, setIrrValue] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)

    // useEffect(() => {
    //     setInterval(() => {
    //         getTokenValue()
    //     }, 10000);
    //     return () => {
    //         if (apiCall.current) {
    //             apiCall.current.cancel();
    //         }
    //     }
    // }, [])
    const getTokenValue = async () => {
        setErr(undefined)
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-token-value/1`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setDollarValue(response.data.data.usd / 1000000)
            setIrrValue(response.data.data.irr / 1000000)
        }
        catch (err) {
            setErr(err.statusText)
        }
    }
    return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ color: 'primary.text' }}>Unclaimed Gifts</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {unclaimedDeposits.map(item => {
                const {amount, id} = item;
                return(
                    <GiftCard price={amount} depositId={id} sender={false} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
                )
            })}
        </Box>
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
    </Box>);
}

export default WithdrawPanel;