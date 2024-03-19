import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../utils/data/public_api";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { getuser } from "../redux/actions";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { API_CONFIG } from "../config";
import { AddComment, ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import { ArrowDown2, ArrowUp2, Heart, HeartRemove } from "iconsax-react";
import { CommentInput, NFTCommentCard } from "../components/utils";
import ywHugIcon from '../assets/Y-HUG-COIN.svg'
import ButtonPurple from "../components/buttons/buttonPurple";
import ButtonOutline from "../components/buttons/buttonOutline";
import generateSignature from "../utils/signatureUtils";


const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '22px',
    // borderRadius: '18px',
    width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
    "@media (max-width: 600px)": {
        padding: '8px',
        gap: '20px',
    },
}))
const Acc = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: '9px', width: '100%', height: '40px',
    alignItems: 'center', color: theme.palette.primary.gray,
    backgroundColor: theme.palette.secondary.bg,
    // boxShadow: theme.palette.primary.boxShadow,
    fontWeight: 500,
    cursor: "pointer",
}))
const NFTsColumn = styled(Box)(({ theme }) => ({
    gridTemplateColumns: '1fr 1fr',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '8px', gap: '8px 4px',
    borderRadius: '9px',
    backgroundColor: theme.palette.primary.gray,
    boxShadow: theme.palette.primary.boxShadow,
}))
const CollectionDetails = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    alignItems: 'start', gap: '8px',
    width: '100%',
}))
const OtherNFTCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.darkGray,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // width: '70px', height: '70px',
    width: '35px', height: '35px',
    aspectRatio: '1',
    borderRadius: '8px',
}))

