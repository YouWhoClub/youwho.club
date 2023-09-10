import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Intro from "../components/HomePage/Intro";
import GiftSlides from "../components/HomePage/giftSlides";
import PublicGalleryHome from "../components/HomePage/publicGallery";

const Home = () => {
    return (
        <>
            <Intro />
            <GiftSlides />
            <PublicGalleryHome />
        </>
    );
}

export default Home;