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
import NFTCard from "../components/nft market/nftCard";

const GiftsScrollWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "flex", alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
    overflowY: 'scroll',
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

const PublicGallery = () => {
    return (<Box sx={{
        height: 'calc(100vh - 160px)',
        bgcolor: 'primary.bg',
        // pb: 5,
        pt: { xs: '180px', sm: '110px' },
        px: { xs: '10px', sm: '40px' },
        pb: '40px',
        display: "flex", justifyContent: 'center',
        color: 'primary.darkGray',
    }}>
        <GiftsScrollWrapper>
        <NFTCard image={heart}/>
            <NFTCard image={gheart}/>
            <NFTCard image={ppheart}/>
            <NFTCard image={prheart}/>
            <NFTCard image={bheart}/>
            <NFTCard image={gryheart}/>
            <NFTCard image={orngheart}/>
        </GiftsScrollWrapper>

    </Box>
    );
}

export default PublicGallery;