const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    // height: '500px',
    borderRadius: '9px',
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    alignItems: 'center',
    color: theme.palette.primary.text,
    fontSize: '15px',
    fontWeight: '500'
}))
const NFTPropertyTag = styled(Box)(({ theme }) => ({
    display: 'flex', width: 'auto', padding: '4px 10px',
    justifyContent: 'center',
    alignItems: 'center', border: '1px solid #DEDEDE', borderRadius: '4px'
}))
const PropertyTagTitle = styled('span')(({ theme }) => ({
    fontSize: '10px', color: theme.palette.primary.text,
}))
const PropertyTagAnswer = styled('span')(({ theme }) => ({
    fontSize: '10px', color: theme.palette.secondary.text,
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    // height: '100px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))
const Button = styled('button')(({ theme, color }) => ({
    backgroundColor: 'transparent',
    padding: '8px 24px',
    outline: 'none',
    color: color,
    cursor: 'pointer',
    border: 'none',
    fontFamily: "Inter",
    fontSize: '12px',
}))

const CollectionSingle = ({ theme, switchTheme }) => {
    const [err, setErr] = useState(undefined)
    const params = useParams()
    const id = params.id
    const apiCall = useRef(null)
    const globalUser = useSelector(state => state.userReducer)
    const [collection, setCollection] = useState({})
    const [colDetExpanded, setColDetExpanded] = useState(true)
    const [NFTDetExpanded, setNFTDetExpanded] = useState(true)
    const [nfts, setNFTs] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState(0)
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
    const [selectedNFTData, setSelectedNFTData] = useState(collection.nfts ? collection.nfts[0] : undefined)
    const toastId = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const [mintButtonDisabled, setMintButtonDisabled] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [commentContent, setCommentContent] = useState(undefined)
    const [royaltyShare, setRoyaltyShare] = useState(undefined)
    const [isTransferred, setIsTransferred] = useState(false)
    const [amount, setAmount] = useState(undefined)
    const navigate = useNavigate()
    const getGasFee = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get-gas-fee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            setAmount(response.data)
        } else {
            console.log(response.message)
        }
    }

    const buyNFt = async () => {
        loading();

        if (globalUser.privateKey) {
            let nftextra = nfts[selectedNFT].extra
            if (nftextra) {
                if (nftextra.length > 0) {
                    for (let i = 0; i < nftextra.length; i++) {
                        if (nftextra[i].is_transferred && nftextra[i].is_transferred == true) {

                        } else {
                            nftextra.push({ is_transferred: true })
                        }
                    }
                } else {
                    nftextra.push({ is_transferred: true })
                }
            } else {
                nftextra = []
                nftextra.push({ is_transferred: true })
            }
            console.log(nftextra)

            const data = {
                caller_cid: globalUser.cid,
                nft_id: nfts[selectedNFT].id,
                col_id: collection.id,
                amount: amount,
                event_type: "buy",
                buyer_screen_cid: globalUser.YouWhoID,
                contract_address: nfts[selectedNFT].contract_address,
                metadata_uri: nfts[selectedNFT].metadata_uri,
                current_owner_screen_cid: nfts[selectedNFT].current_owner_screen_cid,
                onchain_id: nfts[selectedNFT].onchain_id,
                is_minted: nfts[selectedNFT].is_minted,
                is_listed: nfts[selectedNFT].is_listed,
                nft_name: nfts[selectedNFT].nft_name,
                nft_description: nfts[selectedNFT].nft_description,
                current_price: nfts[selectedNFT].current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: nfts[selectedNFT].freeze_metadata,
                extra: nftextra,
                attributes: nfts[selectedNFT].attributes,
                comments: nfts[selectedNFT].comments,
                likes: nfts[selectedNFT].likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);
            console.log(requestData)
            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/buy`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                navigate("/profile/#assets-tab")
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    const getCollection = async () => {
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/collection/get/${id}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            console.log(response)
            setCollection(response.data.data)
            // setNFTs(response.data.data.nfts)
            setSelectedNFTData(response.data.data.nfts[selectedNFT])
        }
        catch (err) {
            if (err.status == 404) {
                setErr('no collection Found')
            } else if (err.status == 500) {
                setErr('error fetching collection , please try again later')
            }
        }

    }
    useEffect(() => {
        getCollection()
        getGasFee()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    useEffect(() => {
        if (collection) {
            getNFTimgs()
            getMetadata()
        }
    }, [collection])
    const loading = () => {
        toastId.current = toast.loading("This may take a while , Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const getMetadata = async () => {
        if (collection.nfts) {
            const nfts = collection.nfts
            // .filter((nft) => {
            //     if (nft.is_listed) {
            //         return false;
            //     }
            //     return true;
            // })
            Promise.all(
                nfts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((nft) =>
                    fetch(nft.metadata_uri.includes('::') ? nft.metadata_uri.split("::")[0].replace("ipfs://", "https://ipfs.io/ipfs/") : nft.metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
                        .then((response) => response.json())
                        .then((data) => ({ ...nft, metadata: data }))
                        .catch((error) => {
                            // Handle any fetch or parsing errors
                            console.error('Error fetching NFT image:', error);
                            return nft; // Keep the original NFT object if fetching fails
                        })
                )
            )
                .then((nftsWithMetadata) => {
                    console.log(nftsWithMetadata)
                    setNFTs(nftsWithMetadata);
                })
                .catch((error) => {
                    // Handle any Promise.all errors
                    console.error('Error fetching NFT images:', error);
                });
        }
    }
    const getNFTimgs = () => {
        if (collection.nfts) {
            const nfts = collection.nfts
            // .filter((nft) => {
            //     if (nft.is_listed) {
            //         return false;
            //     }
            //     return true;
            // })
            nfts.forEach(nft => {
                if (nft.metadata_uri.includes('::')) {
                    nft.serverImg = nft.metadata_uri.split("::")[1]
                    // console.log('-----', nft.serverImg)
                }
            });
        }
    }
    useEffect(() => {
        if (nfts)
            console.log(nfts)
    }, [])

    useEffect(() => {
        if (nfts[selectedNFT]) {
            for (let i = 0; i < nfts[selectedNFT].length; i++) {
                if (nfts[selectedNFT][i].is_transferred && nfts[selectedNFT][i].is_transferred == true) {
                    setIsTransferred(true)
                } else {
                    setIsTransferred(false)
                }
            }
        } else {
            setIsTransferred(false)
        }

    }, [nfts[selectedNFT]])
    const addReactionOnNFT = async (callerId, nftID, reactionType, commentContent, like, dislike) => {
        loading();
        if (globalUser.privateKey) {

            let data = {
                col_id: collection.id,
                caller_cid: callerId,
                nft_id: nftID,
                reaction_type: reactionType,
                comment_content: commentContent,
                is_like_upvote: like,
                is_like_downvote: dislike,

            }
            let { requestData } = generateSignature(globalUser.privateKey, data)
            // console.log(requestData)
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/add/reaction`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            // console.log('nft reaction', response);
            if (!response.is_error) {
                updateToast(true, `${reactionType} updated`)
                if (reactionType == 'comment') {
                    setCommentContent(undefined)
                }
                getCollection()
                // countNFTLikes()
                // if (like) {
                //     let tl = tempLikers
                //     tl.push(globalUser.YouWhoID)
                //     setTempLikers(tl)
                // }
            } else {
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const [tempLikers, setTempLikers] = useState([])
    const [collectionLikesCount, setCollectionLikesCount] = useState(undefined);
    useEffect(() => {
        let collectionLikes = 0
        if (collection.nfts && collection.nfts.length && collection.nfts.length > 0) {
            for (let l = 0; l < collection.nfts.length; l++) {
                if (collection.nfts[l].likes && collection.nfts[l].likes.length > 0 && collection.nfts[l].likes[0].upvoter_screen_cids) {
                    collectionLikes += parseInt(collection.nfts[l].likes[0].upvoter_screen_cids.length)
                }
            }
            // console.log(collectionLikes)
        }
        setCollectionLikesCount(collectionLikes)
    }, [collection])
    useEffect(() => {
        if (selectedNFTData)
            countNFTLikes()
    }, [selectedNFTData])
    const countNFTLikes = () => {
        let temp = []
        if (selectedNFTData) {
            if (selectedNFTData.likes && selectedNFTData.likes.length > 0 && selectedNFTData.likes[0].upvoter_screen_cids) {
                // console.log(selectedNFTData.likes)
                for (let i = 0; i < selectedNFTData.likes[0].upvoter_screen_cids.length; i++) {
                    temp.push(selectedNFTData.likes[0].upvoter_screen_cids[i].screen_cid)
                }
            }
        }
        setTempLikers(temp)
    }

    return (<Box sx={{
        bgcolor: 'primary.bg', display: "flex",
        flexDirection: 'column',
        color: 'primary.text', gap: '32px',
        alignItems: 'center'
    }}>
        <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
        {err ? <Typography sx={{ textTransform: 'capitalize', color: 'primary.error', my: '200px' }}>{err}</Typography> :
            <>             {!collection ? <Skeleton sx={{ borderRadius: '24px', }} width={'100%'} height={'300px'} /> :
                <Container id="col-pg-data" sx={{
                    borderRadius: { xs: '0', md: '18px' },
                    flexDirection: 'column',
                    width: '100%', maxWidth: '900px',
                    display: 'flex',
                    backgroundColor: 'secondary.bg',
                    boxSizing: 'border-box', flexDirection: { xs: 'column', md: 'column' },
                    padding: { xs: '10px', sm: '10px 12px 10px 12px' },

                }}>
                    {/* // details of collection and nft ===> */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '22px' }}>
                        {/* // details of collection ===> */}
                        <Box className="collection-details-of-collection-pg" sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                            <FlexRow justifyContent={'space-between'} sx={{}}>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                    {collection.col_name}
                                </Typography>
                                <FlexRow sx={{ width: 'max-content !important', ml: '8px' }}>
                                    <Heart size={'24px'} />&nbsp;
                                    <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                        {collectionLikesCount}
                                    </Typography>
                                </FlexRow>
                            </FlexRow>
                            {colDetExpanded ?
                                <CollectionDetails sx={{ transition: '500ms ease' }}>
                                    <FlexRow>Cover Image:&nbsp; <Box sx={{ background: `${BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${collection.collection_background}`))} no-repeat center`, backgroundSize: 'cover', width: '136px', height: '76px', borderRadius: '8px' }}></Box></FlexRow>
                                    <FlexRow>Creation Date:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{collection.created_at && collection.created_at.slice(0, 10)}</Typography></FlexRow>
                                    <FlexRow>Owner Address:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{collection.owner_screen_cid}</Typography></FlexRow>
                                    <FlexRow>Royalties:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{collection.royalties_address_screen_cid}</Typography></FlexRow>
                                    <FlexRow>Royalty Amount:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{Number(collection.royalties_share) / 100}</Typography></FlexRow>
                                    <FlexColumn sx={{ color: 'primary.text' }}>
                                        Collection Description:
                                        <Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>
                                            {collection.col_description}
                                        </Typography>
                                    </FlexColumn>
                                </CollectionDetails>
                                : undefined}
                            <Acc sx={(theme) => ({ boxShadow: theme.palette.primary.boxShadow })}
                                onClick={() => setColDetExpanded(!colDetExpanded)}>Collection Details &nbsp; {colDetExpanded ? <ArrowUp2 size='12px' /> : <ArrowDown2 size='12px' />}</Acc>
                        </Box>

                        {
                            nfts.length ?
                                <NFTsColumn sx={{
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                    width: '100%',
                                    height: 'auto', maxHeight: '94px',
                                    // display: { xs: 'flex', md: 'grid' }
                                    display: 'flex',
                                }}>
                                    {
                                        nfts.map((nft, index) => {
                                            const imageURL = (nft.metadata && nft.metadata.image) ? nft.metadata.image : ywHugIcon;
                                            const selected = index == selectedNFT;
                                            const srvrImgURL = nft.serverImg ? nft.serverImg : undefined
                                            return (
                                                <OtherNFTCard
                                                    key={nft.id}
                                                    onClick={() => {
                                                        setSelectedNFT(index)
                                                        setSelectedNFTData(nft)
                                                    }}
                                                    sx={{
                                                        // background: imageURL ? `url(${imageURL}) no-repeat center` : `url('${API_CONFIG.API_URL}/${ywHugIcon}') no-repeat center`,
                                                        background: srvrImgURL ? `url('${API_CONFIG.API_URL}/${srvrImgURL}') no-repeat center` : imageURL ? `url(${imageURL}) no-repeat center` : `url('${API_CONFIG.API_URL}/${ywHugIcon}') no-repeat center`,
                                                        cursor: "pointer",
                                                        border: () => (selected ? 'solid 2px' : 'none'),
                                                        borderColor: 'primary.main',
                                                        boxSizing: 'border-box'
                                                    }} />
                                            )
                                        })
                                    }
                                </NFTsColumn>
                                : <></>
                        }

                        {/* // image of nft ===> */}
                        {
                            nfts.length ?
                                <>
                                    <NFTImage
                                        sx={{
                                            height: { xs: '300px', md: '500px' },
                                            background: nfts[selectedNFT].serverImg ? `url('${API_CONFIG.API_URL}/${nfts[selectedNFT].serverImg}') no-repeat center` : '',
                                        }}
                                        id="nft-image-of-expanded-collection-card"
                                        className="nft-image-of-expanded-collection-card"
                                        component="img"
                                        src={(nfts[selectedNFT].metadata && nfts[selectedNFT].metadata.image) ? nfts[selectedNFT].metadata.image : nfts[selectedNFT].serverImg ? nfts[selectedNFT].serverImg : ywHugIcon}

                                    />
                                    {globalUser.isLoggedIn && !isTransferred && nfts[selectedNFT].is_listed == true && nfts[selectedNFT].current_owner_screen_cid !== globalUser.YouWhoID ?
                                        <ButtonPurple text={'buy'} w={'100%'} />
                                        : undefined}
                                    {/* // details of  nft ===> */}
                                    <Box className="nft-details-of-expanded-collection-card"
                                        sx={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                                        <FlexRow sx={{ justifyContent: 'space-between', mb: 4 }}>
                                            <ButtonOutline onClick={() => setSelectedNFT(prev => prev > 0 ? prev - 1 : prev)} fontSize='12px' text={'Previous NFT'} height='28px' prevIcon={<ArrowBack fontSize="14px" />} />
                                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '10px', sm: '12px' } }}>
                                                {`${selectedNFT + 1}th of ${nfts.length} NFTs`}
                                            </Typography>
                                            <ButtonOutline w={'max-content'} onClick={() => setSelectedNFT(prev => prev < nfts.length - 1 ? prev + 1 : prev)} fontSize='12px' text={'Next NFT'} height='28px' nextIcon={<ArrowForward fontSize="14px" />} />
                                        </FlexRow>
                                        <FlexRow justifyContent={'space-between'} sx={{ mb: '20px' }}>
                                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                                {nfts[selectedNFT].nft_name}
                                            </Typography>
                                            <FlexRow sx={{ width: 'auto !important', }}>
                                                {(tempLikers.includes(globalUser.YouWhoID)) ?
                                                    <HeartRemove variant="Bulk"
                                                        size={'24px'} cursor={'pointer'}
                                                        onClick={() => addReactionOnNFT(
                                                            globalUser.cid,
                                                            nfts[selectedNFT].id,
                                                            'dislike',
                                                            '',
                                                            false,
                                                            true)} />
                                                    : <Heart size={'24px'} cursor={'pointer'}
                                                        onClick={() => addReactionOnNFT(globalUser.cid,
                                                            nfts[selectedNFT].id, 'like', '', true, false)} />
                                                }
                                                &nbsp;
                                                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                                    {nfts[selectedNFT].likes && nfts[selectedNFT].likes.length > 0 && nfts[selectedNFT].likes[0].upvoter_screen_cids ? nfts[selectedNFT].likes[0].upvoter_screen_cids.length : 0}
                                                </Typography>
                                            </FlexRow>
                                        </FlexRow>
                                        {NFTDetExpanded ?
                                            <FlexColumn sx={{ gap: '8px' }}>
                                                <FlexRow>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Price : </Typography>
                                                    <Typography sx={{ color: 'primary.main', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].current_price}</Typography>
                                                </FlexRow>
                                                <FlexRow>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>Creation Date : </Typography>
                                                    <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].created_at.slice(0, 10)}</Typography>
                                                </FlexRow>
                                                <FlexRow>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '10px', sm: '14px' } }}>Current Owner : </Typography>
                                                    <Typography sx={{ color: 'primary.gray', fontSize: { xs: '8px', sm: '12px' } }}>&nbsp;{nfts[selectedNFT].current_owner_screen_cid}</Typography>
                                                </FlexRow>
                                                <FlexColumn>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Description : </Typography>
                                                    <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].nft_description}</Typography>
                                                </FlexColumn>
                                                <FlexColumn sx={{
                                                    borderTop: '1px solid #DEDEDE', borderBottom: '1px solid #DEDEDE',
                                                    py: { xs: '12px', sm: '16px' }, gap: '8px'
                                                }}>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                        {
                                                            nfts[selectedNFT].metadata &&
                                                            nfts[selectedNFT].metadata.attributes.map(attr => (
                                                                <NFTPropertyTag>
                                                                    <PropertyTagTitle>{attr.trait_type} : </PropertyTagTitle>
                                                                    <PropertyTagAnswer>{attr.value}</PropertyTagAnswer>
                                                                </NFTPropertyTag>
                                                            ))
                                                        }

                                                    </Box>
                                                </FlexColumn>
                                                <FlexColumn sx={{ gap: '8px' }}>
                                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>
                                                        Comments : {nfts[selectedNFT].comments && nfts[selectedNFT].comments.length > 0 ?
                                                            <span>(  <span style={{ color: '#5F5F5F' }}>{selectedCommentIndex + 1}th</span> / <span style={{ color: '#5F5F5F' }}>{nfts[selectedNFT].comments.length}</span> )</span>
                                                            : undefined}</Typography>

                                                    {
                                                        nfts[selectedNFT].comments && nfts[selectedNFT].comments.length > 0 ?
                                                            <FlexRow sx={{ gap: '12px', width: '100%', }}>

                                                                <NFTCommentCard username={nfts[selectedNFT].comments[selectedCommentIndex].owner_username}
                                                                    profileImg={nfts[selectedNFT].comments[selectedCommentIndex].owner_avatar}
                                                                    comment={nfts[selectedNFT].comments[selectedCommentIndex].content} />
                                                                <FlexColumn sx={{ alignItems: 'space-between !important', color: 'primary.text' }}>
                                                                    <ArrowUp2 size='16px' cursor='pointer'
                                                                        onClick={() => setSelectedCommentIndex(selectedCommentIndex > 0 ? selectedCommentIndex - 1 : selectedCommentIndex)} />
                                                                    <ArrowDown2 size='16px' cursor='pointer'
                                                                        onClick={() => setSelectedCommentIndex(selectedCommentIndex + 1 >= nfts[selectedNFT].comments.length ? selectedCommentIndex : selectedCommentIndex + 1)} />
                                                                </FlexColumn>
                                                            </FlexRow>
                                                            :
                                                            <Typography sx={{ textTransform: 'capitalize', fontSize: { xs: '12px', md: '14px' }, color: 'secondary.text' }}>
                                                                this NFT has no comments
                                                            </Typography>
                                                    }
                                                    {globalUser.isLoggedIn &&
                                                        <CommentInput
                                                            onChange={(e) => setCommentContent(e.target.value)}
                                                            value={commentContent}
                                                            h={'max-content'}
                                                            label={'Add A Comment'} width={'100%'}
                                                            icon={<AddComment sx={{ color: 'primary.light' }} />}
                                                            button={<ButtonPurple
                                                                disabled={commentContent == undefined}
                                                                height='20px'
                                                                onClick={commentContent == undefined ? undefined : () => addReactionOnNFT(
                                                                    globalUser.cid,
                                                                    nfts[selectedNFT].id,
                                                                    'comment',
                                                                    commentContent,
                                                                    false,
                                                                    false)}
                                                                text={'Send'}
                                                                br={'30px'}
                                                            />
                                                            } />
                                                    }
                                                </FlexColumn>


                                            </FlexColumn>
                                            : undefined}

                                    </Box>
                                </>
                                :
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '16px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                                        There are no public nfts in this collection.
                                    </Typography>

                                </Box>
                        }
                        <Acc sx={(theme) => ({ boxShadow: theme.palette.primary.boxShadowInset })}
                            onClick={() => setNFTDetExpanded(!NFTDetExpanded)}>
                            NFT Details &nbsp;
                            {NFTDetExpanded ?
                                <ArrowUp2 size='12px' />
                                :
                                <ArrowDown2 size='12px' />
                            }
                        </Acc>
                    </Box>
                </Container>
            }
            </>
        }
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        <Footer />

    </Box>);
}

export default CollectionSingle;