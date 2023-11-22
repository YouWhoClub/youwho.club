import { Box, Typography, Select, MenuItem, InputLabel, FormControl, TextField } from "@mui/material";
import { Pin, West } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useReducer, useRef, useState } from "react";
import PinIcon from '../../../assets/icons/pin.svg'
import MoneyIcon from '../../../assets/icons/money.svg'
import CoinsIcon from '../../../assets/icons/coins.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import ButtonPurple from "../../buttons/buttonPurple";
import { useSelector, useDispatch } from "react-redux";
import { setPrivateKey } from "../../../redux/actions";
import { API_CONFIG } from "../../../config";
import { Buffer } from 'buffer';
import { ButtonInput, MyInput, SelectInput } from '../../utils'



const Container = styled(Box)(({ theme }) => ({
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
    backgroundColor: '#7C42C7',
    padding: '12px 36px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontFamily: `"Josefin Sans", "Inter", sans-serif`,
    fontSize: '16px'
}))


const ChargeWallet = () => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState(undefined)
    const [tokenAmount, setTokenAmount] = useState(1)
    const [IRRValue, setIIRValue] = useState(5000)
    const [USDValue, setUSDValue] = useState(0.01)
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const IRRial = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IRR',
    });

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.id);
    }

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

    const handleChargeWallet = async (e) => {
        e.preventDefault()

        loading();

        const privateKey = Buffer.from(globalUser.privateKey, 'hex');

        const data = {
            user_id: globalUser.userId,
            buyer_cid: globalUser.cid,
            tokens: Number(tokenAmount),
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

        console.log(JSON.stringify(requestData));

        const publicKey = web3.eth.accounts.recover(dataHash, signature);
        console.log(publicKey)

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/cid/wallet/stripe/charge`, {
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
            updateToast(true, response.message)
            window.location.replace(response.data.checkout_session_url)
        } else {
            updateToast(false, response.message)
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0' }}>
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>Token exchange</Typography>
                    <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '12px', lineHeight: 'normal', fontWeight: '400' }}>You Can exchange YouWho-Token Here.</Typography>
                </Box>
                {
                    (globalUser.privateKey) ?
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', width: '100%',
                            alignItems: 'center', justifyContent: 'center', gap: '12px'
                        }}>
                            <Box sx={{
                                width: '100%', display: 'flex', flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'flex-start', gap: '12px'
                            }}>
                                <SelectInput tabs={['Dollar, USA', 'Rial, Iran',]} label={'Currency'}
                                    handleSelect={handleCurrencyChange} value={currency} id="currency-selection"
                                    width={'100%'} icon={<Icon url={PinIcon} w={27} h={27} />} />
                            </Box>
                            <Box sx={{
                                width: '100%', display: 'flex', flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                                <MyInput
                                    value={currency == 'Dollar, USA' ? USDollar.format(tokenAmount * USDValue) : IRRial.format(tokenAmount * IRRValue)}
                                    label={`${currency == 'Dollar, USA' ? 'Dollars' : 'Rials'}`}
                                    width={'100%'}
                                    icon={<Icon url={MoneyIcon} w={27} h={27} />}
                                />
                                <West size='20px' />
                                <MyInput
                                    value={tokenAmount}
                                    onChange={(e) => setTokenAmount(e.target.value)}
                                    label={'YouWho Token'}
                                    width={'100%'}
                                    icon={<Icon url={CoinsIcon} w={27} h={27} />}
                                />
                            </Box>
                        </Box>
                        :
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
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
                            <ButtonPurple onClick={savePrivateKey} text={'Save'} />
                        </Box>
                }
            </Container >
            {
                (globalUser.privateKey) &&
                <ButtonPurple onClick={handleChargeWallet} text={'charge your wallet'} px={'24px'} w={{ xs: '100%', sm: '350px' }} />
            }
        </Box>


    );
}

export default ChargeWallet;