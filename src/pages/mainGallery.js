import { Box } from "@mui/material";
import Bar from "../components/Bar";
import PanelLayout from "../components/PanelLayout";
import blueNft from '../assets/blue-nft.svg'
import pinkNFT from '../assets/pink-nft.svg'
import purpleNFT from '../assets/purple-nft.svg'
import creamNFT from '../assets/cream-nft.svg'
import sorkhabiNFT from '../assets/sokhabi-nft.svg'
import torqNFT from '../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import NFTCard from "../components/nft market/nftCard";
import GiftCard from "../components/nft market/giftCard";
import { useState } from "react";
// import { Title } from "../components/utils";
import ButtonOutline from "../components/buttons/buttonOutline";
import { useNavigate } from "react-router";

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
    // height: '100%',
    // overflowX: 'hidden',
    // overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '8px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },

}))
const Outer = styled(Box)(({ theme }) => ({
    // height: 'calc(100vh - 55px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

const MainGallery = ({ switchTheme, theme }) => {
    const [dollarValue, setDollarValue] = useState(undefined)
    const [irrValue, setIrrValue] = useState(undefined)
    const navigate = useNavigate()

    return (
        <PanelLayout switchTheme={switchTheme} theme={theme}>

            <Outer sx={{
                bgcolor: 'primary.bg',
                // width: { xs: '100%', sm: 'calc(100% - 80px)' },
                color: 'primary.text',
                width: { xs: 'calc(100% - 30px)', sm: 'calc(100% - 80px)' },
                pr: { xs: 'none', sm: '15px', md: '30px' },
                pl: { xs: 'none', sm: '90px' },
            }}>
                {/* <h4>YOUWHO GIFT CARDS</h4>
                <Gallery>
                    <GiftCard price={5} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
                    <GiftCard price={10} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
                    <GiftCard price={25} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
                    <GiftCard price={50} sender={true} dollarValue={dollarValue ? dollarValue : '...'} irrValue={irrValue} />
                </Gallery>
                <Box sx={{ mt: 2, mb: 5 }}>
                    <ButtonOutline text={'view all'} onClick={() => navigate('/transfer')} />
                </Box> */}

                <h4>EXPLORE YOUWHO MAIN GALLERY</h4>
                <Gallery>
                    <NFTCard image={blueNft} name={'Blue NFT'} creator={'Amir'} price={9} likes={104} />
                    <NFTCard image={pinkNFT} name={'Pink NFT'} creator={'Naarin'} price={50} likes={199} />
                    <NFTCard image={purpleNFT} name={'Purple NFT'} creator={'Wildonion'} price={109} likes={13} />
                    <NFTCard image={creamNFT} name={'Cream NFT'} creator={'Ramin'} price={5} likes={7} />
                    <NFTCard image={sorkhabiNFT} name={'Sorkhabi NFT'} creator={'Negin'} price={3} likes={9} />
                    <NFTCard image={torqNFT} name={'Turquoise NFT'} creator={'Javad'} price={9} likes={0} />
                    <NFTCard image={blueNft} name={'Blue NFT'} creator={'Shayan'} price={11} likes={11} />
                    <NFTCard image={pinkNFT} name={'Pink NFT'} creator={'Fateme'} price={45} likes={3} />
                    <NFTCard image={blueNft} name={'Blue NFT'} creator={'Amir'} price={25} likes={54} />
                    <NFTCard image={pinkNFT} name={'Pink NFT'} creator={'Naarin'} price={5} likes={7778} />
                    <NFTCard image={purpleNFT} name={'Colorful NFT'} creator={'Wildonion'} price={5} likes={938} />
                    <NFTCard image={creamNFT} name={'Cream NFT'} creator={'Ramin'} price={5} likes={9} />
                    <NFTCard image={sorkhabiNFT} name={'Sorkhabi'} creator={'Negin'} price={5} likes={38} />
                    <NFTCard image={torqNFT} name={'aaabiiiii'} creator={'Javad'} price={24} likes={10} />
                    <NFTCard image={blueNft} name={'abiii porangggg'} creator={'Shayan'} price={115} likes={107} />
                    <NFTCard image={pinkNFT} name={'Colorful NFT'} creator={'Fateme'} price={100} likes={113} />
                    <NFTCard image={purpleNFT} name={'Colorful NFT'} creator={'Amir'} price={90} likes={203} />
                    <NFTCard image={creamNFT} name={'light'} creator={'Amir'} price={59} likes={43} />
                    <NFTCard image={sorkhabiNFT} name={'Colorful NFT 2'} creator={'Amir'} price={12} likes={5} />
                </Gallery>
            </Outer>
        </PanelLayout>

    );
}

export default MainGallery;