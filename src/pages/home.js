import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";
import YWServices from "../components/HomePage/yServices";
import IntroNew from "../components/HomePage/Intro";
import NavbarTwo from "../components/NavbarRadius";
import Footer from "../components/Footer";


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
                height: '100vh', mt: 10, justifyContent: 'end',
            }}>
                <Footer />
                <Typography sx={{ textAlign: 'center', color: 'primary.text' }}>Copyright © 2023 Youhwo.club. All Rights Reserved.</Typography>
            </SecondSection>
        </Homme>
    );
}

export default Home;