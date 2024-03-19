import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'
import { useRef, useState } from "react";
import { MyInput } from "../components/utils";
import { Description, Email, Instagram, Phone, Subject, Tag, Telegram, WhatsApp } from "@mui/icons-material";
import ButtonPurple from "../components/buttons/buttonPurple";
import { Facebook, Location } from "iconsax-react";
import mapBG from '../assets/map.png'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from "react-toastify";
import { API_CONFIG } from "../config";

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))
const TopPic = styled(Box)(({ theme }) => ({
    width: '100%', height: '700px', borderRadius: '28px', position: 'relative',
    backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
    //  filter: 'blur(1px)',
    backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${mapBG}`)),

    "@media (max-width: 600px)": {
        height: '330px', borderRadius: '16px',
    },

}))
const ContactFormWrapper = styled(Box)(({ theme }) => ({
    width: '900px', position: 'absolute',
    // display: 'flex',
    transform: 'translate(-50%, 50%)',
    bottom: 0, left: '50%',
    alignItems: 'center', justifyContent: 'space-between',
    padding: '15px', boxSizing: 'border-box',
    borderRadius: '14px', backgroundColor: theme.palette.primary.main, boxShadow: theme.palette.primary.boxShadow,
    "@media (max-width: 1100px)": {
        width: '700px',

    },
    "@media (max-width: 900px)": {
        width: '500px',

    },
}))
const ContactForm = styled('form')(({ theme }) => ({
    width: '50%', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.primary.bg,
    display: 'flex', alignItems: 'center', flexDirection: 'column', height: 'auto',
    padding: '25px 10px', boxSizing: 'border-box', gap: '25px',
    borderRadius: '14px',
    "@media (max-width: 900px)": {
        width: '100%',

    },
}))
const BoxDetails = styled(Box)(({ theme }) => ({
    width: '100%', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.primary.bg,
    display: 'flex', alignItems: 'center', flexDirection: 'column', height: 'auto',
    boxSizing: 'border-box',
    borderRadius: '12px',
}))
const BoxDetailsTitle = styled(Box)(({ theme }) => ({
    width: '100%', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.primary.bg,
    display: 'flex', alignItems: 'center', height: 'auto', justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: '12px 12px 0px 0px', padding: '12px 10px'
}))
const BoxDetailsDetails = styled(Box)(({ theme }) => ({
    width: '100%', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.primary.main,
    display: 'flex', flexDirection: 'column', height: 'auto', color: 'white',
    boxSizing: 'border-box', gap: '25px',
    borderRadius: '0px 0px 12px 12px', padding: '10px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
}))

const ContactUs = ({ switchTheme, theme }) => {
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [mailDesc, setMailDesc] = useState(undefined)
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        loading()
        console.log(form.current)
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
            user_id: 0,
            title: "contact",
            cname: name,
            mail: email,
            cdescription: mailDesc
        }
        try {
            let request = await fetch(`${API_CONFIG.PUBLIC_API_URL}/ticket/send`, {
                method: 'POST',
                body: JSON.stringify(requestData),
            })
            let response = await request.json()
            console.log(request);
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
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'secondary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '32px 4px 0px 4px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'secondary.bg', gap: '32px'
                }}>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', flexDirection: 'column', gap: '12px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: '24px' }}>
                            Contact
                        </Typography>
                        <Typography sx={{ color: 'primary.main', fontSize: '14px', fontWeight: 500 }}>
                            YouWho Company
                        </Typography>
                    </Box>
                    <TopPic sx={{
                        bgcolor: 'primary.bg', mb: { xs: 'none', sm: '350px', md: '300px' },
                        display: 'flex', alignItems: 'center', justifyContent: { xs: 'start', md: 'space-between' },
                        flexDirection: { xs: 'column', md: 'row' }
                    }}>
                        <Box sx={(theme) => ({
                            display: { xs: 'none', sm: 'flex' }, width: { sm: '100%', md: '50%' }, height: '100%',
                            background: { sm: theme.palette.secondary.gradientTTB, md: theme.palette.secondary.gradientLTR },
                            alignItems: 'center', justifyContent: { sm: 'start', md: 'center' },
                            flexDirection: 'column', gap: '32px', boxSizing: 'border-box', p: '32px',
                        })}>
                            <Typography sx={{ color: 'primary.text', fontSize: { sm: '32px', md: '64px' } }}>
                                Contact
                            </Typography>
                            <Typography sx={{ color: 'primary.main', fontSize: { sm: '20px', md: '32px' }, fontWeight: 500 }}>
                                YouWho Company
                            </Typography>
                        </Box>

                        <ContactFormWrapper sx={{
                            display: { xs: 'none', sm: 'flex' }, flexDirection: { xs: 'column', md: 'row' }
                        }}>
                            <ContactForm
                                ref={form}
                                //  onSubmit={sendEmail} 
                                id="contact-form">
                                {/* <form style={{ width: '100%' }} ref={form} onSubmit={sendEmail}> */}

                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', md: '22px' } }}>
                                    Contact Form
                                </Typography>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                    <MyInput
                                        value={name}
                                        name='from_name' bgcolor={'secondary.bg'}
                                        onChange={(e) => setName(e.target.value)}
                                        label={'Name'} width={'100%'}
                                        icon={<Subject sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-name'}
                                    />
                                    <input name='to_name' type="email" placeholder='Email' required value={'support@youwho.club'} style={{ display: 'none' }} />
                                    <MyInput
                                        bgcolor={'secondary.bg'}
                                        value={email}
                                        name='from_name'
                                        onChange={(e) => setEmail(e.target.value)}
                                        label={'Email'} width={'100%'}
                                        icon={<Email sx={{ color: "#BEA2C5" }} />} type={'email'} id={'contact-mail'}
                                    />
                                    {/* <input name='from_name' type="email" placeholder='Email' required value={email} style={{ display: 'none' }} /> */}
                                    <MyInput
                                        multiline={true}
                                        height={'auto'}
                                        bgcolor={'secondary.bg'}
                                        value={mailDesc}
                                        name='message'
                                        onChange={(e) => setMailDesc(e.target.value)}
                                        label={'Description'} width={'100%'}
                                        icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-desc'}
                                    />
                                    {/* <textarea name='message' placeholder='Write message...' required value={mailDesc} style={{ display: 'none' }}></textarea> */}
                                </Box>
                                <ButtonPurple disabled={!mailDesc || !email} onClick={sendRequest} text={'Send Email'} px={'24px'} w={'max-content'} />
                                {/* </form> */}

                            </ContactForm>
                            <Box sx={{ color: 'white', width: { xs: '100%', md: '32%' }, boxSizing: 'border-box', padding: '15px', gap: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Phone />
                                    <Typography sx={{ textTransform: 'capitalize' }}>+443333390905</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Email />
                                    <Typography sx={{ textTransform: 'capitalize' }}>support@youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Instagram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Facebook />
                                    <Typography sx={{ textTransform: 'capitalize' }}>youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Telegram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>@YouWho_club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <WhatsApp />
                                    <Typography sx={{ textTransform: 'capitalize' }}>+447506391847</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Location />
                                    <Typography sx={{ textTransform: 'capitalize' }}>20 Wenlock road , london ,England</Typography>
                                </FlexRow>
                            </Box>
                        </ContactFormWrapper>
                    </TopPic>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: '18px', boxSizing: 'border-box', width: '100%' }}>
                        <BoxDetails>
                            <BoxDetailsTitle>
                                <Typography sx={{ color: 'primary.text' }}>
                                    Social Media
                                </Typography>
                            </BoxDetailsTitle>
                            <BoxDetailsDetails>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Facebook />
                                    <Typography sx={{ textTransform: 'capitalize' }}>youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Instagram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Telegram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>@YouWho_club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <WhatsApp />
                                    <Typography sx={{ textTransform: 'capitalize' }}>+447506391847</Typography>
                                </FlexRow>
                            </BoxDetailsDetails>
                        </BoxDetails>
                        <BoxDetails>
                            <BoxDetailsTitle>
                                <Typography sx={{ color: 'primary.text' }}>
                                    Address
                                </Typography>
                            </BoxDetailsTitle>
                            <BoxDetailsDetails>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Phone />
                                    <Typography sx={{ textTransform: 'capitalize' }}>+443333390905</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Email />
                                    <Typography sx={{ textTransform: 'capitalize' }}>support@youwho.club</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Location />
                                    <Typography sx={{ textTransform: 'capitalize' }}>20 Wenlock road , london ,England</Typography>
                                </FlexRow>
                            </BoxDetailsDetails>
                        </BoxDetails>
                        <ContactForm
                            ref={form}
                            //  onSubmit={sendEmail}
                            id="contact-form-mobile">
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', md: '22px' } }}>
                                Contact Form
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                <MyInput
                                    value={name} bgcolor={'secondary.bg'}
                                    name={"from_name"}
                                    onChange={(e) => setName(e.target.value)}
                                    label={'Name'} width={'100%'}
                                    icon={<Subject sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-name'}
                                />
                                <MyInput
                                    bgcolor={'secondary.bg'}
                                    value={email}
                                    name={"from_name"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label={'Email'} width={'100%'}
                                    icon={<Email sx={{ color: "#BEA2C5" }} />} type={'email'} id={'contact-mail'}
                                />
                                <MyInput
                                    height={'auto'}
                                    multiline={true}
                                    value={mailDesc} bgcolor={'secondary.bg'}
                                    name={"message"}
                                    onChange={(e) => setMailDesc(e.target.value)}
                                    label={'Description'} width={'100%'}
                                    icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-desc'}
                                />
                            </Box>
                            <ButtonPurple onClick={sendRequest} disabled={!mailDesc || !email} text={'Send Email'} px={'24px'} w={'100%'} />
                        </ContactForm>
                    </Box>
                    <Footer />
                </Box>
            </Wrapper>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />

        </Box >
    );
}

export default ContactUs;