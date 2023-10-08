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

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'
}))

const MainGallery = ({ switchTheme }) => {
    return (
        <PanelLayout switchTheme={switchTheme}>

            <Box sx={{
                bgcolor: 'primary.bg',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: 'calc(100% - 80px)' }, color: 'primary.text'
            }}>
                <h4>EXPLORE YOUWHO MAIN GALLERY</h4>
                <Gallery>
                <NFTCard image={blueNft} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={torqNFT} />
                    <NFTCard image={blueNft} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={torqNFT} />
                    <NFTCard image={blueNft} />
                    <NFTCard image={pinkNFT} />
                    <NFTCard image={purpleNFT} />
                    <NFTCard image={creamNFT} />
                    <NFTCard image={sorkhabiNFT} />
                    <NFTCard image={torqNFT} />
                </Gallery>
            </Box>
        </PanelLayout>

    );
}

export default MainGallery;