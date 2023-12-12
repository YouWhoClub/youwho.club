import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import NFTSellCard from "../nft market/nftSellCard";
import FilterSelection from '../filterSelection'
import { useEffect, useState, Fragment } from 'react'
import { AscSelect, SubTabs, SubTab } from '../utils'
import { useSelector } from 'react-redux'
import ButtonPurple from '../buttons/buttonPurple'
import { useNavigate } from 'react-router'
import ButtonPurpleLight from '../buttons/buttonPurpleLight'
import { API_CONFIG } from '../../config'
import CollectionCard from '../nft market/collectionCard'

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
    const [activeTab, setActiveTab] = useState('minted-NFTs')
    const [publicCollections, setPublicCollections] = useState(null)
    const [listedNFTs, setListedNFTs] = useState(null)
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
    const navigate = useNavigate()

    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
    }, [])

    useEffect(() => {
        getUserPublicCollection()
    }, [globalUser, globalUser.token])

    const getUserPublicCollection = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/get/all/for/${globalUser.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        if (response.is_error == false) {
            setPublicCollections(response.data)

            const nfts = response.data.reduce((results, collection) => [...results, ...collection.nfts], []);
            const listed = nfts.filter((nft) => {
                if (nft.is_listed) {
                    return true;
                }
                return false;
            })
            setListedNFTs(listed)

            setLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <SubTabs jc={'center'} mb={'24px'}>
                        <SubTab id={"minted-NFTs"} onClick={(e) => setActiveTab(e.target.id)} text={'Minted NFTs'} selected={activeTab == 'minted-NFTs'} />
                        <SubTab id={"sales-list"} onClick={(e) => setActiveTab(e.target.id)} text={'Sales List'} selected={activeTab == 'sales-list'} />
                    </SubTabs>
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

                    {
                        (activeTab == 'minted-NFTs') ?
                            <Gallery sx={{ mt: 5 }}>
                                {
                                    publicCollections &&
                                    publicCollections.map(collection => {
                                        if (!collection.nfts.every(nft => nft.is_listed)) {
                                            return (
                                                <Fragment key={`collection_${collection.id}`}>
                                                    <CollectionCard
                                                        setActiveTab={setActiveTab}
                                                        likes={0}
                                                        setExpandedId={setExpandedColl}
                                                        collection={collection}
                                                        expanded={expandedColl == collection.id}
                                                        action={'sell'}
                                                    />
                                                </Fragment>
                                            )
                                        }
                                    })
                                }
                            </Gallery>
                            :
                            <Gallery sx={{ mt: 5 }}>
                                {
                                    listedNFTs &&
                                    listedNFTs.map(nft => {
                                        return (
                                            <Fragment key={`collection_${nft.id}`}>
                                                <NFTSellCard
                                                    setActiveTab={setActiveTab}
                                                    nft={nft}
                                                    setExpandedId={setExpandedNFT}
                                                    expanded={expandedNFT == nft.id}
                                                />
                                            </Fragment>
                                        )
                                    })
                                }
                            </Gallery>
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
                            to create private or public galleries in youwho platform , you must create a youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box>);
}

export default PublicGallery;