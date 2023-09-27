import { AccountBalanceOutlined, AccountCircle, ArrowLeft, Email, Password, PaymentSharp, Phone, SocialDistance } from "@mui/icons-material";
import { Box, FormHelperText, FormLabel, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { AUTH_API } from "../../utils/data/auth_api";
import { getuser, setPrivateKey, setYouwhoId } from "../../redux/actions";
import ButtonPurple from "../buttons/buttonPurple";
import { Check, PasswordCheck, TickSquare } from "iconsax-react";
import { Link } from "react-router-dom";
import Bar from "../Bar";
import PanelLayout from "../PanelLayout";

const AuthBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    width: '350px',
    height: '480px',
    borderRadius: '30px',
    // display: "flex",
    flexDirection: "column",
    padding: '30px',
    // margin: '100px auto 30px',
    "@media (max-width: 900px)": {
    },
    "@media (max-width: 600px)": {
        width: '100%',
        margin: '0 auto',
        height: '100%',
        padding: '0',
        borderRadius: '0',
        paddingTop: '170px',
        paddingBottom: '40px',
    },
}))
const AuthScrollBox = styled(Box)(({ theme }) => ({
    // width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "column",
    //-------
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
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
    //-------

    "@media (max-width: 900px)": {
        // width: '550px',
    },
    "@media (max-width: 600px)": {
        // width: '100%',
        // margin: '0 auto',
        // height: '100vh',
        borderRadius: '0',
        // paddingTop: '80px'
    },
}))
const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
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
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))

