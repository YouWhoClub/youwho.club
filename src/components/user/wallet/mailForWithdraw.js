import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import ButtonPurple from "../../buttons/buttonPurple";
import { MyInput } from "../../utils";
import { setPrivateKey } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import MoneyIcon from '../../../assets/icons/money.svg'
import { Email } from "@mui/icons-material";
import CoinsIcon from '../../../assets/icons/coins.svg'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from "react-toastify";
import { PUBLIC_API } from "../../../utils/data/public_api";
import { API_CONFIG } from "../../../config";



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
    boxShadow: theme.palette.primary.boxShadow,
    "@media (max-width: 600px)": {
        padding: '8px',
        gap: '20px',
    },
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


const MailWithdraw = () => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const [tokenReqAmount, setTokenReqAmount] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    useEffect(() => {
        window.document.getElementById("scrollable-wallet-panel-inside").scrollTo(0, 0);
    }, [])

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
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        loading()
        // console.log(form.current)
        emailjs.sendForm('service_a12j5cg', 'template_z8tg0wd', form.current, 'aGpArAyhAVjAS-nED')
            .then((result) => {
                // console.log(result.text);
                // console.log("message sent!")
                updateToast(true, "message sent!")

            }, (error) => {
                console.log(error);
                // console.log("error sending message, try again!")
                updateToast(false, "error sending message, try again!")

            });
    };
    const sendRequest = async () => {
        loading()
        let requestData = {
            "user_id": globalUser.userId,
            "title": "withdraw",
            "cname": globalUser.username,
            "mail": email,
            "cdescription": `withdraw request for ${tokenReqAmount} tokens`
        }
        try {
            let request = await fetch(`${API_CONFIG.PUBLIC_API_URL}/ticket/send`, {
                method: 'POST',
                body: JSON.stringify(requestData),
            })
            let response = await request.json()
            console.log(response);

            if (!response.is_error) {
                updateToast(true, "message sent!")
            } else {
                updateToast(false, "could not send the request , try again later")
            }
        } catch (error) {
            console.log(error)
            updateToast(false, "could not send the request , try again later")
        }
    }
    return (
        <Box sx={{
            width: '100%',
            maxWidth: '600px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0', mb: '10px', mt: '10px'
        }}>
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>Withdraw Tokens</Typography>
                    <Typography sx={{ fontFamily: 'Inter', textTransform: 'capitalize', color: '#787878', textAlign: 'center', fontSize: '12px', lineHeight: 'normal', fontWeight: '400' }}>After sending withdraw request,please wait for an email from youwho</Typography>
                </Box>
                {(globalUser.privateKey) ?
                    <Box
                        // <form ref={form} onSubmit={sendEmail}
                        id="contact-form-withdraw"
                        sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <MyInput
                            value={tokenReqAmount}
                            onChange={(e) => setTokenReqAmount(Number(e.target.value))}
                            type={'number'}
                            width={'100%'}
                            label={'YouWho Token'}
                            name={"message"}
                            icon={<Icon url={CoinsIcon} w={27} h={27} />}
                        />
                        <MyInput
                            value={email}
                            type={'email'}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            width={'100%'}
                            label={'Email Address'} name={"from_name"}
                            icon={<Email sx={{ color: 'primary.light', }} />}
                        />
                        {/* </form> */}
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
                            width={'100%'}
                            textColor={'black'}
                            py={'8px'} />
                        <ButtonPurple onClick={savePrivateKey} text={'Save'} />
                    </Box>
                }
            </Container>
            {globalUser.privateKey &&
                <ButtonPurple disabled={!tokenReqAmount || !email}
                    onClick={sendRequest}
                    text={'Send Request'} w={'100%'} />}

        </Box>
    );
}

export default MailWithdraw;