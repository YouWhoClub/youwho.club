import { Box, Typography } from "@mui/material";
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
import NFTCardLanding from "../nft market/nftCardLanding";
import ViewMoreOrLogin from "../nft market/viewMoreCard";
import { useSelector } from "react-redux";
import ButtonPurple from "../buttons/buttonPurple";

const NewestSlide = () => {
    const navigate = useNavigate()
    const globalUser = useSelector(state => state.userReducer)

    return (<Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
        <CustomSlider slidesCount={6}>
            <NFTCardLanding image={gheart} />
            <NFTCardLanding image={ppheart} />
            <NFTCardLanding image={heart} />
            <NFTCardLanding image={torqNFT} />
            <NFTCardLanding image={pinkNFT} />
            <NFTCardLanding image={purpleNFT} />
            <NFTCardLanding image={blueNft} />
            <NFTCardLanding image={sorkhabiNFT} />
            <NFTCardLanding image={creamNFT} />
            <ViewMoreOrLogin link={globalUser.isLoggedIn ? '/gallery' : '/main-gallery'} />
        </CustomSlider>


        {/* {globalUser.isLoggedIn ?
            <Box sx={{
                display: 'flex', color: 'primary.text',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: '100%', my: 5
            }}>
                <ButtonPurple text={'View All'} onClick={() => navigate('/gallery')} px={'10px'} />
            </Box>
            :
            <Box sx={{
                display: 'flex', color: 'primary.text',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: '100%', my: 5
            }}>
                <Typography variant="p" sx={{ textAlign: 'center', mb: '30px' }}>
                    To See More NFTs, Gift Cards, Mint, Sell and Buy NFTs, ...Enter Your Panel But You Must Login/Signup First.
                </Typography>
                <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth')} px={'10px'} />
            </Box>
        } */}


    </Box>
    );
}

export default NewestSlide;