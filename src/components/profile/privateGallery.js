import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import FilterSelection from '../filterSelection'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AscSelect, PVGalleryCard } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import ButtonPurple from '../buttons/buttonPurple'
import { useNavigate } from 'react-router'
import ButtonPurpleLight from '../buttons/buttonPurpleLight'
import { API_CONFIG } from '../../config'
import CollectionCard from '../nft market/collectionCard'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import generateSignature from '../../utils/signatureUtils'
import { getuser } from '../../redux/actions'

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


const PrivateGallery = ({ user, isFriend, sendFriendRequest, isFollowing }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [galleries, setGalleries] = useState([])
    const [galleriesLoading, setGalleriesLoading] = useState(true)
    const [galleryCollsLoading, setGalleryCollsLoading] = useState(true)
    const [cancelToken, setCancelToken] = useState(null);
    const [openedGallery, setOpenedGallery] = useState(undefined)
    const [openedGalleryCollections, setOpenedGalleryCollections] = useState(undefined)
    const dispatch = useDispatch();
    const [err, setErr] = useState(undefined)
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const [expandedColl, setExpandedColl] = useState(undefined)
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const shorten = (str) => {
        if (str)
            return str.length > 15 ? str.substring(0, 15) + '...' : str;
        return 'undefined'
    }
    const getUserPVGalleries = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/for/${user.YouWhoID}/?from=0&to=10`, {
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
            setGalleriesLoading(false)
        } else {
            setErr(response.message)
            console.log(response)
        }
    }
    const exitGallery = async (caller, galleryId) => {
        loading();

        let data = {
            caller_cid: caller,
            gal_id: galleryId,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/exit`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);
        if (response.message == "Updated Successfully") {
            updateToast(true, 'You Left The Gallery')
            getUserPVGalleries()
        } else {
            updateToast(false, response.message)
        }
    }
    useEffect(() => {
        if (globalUser.isLoggedIn && globalUser.token && isFriend && user && isFriend == 'true') {
            getUserPVGalleries()
        }
    }, [globalUser.isLoggedIn, globalUser.token, isFriend, user])
    const getGallCollections = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/firends-view/get/all/private/in-gallery/${openedGallery.id}/for/${user.YouWhoID}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response, '97777')
        if (response.is_error == false) {
            let tempGall = openedGallery
            tempGall.collections = response.data
            setOpenedGallery(tempGall)
            setOpenedGalleryCollections(response.data)
            setGalleryCollsLoading(false)
        } else {
            setErr(response.message)
            console.log(response)
        }
    }

    useEffect(() => {
        if (openedGallery && isFriend && isFriend == 'true') {
            getGallCollections()
        }
    }, [openedGallery, isFriend])

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '900px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            {err ?
                <Typography sx={{ color: 'primary.err', textTransform: 'capitalize' }}>
                    {err}
                </Typography> :
                <>
                    {isFriend && isFriend == 'true' ?
                        <FlexColumn sx={{ gap: { xs: '20px', sm: '24px' }, width: '100%' }}>
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
                                                        exitGallery={exitGallery}
                                                        galleryIndex={index}
                                                        getUserPVGalleries={getUserPVGalleries}
                                                        gallery={gallery}
                                                        galleryId={gallery.id}
                                                        isMine={false}
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
                                                You Can See All Collections With Their NFTs which {user.username} Has Created in this gallery.
                                                You & their Friends Can Mint Any NFT You Like.
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
                        </FlexColumn>
                        : isFriend && isFriend == 'false' ?
                            <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                                    Dear
                                    <b>
                                        &nbsp;
                                        {globalUser.username}
                                        &nbsp;
                                    </b>
                                    to see {user.username}'s private galleries , you must be their friend first
                                </Typography>
                                {
                                    <>
                                        {isFollowing && isFollowing == 'false' &&
                                            <ButtonPurpleLight
                                                text={'Request Friendship'} onClick={() => sendFriendRequest(user.YouWhoID, globalUser.cid)}
                                                w={'max-content'}
                                                px={'12px'}
                                                height='35px' />}
                                        {isFollowing && isFollowing == 'pending' &&
                                            <ButtonPurpleLight
                                                text={'Pending'} disabled={true}
                                                w={'max-content'}
                                                px={'12px'}
                                                height='35px' />}
                                        {isFollowing && isFollowing == 'true' &&
                                            <ButtonPurpleLight
                                                text={`we're waiting for ${user.username} to follow you back`}
                                                disabled={true}
                                                w={'max-content'}
                                                px={'12px'}
                                                height='35px' />
                                        }
                                    </>

                                }
                            </FlexColumn> :
                            <CircularProgress />
                    }
                </>
            }
        </Box>);
}

export default PrivateGallery;