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
            <NavbarTwo switchTheme={switchTheme} theme={theme} />
            <IntroNew theme={theme} />
            <YWServices theme={theme} />
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