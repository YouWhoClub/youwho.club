import { ArrowLeft, ArrowLeftSharp, Check, Close, Email, LockClock, LockOutlined, LockRounded, Password } from "@mui/icons-material";
import { Box, CircularProgress, FormHelperText, FormLabel, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import ButtonPurple from "../../buttons/buttonPurple";
import styled from "@emotion/styled";
import { AUTH_API } from "../../../utils/data/auth_api";
import { useDispatch, useSelector } from "react-redux";
import { deleteUnclaimedDeposit, getuser, logOutUser, setRefreshToken } from "../../../redux/actions";
import { useNavigate } from "react-router";
import { ArrowLeft3, Eye, EyeSlash, Lock } from "iconsax-react";
import VerifyMail from "./verifyMail";
import { MyInput, ShadowInput } from "../../utils";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import gmailLogo from '../../../assets/gmailLogo.svg'
import microsoftLogo from '../../../assets/micosoftLogo.svg'
import { HEALTH_API } from "../../../utils/data/health_api";
import { toast } from "react-toastify";

const LoginWithOthersBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))
const LoginLogos = styled(Box)(({ theme }) => ({
    width: '49px',
    height: '37px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', cursor: 'pointer'
}))
const Line = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: theme.palette.primary.gray,
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))

const Login = ({ progress, setProgress, alreadyEmail }) => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState(alreadyEmail ? alreadyEmail : undefined)
    const [password, setPassword] = useState(undefined)
    const [loadingg, setLoadingg] = useState(false)
    const [forgotSending, setForgotSending] = useState(false)
    const [err, setErr] = useState(undefined)
    const [idErr, setIdErr] = useState(undefined)
    const [passErr, setPassErr] = useState(undefined)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [forgotButtonDisabled, setForgotButtonDisabled] = useState(true)
    const [newPassSent, setNewPassSent] = useState(false)
    const logOut = () => dispatch(logOutUser());
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const [openPassModal, setOpenPassModal] = useState(false)
    const apiCall = useRef(undefined)
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const refreshUserToken = (refreshToken, tokenExpiration) => dispatch(setRefreshToken(refreshToken, tokenExpiration));
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);

        return date;
    }

    const submit = async () => {
        setProgress('100%')
        setErr(undefined)
        setIdErr(undefined)
        setPassErr(undefined)
        setLoadingg(true)
        setButtonDisabled(true)

        if (!identifier) {
            setIdErr('please enter your identifier')
            setLoadingg(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        if (!String(identifier).includes('@')) {
            setIdErr('please enter your valid email address')
            setLoadingg(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        if (!password) {
            setPassErr('please enter your password')
            setLoadingg(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        try {
            apiCall.current = AUTH_API.request({
                path: `/login`,
                method: "post",
                body: { identifier: identifier, password: password },
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            localStorage.setItem('lastActive', true)
            let dt = new Date();
            dt = new Date(dt.getTime() + 30 * 60 * 1000)

            let dtt = new Date();
            let mm = addMonths(dtt, 1)
            let tmstmp = new Date(mm).getTime()
            console.log(response)
            let accesstoken = response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1]
            let refreshToken = response.headers.cookie.match(/refrestoken=([^&]+)/)[1]
            // let tokenExpiration = dt.getTime()
            let tokenExpiration = tmstmp
            fetchUser(accesstoken)
            refreshUserToken(refreshToken, tokenExpiration)
            setSuccess(response.message)
            setErr(undefined)
            setLoadingg(false)
            if (response.data.data.is_mail_verified)
                navigate('/profile')
            else setState('mailVerification')

        }
        catch (err) {
            console.log('errrrrrrrrrrrrrrrrr', err)
            if (err.data && err.data.message) {
                setProgress('0%')
                setSuccess(undefined)
                setErr(err.data.message)
                setLoadingg(false)
                setButtonDisabled(false)
            } else if (err.message) {
                setProgress('0%')
                setSuccess(undefined)
                setErr(err.message)
                setLoadingg(false)
                setButtonDisabled(false)
            } else {
                setProgress('0%')
                setSuccess(undefined)
                setErr('Network Error')
                setLoadingg(false)
                setButtonDisabled(false)
            }
        }
    }
    // useEffect(() => {
    //     if (globalUser.isLoggedIn) {
    //         if (globalUser.isMailVerified) {
    //             navigate('/dashboard')
    //         }
    //         else setState('mailVerification')
    //     }
    // }, [globalUser.isLoggedIn, globalUser.isMailVerified])
    const idStateChanger = (event) => {
        event.preventDefault()
        if (identifier) {
            setErr(undefined)
            setState('password')
        } else {
            setErr('please enter your identifier')
        }
    }
    useEffect(() => {
        if (identifier && password) {
            setButtonDisabled(false)
        } else setButtonDisabled(true)
    }, [identifier, password])
    useEffect(() => {
        if (identifier) {
            setForgotButtonDisabled(false)
        } else setForgotButtonDisabled(true)
    }, [identifier])
    async function disconnect() {

        try {

            apiCall.current = HEALTH_API.request({
                path: `/logout`,
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            });
            let response = await apiCall.current.promise;

            if (!response.isSuccess)
                throw response
            localStorage.setItem('pvk', globalUser.privateKey)

            logOut(globalUser.privateKey)
            refreshUserToken('', '')
            deleteUnclaimed()
        }
        catch (err) {
            localStorage.setItem('pvk', globalUser.privateKey)

            logOut(globalUser.privateKey)
            refreshUserToken('', '')
            deleteUnclaimed()

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }
    const sendNewPass = async () => {
        loading()
        setErr(undefined)
        setIdErr(undefined)
        setPassErr(undefined)
        setForgotSending(true)
        setForgotButtonDisabled(true)
        if (!identifier) {
            setIdErr('please enter your identifier')
            setForgotSending(false)
            setForgotButtonDisabled(false)
            return
        }
        if (!String(identifier).includes('@')) {
            setIdErr('please enter your valid email address')
            setForgotSending(false)
            setForgotButtonDisabled(false)
            return
        }

        try {
            apiCall.current = HEALTH_API.request({
                path: `/profile/forgot-password`,
                method: "post",
                body: { mail: identifier },
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            updateToast(true, 'new password sent')
            // setOpenPassModal(false)
            setNewPassSent(true)
        }
        catch (err) {
            console.log(err)
            updateToast(false, err.message)
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit()
        }
    }

    return (
        <>
            {state == 'identifier' ?
                <Box sx={{
                    width: '100%', height: '100%', boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        width: '100%', height: '100%', boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                    }}>
                        <LoginWithOthersBox sx={{ mb: '32px', gap: '8px' }}>
                            <Typography
                                sx={{
                                    color: 'primary.darkGray',
                                    fontSize: '14px',
                                }}>
                                Sign In With
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <LoginLogos sx={{ backgroundImage: BG_URL(PUBLIC_URL(`${microsoftLogo}`)), }} />
                                <LoginLogos sx={{ backgroundImage: BG_URL(PUBLIC_URL(`${gmailLogo}`)), }} />
                            </Box>
                        </LoginWithOthersBox>
                        <Box sx={{
                            color: 'primary.text',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mb: '32px', textTransform: 'lowercase'
                        }}>
                            <Line sx={{ mr: '4px' }} />
                            or
                            <Line sx={{ ml: '4px' }} />
                        </Box>
                        <form
                            style={{
                                width: '100%',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{
                                display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'
                            }}>
                                <ShadowInput
                                    // mb={'12px'}
                                    value={identifier}
                                    icon={<Email sx={{ color: 'primary.light', }} />}
                                    borderColor={idErr ? 'primary.error' : success ? 'primary.success' : undefined}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    label={'Email'} width={'99%'} id={'Email'} type="email" />
                                {idErr ? <Typography
                                    sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '9px', margin: 0 }}>{idErr}</Typography> : undefined}
                                <ShadowInput
                                    onKeyDown={buttonDisabled ? undefined : handleKeyDown}
                                    mt={'12px'}
                                    icon={<LockRounded color="primary.light" sx={{ color: 'primary.light', }} />}
                                    borderColor={passErr ? 'primary.error' : success ? 'primary.success' : undefined}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label={'Password'}
                                    width={'99%'}
                                    id={'Password'}
                                    value={password}
                                    type={showPassword ? 'input' : 'password'}
                                    extraIcon={
                                        <>
                                            {showPassword ?
                                                <EyeSlash color="#787878" onClick={() => setShowPassword(false)} size='20px' />
                                                :
                                                <Eye size='20px' color="#787878" onClick={() => setShowPassword(true)} />
                                            }
                                        </>
                                    }
                                />
                                {passErr ? <Typography
                                    sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '9px', margin: 0 }}>{passErr}</Typography> : undefined}
                            </Box>

                            {err ?
                                <Typography
                                    sx={{
                                        // alignSelf: 'start !important',
                                        color: 'primary.error',
                                        fontSize: '12px', my: '12px'
                                    }}>
                                    {err}</Typography> :
                                <Typography
                                    onClick={() => setOpenPassModal(true)}
                                    sx={{
                                        color: 'primary.darkGray',
                                        fontSize: '12px', my: '12px', cursor: 'pointer'
                                    }}>
                                    FORGOT PASSWORD ?
                                </Typography>
                            }
                        </form>
                    </Box>
                    <Box sx={{ width: '100%', justifySelf: 'end', }}>
                        <ButtonPurple disabled={buttonDisabled} w={'100%'}
                            text={loadingg ? 'loading' : 'Sign In'}
                            onClick={buttonDisabled ? undefined : submit} />
                    </Box>
                </Box>
                :
                <VerifyMail email={identifier} disconnect={disconnect} setProgress={setProgress} setState={setState} />
            }




            <Modal
                open={openPassModal}
                onClose={() => {
                    setOpenPassModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column', gap: '64px',
                        padding: { xs: '15px', sm: '30px' }, justifyContent: 'space-between', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenPassModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        {newPassSent ?
                            <>
                                <Box sx={(theme) => ({
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    display: 'flex', flexDirection: 'column', gap: '24px',
                                    justifyContent: 'start', alignItems: 'center'
                                })}>
                                    <Typography
                                        sx={{ fontWeight: 700, color: 'primary.success', textTransform: 'capitalize', fontSize: { xs: '16px', sm: '20px' } }}>
                                        New Password Sent
                                    </Typography>
                                    <Typography
                                        sx={{ color: 'primary.text', textTransform: 'capitalize', fontSize: { xs: '10px', sm: '12px' } }}>
                                        check your email inbox
                                    </Typography>
                                    <Check sx={{ fontSize: '40px', color: 'primary.success', fontWeight: 700 }} />
                                </Box>
                                <Box />
                            </>
                            :
                            <>
                                <Box sx={(theme) => ({
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    display: 'flex', flexDirection: 'column', gap: '24px',
                                    justifyContent: 'start', alignItems: 'center'
                                })}>
                                    <Typography
                                        sx={{ color: 'primary.text', textTransform: 'capitalize', fontSize: { xs: '14px', sm: '16px' } }}>
                                        Send an email to reset your password
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'
                                    }}>

                                        <ShadowInput
                                            // mb={'12px'}
                                            value={identifier}
                                            icon={<Email sx={{ color: 'primary.light', }} />}
                                            borderColor={idErr ? 'primary.error' : success ? 'primary.success' : undefined}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            label={'Email'} width={'99%'} id={'Email'} type="email" />
                                        {idErr ? <Typography
                                            sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '9px', margin: 0 }}>{idErr}</Typography> : undefined}

                                    </Box>
                                </Box>
                                <ButtonPurple disabled={forgotButtonDisabled} w={'100%'}
                                    text={forgotSending ? 'sending..' : 'Send'}
                                    onClick={forgotButtonDisabled ? undefined : sendNewPass} />
                            </>}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Login;