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
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <FlexColumn sx={{ gap: '15px' }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                        }}>
                            <FilterSelection width={'280px'} tabs={['bla', 'bla', 'bla']}
                                text={'Filter'} id={'filter-public-gallery'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                            <FilterSelection width={'280px'} tabs={['date', 'added to my collection', 'favorites']}
                                text={'Sort By'} id={'sort-public-gallery'} handleSelect={handleSortSelect} selectValue={sortValue} />
                        </Box>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            flexDirection: { xs: 'column', md: 'row' }, gap: '15px'
                        }}>
                            <FilterSelection handleSelect={handleCatSelect} width={'280px'} tabs={['art', 'pink', 'bla', 'animal']}
                                text={'Category'} id={'category-public-gallery'} selectValue={categoryValue} />
                            <AscSelect asc={asc} id={'asc-public-gallery'} width={'280px'} setAsc={setAsc} />
                        </Box>
                    </FlexColumn>

                    <Gallery sx={{ mt: 5 }}>
                        <NFTCard image={sorkhabiNFT} creator={globalUser.username} price={5} likes={10} name={'Sorkhabi NFT'} />
                        <NFTCard image={purpleNFT} creator={globalUser.username} price={5} likes={99} name={'Purple NFT'} />
                        <NFTCard image={creamNFT} creator={'Afshin_joon'} price={15} likes={4} name={'Cream NFT'} />
                        <NFTCard image={blueNft} creator={'wildonion'} price={5} likes={98} name={'Blue NFT'} />
                        <NFTCard image={torqNFT} creator={'Piaze_vahshi'} price={20} likes={15} name={'Turquoise NFT'} />
                        <NFTCard image={pinkNFT} creator={'Khosro'} price={50} likes={1} name={'Pink NFT'} />
                    </Gallery>
                </>
                :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '32px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.username}
                                &nbsp;
                            </b>
                            to create private or public galleries in youwho platform , you must create a youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box>);
}

export default PublicGallery;