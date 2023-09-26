import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Intro from "../components/HomePage/Intro";
import GiftSlides from "../components/HomePage/giftSlides";
import PublicGalleryHome from "../components/HomePage/publicGallery";
import Footer from "../components/Footer";
import Navigation from "../components/HomePage/navigation";

const Home = ({ switchTheme, theme }) => {
    return (
        <>
            <Navbar switchTheme={switchTheme} />
            <Intro theme={theme} />
            <Navigation />
            <GiftSlides />
            <PublicGalleryHome />
            <Footer />
        </>
    );
}

export default Home;