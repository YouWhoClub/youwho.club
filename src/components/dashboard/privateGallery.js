import { Box } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap',justifyContent:'center'
}))


const PrivateGallery = () => {
    return (<Gallery>
        <NFTCard image={blueNft} />
        <NFTCard image={pinkNFT} />
        <NFTCard image={purpleNFT} />
        <NFTCard image={creamNFT} />
        <NFTCard image={sorkhabiNFT} />
        <NFTCard image={torqNFT} />
    </Gallery>);
}

export default PrivateGallery;