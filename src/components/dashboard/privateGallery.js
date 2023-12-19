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
import { Fragment, useEffect, useState } from "react";
import { AscSelect, RelationCard, MyInput, PVGalleryCard } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import CollectionCard from "../nft market/collectionCard";
import { API_CONFIG } from "../../config";
import ButtonPurple from "../buttons/buttonPurple";
import { useNavigate } from "react-router";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { getuser, setPrivateKey } from "../../redux/actions";
import { ArrowBack } from "@mui/icons-material";




const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: "border-box", gap: '16px',
    display: 'flex', alignItems: 'center',
    flexWrap: 'wrap',
    //  justifyContent: 'center'
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
    boxShadow: theme.palette.primary.boxShadow
}))


const PrivateGallery = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [asc, setAsc] = useState(true)
    const [galleries, setGalleries] = useState([])
    const [galleryloading, setgalleryLoading] = useState(true)
    const [loadErr, setLoadErr] = useState(undefined)
    const dispatch = useDispatch();
    const [signer, setSigner] = useState(undefined)
    const [openedGallery, setOpenedGallery] = useState(undefined)
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));

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
        fetchUser(globalUser.token)
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);

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
        console.log(response, '966666')
        if (response.is_error == false) {
            setGalleries(response.data)
            setgalleryLoading(false)
        }
    }
    const navigate = useNavigate()


    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '24px' }}>
            {globalUser.cid ?
                <>
                    {galleryloading ? <CircularProgress /> :
                        globalUser.privateKey ?
                            <>
                                {openedGallery ? undefined : <>
                                    <Typography sx={{ color: 'secondary.text', textAlign: 'center', fontSize: { xs: '12px', sm: '12px' } }}>
                                        only friends joined by invitation link or by paying entrance fee will be able to view the desired gallery
                                    </Typography>
                                    <Gallery>
                                        {
                                            galleries.map((gallery, index) => (
                                                <Fragment key={`gallery_${gallery.id}`}>
                                                    <PVGalleryCard
                                                        galleryIndex={index}
                                                        gallery={gallery}
                                                        galleryId={gallery.id}
                                                        isMine={true}
                                                        title={gallery.gal_name} image={gallery.gallery_background}
                                                        openGalleryClick={() => setOpenedGallery(gallery)}
                                                    />
                                                </Fragment>
                                            )
                                            )
                                        }

                                    </Gallery>
                                </>}
                                {openedGallery ?
                                    <>
                                        <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' }, mb: '32px', width: '100%' }}>
                                            <FlexRow
                                                sx={{ width: '100%', justifyContent: 'start !important', cursor: 'pointer' }}
                                                onClick={() => setOpenedGallery(undefined)}>
                                                <ArrowBack sx={{ color: 'primary.gray', fontSize: '15px' }} />
                                                <Typography sx={{ color: 'primary.gray', fontSize: '12px' }}>Back</Typography>
                                            </FlexRow>
                                            <Typography sx={{ width: '100%', textAlign: 'center', color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                                {openedGallery.gal_name}
                                            </Typography>
                                            <Typography sx={{
                                                textAlign: 'center', width: '100%',
                                                color: 'secondary.text', textTransform: 'capitalize',
                                                fontSize: { xs: '12px', sm: '12px' }
                                            }}>
                                                You Can See All Collections With Their NFTs which You Have Created in this gallery.
                                                You & Your Friends Can Mint Any NFT You Like.
                                            </Typography>
                                        </FlexColumn>
                                        <Gallery>
                                            {openedGallery.collections.length > 0 ?
                                                <>
                                                    {
                                                        openedGallery.collections.map(collection => (
                                                            <Fragment key={`collection_${collection.id}`}>
                                                                <CollectionCard
                                                                    action={'mint'}
                                                                    likes={0}
                                                                    setExpandedId={setExpandedColl}
                                                                    collection={collection}
                                                                    expanded={expandedColl == collection.id}
                                                                />
                                                            </Fragment>
                                                        )
                                                        )
                                                    }
                                                </> :
                                                <Typography sx={{
                                                    color: 'primary.text', textTransform: 'capitalize',
                                                    fontSize: { xs: '14px', sm: '16px' }, width: '100%', textAlign: 'center'
                                                }}>
                                                    this gallery has no collections yet
                                                </Typography>

                                            }
                                        </Gallery>
                                    </> : undefined
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