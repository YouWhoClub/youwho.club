import { Box, Skeleton, Typography } from "@mui/material";
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
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../utils/data/public_api";

const GiftsScrollWrapper = styled(Box)(({ theme }) => ({
    // width: '100%',
    // height: '100%',
    display: "flex",
    columnGap: '10px',
    rowGap: '24px',
    flexWrap: 'wrap',
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
const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    position: 'relative',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const ViewMainGalleryPage = ({ theme, switchTheme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [NFTs, setNFTs] = useState(undefined)
    const getMainNFTs = async () => {
        setErr(undefined)
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-all-minted-nfts/?from=0&to=11`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            setNFTs(response.data.data)
        }
        catch (err) {
            setErr(err.statusText)
        }
    }

    useEffect(() => {
        getMainNFTs()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])


    return (
        <Box sx={{
            bgcolor: 'secondary.bg', display: "flex",
            flexDirection: 'column',
            color: 'primary.text', gap: '32px'

        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Typography variant="h3" sx={{
                fontSize: { xs: '20px', md: '32px' }, textAlign: 'center', width: '100%',
                color: 'primary.text', textTransform: 'capitalize'
            }}>explore YouWho main Gallery</Typography>
            <GiftsScrollWrapper sx={{
                justifyContent: { xs: 'center', lg: 'start' },
                boxSizing: 'border-box', px: '30px'
            }}>
                {NFTs ?
                    <>
                        {NFTs.length > 0 ?
                            <>
                                {NFTs.map((nft) => (<NFTCard getNFTs={getMainNFTs} nft={nft.nfts_data} col_data={nft.col_data} />
                                ))}
                            </>
                            :
                            <Box sx={{ width: '100%', height: '180px', display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: 'secondary.text', fontSize: '13px', textAlign: 'center', width: '100%' }}>
                                    No NFTs Yet
                                </Typography>
                            </Box>
                        }
                    </>
                    :
                    <>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                        <Box sx={{ width: '200px', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Skeleton sx={{ borderRadius: '16px', }} width={'200px'} height={'180px'} />
                        </Box>
                    </>
                }
            </GiftsScrollWrapper>
            <Footer />
        </Box>
    );
}

export default ViewMainGalleryPage;