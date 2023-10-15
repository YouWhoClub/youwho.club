import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import ButtonOutlineInset from "../../buttons/buttonOutlineInset";
import ButtonPurple from "../../buttons/buttonPurple";
import { useEffect, useState } from "react";
import { ArrowLeft2, Location, Mobile } from "iconsax-react";
import { MyInput } from "../../utils";
import Selection from "../../selection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getuser } from "../../../redux/actions";
import { API_CONFIG } from "../../../config";
import OTPInput from "react-otp-input";
import Timer from "../../Timer";
import walletPic from '../../../assets/Wallet.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";


const WalletPic = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: BG_URL(PUBLIC_URL(`${walletPic}`)),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    width: '130px',
    height: '130px'
}))

const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text, textAlign: 'center'
}))
const P = styled('p')(({ theme }) => ({
    color: theme.palette.secondary.text, textAlign: 'center', fontSize: '12px'
}))

const VerifyPhoneModal = ({ openModal, setOpenModal }) => {
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
        if (globalUser.phoneNumber)
            setPhone(globalUser.phoneNumber)
    }, [globalUser.phoneNumber])

    const [selectValue, setSelectValue] = useState('Location')
    const handleSelect = (e) => {
        e.preventDefault()
        setSelectValue(e.target.id)
    }
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
        <Modal
            open={openModal}
            onClose={() => {
                setOpenModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock={true}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{
                    borderRadius: '24px',
                    width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: '500px' },
                    backgroundColor: 'secondary.bg', boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
                    display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    {!globalUser.isPhoneVerified ?
                        <>
                            {showOtp ?
                                <>
                                    <FlexRow sx={{}}>
                                        <div />
                                        <div onClick={() => setOpenModal(false)}>
                                            <Close sx={{ cursor: 'pointer' }} />
                                        </div>
                                    </FlexRow>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
                                    }}>
                                        <Title>Verify Mobile Number</Title>
                                        <P>
                                            Enter The Code Sent To Your Mobile Number.
                                        </P>
                                    </Box>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={8}
                                        renderInput={(props) => <input {...props} disabled={isDisabled} />}
                                        containerStyle={{ direction: "ltr" }}
                                        inputType="number"
                                        inputStyle={{ outline: 'none', borderRadius: '12px', minWidth: '1rem', width: '35px', height: '35px', padding: '0', margin: '2px', borderColor: '#DEDEDE' }}
                                    />
                                    <Typography sx={{ color: '#F675A8', fontSize: '12px' }}>{err ? err : ''}</Typography>
                                    <FlexRow sx={{ gap: 2 }}>
                                        <ButtonOutlineInset text={`Back`} onClick={() => setShowOtp(false)} w={'100px'} />
                                        <ButtonPurple text={'Check Authentication'} disabled={isDisabled} w={'100%'} onClick={otpCheckHandle} />
                                    </FlexRow>
                                    {
                                        isExpired ?
                                            <div >
                                                <Typography>time is over</Typography>
                                                {/* <button type={"button"} id={"resend"} onClick={resendOtp}>try again</button> */}
                                                <ButtonPurple id={"resend"} w={'100%'} onClick={resendOtp} text={'try again'} />
                                            </div>
                                            :
                                            <Timer expiryTimestamp={expiryTime} onExpire={handleExpire} />
                                    }

                                </>
                                :
                                <>
                                    <FlexRow sx={{}}>
                                        <div />
                                        <div onClick={() => setOpenModal(false)}>
                                            <Close sx={{ cursor: 'pointer' }} />
                                        </div>
                                    </FlexRow>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
                                    }}>
                                        <Title>Enter Your Mobile Number</Title>
                                        <P>
                                            We Need Your Number to Create A Unique Private Key For You.
                                        </P>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 2
                                    }}>
                                        <Selection icon={<Location />} width={'100%'} tabs={['iran', 'canada', 'alman']} id={'location-selection'} handleSelect={handleSelect} selectValue={selectValue} />
                                        <MyInput icon={<Mobile />} borderColor={err ? '#F675A8' : undefined} onChange={(e) => setPhone(e.target.value)} label={'Mobile Number'} width={'100%'} id={'mobile-number'} />
                                    </Box>
                                    <Typography sx={{ color: '#F675A8', fontSize: '12px' }}>{err ? err : ''}</Typography>
                                    <FlexRow sx={{ gap: 2 }}>
                                        <ButtonOutlineInset text={'Not Yet'} onClick={() => setOpenModal(false)} w={'100px'} />
                                        <ButtonPurple text={'Send Verification Code'} w={'100%'} onClick={otpReqHandle} />
                                    </FlexRow>
                                </>
                            }
                        </>
                        :
                        <>
                            <FlexRow sx={{}}>
                                <div />
                                <div onClick={() => setOpenModal(false)}>
                                    <Close sx={{ cursor: 'pointer' }} />
                                </div>
                            </FlexRow>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <Title>Congratulations!</Title>
                                <P>
                                    You Earned One YouWho Token For Your Mobile Number Verification!
                                </P>
                            </Box>
                            <WalletPic />
                            <ButtonPurple w={'100%'} text={'Lets Go'} onClick={() => navigate('/wallet')} />

                        </>
                    }
                </Box>
            </Box>
        </Modal >

    );
}

export default VerifyPhoneModal;