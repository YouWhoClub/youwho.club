import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Intro from "../components/HomePage/Intro";
import Footer from "../components/Footer";
import Navigation from "../components/HomePage/navigation";
import NFTSlides from "../components/HomePage/nftSlides";
import Middle from "../components/HomePage/middle";

const Home = ({ switchTheme, theme }) => {
    return (
        <>
            <Navbar switchTheme={switchTheme} />
            <Intro theme={theme} />
            <Navigation />
            <Middle/>
            <NFTSlides/>
            <Footer />
        </>
    );
}

export default Home;