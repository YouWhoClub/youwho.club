import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Email, Lock, Verified } from '@mui/icons-material';
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { API_CONFIG } from "../config";
import { useNavigate } from "react-router";
import { getuser } from "../redux/actions";
import AuthLayout from "../components/auth/authLayout";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Timer from "../components/Timer";
import ButtonPurple from "../components/buttons/buttonPurple";

const AuthBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    width: '350px',
    height: '480px',
    borderRadius: '30px',
    // display: "flex",
    flexDirection: "column",
    padding: '30px',
    margin: '100px auto 30px',
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

const VerifyMail = () => {

    const globalUser = useSelector(state => state.userReducer)
    const [mail, setMail] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [expiryTime, setExpiryTime] = useState('')
    const [isExpired, setIsExpired] = useState(false)
    const [isDisabled, setisDisabled] = useState(false)
    const [isMailDisabled, setMailDisabled] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));

    useEffect(() => {
        if (globalUser.mail)
            setMail(globalUser.mail)
    }, [globalUser.mail])




    const otpReqHandle = async event => {
        event.preventDefault()
        // Errors
        let errors = 0

        if (mail.length === 0) {
            setErr("please enter your Email");
            errors++
        }



        // Send request to server if there is no errors
        if (errors === 0) {

            // Disable all fields
            setMailDisabled(true)

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/request-mail-code/${mail}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);
            if (response.status === 200) {
                const time = new Date();
                console.log(response.message);
                setExpiryTime(time.setSeconds(time.getSeconds() + 240))
                setShowOtp(true)
                setErr(false)
            } else {
                // Show message
                if (response.status === 404)
                    setErr(response.message)
                else
                    setErr(response.message)
                // Enable login button
                setMailDisabled(false)
            }
        }
    }

    const otpCheckHandle = async event => {
        event.preventDefault()

        // Errors
        let errors = 0
        if (otp.length !== 8) {
            setErr("please enter code");
            errors++
        }

        // Send request to server if there is no errors
        if (errors === 0) {

            // Disable all fields
            setisDisabled(true)

            // check otp
            let time = Math.floor(new Date().getTime() / 1000);
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/verify-mail-code`, {
                method: 'POST',
                body: JSON.stringify({
                    "user_mail": mail,
                    "verification_code": otp,
                    "vat": time
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()

            console.log(response);

            if (response.status === 200) {
                // Show message
                console.log(response.message);
                fetchUser(globalUser.token)

                setTimeout(() => {
                    navigate('/dashboard')
                }, 2000);
            } else {
                // Show message
                if (response.status === 404)
                    setErr(response.message)
                else
                    setErr(response.message)
                // Enable login button
                setisDisabled(false);
            }
        }
    }

    const resendOtp = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/request-mail-code/${mail}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        console.log(response);
        if (response.status === 200) {
            const time = new Date();
            console.log(response.message);
            setExpiryTime(time.setSeconds(time.getSeconds() + 240))
            setShowOtp(true)
            setisDisabled(false)
            setIsExpired(false)
            setErr('')
        } else {
            // Show message
            if (response.status === 404)
                setErr(response.message)
            else
                setErr(response.message)
            // Enable login button
            setMailDisabled(false)
        }
    }

    const handleExpire = () => {
        setIsExpired(true)
        setisDisabled(true)
    }

    return (
        <AuthLayout>
            <AuthBox>
                <Box sx={{
                    px: { xs: '20px', sm: 0 }, height: '100%', display: "flex",
                    flexDirection: "column", justifyContent: 'space-between', pt: 2
                }}>

                    {globalUser.isLoggedIn ?
                        !globalUser.isMailVerified ?
                            <>
                                {
                                    showOtp ?
                                        <form onSubmit={otpCheckHandle} style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex', flexDirection: 'column',
                                            justifyContent: 'space-between', alignItems: 'center',
                                        }}>
                                            <div >
                                                <Lock sx={{ fontSize: '50px', marginBottom: '10px', color: 'primary.light' }} />
                                            </div>

                                            <label htmlFor={"otp-code"}>enter code</label>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={8}
                                                renderInput={(props) => <input {...props} disabled={isDisabled} />}
                                                containerStyle={{ direction: "ltr" }}
                                                inputType="number"
                                                inputStyle={{ minWidth: '1rem', width: '25px', height: '25px', padding: '0', margin: '2px' }}
                                            />
                                            <ButtonPurple type={"submit"} id={"submit-otp"} disabled={isDisabled} w={'100%'} text={'confirm'} />
                                            <p >{err ? err : ''}</p>
                                            {
                                                isExpired ?
                                                    <div >
                                                        <div>time is over</div>
                                                        <button type={"button"} id={"resend"} onClick={resendOtp}>try again</button>
                                                    </div>
                                                    :
                                                    <Timer expiryTimestamp={expiryTime} onExpire={handleExpire} />
                                            }
                                        </form>
                                        :
                                        <form style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex', flexDirection: 'column',
                                            justifyContent: 'space-between', alignItems: 'center',
                                        }} onSubmit={otpReqHandle} >
                                            <Inputtt>
                                                <Email sx={{ color: 'primary.light', fontSize: '30px' }} />
                                                <Inputt
                                                    type="email"
                                                    value={mail}
                                                    id="mail"
                                                    name="mail"
                                                    placeholder="example@email.com"
                                                    dir="ltr"
                                                    onChange={(e) => setMail(e.target.value)}
                                                    disabled={isMailDisabled}
                                                />
                                            </Inputtt>
                                            <ButtonPurple w={'100%'} text={'send code'} />
                                            <p >{err ? err : ''}</p>
                                        </form>
                                }
                            </> :
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-between', alignItems: 'center',
                            }}>
                                <Verified sx={{ fontSize: '50px', marginBottom: '10px', color: 'primary.light' }} />
                                <h2>Your Email Has been verified</h2>
                            </div>
                        :
                        <p>you are not logged in </p>}
                </Box>
            </AuthBox>
        </AuthLayout>

    );
}

export default VerifyMail;
