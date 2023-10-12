import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";
import YWServices from "../components/homePage/yServices";
import IntroNew from "../components/homePage/intro";
import NavbarTwo from "../components/NavbarRadius";
import Footer from "../components/Footer";
import FABSection from "../components/homePage/features&benefits";
import DecorSection from "../components/homePage/decorSection";
import WhatsSection from "../components/homePage/whatsNFT";


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
            <NavbarTwo switchTheme={switchTheme} />
            <IntroNew />
            <YWServices />
            <SecondSection sx={{
                mt: 10, pt: 10
            }}>
                <Box sx={{
                    px: { xs: '30px', sm: '60px' },
                    display: 'flex', flexDirection: 'column',
                }}>
                    <FABSection />
                    <DecorSection />
                    <WhatsSection />
                </Box>
                <Footer />
            </SecondSection>
        </Homme>
    );
}

export default Home;