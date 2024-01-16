import { Box, Skeleton, Typography } from "@mui/material";
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
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../utils/data/public_api";

const NewestSlide = () => {
    const navigate = useNavigate()
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
            display: 'flex', justifyContent: 'center', flexDirection: 'column',
        }}>
            {NFTs ?
                <>
                    {NFTs.length > 0 ?
                        <CustomSlider slidesCount={6}>
                            {NFTs.map((nft) => (<NFTCardLanding nft={nft.nfts_data} image={nft.nfts_data.metadata_uri} />))}
                            <ViewMoreOrLogin link={globalUser.isLoggedIn ? '/gallery' : '/main-gallery'} />
                        </CustomSlider>
                        :
                        <Box sx={{ width: '100%', height: '180px', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ color: 'secondary.text', fontSize: '13px', textAlign: 'center', width: '100%' }}>
                                No NFTs Yet
                            </Typography>
                        </Box>
                    }
                </>
                :
                <CustomSlider slidesCount={6}>
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
                </CustomSlider>
            }
        </Box>
    )
}

export default NewestSlide;