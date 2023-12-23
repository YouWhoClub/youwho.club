import bgDots from '../assets/bgDots.svg'
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'

const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text, textAlign: 'center'
}))
const P = styled('p')(({ theme }) => ({
    color: theme.palette.secondary.text, textAlign: 'center', fontSize: '14px',
}))
const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    position: 'relative',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))



const PrivacyPolicy = ({ switchTheme, theme }) => {
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Box sx={{
                width: '100%',
                boxSizing: 'border-box', padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg', gap: { xs: '50px', md: '100px' }
            }}>
                <Box sx={{
                    width: '100%',
                    height: { xs: '250px', md: '452px' },
                    backgroundImage: BG_URL(PUBLIC_URL(`${bgimg}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                    display: 'flex', alignItems: 'end', justifyContent: 'end',
                    boxSizing: 'border-box', pb: { xs: '20px', sm: '80px' }, pr: { xs: '40px', sm: '100px' }
                }}>
                    <Typography variant="h1"
                        sx={{
                            textTransform: 'capitalize',
                            color: 'primary.text', fontWeight: 400, fontSize: { xs: '30px', sm: '40px', md: '96px' }
                        }}>
                        Privacy Policy
                    </Typography>
                </Box>
                <Typography sx={{
                    color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter', textTransform: 'capitalize'
                }}>
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                </Typography>
                <Footer />
            </Box>
        </Box >);
}

export default PrivacyPolicy;