import { Box } from "@mui/material";
import CustomSlider from "../customSlider";
import GiftCard from "../nft market/giftCard";
import { Link, useNavigate } from "react-router-dom";
import ButtonOutline from "../buttons/buttonOutline";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../utils/data/public_api";
import { ToastContainer, toast } from 'react-toastify';

const GiftSlides = () => {
    const navigate = useNavigate()
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
        // height: '100vh',
        // bgcolor: 'primary.bg',
        display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        {/* <h5 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }} >Available Gift Cards</h5> */}
        <CustomSlider>
            <GiftCard price={5} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={10} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={25} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={50} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
            <GiftCard price={100} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
        </CustomSlider>
        <Box sx={{
            display: 'flex', justifyContent: 'center', width: '100%', mt: 5
        }}>
            <ButtonOutline text={'view all'} w={'100%'} onClick={() => navigate('/transfer')} />
        </Box>
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
    </Box>
    );
}

export default GiftSlides;