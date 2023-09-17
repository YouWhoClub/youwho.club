import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Phone, Lock, Verified } from '@mui/icons-material';
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import Timer from "../components/Timer";
import { API_CONFIG } from "../config";
import { useNavigate } from "react-router";
import { getuser } from "../redux/actions";


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
        <div >
            {globalUser.isLoggedIn ?
                !globalUser.is_phone_verified ?
                    <>
                        {
                            showOtp ?
                                <form onSubmit={otpCheckHandle} >
                                    <div >
                                        <Lock sx={{ fontSize: '50px', marginBottom: '10px' }} />
                                    </div>

                                    <label htmlFor={"otp-code"}>enter code</label>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={8}
                                        renderInput={(props) => <input {...props} disabled={isDisabled} />}
                                        containerStyle={{ direction: "ltr" }}
                                        inputType="number"
                                        inputStyle={{ minWidth: '1rem', width: '40px', height: '40px', padding: '0', margin: '4px' }}
                                    />

                                    <button type={"submit"} id={"submit-otp"} disabled={isDisabled}>confirm</button>
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
                                <form onSubmit={otpReqHandle} >
                                    <div >
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

                                    <button type={"submit"} id={"submit-ph"} disabled={isPhoneDisabled}>send code</button>
                                    <p >{err ? err : ''}</p>
                                </form>
                        }
                    </> :
                    <div >
                        <Verified sx={{ fontSize: '50px', marginBottom: '10px' }} />
                        <h2>Your phone number Has been verified</h2>
                    </div>
                :
                <h2>you are not logged in </h2>}
        </div>

    );
}

export default VerifyPhone;
