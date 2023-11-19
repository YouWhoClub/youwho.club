import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import { useEffect, useState } from "react";
import { AscSelect, RelationCard } from "../utils";
import { useSelector } from "react-redux";
import CollectionCard from "../nft market/collectionCard";
import { API_CONFIG } from "../../config";
import ButtonPurple from "../buttons/buttonPurple";
import { useNavigate } from "react-router";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";

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
    const [galleries, setGalleries] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadErr, setLoadErr] = useState(undefined)
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

    useEffect(() => {
        getUserPVGalleries()
    }, [globalUser, globalUser.token])
    const getUserPVGalleries = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        if (response.is_error == false) {
            setGalleries(response.data)
            setLoading(false)
        }
    }
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    {loading ? <CircularProgress /> :
                        <>
                            {/* {galleries && galleries.length > 0 ?
                                <> */}
                            <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' }, mb: '32px' }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    NFT Collections
                                </Typography>
                                <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                    You Can See All Collections With Their NFTs which You Have Created.
                                    You & Your Friends Can Mint Any NFT You Like.
                                </Typography>
                            </FlexColumn>
                            <Gallery>
                                <CollectionCard image={blueNft} likes={0} name={'Blue Collection'} setExpandedId={setExpandedColl} id={'blueCol'} expanded={expandedColl == 'blueCol'} />
                                <CollectionCard image={pinkNFT} likes={1} name={'Pink Collection'} setExpandedId={setExpandedColl} id={'pinkCol'} expanded={expandedColl == 'pinkCol'} />
                                <CollectionCard image={purpleNFT} likes={0} name={'Purple Collection'} setExpandedId={setExpandedColl} id={'purpleCol'} expanded={expandedColl == 'purpleCol'} />
                                <CollectionCard image={creamNFT} likes={4} name={'Sorkhabi Collection'} setExpandedId={setExpandedColl} id={'creamCol'} expanded={expandedColl == 'creamCol'} />
                                <CollectionCard image={sorkhabiNFT} likes={0} name={'Cream Collection'} setExpandedId={setExpandedColl} id={'sorkhabiCol'} expanded={expandedColl == 'sorkhabiCol'} />
                                <CollectionCard image={torqNFT} likes={0} name={'Turquoise Collection'} setExpandedId={setExpandedColl} id={'torqCol'} expanded={expandedColl == 'torqCol'} />
                            </Gallery>
                            {/* </>
                                :
                                <>
                                    <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' }, mb: '32px' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                            No Galleries
                                        </Typography>
                                        <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                            you have not created any private gallery yet
                                        </Typography>
                                    </FlexColumn>
                                    <FlexColumn sx={{ gap: '6px', }}>
                                        <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                            create one ?
                                        </Typography>
                                        <ButtonPurpleLight text={'Create'} height='35px' />

                                    </FlexColumn>

                                </>
                            } */}
                        </>
                    }
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

        </Box >
    );
}

export default PrivateGallery;