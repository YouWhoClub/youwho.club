import styled from "@emotion/styled";
import { Box, Modal, Typography, keyframes } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonPurple from "../buttons/buttonPurple";
import { useEffect, useRef, useState } from "react";
import giftImage from '../../assets/gift.png'
import { useSelector, useDispatch } from "react-redux";
import { updateBalance } from "../../redux/actions";
import { useNavigate } from "react-router";
import { PUBLIC_API } from "../../utils/data/public_api";
import { Close, Square } from "@mui/icons-material";
import { Apple } from "iconsax-react";
import { API_CONFIG } from "../../config";
import Web3 from 'web3';
import { Buffer } from 'buffer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import yCoin from '../../assets/Ycoin.svg'

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

const GiftCard = ({ image, price, sender, dollarValue, irrValue, depositId }) => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const getBalance = (token) => dispatch(updateBalance(token));
    const navigate = useNavigate()
    const [openBuyModal, setOpenBuyModal] = useState(false)
    const [modalData, setModalData] = useState('form');
    const [openClaimModal, setOpenClaimModal] = useState(false)
    const [txHash, setTxHash] = useState(null)
    const [err, setErr] = useState(undefined)
    // const [dollarValue, setDollarValue] = useState(undefined)
    const [receipantID, setReceipantID] = useState(undefined)
    // const apiCall = useRef(undefined)

    // useEffect(() => {
    //     if (price) { getTokenValue() }
    //     return () => {
    //         if (apiCall.current) {
    //             apiCall.current.cancel();
    //         }
    //     }

    // }, [])
    // const getTokenValue = async () => {
    //     setErr(undefined)
    //     try {
    //         apiCall.current = PUBLIC_API.request({
    //             path: `/get-token-value/1`,
    //             method: "get",
    //         });
    //         let response = await apiCall.current.promise;
    //         if (!response.isSuccess)
    //             throw response
    //         setDollarValue(((response.data.data.usd / 1000000) * price).toString())
    //     }
    //     catch (err) {
    //         setErr(err.statusText)
    //     }
    // }

    const toastId = useRef(null);

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const provider = "https://polygon-mainnet.infura.io/v3/20f2a17bd46947669762f289a2a0c71c";
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const deposite = async (e) => {
        e.preventDefault()

        loading();

        const privateKey = Buffer.from('a3bea793390397a14ebd73afc272373d7107026b2c26186f491b70fe373d32cd', 'hex');
        // const privateKey = Buffer.from(globalUser.privateKey, 'hex');

        const data = {
            recipient: receipantID,
            from_cid: globalUser.cid,
            amount: price,
        }

        const dataString = JSON.stringify(data);
        const dataHash = web3.utils.keccak256(dataString);

        const signObject = web3.eth.accounts.sign(dataHash, privateKey);

        const { signature } = signObject;

        const requestData = {
            ...data,
            tx_signature: signature.replace('0x', ''),
            hash_data: dataHash.replace('0x', ''),
        };

        console.log(signObject);
        console.log(requestData);

        const publicKey = web3.eth.accounts.recover(dataHash, signature);
        console.log(publicKey)

        // sending the request

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/deposit/to/0x5a298eE7B1EDA4de9fBf18905974b059221CaC2e`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);

        if (response.status === 200 || response.status === 201) {
            setErr(false)
            setModalData('depositeInfo')
            setTxHash(response.data.mint_tx_hash)
            updateToast(true, response.message)
            getBalance(globalUser.token)
        } else {
            setErr(response.message)
            updateToast(false, response.message)
        }
    }
    const withdraw = async (e) => {
        e.preventDefault()

        loading();

        const privateKey = Buffer.from(globalUser.privateKey, 'hex');

        const data = {
            recipient_cid: globalUser.cid,
            deposit_id: depositId,
        }

        const dataString = JSON.stringify(data);
        const dataHash = web3.utils.keccak256(dataString);

        const signObject = web3.eth.accounts.sign(dataHash, privateKey);

        const { signature } = signObject;

        const requestData = {
            ...data,
            tx_signature: signature.replace('0x', ''),
            hash_data: dataHash.replace('0x', ''),
        };

        console.log(signObject);
        console.log(requestData);

        // sending the request

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/withdraw/from/0x5a298eE7B1EDA4de9fBf18905974b059221CaC2e`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);

        if (response.status === 200 || response.status === 201) {
            setErr(false)
            setOpenClaimModal(false)
            updateToast(true, response.message)
            getBalance(globalUser.token)
        } else {
            setErr(response.message)
            updateToast(false, response.message)
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FlexRow>
                                <Typography>{price}</Typography>
                                <Box sx={{
                                    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                                    , width: '20px', height: '20px'
                                }} />
                            </FlexRow>
                            <Typography sx={{ fontSize: '10px' }}>{dollarValue !== '...' ? (dollarValue * price).toString() : "..."} $</Typography>
                        </Box>
                    </FlexRow>
                    {globalUser.isLoggedIn ?
                        <>
                            {sender ?
                                <ButtonPurple text={'buy'} w={'100%'} onClick={() => setOpenBuyModal(true)} />
                                :
                                <ButtonPurple text={'claim'} w={'100%'} onClick={() => setOpenClaimModal(true)} />
                            }
                        </>
                        :
                        <ButtonPurple text={'login'} w={'100%'} onClick={() => navigate('/auth')} />
                    }
                </DetailsSection>

            </Card>
            <Modal
                open={openBuyModal}
                onClose={() => {
                    setOpenBuyModal(false)
                }}
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
                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}><Typography>Transfer</Typography><div onClick={() => {
                            setOpenBuyModal(false)
                            setModalData('form')
                        }}><Close sx={{ cursor: 'pointer' }} /></div></FlexRow>
                        {
                            (modalData == 'form') ?
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                        <Typography sx={{ mt: 2, fontSize: '12px', mb: 2, color: 'primary.text' }}>
                                            Enter Receipant YouWho ID
                                        </Typography>
                                        <Inputtt>
                                            <Square sx={{ color: 'primary.light', fontSize: '30px' }} />
                                            <Inputt value={receipantID} placeholder="enter id" onChange={(e) => setReceipantID(e.target.value)} />
                                        </Inputtt>
                                    </Box>
                                    <ButtonPurple text={'transfer'} w={'100%'} onClick={deposite} />
                                </>
                                :
                                <Box sx={{ display: 'flex', flexDirection: 'column',height:'60%' }}>
                                    <Typography sx={{ mt: 2, fontSize: '14px', mb: 2, color: 'primary.text' }}>
                                        mint tx hash : {txHash}
                                    </Typography>
                                </Box>
                        }
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openClaimModal}
                onClose={() => setOpenClaimModal(false)}
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
                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}><Typography>Claim</Typography><div onClick={() => setOpenClaimModal(false)}><Close sx={{ cursor: 'pointer' }} /></div></FlexRow>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography sx={{ mt: 2, fontSize: '12px', mb: 2, color: 'primary.text' }}>
                                by keeping this gift in your wallet for 2 more days you will get a token bonus
                            </Typography>
                        </Box>
                        <ButtonPurple text={'claim/burn'} w={'100%'} onClick={withdraw} />
                    </Box>
                </Box>
            </Modal>
        </Outter>
    );
}

export default GiftCard;