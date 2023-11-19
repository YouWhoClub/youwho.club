import { Box, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import { useState } from "react";
import { AscSelect, RelationCard } from "../utils";
import { useSelector } from "react-redux";
import CollectionCard from "../nft market/collectionCard";

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


const PrivateGallery = () => {
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

    const [expandedColl, setExpandedColl] = useState(undefined)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' }, mb: '32px' }}>
                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                    NFT Collections
                </Typography>
                <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                    You Can See All Collections With Their NFTs which You Have Created.
                    You & Your Friends Can Mint Any NFT You Like.
                </Typography>
            </FlexColumn>

            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                <FilterSelection width={'280px'} tabs={['bla', 'bla', 'bla']}
                    text={'Filter'} id={'filter-private-gallery'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                <FilterSelection width={'280px'} tabs={['date', 'added to my collection', 'favorites']}
                    text={'Sort By'} id={'sort-private-gallery'} handleSelect={handleSortSelect} selectValue={sortValue} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                <FilterSelection handleSelect={handleCatSelect} width={'280px'} tabs={['art', 'pink', 'bla', 'animal']}
                    text={'Category'} id={'category-private-gallery'} selectValue={categoryValue} />
                <AscSelect asc={asc} width={'280px'} setAsc={setAsc} />
            </Box> */}
            <Gallery>
                <CollectionCard image={blueNft} likes={0} name={'Blue Collection'} setExpandedId={setExpandedColl} id={'blueCol'} expanded={expandedColl == 'blueCol'}/>
                <CollectionCard image={pinkNFT} likes={1} name={'Pink Collection'} setExpandedId={setExpandedColl} id={'pinkCol'} expanded={expandedColl == 'pinkCol'}/>
                <CollectionCard image={purpleNFT} likes={0} name={'Purple Collection'} setExpandedId={setExpandedColl} id={'purpleCol'} expanded={expandedColl == 'purpleCol'}/>
                <CollectionCard image={creamNFT} likes={4} name={'Sorkhabi Collection'} setExpandedId={setExpandedColl} id={'creamCol'} expanded={expandedColl == 'creamCol'}/>
                <CollectionCard image={sorkhabiNFT} likes={0} name={'Cream Collection'} setExpandedId={setExpandedColl} id={'sorkhabiCol'} expanded={expandedColl == 'sorkhabiCol'}/>
                <CollectionCard image={torqNFT} likes={0} name={'Turquoise Collection'} setExpandedId={setExpandedColl} id={'torqCol'} expanded={expandedColl == 'torqCol'}/>
            </Gallery>
        </Box >
    );
}

export default PrivateGallery;