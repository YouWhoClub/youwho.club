import { Box } from "@mui/material";
import CustomSlider from "../customSlider";
import GiftCard from "../nft market/giftCard";
import { Link } from "react-router-dom";
import heart from '../../assets/heart.png'
import gheart from '../../assets/greenHeart.png'
import bheart from '../../assets/blueHeart.png'
import prheart from '../../assets/pinkRedHeart.png'
import ppheart from '../../assets/purpleHeart.png'
import gryheart from '../../assets/grayHeart.png'
import orngheart from '../../assets/orangeheart.png'
import NFTCard from "../nft market/nftCard";

const PublicGalleryHome = () => {
    return (<Box sx={{
        height: '100vh',
        bgcolor: 'primary.ultra',
        display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        <h5 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }} >Most Popular NFTs</h5>
        <CustomSlider>
            <NFTCard image={heart}/>
            <NFTCard image={gheart}/>
            <NFTCard image={ppheart}/>
            <NFTCard image={prheart}/>
            <NFTCard image={bheart}/>
            <NFTCard image={gryheart}/>
            <NFTCard image={orngheart}/>
        </CustomSlider>
        <Link to={'/public-gallery'} style={{ color: '#90888C', textAlign: 'center', textDecoration: 'none', marginTop: '30px' }}>
            visit public gallery
        </Link>
    </Box>
    );
}

export default PublicGalleryHome;