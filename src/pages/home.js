import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import NavbarTwo from "../components/NavbarRadius";
import IntroNew from "../components/HomePage/Intro"
import YWServices from "../components/HomePage/yServices"
import FABSection from "../components/HomePage/features&benefits"
import DecorSection from "../components/HomePage/decorSection"
import WhatsSection from "../components/HomePage/whatsNFT"
import NFTSlides from "../components/HomePage/nftSlides"
import Footer from "../components/Footer"


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
    return (
        <Homme>
            <NavbarTwo switchTheme={switchTheme} theme={theme} />
            {/* <ThemeSwitcher switchTheme={switchTheme} /> */}
            <IntroNew />
            <YWServices />
            <SecondSection sx={{
                mt: 10, pt: 10
            }}>
                <Box sx={{
                    px: { xs: '0', sm: '30px', md: '60px' },
                    display: 'flex', flexDirection: 'column',
                }}>
                    <FABSection />
                    <DecorSection />
                    <WhatsSection />
                    <NFTSlides />
                </Box>
                <Footer />
            </SecondSection>
        </Homme>
    );
}

export default Home;