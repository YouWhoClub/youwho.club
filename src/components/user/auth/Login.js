import { ArrowLeft, ArrowLeftSharp, Email, LockClock, LockOutlined, LockRounded, Password } from "@mui/icons-material";
import { Box, CircularProgress, FormHelperText, FormLabel, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import ButtonPurple from "../../buttons/buttonPurple";
import styled from "@emotion/styled";
import { AUTH_API } from "../../../utils/data/auth_api";
import { useDispatch } from "react-redux";
import { getuser, setRefreshToken } from "../../../redux/actions";
import { useNavigate } from "react-router";
import { ArrowLeft3, Eye, EyeSlash, Lock } from "iconsax-react";
import VerifyMail from "./verifyMail";
import { MyInput, ShadowInput } from "../../utils";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import gmailLogo from '../../../assets/gmailLogo.svg'
import microsoftLogo from '../../../assets/micosoftLogo.svg'

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

const Login = ({ progress, setProgress, alreadyEmail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState(alreadyEmail ? alreadyEmail : undefined)
    const [password, setPassword] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(undefined)
    const [idErr, setIdErr] = useState(undefined)
    const [passErr, setPassErr] = useState(undefined)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const apiCall = useRef(undefined)
    const fetchUser = (token) => dispatch(getuser(token));

    const submit = async () => {
        setProgress('100%')
        setErr(undefined)
        setIdErr(undefined)
        setPassErr(undefined)
        setLoading(true)
        setButtonDisabled(true)

        if (!identifier) {
            setIdErr('please enter your identifier')
            setLoading(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        if (!String(identifier).includes('@')) {
            setIdErr('please enter your valid email address')
            setLoading(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        if (!password) {
            setPassErr('please enter your password')
            setLoading(false)
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
            console.log('uuuuseeeeeer', response)
            console.log('uuuuseeeeeer token', response.token)
            if (!response.isSuccess)
                throw response
            localStorage.setItem('lastActive', true)
            // fetchUser(response.token)
            fetchUser(response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1])
            dispatch(setRefreshToken(response.headers.cookie.match(/refrestoken=([^&]+)/)[1], new Date().getTime() + 31 * 60000 ))
            setSuccess(response.message)
            setErr(undefined)
            setLoading(false)

            if (response.data.data.is_mail_verified)
                navigate('/dashboard')
            else setState('mailVerification')
        }
        catch (err) {
            setProgress('0%')
            setSuccess(undefined)
            setErr(err.data.message)
            setLoading(false)
            setButtonDisabled(false)
        }
    }
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
                            text={loading ? 'loading' : 'Sign In'}
                            onClick={buttonDisabled ? undefined : submit} />
                    </Box>
                </Box>
                :
                <VerifyMail email={identifier} setProgress={setProgress} setState={setState} />
            }
        </>
    );
}

export default Login;