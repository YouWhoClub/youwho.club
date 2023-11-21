import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowBack, Email, Lock, Verified } from '@mui/icons-material';
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { API_CONFIG } from "../../../config";
import { useNavigate } from "react-router";
import { getuser } from "../../../redux/actions";
import styled from "@emotion/styled";
import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import Timer from "../../Timer";
import ButtonPurple from "../../buttons/buttonPurple";
import { ArrowForward, ArrowRight } from "iconsax-react";

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

const VerifyMail = ({ email, code, setProgress, setState }) => {

    console.log(email)

    const globalUser = useSelector(state => state.userReducer)
    const [mail, setMail] = useState(email)
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [expiryTime, setExpiryTime] = useState('')
    const [isExpired, setIsExpired] = useState(false)
    const [isDisabled, setisDisabled] = useState(false)
    const [isButtonDisabled, setisButtonDisabled] = useState(true)
    const [isMailDisabled, setMailDisabled] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));

    useEffect(() => {
        if (globalUser.identifier && globalUser.token)
            otpReqHandle()
    }, [globalUser.identifier, globalUser.token])
    useEffect(() => {
        if (otp !== '') {
            setisButtonDisabled(false)
        } else setisButtonDisabled(true)
    }, [otp])


    const otpReqHandle = async () => {
        setProgress('100%')

        // event.preventDefault()
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
            setisButtonDisabled(true)

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
                    navigate('/gallery')
                }, 2000);
            } else {
                // Show message
                if (response.status === 404)
                    setErr(response.message)
                else
                    setErr(response.message)
                // Enable login button
                setisDisabled(false);
                setisButtonDisabled(false)
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
            setisButtonDisabled(false)
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
        setisButtonDisabled(true)
    }

    return (
        <>
            {globalUser.isLoggedIn ?
                !globalUser.isMailVerified ?
                    <>
                        {
                            showOtp ?
                                <Box sx={{
                                    width: '100%', height: '100%', boxSizing: 'border-box',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                }}>
                                    <Box sx={{
                                        width: '100%', height: '100%', boxSizing: 'border-box',
                                        display: 'flex', flexDirection: 'column',
                                    }}>
                                        <Typography sx={{ color: 'primary.darkGray', fontSize: '14px', textAlign: 'center' }}>
                                            Email Varification code
                                        </Typography>

                                        <form onSubmit={otpCheckHandle} style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex', flexDirection: 'column',
                                            justifyContent: 'center', alignItems: 'center', gap: '18px'
                                        }}>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={8}
                                                renderInput={(props) => <input {...props} disabled={isDisabled} />}
                                                containerStyle={{ direction: "ltr" }}
                                                inputType="number"
                                                inputStyle={{
                                                    outline: 'none', border: '1px solid #DEDEDE',
                                                    borderRadius: '12px', minWidth: '1rem', width: '35px', height: '35px',
                                                    padding: '0', margin: '2px', boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.2)'
                                                }}
                                            />
                                            {
                                                isExpired ?
                                                    <Typography onClick={resendOtp} sx={{
                                                        color: 'primary.darkGray', fontSize: '12px',
                                                        textAlign: 'center', cursor: 'pointer'
                                                    }}
                                                    >
                                                        Resend Varification Code
                                                    </Typography>
                                                    :
                                                    <Timer expiryTimestamp={expiryTime} onExpire={handleExpire} />
                                            }
                                        </form>
                                    </Box>

                                    <Box sx={{ width: '100%', justifySelf: 'end', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center',width:'max-content',
                                            gap: '4px', cursor: 'pointer'
                                        }} onClick={() => setState('identifier')}>
                                            <ArrowBack sx={{ fontSize: '17px', color: 'primary.darkGray' }} />
                                            <Typography sx={{ fontSize: '12px', color: 'primary.darkGray' }}>
                                                Back
                                            </Typography>
                                        </Box>
                                        <ButtonPurple
                                            type={"submit"} id={"submit-otp"}
                                            disabled={isButtonDisabled}
                                            onClick={otpCheckHandle}
                                            w={'100%'}
                                            text={'Verify & Let’s Go To YouWho'}
                                            nextIcon={<ArrowRight size='18px' />} />
                                    </Box>
                                </Box>

                                :
                                <Box sx={{
                                    height: '100%', display: 'flex',
                                    flexDirection: 'column', justifyContent: 'center'
                                }}>
                                    <Typography sx={{ color: 'primary.dark' }}>
                                        Sending Email
                                    </Typography>
                                    <LinearProgress sx={{ color: 'primary.main' }} />
                                </Box>
                        }
                    </>
                    :
                    <Box sx={{
                        height: '100%', width: '100%',
                        height: '100%',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '10px'
                    }}>
                        <Verified sx={{ fontSize: '50px', color: 'primary.light' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Your Email Has been verified </Typography>
                    </Box>
                :
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>you are not logged in </Typography>
                </Box>
            }
        </>
    );
}

export default VerifyMail;
