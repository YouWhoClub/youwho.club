import styled from "@emotion/styled";
import { Box, Modal, Typography, keyframes } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonPurple from "../buttons/buttonPurple";
import { useEffect, useRef, useState } from "react";
import giftImage from '../../assets/gift.png'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PUBLIC_API } from "../../utils/data/public_api";
import { Close, Square } from "@mui/icons-material";
import { Apple } from "iconsax-react";
const shake = keyframes`
  0% {
    transform: rotate(-2deg);
  }
  50%{
    transform: rotate(2deg);
  }
  100%{
    transform: rotate(0);
  }
`

const Outter = styled(Box)(({ theme }) => ({
    width: '305px', height: '305px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '300px', height: '300px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    transition: '400ms ease',
    // cursor: 'pointer',
    '&:hover': {
        animation: `${shake} 1s linear`,
        boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '250px', height: '150px',
    borderRadius: '15px',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    '&:hover': {
        // width: '255px', height: '255px',
        // width: '255px', height: '155px',
    }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '250px', height: '100px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.light, marginTop: 1
}))
const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    // borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))
const Inputtt = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))

const GiftCard = ({ image, price }) => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const [openBuyModal, setOpenBuyModal] = useState(false)
    const [err, setErr] = useState(undefined)
    const [dollarValue, setDollarValue] = useState(undefined)
    const [receipantID, setReceipantID] = useState(undefined)
    const apiCall = useRef(undefined)

    useEffect(() => {
        if (price) { getTokenValue() }
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
                path: `/get-token-value/${price}`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setDollarValue((response.data.data.usd / 1000000).toString())
        }
        catch (err) {
            setErr(err.statusText)
        }
    }
    return (
        <Outter>
            <Card>
                <NFTImage style={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${giftImage}`)),
                    // backgroundImage: "url('/gift.png')",
                }} />
                <DetailsSection>
                    <FlexRow>
                        <div>
                            price:
                        </div>
                        {dollarValue ?
                            console.log('usddddsds', dollarValue) :
                            console.log('nist')
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography>{price} yt</Typography>
                            <Typography sx={{ fontSize: '10px' }}>{dollarValue ? dollarValue : "..."} $</Typography>
                        </Box>
                    </FlexRow>
                    {globalUser.isLoggedIn ?
                        <ButtonPurple text={'buy'} w={'100%'} onClick={() => setOpenBuyModal(true)} />
                        :
                        <ButtonPurple text={'login'} w={'100%'} onClick={() => navigate('/auth')} />
                    }
                </DetailsSection>

            </Card>
            <Modal
                open={openBuyModal}
                onClose={() => setOpenBuyModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Box sx={{
                        borderRadius: '24px',
                        width: { xs: '100%', sm: '500px' }, height: { xs: '100%', sm: '350px' },
                        backgroundColor: 'secondary.bg',
                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                    }}>
                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}><Typography>Transfer</Typography><div onClick={() => setOpenBuyModal(false)}><Close sx={{ cursor: 'pointer' }} /></div></FlexRow>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography sx={{ mt: 2, fontSize: '12px', mb: 2, color: 'primary.text' }}>
                                Enter Receipant YouWho ID
                            </Typography>
                            <Inputtt>
                                <Square sx={{ color: 'primary.light', fontSize: '30px' }} />
                                <Inputt value={receipantID} placeholder="enter id" onChange={(e) => setReceipantID(e.target.value)} />
                            </Inputtt>
                        </Box>
                        <ButtonPurple text={'transfer'} w={'100%'} />
                    </Box>
                </Box>
            </Modal>
        </Outter>
    );
}

export default GiftCard;