import { Box } from "@mui/material";
import GiftCard from "../components/nft market/giftCard";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../utils/data/public_api";
const GiftsScrollWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "flex", alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '8px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '8px',
        height: '8px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '3px',
        height: '3px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
}))

const TransferPage = () => {
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
    return (<Box sx={{
        height: 'calc(100vh - 160px)',
        bgcolor: 'primary.bg',
        // pb: 5,
        pt: { xs: '180px', sm: '110px' },
        px: { xs: '10px', sm: '40px' },
        pb: '40px',
        display: "flex", justifyContent: 'center',
        color: 'primary.darkGray',
    }}>
        <GiftsScrollWrapper>
            <GiftCard price={5} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={10} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={25} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={50} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={100} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={150} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
        </GiftsScrollWrapper>

    </Box>
    );
}

export default TransferPage;