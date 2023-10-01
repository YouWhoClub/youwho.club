import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Intro from "../components/HomePage/Intro";
import Footer from "../components/Footer";
import Navigation from "../components/HomePage/navigation";
import NFTSlides from "../components/HomePage/nftSlides";
import Middle from "../components/HomePage/middle";
import Compliment from "../components/HomePage/compliment";
import styled from "@emotion/styled";
const Homme = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.bgGradient,
    // display:'flex',flexDirection:'column',
    // width:'100%'
}))

const Home = ({ switchTheme, theme }) => {
    return (
        <Homme>
            <Navbar switchTheme={switchTheme} />
            <Intro theme={theme} />
            <Navigation />
            <Middle />
            <Compliment />
            <NFTSlides />
            <Footer />
        </Homme>
    );
}

export default Home;