import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import FilterSelection from '../filterSelection'
import { Fragment, useEffect, useState } from 'react'
import { AscSelect, MyInput, SubTab, SubTabs } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import ButtonPurple from '../buttons/buttonPurple'
import { useNavigate } from 'react-router'
import ButtonPurpleLight from '../buttons/buttonPurpleLight'
import { API_CONFIG } from '../../config'
import CollectionCard from '../nft market/collectionCard'
import NFTBuyCard from '../nft market/nftBuyCard'
import { setPrivateKey } from '../../redux/actions'

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: "border-box", gap: '16px',
    display: 'flex', alignItems: 'center',
    flexWrap: 'wrap',
    // justifyContent: 'center'
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
const Container = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow,
    "@media (max-width: 600px)": {
        padding: '8px',
        gap: '20px',
    },
}))



const PublicGallery = ({ user }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [expandedColl, setExpandedColl] = useState(undefined)
    const [expandedNFT, setExpandedNFT] = useState(undefined)
    const [activeTab, setActiveTab] = useState('minted-NFTs')
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [asc, setAsc] = useState(true)
    const [publicCollections, setPublicCollections] = useState(null)
    const [listedNFTs, setListedNFTs] = useState(null)
    const [userPublicCollectionsLoading, setUserPublicCollectionsLoading] = useState(true)
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
    const dispatch = useDispatch();
    const [signer, setSigner] = useState(undefined)
    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }


    const getUserPublicCollection = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/get/all/for/${user.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response)
        if (response.is_error == false) {
            setPublicCollections(response.data)


            // function returnNFTwColId(collection) {
            //     collection.forEach(nft => {
            //         return { nft: nft, col_id: collection.id }
            //     });
            // }

            // const nfts = response.data.reduce((results, collection) => [...results, ...collection.nfts], []);
            const nfts = response.data.reduce((results, collection) => {
                const colNNFTs = collection.nfts.map(nft => {
                    nft.col_id = collection.id
                    return nft
                })
                return [...results, ...colNNFTs]
            }, [])


            const listed = nfts.filter((nft) => {
                if (nft.is_listed) {
                    return true;
                }
                return false;
            })
            console.log(nfts)
            console.log(listed)
            setListedNFTs(listed)

            setUserPublicCollectionsLoading(false)
        }
    }
    useEffect(() => {
        getUserPublicCollection()
    }, [globalUser, globalUser.token])


    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: { xs: '22px', md: '26px' }
        }}>
            {globalUser.cid ?
                <>
                    {userPublicCollectionsLoading ? <CircularProgress /> :
                        globalUser.privateKey ?
                            <>
                                <SubTabs jc={'center'} mb={'24px'}>
                                    <SubTab id={"minted-NFTs"} onClick={(e) => setActiveTab(e.target.id)} text={'Minted NFTs'} selected={activeTab == 'minted-NFTs'} />
                                    <SubTab id={"sales-list"} onClick={(e) => setActiveTab(e.target.id)} text={'Sales List'} selected={activeTab == 'sales-list'} />
                                </SubTabs>
                                {/* <FlexColumn sx={{ gap: '15px' }}>
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
                                </FlexColumn> */}
                                {
                                    activeTab == 'minted-NFTs' &&
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '12px'
                                    }} >
                                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' }, textTransform: 'capitalize' }}>
                                            {user.username}'s Public NFT Collections
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text', textTransform: 'capitalize',
                                            fontSize: { xs: '12px', sm: '14px' }
                                        }}>
                                            You can see {user.username}'s minted NFTs and their collections in This tab
                                        </Typography>
                                    </Box>
                                }
                                {
                                    activeTab == 'sales-list' &&
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '12px'
                                    }} >
                                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' }, textTransform: 'capitalize' }}>
                                            {user.username}'s Listed NFTs
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text', textTransform: 'capitalize',
                                            fontSize: { xs: '12px', sm: '14px' }
                                        }}>
                                            You can see {user.username}'s NFTs that are for sale
                                        </Typography>
                                    </Box>
                                }

                                {
                                    (activeTab == 'minted-NFTs') ?
                                        <Gallery sx={{ my: 5, justifyContent: { xs: 'center', lg: 'start' } }}>
                                            {
                                                publicCollections &&
                                                publicCollections.map(collection => {
                                                    if (!collection.nfts.every(nft => nft.is_listed)) {
                                                        return (
                                                            <Fragment key={`collection_${collection.id}`}>
                                                                <CollectionCard
                                                                    setActiveTab={setActiveTab}
                                                                    // likes={0}
                                                                    getUserPVGalleries={getUserPublicCollection}
                                                                    pTab={'public'}
                                                                    isMine={false}
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
                                            {publicCollections && publicCollections.length > 0 ?
                                                undefined :
                                                <Typography
                                                    sx={{
                                                        my: 4,
                                                        color: 'primary.text',
                                                        fontSize: { xs: '12px', sm: '14px' },
                                                        textTransform: 'capitalize', textAlign: 'center', width: '100%'
                                                    }}>
                                                    No Collection Found
                                                </Typography>}
                                        </Gallery>
                                        :
                                        <Gallery sx={{ my: 5, justifyContent: { xs: 'center', lg: 'start' } }}>
                                            {
                                                listedNFTs &&
                                                listedNFTs.map(nft => {
                                                    return (
                                                        <Fragment key={`collection_${nft.id}`}>
                                                            <NFTBuyCard
                                                                getUserGalleries={getUserPublicCollection}
                                                                setActiveTab={setActiveTab}
                                                                nft={nft}
                                                                setExpandedId={setExpandedNFT}
                                                                expanded={expandedNFT == nft.id}
                                                            />
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                            {listedNFTs && listedNFTs.length > 0 ?
                                                undefined :
                                                <Typography
                                                    sx={{
                                                        my: 4,
                                                        color: 'primary.text',
                                                        fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize',
                                                        textAlign: 'center', width: '100%'
                                                    }}>
                                                    No NFTs Listed
                                                </Typography>}

                                        </Gallery>
                                }
                            </>
                            :
                            <Container sx={{ mb: '32px' }}>
                                <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                                    We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                                </Typography>
                                <MyInput
                                    value={signer}
                                    onChange={(e) => setSigner(e.target.value)}
                                    placeholder="enter private key"
                                    width={'100%'}
                                    textColor={'black'}
                                    py={'8px'} />
                                <ButtonPurple onClick={savePrivateKey} height='35px' text={'Save'} />
                            </Container>
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
                            to see others private or public galleries in youwho platform , you must create a youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box >);
}

export default PublicGallery;