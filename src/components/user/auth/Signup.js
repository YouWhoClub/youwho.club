import { ArrowLeft, Email, LockRounded, Password } from "@mui/icons-material";
import { Box, FormHelperText, FormLabel, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import ButtonPurple from "../../buttons/buttonPurple";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { deleteUnclaimedDeposit, getuser, logOutUser, setRefreshToken } from "../../../redux/actions";
import { AUTH_API } from "../../../utils/data/auth_api";
import { useNavigate } from "react-router";
import { Eye, EyeSlash, Lock } from "iconsax-react";
import { ShadowInput } from "../../utils";
import VerifyMail from "./verifyMail";
import gmailLogo from '../../../assets/gmailLogo.svg'
import microsoftLogo from '../../../assets/micosoftLogo.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { HEALTH_API } from "../../../utils/data/health_api";

const LoginLogos = styled(Box)(({ theme }) => ({
    width: '49px',
    height: '37px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', cursor: 'pointer'
}))

const LoginWithOthersBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))
const Line = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(17, 17, 19, 0.20)',
}))
const Signup = ({ progress, setProgress, alreadyEmail }) => {
    const globalUser = useSelector(state => state.userReducer)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState(alreadyEmail ? alreadyEmail : undefined)
    const [password, setPassword] = useState(undefined)
    const [repeatPassword, setRepeatPassword] = useState(undefined)
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [idErr, setIdErr] = useState(undefined)
    const [passErr, setPassErr] = useState(undefined)
    const [repeatPassErr, setRepeatPassErr] = useState(undefined)
    const [success, setSuccess] = useState(false)
    const apiCall = useRef(undefined)
    const fetchUser = (token) => dispatch(getuser(token));
    const refreshUserToken = (refreshToken, tokenExpiration) => dispatch(setRefreshToken(refreshToken, tokenExpiration));
    const logOut = () => dispatch(logOutUser());
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());

    useEffect(() => {
        if (identifier && password && repeatPassword) {
            setButtonDisabled(false)
        } else setButtonDisabled(true)
    }, [identifier, password, repeatPassword])

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
            logOut()
            refreshUserToken('', '')
            deleteUnclaimed()
        }
        catch (err) {
            logOut()
            refreshUserToken('', '')
            deleteUnclaimed()

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }

    const submit = async (e) => {
        e.preventDefault()
        setProgress('50%')
        setErr(undefined)
        setIdErr(undefined)
        setPassErr(undefined)
        setRepeatPassErr(undefined)
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
        if (!repeatPassword) {
            setRepeatPassErr('please repeat your password')
            setLoading(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }
        if (password !== repeatPassword) {
            setRepeatPassErr('your repeated password is incorrect')
            // setPassErr('your repeated password is incorrect')
            setLoading(false)
            setButtonDisabled(false)
            setProgress('0%')
            return
        }

        try {
            apiCall.current = AUTH_API.request({
                path: `/signup`,
                method: "post",
                body: { identifier: identifier, password: password },
            });
            let response = await apiCall.current.promise;
            console.log('uuuuseeeeeer', response)
            if (!response.isSuccess)
                throw response
            localStorage.setItem('lastActive', true)
            let dt = new Date();
            dt = new Date(dt.getTime() + 30 * 60 * 1000)
            let accesstoken = response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1]
            let refreshToken = response.headers.cookie.match(/refrestoken=([^&]+)/)[1]
            let tokenExpiration = dt.getTime()
            fetchUser(accesstoken)
            refreshUserToken(refreshToken, tokenExpiration)
            setSuccess(response.message)
            setErr(undefined)
            setLoading(false)

            if (response.data.data.is_mail_verified)
                navigate('/dashboard')
            else setState('mailVerification')

        }
        catch (err) {
            if (err.data && err.data.message) {
                setProgress('0%')
                setSuccess(undefined)
                setErr(err.data.message)
                setLoading(false)
                setButtonDisabled(false)
            } else if (err.message) {
                setProgress('0%')
                setSuccess(undefined)
                setErr(err.message)
                setLoading(false)
                setButtonDisabled(false)
            } else {
                setProgress('0%')
                setSuccess(undefined)
                setErr('Network Error')
                setLoading(false)
                setButtonDisabled(false)
            }

        }
    }
    const idStateChanger = (event) => {
        event.preventDefault()
        if (state == 'identifier') {

            if (identifier) {
                setErr(undefined)
                setState('password')
            } else {
                setErr('please enter your identifier')
            }
        } else {
            if (password) {
                setErr(undefined)
                setState('repeatPassword')
            } else {
                setErr('please enter your password')
            }

        }
    }
    return (
        <>
            {state == 'identifier' || state == 'password' || state == 'repeatPassword' ?
                <Box sx={{
                    width: '100%', height: '100%', boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        width: '100%', height: '100%', boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <LoginWithOthersBox sx={{ mb: '32px', gap: '8px' }}>
                            <Typography
                                sx={{
                                    color: 'primary.darkGray',
                                    fontSize: '14px',
                                }}>
                                Sign Up With
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
                                <ShadowInput
                                    mt={'12px'}
                                    icon={<LockRounded color="primary.light" sx={{ color: 'primary.light', }} />}
                                    borderColor={repeatPassErr ? 'primary.error' : success ? 'primary.success' : undefined}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    label={'Repeat Password'}
                                    width={'99%'}
                                    id={'Repeat-Password'}
                                    value={repeatPassword}
                                    type={showRepeatPassword ? 'input' : 'password'}
                                    extraIcon={
                                        <>
                                            {showRepeatPassword ?
                                                <EyeSlash color="#787878" onClick={() => setShowRepeatPassword(false)} size='20px' />
                                                :
                                                <Eye size='20px' color="#787878" onClick={() => setShowRepeatPassword(true)} />
                                            }
                                        </>
                                    }
                                />
                                {repeatPassErr ?
                                    <Typography
                                        sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '9px', margin: 0 }}
                                    >{repeatPassErr}</Typography> : undefined}
                            </Box>
                        </form>

                        {err ?
                            <Typography
                                sx={{
                                    // alignSelf: 'start !important',
                                    color: 'primary.error',
                                    fontSize: '12px', my: '6px'
                                }}>
                                {err}</Typography> :
                            undefined
                        }
                    </Box>
                    <Box sx={{ width: '100%', justifySelf: 'end', }}>
                        <ButtonPurple disabled={buttonDisabled} w={'100%'}
                            text={loading ? 'loading' : 'Sign Up'}
                            onClick={buttonDisabled ? undefined : submit} />
                    </Box>
                </Box>
                :
                <VerifyMail email={identifier} setProgress={setProgress} setState={setState} disconnect={disconnect} />
            }
        </>

    );
}

export default Signup;