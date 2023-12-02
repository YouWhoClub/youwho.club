import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import FilterSelection from '../filterSelection'
import { useState } from 'react'
import { AscSelect } from '../utils'
import { useSelector } from 'react-redux'
import ButtonPurple from '../buttons/buttonPurple'
import { useNavigate } from 'react-router'
import ButtonPurpleLight from '../buttons/buttonPurpleLight'

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: "border-box", gap: '16px',
    display: 'flex', alignItems: 'center',
    flexWrap: 'wrap', justifyContent: 'center'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    //  width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    //  width: '100%',
    alignItems: 'center',
}))


const PrivateGallery = ({ user }) => {
    const globalUser = useSelector(state => state.userReducer)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {user.username}'s private gallery
        </Box>);
}

export default PrivateGallery;