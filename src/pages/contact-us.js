import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'
import { useState } from "react";
import { MyInput } from "../components/utils";
import { Description, Email, Instagram, Phone, Subject, Tag, Telegram, WhatsApp } from "@mui/icons-material";
import ButtonPurple from "../components/buttons/buttonPurple";
import { Location } from "iconsax-react";

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
const ContactForm = styled(Box)(({ theme }) => ({
    width: '50%', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.primary.bg,
    display: 'flex', alignItems: 'center', flexDirection: 'column', height: 'auto',
    padding: '25px 10px', boxSizing: 'border-box', gap: '25px',
    borderRadius: '14px',
    "@media (max-width: 900px)": {
        width: '100%',

    },
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
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg', gap: { xs: '50px', md: '100px' }
                }}>
                    <TopPic sx={{ bgcolor: 'secondary.bg', mb: '300px' }}>
                        <ContactFormWrapper sx={{
                            display: { xs: 'none', sm: 'flex' }, flexDirection: { xs: 'column', md: 'row' }
                        }}>
                            <ContactForm>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', md: '22px' } }}>
                                    Contact Form
                                </Typography>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                    <MyInput
                                        value={name}
                                        name={"name"}
                                        onChange={(e) => setName(e.target.value)}
                                        label={'Name'} width={'100%'}
                                        icon={<Subject sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-name'}
                                    />
                                    <MyInput
                                        value={email}
                                        name={"mail"}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label={'Email'} width={'100%'}
                                        icon={<Email sx={{ color: "#BEA2C5" }} />} type={'email'} id={'contact-mail'}
                                    />
                                    <MyInput
                                        value={mailDesc}
                                        name={"description"}
                                        onChange={(e) => setMailDesc(e.target.value)}
                                        label={'Description'} width={'100%'}
                                        icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'contact-desc'}
                                    />
                                </Box>
                                <ButtonPurple text={'Send Email'} px={'24px'} w={'max-content'} />
                            </ContactForm>
                            <Box sx={{ color: 'white', width: { xs: '100%', md: '30%' }, boxSizing: 'border-box', padding: '15px', gap: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Phone />
                                    <Typography sx={{ textTransform: 'capitalize' }}>+441234567890</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Email />
                                    <Typography sx={{ textTransform: 'capitalize' }}>Email Address</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Instagram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>Instagram</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <Telegram />
                                    <Typography sx={{ textTransform: 'capitalize' }}>Telegram</Typography>
                                </FlexRow>
                                <FlexRow sx={{ gap: '8px' }}>
                                    <WhatsApp />
                                    <Typography sx={{ textTransform: 'capitalize' }}>WhatsApp</Typography>
                                </FlexRow><FlexRow sx={{ gap: '8px' }}>
                                    <Location />
                                    <Typography sx={{ textTransform: 'capitalize' }}>Address</Typography>
                                </FlexRow>
                            </Box>
                        </ContactFormWrapper>
                    </TopPic>
                    <Footer />
                </Box>
            </Wrapper>
        </Box >
    );
}

export default ContactUs;