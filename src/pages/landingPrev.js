import { Box } from "@mui/material";
import NavbarTransparent from "../components/NavbarTransparent";
import Intro from "../components/HomePagePrev/Intro";
import Footer from "../components/FooterPrev";
import Navigation from "../components/HomePagePrev/navigation";
import NFTSlides from "../components/HomePagePrev/nftSlides";
import Middle from "../components/HomePagePrev/middle";
import Compliment from "../components/HomePagePrev/compliment";
import styled from "@emotion/styled";
const Homme = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.bgGradient,
    // display:'flex',flexDirection:'column',
    // width:'100%'
}))

const LandingPrev = ({ switchTheme, theme }) => {
    return (
        <Homme>
            <NavbarTransparent switchTheme={switchTheme} />
            <Intro theme={theme} />
            <Navigation />
            <Middle />
            <Compliment />
            <NFTSlides />
            <Footer />
        </Homme>
    );
}

export default LandingPrev;