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
import { useSelector } from 'react-redux'

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'
}))


const PublicGallery = () => {
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
                <NFTCard image={sorkhabiNFT} creator={globalUser.username} price={5} likes={10} name={'Sorkhabi NFT'} />
                <NFTCard image={purpleNFT} creator={globalUser.username} price={5} likes={99} name={'Purple NFT'} />
                <NFTCard image={creamNFT} creator={'Afshin_joon'} price={15} likes={4} name={'Cream NFT'} />
                <NFTCard image={blueNft} creator={'wildonion'} price={5} likes={98} name={'Blue NFT'} />
                <NFTCard image={torqNFT} creator={'Piaze_vahshi'} price={20} likes={15} name={'Turquoise NFT'} />
                <NFTCard image={pinkNFT} creator={'Khosro'} price={50} likes={1} name={'Pink NFT'} />
            </Gallery>
        </Box>);
}

export default PublicGallery;