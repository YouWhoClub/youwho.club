import { Fragment, useEffect, useState } from "react";
import { API_CONFIG } from "../../config";
import styled from "@emotion/styled";
import NFTAssetCard from "../nft market/nftAssetCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Pagination from "../pagination";
import ButtonPurpleLight from '../buttons/buttonPurpleLight'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '40px',
    borderRadius: '18px', width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow, "@media (max-width: 600px)": {
        padding: '8px',
        gap: '20px',
    },
}))
const AssetImage = styled(Box)(({ theme }) => ({
    height: '320px', flex: '1 0 0',
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.bg,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
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

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: "border-box", gap: '16px',
    display: 'flex', alignItems: 'center',
    flexWrap: 'wrap',
}))
const OffChainAssetGallery = ({ user, isFriend, sendFriendRequest, isFollowing }) => {
    const [artworks, setArtworks] = useState([])

    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)

    useEffect(() => {
        if (globalUser.YouWhoID) {
            getUserArtworks()
        }
    }, [globalUser.YouWhoID, globalUser.token])

    const getUserArtworks = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/get/all/onchain/for/${user.YouWhoID}/?from=${from}&to=${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response)
        if (response.is_error == false) {
            // setOncahinNfts(response.data.onchain_nfts)
            let nftsArr = response.data.onchain_nfts.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
            setArtworks(nftsArr)
            if (response.data.onchain_nfts.length >= 15) {
                let pagTabs = []
                let tabNums = response.data.onchain_nfts.length / 15
                for (let i = 0; i < tabNums; i++) {
                    pagTabs.push(i + 1)
                }
                setPgTabs(pagTabs)
                console.log(tabNums)
                console.log(pagTabs)
            } else {
                console.log('getting nfts !')
            }

            setLoading(false)
        }
    }
    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        getUserArtworks()
    }, [to])

    return (
        <>
            {isFriend && isFriend == 'true' ?
                <>
                    {
                        loading ? <CircularProgress /> :
                            <>
                                <Gallery
                                    sx={{ justifyContent: { xs: 'center', sm: 'center' } }}
                                >
                                    {
                                        artworks &&
                                        artworks.map((nft, index) => {
                                            return (
                                                <Fragment key={`collection_${nft.nfts_data.onchain_id}`}>
                                                    <NFTAssetCard getAssets={getUserArtworks} nft={nft.nfts_data} col_data={nft.col_data} />
                                                </Fragment>
                                            )
                                        })
                                    }
                                    {artworks && artworks.length > 0 ?
                                        undefined :
                                        <Typography
                                            sx={{
                                                color: 'primary.text', width: '100%', textAlign: 'center',
                                                fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize'
                                            }}>
                                            No Artwork Found
                                        </Typography>
                                    }

                                </Gallery>
                                {artworks && artworks.length > 0 ?
                                    <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                                    : undefined}

                            </>
                    }

                </>
                : isFriend && isFriend == 'false' ?
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.username}
                                &nbsp;
                            </b>
                            to see {user.username}'s private assets , you must be their friend first
                        </Typography>
                        {
                            <>
                                {isFollowing && isFollowing == 'false' &&
                                    <ButtonPurpleLight
                                        text={'Follow Request'} onClick={() => sendFriendRequest(user.YouWhoID, globalUser.cid)}
                                        w={'max-content'}
                                        px={'12px'}
                                        height='35px' />}
                                {isFollowing && isFollowing == 'pending' &&
                                    <buttonPurpleLight
                                        text={'Pending'} disabled={true}
                                        w={'max-content'}
                                        px={'12px'}
                                        height='35px' />}
                                {isFollowing && isFollowing == 'true' &&
                                    <ButtonPurpleLight
                                        text={`we're waiting for ${user.username} to follow you back`}
                                        disabled={true}
                                        w={'max-content'}
                                        px={'12px'}
                                        height='35px' />
                                }
                            </>

                        }
                    </FlexColumn> :
                    <CircularProgress />}
        </>);
}

export default OffChainAssetGallery;





