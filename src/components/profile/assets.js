import styled from "@emotion/styled";
import { Box } from "@mui/material";
import FilterSelection from "../filterSelection";
import { AscSelect } from "../utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
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
const OthersProfieAssetTab = ({ user }) => {
    const globalUser = useSelector(state => state.userReducer)

    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [asc, setAsc] = useState(true)
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
    const navigate = useNavigate()


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '32px' }}>
            <FlexColumn sx={{ gap: '15px' }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',flexWrap:'wrap',
                    flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                }}>
                    <FilterSelection width={'280px'} tabs={['bla', 'bla', 'bla']}
                        text={'Filter'} id={'filter-others-assets'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                    <FilterSelection width={'280px'} tabs={['date', 'added to my collection', 'favorites']}
                        text={'Sort By'} id={'sort-others-assets'} handleSelect={handleSortSelect} selectValue={sortValue} />
                </Box>
                <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',flexWrap:'wrap',
                    flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                }}>
                    <FilterSelection handleSelect={handleCatSelect} width={'280px'} tabs={['art', 'pink', 'bla', 'animal']}
                        text={'Category'} id={'category-others-assets'} selectValue={categoryValue} />
                    <AscSelect asc={asc} id={'asc-others-assets'} width={'280px'} setAsc={setAsc} />
                </Box>
            </FlexColumn>
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
                rowGap: '24px', columnGap: '10px'
            }}>
                <NFTAssetCard />
                <NFTAssetCard />
                <NFTAssetCard />
                <NFTAssetCard />
                <NFTAssetCard />
            </Box>
        </Box>
    );
}

export default OthersProfieAssetTab;