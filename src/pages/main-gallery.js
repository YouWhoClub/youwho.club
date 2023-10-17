import { Box } from "@mui/material";
import GiftCard from "../components/nft market/giftCard";
import styled from "@emotion/styled";
import heart from '../assets/heart.png'
import gheart from '../assets/greenHeart.png'
import bheart from '../assets/blueHeart.png'
import prheart from '../assets/pinkRedHeart.png'
import ppheart from '../assets/purpleHeart.png'
import gryheart from '../assets/grayHeart.png'
import orngheart from '../assets/orangeheart.png'
import blueNft from '../assets/blue-nft.svg'
import pinkNFT from '../assets/pink-nft.svg'
import purpleNFT from '../assets/purple-nft.svg'
import creamNFT from '../assets/cream-nft.svg'
import sorkhabiNFT from '../assets/sokhabi-nft.svg'
import torqNFT from '../assets/torqua-nft.svg'
import NFTCard from "../components/nft market/nftCard";
import Footer from "../components/Footer";
import NavbarTwo from "../components/NavbarRadius";

const GiftsScrollWrapper = styled(Box)(({ theme }) => ({
    // width: '100%',
    // height: '100%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center', flexWrap: 'wrap',
    // overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '8px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '8px',
        height: '8px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '3px',
        height: '3px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
}))

const ViewMainGalleryPage = ({ theme, switchTheme }) => {
    return (
        <Box sx={{
            bgcolor: 'primary.bg',
        }}>
            <Box sx={{
                // height: '100vh',
                // pb: 5,
                // pt: { xs: '180px', sm: '110px' },
                // px: { xs: '10px', sm: '40px' },
                // pb: '40px',
                display: "flex", alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'column',
                color: 'primary.text',
            }}>
                <NavbarTwo theme={theme} switchTheme={switchTheme} />
                <h4 style={{ margin: '30px 0' }}>EXPLORE YOUWHO MAIN GALLERY</h4>
                <GiftsScrollWrapper sx={{
                    mb: 5,
                }}>
                    <NFTCard image={heart} />
                    <NFTCard image={gheart} />
                    <NFTCard image={ppheart} />
                    <NFTCard image={prheart} />
                    <NFTCard image={bheart} />
                    <NFTCard image={gryheart} />
                    <NFTCard image={orngheart} />
                    <NFTCard image={blueNft} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={torqNFT} />
                    <NFTCard image={ppheart} />
                    <NFTCard image={blueNft} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={heart} />
                    <NFTCard image={gheart} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={ppheart} />
                    <NFTCard image={prheart} />
                    <NFTCard image={bheart} />
                    <NFTCard image={orngheart} />
                    <NFTCard image={heart} />
                    <NFTCard image={gheart} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={prheart} />
                    <NFTCard image={torqNFT} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={bheart} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={prheart} />
                    <NFTCard image={bheart} />
                    <NFTCard image={gryheart} />
                    <NFTCard image={orngheart} />
                    <NFTCard image={blueNft} />
                    <NFTCard image={gryheart} />
                    <NFTCard image={heart} />
                    <NFTCard image={gheart} />
                    <NFTCard image={ppheart} />
                    <NFTCard image={prheart} />
                    <NFTCard image={bheart} />
                    <NFTCard image={gryheart} />
                    <NFTCard image={orngheart} />
                    <NFTCard image={heart} />
                    <NFTCard image={gheart} />
                    <NFTCard image={ppheart} />
                    <NFTCard image={gryheart} />
                    <NFTCard image={torqNFT} />
                    <NFTCard image={orngheart} />
                </GiftsScrollWrapper>
            </Box>
            <Footer />
        </Box>

    );
}

export default ViewMainGalleryPage;