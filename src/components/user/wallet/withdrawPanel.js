import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Modal, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import styled from "@emotion/styled";
import GiftCard from "../../nft market/giftCard";
import { useEffect, useRef, useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { setPrivateKey, updateBalance } from "../../../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';
import { API_CONFIG } from "../../../config";
import yCoin from '../../../assets/Ycoin.svg'
import { MyInput } from '../../utils'
import { Buffer } from 'buffer';
import { EmptyWallet } from "iconsax-react";



const Card = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow
}))
const Icon = styled(Box)(({ theme, url, w, h }) => ({
    width: `${w}px`,
    height: `${h}px`,
    color: '#B897CC',
    backgroundImage: BG_URL(PUBLIC_URL(`${url}`)),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    pointerEvents: 'none'
}))
const Button = styled('button')(({ theme }) => ({
    width: '100%',
    backgroundColor: '#7C42C7',
    padding: '12px 36px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontFamily: `"Josefin Sans", "Inter", sans-serif`,
    fontSize: '16px',
    boxShadow: theme.palette.primary.boxShadow,

    '&:disabled': {
        backgroundColor: theme.palette.primary.gray
    }
}))

const WithdrawPanel = () => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const dispatch = useDispatch();
    const getBalance = (token) => dispatch(updateBalance(token));
    const [err, setErr] = useState(undefined)
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)



    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }

    // setting polygon-mainnet as web3.js provider

    const provider = "https://polygon-mainnet.infura.io/v3/20f2a17bd46947669762f289a2a0c71c";
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const withdraw = async (depositId) => {
        loading();

        if (globalUser.privateKey) {
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
                updateToast(true, response.message)
                getBalance(globalUser.token)
            } else {
                setErr(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0' }}>
            {
                (globalUser.privateKey) ?
                    <>
                        {
                            unclaimedDeposits.length ?
                                unclaimedDeposits.map(item => {
                                    const { amount, id, iat, nft_img_url } = item;
                                    return (
                                        <Card>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box
                                                    component="img"
                                                    src={nft_img_url}
                                                    sx={{
                                                        width: '435px',
                                                        borderRadius: '12px',
                                                        backgroundColor: 'primary.gray',
                                                    }}
                                                >
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', py: '12px', gap: '12px', width: '327px', alignSelf: 'stretch' }}>
                                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                                        <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', fontWeight: '500' }}>NFT Name</Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "20px", color: 'primary.main', px: 2, gap: '5px' }}>
                                                            <Icon url={yCoin} w={20} h={20} />
                                                            <span>
                                                                {amount}
                                                            </span>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '10px', alignItems: 'center' }}>
                                                            <Typography sx={{ color: 'primary.text', fontWeight: '600', fontFamily: 'inter', fontSize: '12px' }}>Form: </Typography>
                                                            <Typography sx={{ color: 'primary.darkGray', fontWeight: '400', fontFamily: 'inter', fontSize: '12px' }}>Username</Typography>
                                                        </Box>
                                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '10px', alignItems: 'center' }}>
                                                            <Typography sx={{ color: 'primary.text', fontWeight: '600', fontFamily: 'inter', fontSize: '12px' }}>Transfer Date: </Typography>
                                                            <Typography sx={{ color: 'primary.darkGray', fontWeight: '400', fontFamily: 'inter', fontSize: '12px' }}>{iat.substring(0, 10)}</Typography>
                                                        </Box>
                                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '10px', alignItems: 'center' }}>
                                                            <Typography sx={{ color: 'primary.text', fontWeight: '600', fontFamily: 'inter', fontSize: '12px' }}>Transfer Time: </Typography>
                                                            <Typography sx={{ color: 'primary.darkGray', fontWeight: '400', fontFamily: 'inter', fontSize: '12px' }}>{iat.substring(10, 16)}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                                        <Button
                                                            onClick={() => withdraw(id)}
                                                        >Claim
                                                        </Button>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Card>
                                    )
                                }) :
                                <Box sx={{ display: 'flex', flexDirection: 'column', height: '300px', alignItems: 'center', justifyContent: 'center' }}>
                                    <EmptyWallet size={'50px'} color="#787878" />
                                    <Typography sx={{ mt: 2, fontSize: '20px', color: 'primary.darkGray', textAlign: 'center', mb: 2, fontWeight: '500' }}>
                                        There are no unclaimed NFT gitfs
                                    </Typography>
                                </Box>
                        }
                    </>
                    :
                    <Card>
                        <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                            We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                        </Typography>
                        <MyInput
                            value={signer}
                            onChange={(e) => setSigner(e.target.value)}
                            placeholder="enter private key"
                            width={'400px'}
                            textColor={'black'}
                            py={'8px'} />
                        <Button onClick={savePrivateKey}>save</Button>
                    </Card>
            }
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        </Box>
    );
}

export default WithdrawPanel;