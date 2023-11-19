import { Box, TextField, Typography } from "@mui/material";
import { ReactionCard, RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useState } from "react";
import FilterSelection from "../filterSelection";


const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))

const ReactionsTab = () => {
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const handleFilterSelect = (e) => {
        e.preventDefault()
        setFilterValue(e.target.id)
    }
    const handleSortSelect = (e) => {
        e.preventDefault()
        setSortValue(e.target.id)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexDirection: { xs: 'column', md: 'row' }, gap: '15px', mb: 5
            }}>
                <FilterSelection width={'280px'} tabs={['like', 'comment', 'offer']}
                    text={'Filter'} id={'filter-private-gallery'} handleSelect={handleFilterSelect} selectValue={filterValue} />
                <FilterSelection width={'280px'} tabs={['date-time', 'my artworks', 'favorites']}
                    text={'Sort By'} id={'sort-private-gallery'} handleSelect={handleSortSelect} selectValue={sortValue} />
            </Box>
            <Box sx={{ display: 'flex', width: '100%', gap: '15px', flexDirection: 'column' }}>
                <ReactionCard nftImage={purpleNFT} username={'Farhad'} action={'comment'} active={'Farhad'} passive={'you'} nftName={'Purple NFT'} date={'10.9.2012 12:03AM'} />
                <ReactionCard nftImage={blueNft} username={'Khosro'} action={'like'} active={'You'} passive={'Khosro'} nftName={'Blue NFT'} date={'10.9.2012 12:03AM'} />
                <ReactionCard nftImage={pinkNFT} username={'Shirin'} action={'like'} active={'Shirin'} passive={'you'} nftName={'Pink NFT'} date={'10.9.2012 12:03AM'} />
                <ReactionCard nftImage={torqNFT} username={'Tequilla__'} action={'comment'} active={'You'} passive={'Tequilla__'} nftName={'Turquoise NFT'} date={'10.9.2012 12:03AM'} />
            </Box>
        </Box>
    );
}

export default ReactionsTab;