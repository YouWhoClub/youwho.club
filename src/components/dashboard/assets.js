import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import FilterSelection from "../filterSelection";
import { AscSelect, SubTab, SubTabs } from "../utils";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NFTAssetCard from "../nft market/nftAssetCard";
import { API_CONFIG } from '../../config'
import NFTOnchainCard from "../nft market/nftOnchainCard";
import Pagination from "../pagination";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import OffChainAssetGallery from "./offChainAssetGallery";



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


const AssetsTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [asc, setAsc] = useState(true)
    const navigate = useNavigate()
    const [oncahinNfts, setOncahinNfts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [expandedColl, setExpandedColl] = useState(undefined)
    const [expandedNFT, setExpandedNFT] = useState(undefined)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)


    const handleFilterSelect = (e) => {
        e.preventDefault()
        setFilterValue(e.target.id)
    }
    const handleCatSelect = (e) => {
        e.preventDefault()
        setCategoryValue(e.target.id)
    }
    const handleSortSelect = (e) => {
        e.preventDefault()
        setSortValue(e.target.id)
    }

    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (globalUser.YouWhoID) {
            getUserOncahinNfts()
        }
    }, [globalUser.YouWhoID, globalUser.token])

    const getUserOncahinNfts = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/get/all/onchain/for/${globalUser.YouWhoID}/?from=${from}&to=${to}`, {
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
            setOncahinNfts(nftsArr)
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
        getUserOncahinNfts()
    }, [to])
    const [activeTab, setActiveTab] = useState('on-chain-artworks')

    return (
        <Box sx={{
            width: '100%',
            // maxWidth: '1000px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '24px'
        }}>
            {globalUser.cid ?
                <>
                    {
                        loading ? <CircularProgress /> :
                            <>
                                {/* <SubTabs jc={'center'} mb={'24px'}>
                                    <SubTab id={"off-chain-artworks"} onClick={(e) => setActiveTab(e.target.id)} text={'off-chain Artworks'} selected={activeTab == 'off-chain-artworks'} />
                                    <SubTab id={"on-chain-artworks"} onClick={(e) => setActiveTab(e.target.id)} text={'on-chain Artworks'} selected={activeTab == 'on-chain-artworks'} />
                                </SubTabs> */}

                                {/* <FlexColumn sx={{ gap: '15px' }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
                                flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                            }}>
                                <FilterSelection width={'280px'} tabs={['bla', 'bla', 'bla']}
                                    text={'Filter'} id={'filter-others-assets'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                                <FilterSelection width={'280px'} tabs={['date', 'added to my collection', 'favorites']}
                                    text={'Sort By'} id={'sort-others-assets'} handleSelect={handleSortSelect} selectValue={sortValue} />
                            </Box>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
                                flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                            }}>
                                <FilterSelection handleSelect={handleCatSelect} width={'280px'} tabs={['art', 'pink', 'bla', 'animal']}
                                    text={'Category'} id={'category-others-assets'} selectValue={categoryValue} />
                                <AscSelect asc={asc} id={'asc-others-assets'} width={'280px'} setAsc={setAsc} />
                            </Box>
                        </FlexColumn> */}
                                {activeTab == 'off-chain-artworks' ? <OffChainAssetGallery />
                                    : <>
                                        <Gallery
                                            sx={{ justifyContent: { xs: 'center', sm: 'center' } }}
                                        >
                                            {
                                                oncahinNfts &&
                                                oncahinNfts.map((nft, index) => {
                                                    return (
                                                        <Fragment key={`collection_${nft.nfts_data.onchain_id}`}>
                                                            <NFTAssetCard getAssets={getUserOncahinNfts} nft={nft.nfts_data} col_data={nft.col_data} />
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                            {oncahinNfts && oncahinNfts.length > 0 ?
                                                undefined :
                                                <Typography
                                                    sx={{
                                                        color: 'primary.text', width: '100%', textAlign: 'center',
                                                        fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize'
                                                    }}>
                                                    No NFTs Found
                                                </Typography>
                                            }

                                        </Gallery>
                                        {oncahinNfts && oncahinNfts.length > 0 ?
                                            <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                                            : undefined}
                                    </>}
                            </>
                    }
                </>
                :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.mail}
                                &nbsp;
                            </b>
                            to see your on-chain assets in youwho platform , you must create a youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }
        </Box>
    )
}

export default AssetsTab;