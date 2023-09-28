import { Box, Typography } from "@mui/material";
import GiftCard from "../../nft market/giftCard";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../../utils/data/public_api";

const WithdrawPanel = () => {
    const apiCall = useRef(undefined)
    const [dollarValue, setDollarValue] = useState(undefined)
    const [irrValue, setIrrValue] = useState(undefined)
    const [err, setErr] = useState(undefined)

    useEffect(() => {
        // getTokenValue()
        setInterval(() => {
            getTokenValue()
        }, 10000);
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
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
    return (<Box sx={{ display: 'flex', flexDirection: 'column' , alignItems:'center'}}>
        <Typography sx={{ color: 'primary.text' }}>Unclaimed Gifts</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center' }}>
            <GiftCard price={25} sender={false} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={50} sender={false} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={40} sender={false} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={10} sender={false} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
        </Box>
    </Box>);
}

export default WithdrawPanel;