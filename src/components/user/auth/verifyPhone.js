import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Phone, Lock, Verified } from '@mui/icons-material';
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import Timer from "../../Timer";
import { API_CONFIG } from "../../../config";
import { useNavigate } from "react-router";
import { getuser } from "../../../redux/actions";
import PanelLayout from "../../PanelLayout";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ButtonPurple from "../../buttons/buttonPurple";
const AuthBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    width: '350px',
    height: '480px',
    borderRadius: '30px',
    // display: "flex",
    flexDirection: "column",
    padding: '30px',
    "@media (max-width: 900px)": {
    },
    "@media (max-width: 600px)": {
        width: '100%',
        margin: '0 auto',
        height: '100%',
        padding: '0',
        borderRadius: '0',
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



const VerifyPhone = () => {

    const globalUser = useSelector(state => state.userReducer)
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [expiryTime, setExpiryTime] = useState('')
    const [isExpired, setIsExpired] = useState(false)
    const [isDisabled, setisDisabled] = useState(false)
    const [isPhoneDisabled, setPhoneDisabled] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));

    useEffect(() => {
        if (globalUser.phone_number)
            setPhone(globalUser._number)
    }, [globalUser._number])


    useEffect(() => {
        fetchUser(globalUser.token)
    }, [globalUser.token])


    const otpReqHandle = async event => {
        event.preventDefault()
        // Errors
        let errors = 0

        if (phone.length === 0) {
            setErr("please enter your phone number");
            errors++
        }



        // Send request to server if there is no errors
        if (errors === 0) {

            // Disable all fields
            setPhoneDisabled(true)

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/request-phone-code/${phone}`, {
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
                setPhoneDisabled(false)
            }
        }
    }

    const otpCheckHandle = async event => {
        event.preventDefault()

        // Errors
        let errors = 0
        if (otp.length !== 6) {
            setErr("please enter code");
            errors++
        }

        // Send request to server if there is no errors
        if (errors === 0) {

            // Disable all fields
            setisDisabled(true)

            // check otp
            let time = Math.floor(new Date().getTime() / 1000);
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/verify-phone-code`, {
                method: 'POST',
                body: JSON.stringify({
                    "user_phone": phone,
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
                    navigate('/profile')
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
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/request-phone-code/${phone}`, {
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
            setPhoneDisabled(false)
        }
    }

    const handleExpire = () => {
        setIsExpired(true)
        setisDisabled(true)
    }


    return (
        <AuthBox>
            <Box sx={{
                px: { xs: '20px', sm: 0 }, height: '100%', display: "flex",
                flexDirection: "column", justifyContent: 'space-between', pt: 2
            }}>
                {globalUser.isLoggedIn ?
                    !globalUser.is_phone_verified ?
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
                                            <Lock sx={{ fontSize: '50px', marginBottom: '10px' }} />
                                        </div>

                                        <label htmlFor={"otp-code"}>enter code</label>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderInput={(props) => <input {...props} disabled={isDisabled} />}
                                            containerStyle={{ direction: "ltr" }}
                                            inputType="number"
                                            inputStyle={{ minWidth: '1rem', width: '25px', height: '25px', padding: '0', margin: '2px' }}
                                        />
                                        <ButtonPurple type={"submit"} id={"submit-otp"} disabled={isDisabled} w={'100%'} text={'confirm'} />
                                        {/* <button type={"submit"} id={"submit-otp"} disabled={isDisabled}>confirm</button> */}
                                        <p >{err ? err : ''}</p>
                                        {
                                            isExpired ?
                                                <div >
                                                    <div>time is over</div>
                                                    {/* <button type={"button"} id={"resend"} onClick={resendOtp}>try again</button> */}
                                                    <ButtonPurple id={"resend"} w={'100%'} onClick={resendOtp} text={'try again'} />
                                                </div>
                                                :
                                                <Timer expiryTimestamp={expiryTime} onExpire={handleExpire} />
                                        }
                                    </form>
                                    :
                                    <form onSubmit={otpReqHandle} style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex', flexDirection: 'column',
                                        justifyContent: 'space-between', alignItems: 'center',
                                    }} >
                                        {/* <div >
                                            <Phone sx={{ fontSize: '50px', marginBottom: '10px' }} />
                                        </div>

                                        <label htmlFor={"phone"}>please enter your phone number:</label>
                                        <input
                                            type="number"
                                            value={phone}
                                            id="phone"
                                            name="phone"
                                            dir="ltr"
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={isPhoneDisabled}
                                        />

                                        <button type={"submit"} id={"submit-ph"} disabled={isPhoneDisabled}>send code</button> */}
                                        <label htmlFor={"phone"}>please enter your phone number to verify:</label>

                                        <Inputtt>
                                            <Phone sx={{ color: 'primary.light', fontSize: '30px' }} />
                                            <Inputt
                                                type="number"
                                                value={phone}
                                                id="phone"
                                                name="phone"
                                                dir="ltr"
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={isPhoneDisabled}
                                            />
                                        </Inputtt>
                                        <ButtonPurple onClick={otpReqHandle} w={'100%'} text={'send code'} />

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
                            <h2>Your Phone Has been verified</h2>
                        </div> :
                    <h2>you are not logged in </h2>}
            </Box>
        </AuthBox>
    );
}

export default VerifyPhone;
