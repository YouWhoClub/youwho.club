import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import IntroNew from "../components/HomePage/Intro"
import YWServices from "../components/HomePage/yServices"
import FABSection from "../components/HomePage/features&benefits"
import DecorSection from "../components/HomePage/decorSection"
import WhatsSection from "../components/HomePage/whatsNFT"
import NFTSlides from "../components/HomePage/nftSlides"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";


const Homme = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.bg,
    display: 'flex', flexDirection: 'column',
    // width: '100%',
    // padding: '0 60px'
}))
const SecondSection = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.landBG,
    display: 'flex', flexDirection: 'column',
}))

const Home = ({ switchTheme, theme }) => {

    const Wrapper = styled(Box)(({ theme }) => ({
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        "@media (max-width: 1440px)": {
            width: '100%',
        },
    }))

    return (
        <Homme>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <IntroNew theme={theme} />
            <YWServices theme={theme} />
            <Box sx={{
                padding: { xs: '32px 42px', sm: '56px 0px' },
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '18px', sm: '70px' },
                justifyContent: { xs: 'space-between', sm: 'center' }, width: '100%'
                // display: 'grid',
                // gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
            }}>
                <Box sx={{
                    display: 'flex', gap: { xs: 'auto', sm: '70px' }, alignItems: 'center', justifyContent: 'space-between',
                    width: { xs: '100%', sm: 'max-content' }, color: 'primary.text'
                }}>
                    <Typography>
                        OpenSea
                    </Typography>
                    <Typography>
                        Polygonscan
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex', gap: { xs: 'auto', sm: '70px' }, alignItems: 'center', justifyContent: 'space-between',
                    width: { xs: '100%', sm: 'max-content' }, color: 'primary.text'
                }}>
                    <Typography>
                        PayPal
                    </Typography>
                    <Typography>
                        MetaMask
                    </Typography>
                </Box>
            </Box>
            <FABSection theme={theme} />
            <DecorSection />
            <WhatsSection />
            <NFTSlides />
            <Wrapper>
                <Footer />
            </Wrapper>
        </Homme>
    );
}

export default Home;