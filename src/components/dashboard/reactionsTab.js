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
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


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
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center'
}))

const ReactionsTab = () => {
    const globalUser = useSelector(state => state.userReducer)

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
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexDirection: { xs: 'column', lg: 'row' }, gap: '15px', mb: 5
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
                </>
                :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '32px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.mail}
                                &nbsp;
                            </b>
                            to communicate and do activities , you must create your YouWho wallet First
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box>
    );
}

export default ReactionsTab;