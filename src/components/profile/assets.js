import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import { AscSelect } from "../utils";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
// import NFTAssetCard from "../nft market/nftAssetCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { API_CONFIG } from '../../config'
import NFTOnchainCard from "../nft market/nftOnchainCard";
import NFTAssetCard from "../nft market/nftAssetCard";


const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '40px',
    borderRadius: '18px', width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
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

const OthersProfieAssetTab = ({ user }) => {

    const globalUser = useSelector(state => state.userReducer)
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [asc, setAsc] = useState(true)
    const [oncahinNfts, setOncahinNfts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [expandedColl, setExpandedColl] = useState(undefined)
    const [expandedNFT, setExpandedNFT] = useState(undefined)


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
        if (user.YouWhoID) {
            getUserOncahinNfts()
        }
    }, [user.YouWhoID, globalUser.token])

    const getUserOncahinNfts = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/get/all/onchain/for/${user.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response)
        if (response.is_error == false) {
            setOncahinNfts(response.data.onchain_nfts)

            setLoading(false)
        }
    }





    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '24px' }}>
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
            <Gallery
                sx={{ mt: { xs: 1, sm: 5 }, justifyContent: { xs: 'center', sm: 'start' } }}
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
                        sx={{ color: 'primary.text', width: '100%', textAlign: 'center', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        No NFTs Found
                    </Typography>}

            </Gallery>
        </Box>
    );
}

export default OthersProfieAssetTab;