const CreateWallet = ({ switchTheme , setPvKey}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [gmail, setGmail] = useState(undefined)
    const [username, setUsernme] = useState(undefined)
    const [phoneNumber, setPhoneNumber] = useState(undefined)
    const [paypal, setPaypal] = useState(undefined)
    const [socialId, setSocialId] = useState(undefined)
    const [accounNum, setAccounNum] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const apiCall = useRef(undefined)
    const setPrivateKeyy = (id) => dispatch(setPrivateKey(id));
    const fetchUser = (token) => dispatch(getuser(token));
    const globalUser = useSelector(state => state.userReducer)
    const [youwhoID, setYouwhoID] = useState(globalUser.youwhoID)
    const [privateKeey, setPrivateKeey] = useState(globalUser.privateKey)
    const [keyCopied, setKeyCopied] = useState(false)
    const [idCopied, setIdCopied] = useState(false)
    const copyToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setKeyCopied('Copied!');
        } catch (err) {
            setKeyCopied('Failed to copy!');
        }
    };
    const copyidToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied('Failed to copy!');
        }
    };
    const submit = async () => {
        setErr(undefined)
        setLoading(true)
        console.log(identifier)
        console.log(password)
        if (!gmail) {
            setErr('please enter your email')
            setLoading(false)
            return
        }
        // if (!accounNum) {
        //     setErr('please enter your account number')
        //     setLoading(false)
        //     return
        // }
        if (!phoneNumber) {
            setErr('please enter your phone number')
            setLoading(false)
            return
        }
        // if (!socialId) {
        //     setErr('please enter your social id')
        //     setLoading(false)
        //     return
        // }
        // if (!paypal) {
        //     setErr('please enter your paypal id')
        //     setLoading(false)
        //     return
        // }
        if (!username) {
            setErr('please enter a username')
            setLoading(false)
            return
        }
        console.log(globalUser.token)
        try {
            apiCall.current = AUTH_API.request({
                path: `/cid/build`,
                method: "post",
                body: {
                    mail: gmail,
                    username: username,
                    phone_number: phoneNumber,
                    paypal_id: '',
                    account_number: '',
                    device_id: localStorage.getItem('device-id'),
                    social_id: ''
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            });
            let response = await apiCall.current.promise;
            console.log('generate wallet response', response)
            if (!response.isSuccess)
                throw response
            fetchUser(globalUser.token)
            setPrivateKeyy(undefined)
            setYouwhoID(response.data.data.screen_cid)
            setPrivateKeey(response.data.data.signer)
            setPvKey(response.data.data.signer)
            setSuccess(response.statusText)
            setErr(undefined)
            setLoading(false)

            // setTimeout(() => {
            //     navigate('/profile')
            // }, 10000);

        }
        catch (err) {
            setSuccess(undefined)
            setErr(err.statusText)
            setLoading(false)
        }
    }
    const idStateChanger = () => {
        if (identifier) {
            setErr(undefined)
            setState('password')
        } else {
            setErr('please enter your identifier')
        }
    }
    return (
        <Box sx={{
            // height: '100vh',
            bgcolor: 'primary.bg',
            // color: 'white',
            display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            width: { xs: '100%', sm: 'calc(100% - 80px)' }, height: { xs: 'calc(100vh - 90px)', sm: '100%' },

        }}>
            {globalUser.isLoggedIn ?
                <>{youwhoID ?
                    <>{privateKeey ?
                        <AuthBox>
                            {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: "primary.darkGray" }}> */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> your youwho id :
                                <span
                                    style={{ fontSize: '13px', color: '#BEA2C5', cursor: 'pointer' }}
                                    onClick={() => copyidToClipBoard(youwhoID)}> {youwhoID}
                                </span>
                                <TickSquare style={{ display: idCopied ? 'block' : 'none', color: 'green' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> your private key :
                                <span style={{ fontSize: '13px', color: '#BEA2C5', cursor: 'pointer' }}
                                    onClick={() => copyToClipBoard(privateKeey)}>
                                    {privateKeey}
                                </span>
                                <TickSquare style={{ display: keyCopied ? 'block' : 'none', color: 'green' }} />
                            </div>

                            <div>
                                please save this information
                            </div>
                            <Link to={'/dashboard'} style={{ color: '#392F5A', textAlign: 'center', marginTop: '30px' }}>
                                go back to your profile
                            </Link>

                            {/* </Box> */}
                        </AuthBox>
                        :
                        <AuthBox>
                            <div> your youwho id :<span style={{ color: '#BEA2C5', cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText(youwhoID) }}> {youwhoID}</span></div>
                        </AuthBox>
                    }
                    </>
                    :
                    <AuthBox >
                        <Box sx={{
                            px: { xs: '20px', sm: 0 }, height: '100%', display: "flex",
                            flexDirection: "column", justifyContent: 'space-between',
                        }}>
                            <AuthScrollBox>
                                <Inputtt>
                                    <AccountCircle sx={{ color: 'primary.light', }} />
                                    <Inputt placeholder="Enter Your username" onChange={(e) => setUsernme(e.target.value.toString())} />
                                </Inputtt>
                                <Inputtt>
                                    <Email sx={{ color: 'primary.light', }} />
                                    <Inputt placeholder="Enter Your Email" onChange={(e) => setGmail(e.target.value.toString())} />
                                </Inputtt>
                                <Inputtt>
                                    <Phone sx={{ color: 'primary.light', }} />
                                    <Inputt placeholder="Enter Your phone number" onChange={(e) => setPhoneNumber(e.target.value.toString())} />
                                </Inputtt>
                                <Box sx={{ mt: 10, justifySelf: 'flex-end' }}>
                                    <ButtonPurple w={'100%'} text={'done'} onClick={submit} />
                                </Box>
                            </AuthScrollBox>
                            {err ? <p style={{ color: 'red', fontSize: '12px', margin: 0, marginTop: '10px', }}>{err}</p> : undefined}
                            {success ? <p style={{ color: 'green', fontSize: '12px', margin: 0, marginTop: '10px', }}>{success}</p> : undefined}
                        </Box>
                    </AuthBox>
                }</>
                :
                <AuthBox><div style={{ color: "gray" }}>you are not logged in</div></AuthBox>}
            <Bar />

        </Box>
    );
}

export default CreateWallet;