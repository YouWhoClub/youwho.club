import { Box } from "@mui/material";
import CustomSlider from "../customSlider";
import GiftCard from "../nft market/giftCard";
import { Link, useNavigate } from "react-router-dom";
import heart from '../../assets/heart.png'
import gheart from '../../assets/greenHeart.png'
import bheart from '../../assets/blueHeart.png'
import prheart from '../../assets/pinkRedHeart.png'
import ppheart from '../../assets/purpleHeart.png'
import gryheart from '../../assets/grayHeart.png'
import orngheart from '../../assets/orangeheart.png'
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'

import NFTCard from "../nft market/nftCard";
import ButtonOutline from "../buttons/buttonOutline";

const GalleySlide = () => {
    const navigate = useNavigate()

    return (<Box sx={{
        // height: '100vh',
        // bgcolor: 'primary.bg',
        display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        {/* <h5 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }} >Most Popular NFTs</h5> */}
        <CustomSlider>
            <NFTCard image={blueNft} />
            <NFTCard image={pinkNFT} />
            <NFTCard image={creamNFT} />
            <NFTCard image={purpleNFT} />
            <NFTCard image={sorkhabiNFT} />
            <NFTCard image={torqNFT} />
            <NFTCard image={heart} />
            <NFTCard image={gheart} />
            <NFTCard image={ppheart} />
            <NFTCard image={prheart} />
            <NFTCard image={bheart} />
            <NFTCard image={gryheart} />
            <NFTCard image={orngheart} />
        </CustomSlider>
        <Box sx={{
            display: 'flex', justifyContent: 'center', width:'100%',mt:5
        }}>
            <ButtonOutline text={'view all'} w={'100%'} onClick={() => navigate('/gallery')} />
        </Box>
    </Box>
    );
}

export default GalleySlide;