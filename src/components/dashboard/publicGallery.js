import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import FilterSelection from '../filterSelection'
import { useState } from 'react'
import { AscSelect } from '../utils'

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'
}))


const PublicGallery = () => {
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


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                <FilterSelection width={'280px'} tabs={['bla', 'bla', 'bla']}
                    text={'Filter'} id={'filter-public-gallery'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                <FilterSelection width={'280px'} tabs={['date', 'added to my collection', 'favorites']}
                    text={'Sort By'} id={'sort-public-gallery'} handleSelect={handleSortSelect} selectValue={sortValue} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                <FilterSelection handleSelect={handleCatSelect} width={'280px'} tabs={['art', 'pink', 'bla', 'animal']}
                    text={'Category'} id={'category-public-gallery'} selectValue={categoryValue} />
                <AscSelect asc={asc} id={'asc-public-gallery'} width={'280px'} setAsc={setAsc} />
            </Box>

            <Gallery>
                <NFTCard image={blueNft} />
                <NFTCard image={pinkNFT} />
                <NFTCard image={purpleNFT} />
                <NFTCard image={creamNFT} />
                <NFTCard image={sorkhabiNFT} />
                <NFTCard image={torqNFT} />
            </Gallery>
        </Box>);
}

export default PublicGallery;