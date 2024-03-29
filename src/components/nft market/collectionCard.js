import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography, Modal, List } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowDown2, ArrowUp2, Heart, More, Coin, Money, HeartRemove } from "iconsax-react";
import { useEffect, useState, useRef } from "react";
import ButtonPurple from "../buttons/buttonPurple";
import tempPic from '../../assets/bgDots.svg'
import tempNFT from '../../assets/youwho-hugcoin.svg'
import ButtonOutline from "../buttons/buttonOutline";
import { AddBoxOutlined, AddComment, AddReaction, ArrowBack, ArrowForward, ArrowLeft, ArrowRight, ArrowUpward, Close, CommentOutlined, DescriptionOutlined, LinkOutlined, Percent, Title } from "@mui/icons-material";
import { NFTCommentCard, MyInput, ButtonInput, BetweenTwoSelection, CommentInput } from "../utils";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { API_CONFIG } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import generateSignature from "../../utils/signatureUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ywHugIcon from '../../assets/Y-HUG-COIN.svg'
import { getuser } from "../../redux/actions";
// import { Box, CircularProgress, ClickAwayListener, MenuItem, Modal, Popper, TextField, Typography, inputBaseClasses, inputLabelClasses } from "@mui/material"



const Card = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '8px',
    flexDirection: 'column',
    // justifyContent: '',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '16px',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
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
const CollectionImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '200px', height: '144px',
    borderRadius: '8px',
    '&:hover': {
        backgroundImage: BG_URL(PUBLIC_URL(`${tempPic}`))
    }

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

const CollectionCard = ({ isMine, pTab, link, gallId, expanded, setExpandedId, collection, action, setActiveTab, getUserPVGalleries }) => {
    const { id, col_name, collection_background, created_at, owner_screen_cid, royalties_address_screen_cid, col_description, extra, freeze_metadata, base_uri, royalties_share, } = collection
    const [colDetExpanded, setColDetExpanded] = useState(true)
    const [NFTDetExpanded, setNFTDetExpanded] = useState(true)
    const globalUser = useSelector(state => state.userReducer)
    const [nfts, setNFTs] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState(0)
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
    const [selectedNFTData, setSelectedNFTData] = useState(collection.nfts ? collection.nfts[0] : undefined)
    const [isHovered, setIsHovered] = useState(false);
    const toastId = useRef(null);
    const [amount, setAmount] = useState(0)
    const [NFTPrice, setNFTPrice] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [openTransferModal, setOpenTransferModal] = useState(false)
    const [TransferTo, setTransferTo] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const [mintButtonDisabled, setMintButtonDisabled] = useState(false)
    const [updateCollButtonDisabled, setUpdateCollButtonDisabled] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [commentContent, setCommentContent] = useState(undefined)
    const [royaltyShare, setRoyaltyShare] = useState(royalties_share)
    const [collectionForm, setCollectionForm] = useState({
        col_name: collection.col_name,
        collection_id: id,
        gallery_id: gallId,
        freeze_metadata: freeze_metadata, //*
        nfts: collection.nfts,
        amount: 0,
        owner_cid: globalUser.cid,
        base_uri: base_uri, // *
        royalties_share: parseFloat(royalties_share) / 100, // *
        royalties_address_screen_cid: royalties_address_screen_cid,
        extra: extra,
        col_description: col_description,
    })
    const handleColFormChange = (e) => {
        if (e.target.type == 'number') {
            if (e.target.name == 'royalties_share') {
                setRoyaltyShare(Number(Number(e.target.value) * 100))
                setCollectionForm(prev => ({
                    ...prev,
                    [e.target.name]: Number(e.target.value)
                }))
            } else {
                setCollectionForm(prev => ({
                    ...prev,
                    [e.target.name]: Number(e.target.value)
                }))
            }
        }
        else {
            setCollectionForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }
    const handleClick = (event) => {
        if (!open)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }
    useEffect(() => {
        getNFTimgs()
        getMetadata()
        getGasFee()
    }, [])
    const loading = () => {
        toastId.current = toast.loading("This may take a while , Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const getMetadata = async () => {
        if (collection.nfts) {
            const nfts = collection.nfts.filter((nft) => {
                if (nft.is_listed) {
                    return false;
                }
                return true;
            })
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
                    // console.log(nftsWithMetadata)
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
            const nfts = collection.nfts.filter((nft) => {
                if (nft.is_listed) {
                    return false;
                }
                return true;
            })
            nfts.forEach(nft => {
                if (nft.metadata_uri.includes('::')) {
                    nft.serverImg = nft.metadata_uri.split("::")[1]
                    // console.log('-----', nft.serverImg)
                }
            });
        }
    }
    const getGasFee = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get-gas-fee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        // console.log(response)

        if (!response.is_error) {
            setAmount(response.data)
            setCollectionForm(prev => ({ ...prev, amount: response.data }))
        } else {
            console.log(response.message)
        }
    }
    const handleCancel = () => {
        setOpenModal(false)
        setNFTPrice(null)
    }
    const handleTransferCancel = () => {
        setOpenTransferModal(false)
        setTransferTo(null)
    }
    const mintNFT = async () => {
        loading();
        setMintButtonDisabled(true)
        if (globalUser.privateKey) {
            const nft = nfts[selectedNFT]
            let nftextra = nft.extra
            if (nftextra) {
                if (nftextra.length > 0) {
                    for (let i = 0; i < nftextra.length; i++) {
                        if (nftextra[i].is_transferred && nftextra[i].is_transferred == true) {

                        } else {
                            if (owner_screen_cid == globalUser.YouWhoID) {

                            } else {
                                nftextra.push({ is_transferred: true })
                            }
                        }
                    }
                } else {
                    nftextra.push({ is_transferred: true })

                }

            } else {
                nftextra = []
                if (owner_screen_cid == globalUser.YouWhoID) {

                } else {
                    nftextra.push({ is_transferred: true })
                }
            }


            const data = {
                caller_cid: globalUser.cid,
                nft_id: nft.id,
                col_id: collection.id,
                amount: amount,
                event_type: "mint",
                buyer_screen_cid: null,
                contract_address: nft.contract_address,
                metadata_uri: nft.metadata_uri,
                current_owner_screen_cid: nft.current_owner_screen_cid,
                onchain_id: nft.onchain_id,
                is_minted: nft.is_minted,
                is_listed: nft.is_listed,
                nft_name: nft.nft_name,
                nft_description: nft.nft_description,
                current_price: nft.current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: nft.freeze_metadata,
                extra: nftextra,
                attributes: nft.attributes,
                comments: nft.comments,
                likes: nft.likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);
            // sending the request
            // console.log(requestData)
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/mint`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            // console.log(response);
            setTimeout(() => {
                updateToast(true, 'minted !')
                getUserPVGalleries()
                fetchUser(globalUser.token)
            }, 60000);
            if (!response.is_error) {
                updateToast(true, response.message)
                fetchUser(globalUser.token)
                setMintButtonDisabled(true)
                getUserPVGalleries()
            } else {
                console.error(response.message)
                updateToast(false, response.message)
                setMintButtonDisabled(false)

            }
        } else {
            updateToast(false, 'please save your private key first')
            setMintButtonDisabled(false)
        }
    }
    const sellNFT = async () => {
        loading();

        if (globalUser.privateKey) {
            const nft = nfts[selectedNFT]

            const data = {
                caller_cid: globalUser.cid,
                nft_id: nft.id,
                col_id: collection.id,
                amount: amount,
                event_type: "sell",
                buyer_screen_cid: null,
                contract_address: nft.contract_address,
                metadata_uri: nft.metadata_uri,
                current_owner_screen_cid: nft.current_owner_screen_cid,
                onchain_id: nft.onchain_id,
                is_minted: nft.is_minted,
                is_listed: nft.is_listed,
                nft_name: nft.nft_name,
                nft_description: nft.nft_description,
                current_price: NFTPrice, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: nft.freeze_metadata,
                extra: nft.extra,
                attributes: nft.attributes,
                comments: nft.comments,
                likes: nft.likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/update`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            // console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                setActiveTab("sales-list")
                fetchUser(globalUser.token)

            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const Transfer = async () => {
        loading();

        if (globalUser.privateKey) {
            const nft = nfts[selectedNFT]
            let nftextra = nft.extra
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

            const data = {
                caller_cid: globalUser.cid,
                transfer_to_screen_cid: TransferTo,
                col_id: collection.id,
                nft_id: nft.id,
                amount: amount,
                event_type: "transfer",
                buyer_screen_cid: null,
                contract_address: nft.contract_address,
                metadata_uri: nft.metadata_uri,
                current_owner_screen_cid: nft.current_owner_screen_cid,
                onchain_id: nft.onchain_id,
                is_minted: nft.is_minted,
                is_listed: nft.is_listed,
                nft_name: nft.nft_name,
                nft_description: nft.nft_description,
                current_price: nft.current_price,
                freeze_metadata: nft.freeze_metadata,
                extra: nftextra,
                attributes: nft.attributes,
                comments: nft.comments,
                likes: nft.likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/update`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            // console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                setActiveTab("sales-list")
                setExpandedId(undefined)
                getUserPVGalleries()
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const updateCollection = async () => {
        loading();
        setUpdateCollButtonDisabled(true)
        if (globalUser.privateKey) {
            let collForm = collectionForm
            collForm.royalties_share = royaltyShare
            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, collForm);
            // console.log(requestData)
            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/update`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            // console.log('response,responseeee', response);

            if (!response.is_error) {
                updateToast(true, response.message)
                setUpdateCollButtonDisabled(false)
                setEditModal(false)
                getUserPVGalleries()
            } else {
                console.error(response.message)
                setUpdateCollButtonDisabled(false)
                updateToast(false, response.message)
            }
        } else {
            setUpdateCollButtonDisabled(false)
            updateToast(false, 'please save your private key first')
        }
    }
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
                getUserPVGalleries()
                setExpandedId(undefined)
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
    }, [nfts, selectedNFT])
    useEffect(() => {
        if (window.document.getElementById("scrollable-col-card-expanded"))
            window.document.getElementById("scrollable-col-card-expanded").scrollTo(0, 0);
    }, [expanded])
    const [isTransferred, setIsTransferred] = useState(false)
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
    const tempNFTs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (<>
        {expanded ?
            <Modal
                open={expanded}
                onClose={() => setExpandedId(undefined)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{
                    display: 'flex', alignItems: 'center', flexDirection: 'column',
                    width: '100%', height: '100%', backdropFilter: 'blur(10px)', boxSizing: 'border-box',
                    gap: '40px'
                }}>
                    <FlexRow sx={{
                        width: '100%', height: 'auto',
                        justifyContent: 'space-between !important',
                        // justifySelf: 'start !important',
                        pr: '30px', pt: '15px',
                        display: { xs: 'none !important', sm: 'flex !important' }
                    }}>
                        <Box />
                        <Close sx={{
                            boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)', padding: { xs: '0', md: '4px' },
                            borderRadius: '50%', color: 'white'
                        }}
                            onClick={() => setExpandedId(undefined)} cursor="pointer" />
                    </FlexRow>

                    <Box sx={(theme) => ({
                        width: { xs: '100%', sm: '600px', md: '900px' },
                        height: { xs: '100%', sm: 'max-content' },
                        // width: '100%', height: '100%',
                        // justifySelf: 'center !important',
                        borderRadius: { xs: '0', sm: '24px' },
                        display: 'flex', alignItems: 'center', justifyContent: 'start',
                        backdropFilter: 'blur(10px)', backgroundColor: 'transparent',
                        boxSizing: 'border-box', flexDirection: 'column',
                        gap: '20px', padding: { xs: '0', sm: '10px 12px 10px 12px' }
                    })}>

                        <Container id="scrollable-col-card-expanded" sx={{
                            height: 'max-content',
                            maxHeight: { xs: '100%', sm: '75vh', md: '70vh' },
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { display: 'none', },
                            borderRadius: { xs: '0', sm: '18px' },
                            // flexDirection: { xs: 'column-reverse', md: 'row' }
                            flexDirection: 'column'
                        }}>
                            <FlexRow sx={{
                                position: 'sticky', top: 0, justifyContent: 'end !important',
                                width: '100%', height: 'auto', justifySelf: 'start !important',
                                display: { xs: 'flex', sm: 'none !important' }
                            }}>
                                <Close sx={{
                                    backgroundColor: 'secondary.bg',
                                    boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)', padding: { xs: '2px', md: '4px' },
                                    borderRadius: '50%', color: { xs: 'primary.color', md: 'white' }
                                }}
                                    onClick={() => setExpandedId(undefined)} cursor="pointer" />
                            </FlexRow>
                            {/* // details of collection and nft ===> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '22px' }}>
                                {/* // details of collection ===> */}
                                <Box className="collection-details-of-expanded-collection-card" sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                                    <FlexRow justifyContent={'space-between'} sx={{}}>
                                        <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                            {col_name}
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
                                            <FlexRow>Cover Image:&nbsp; <Box sx={{ background: `${BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${collection_background}`))} no-repeat center`, backgroundSize: 'cover', width: '68px', height: '38px', borderRadius: '8px' }}></Box></FlexRow>
                                            <FlexRow>Creation Date:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{created_at.slice(0, 10)}</Typography></FlexRow>
                                            <FlexRow>Owner Address:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{owner_screen_cid}</Typography></FlexRow>
                                            <FlexRow>Royalties:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{royalties_address_screen_cid}</Typography></FlexRow>
                                            <FlexRow>Royalty Amount:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{Number(royalties_share) / 100}</Typography></FlexRow>
                                            <FlexColumn sx={{ color: 'primary.text' }}>
                                                Collection Description:
                                                <Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>
                                                    {col_description}
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
                                                        {
                                                            action == 'mint' && !nfts[selectedNFT].is_minted ?
                                                                <ButtonPurple disabled={mintButtonDisabled} text={'Mint This NFT'} onClick={mintNFT} w='100%' />
                                                                :
                                                                <>
                                                                    {nfts[selectedNFT].current_owner_screen_cid !== globalUser.YouWhoID || (nfts[selectedNFT].extra && nfts[selectedNFT].extra.length > 0) ?
                                                                        undefined : <>
                                                                            <ButtonPurple text={'Add To Sales List'} onClick={() => setOpenModal(true)} w='100%' />
                                                                            <ButtonPurple text={'Transfer'} onClick={() => setOpenTransferModal(true)} w='100%' />
                                                                        </>
                                                                    }
                                                                </>
                                                        }
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
                                                        </FlexColumn>


                                                    </FlexColumn>
                                                    : undefined}

                                            </Box>

                                            <Modal
                                                open={openModal}
                                                onClose={() => setOpenModal(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(255, 255, 255, 0.50)', backdropFilter: "blur(16.5px)", } }}
                                            >
                                                <Box sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Box sx={{
                                                        borderRadius: '24px',
                                                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: '450px' },
                                                        backgroundColor: 'secondary.bg', color: 'primary.text', boxSizing: 'border-box',
                                                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between',
                                                        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
                                                    }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '40px' }}>
                                                            <Typography sx={{ textAlign: 'center', fontSize: '16px' }}>
                                                                Enter Your NFT Value
                                                            </Typography>
                                                            <Typography sx={{ textAlign: 'center', fontSize: '12px', fontFamily: 'inter', color: 'primary.darkGray' }}>
                                                                This NFT New Value Is The Price You Want To Sell It.                                                </Typography>
                                                            <FlexRow>
                                                                <MyInput
                                                                    value={NFTPrice}
                                                                    name={"current_price"}
                                                                    onChange={(e) => setNFTPrice(Number(e.target.value))}
                                                                    label={'NFT Price'} width={'100%'}
                                                                    icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'}
                                                                />
                                                            </FlexRow>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button style={{ borderRight: '1px solid #DEDEDE' }} color="primary.darkGray" onClick={handleCancel}>cancel</Button>
                                                                <ButtonPurple disabled={(NFTPrice == 0 || NFTPrice == null)} text={'Add To Sales List'} onClick={sellNFT} w='100%' />
                                                            </Box>

                                                        </Box>
                                                    </Box>
                                                </Box>

                                            </Modal >
                                            <Modal
                                                open={openTransferModal}
                                                onClose={() => setOpenTransferModal(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(255, 255, 255, 0.50)', backdropFilter: "blur(16.5px)", } }}
                                            >
                                                <Box sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Box sx={{
                                                        borderRadius: '24px',
                                                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: '450px' },
                                                        backgroundColor: 'secondary.bg', color: 'primary.text', boxSizing: 'border-box',
                                                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between',
                                                        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
                                                    }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '40px' }}>
                                                            <Typography sx={{ textAlign: 'center', fontSize: '16px' }}>
                                                                Enter YouWhoID
                                                            </Typography>
                                                            <Typography sx={{ textAlign: 'center', fontSize: '12px', fontFamily: 'inter', color: 'primary.darkGray' }}>
                                                                Enter the YouWhoID of the person you'd like to transfer your NFT to                                           </Typography>
                                                            <FlexRow>
                                                                <MyInput
                                                                    value={TransferTo}
                                                                    name={"recipent_screen_cid"}
                                                                    onChange={(e) => setTransferTo(e.target.value)}
                                                                    label={'YouWho ID'} width={'100%'}
                                                                    icon={<Coin color="#BEA2C5" />} type={'text'} id={'recipent_screen_cid'}
                                                                />
                                                            </FlexRow>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button style={{ borderRight: '1px solid #DEDEDE' }} color="primary.darkGray" onClick={handleTransferCancel}>cancel</Button>
                                                                <ButtonPurple disabled={(TransferTo == null)} text={'Transfer'} onClick={Transfer} w='100%' />
                                                            </Box>

                                                        </Box>
                                                    </Box>
                                                </Box>

                                            </Modal >
                                        </>
                                        :
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '16px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                                                There are no {pTab} nfts in this collection.
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
                    </Box>
                </Box>
            </Modal >

            :
            <ClickAwayListener onClickAway={handleClickAway}>
                <Card
                    sx={{ transition: '500ms ease' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {
                        isHovered ?
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                gridTemplateRows: '1fr 1fr 1fr',
                                height: '144px',
                                width: '200px',
                                boxSizing: 'border-box',
                                padding: '4px', gap: '4px',
                                borderRadius: '9px',
                                alignItems: 'center',
                                backgroundColor: 'primary.gray',
                                boxShadow: 'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.30)', transition: '500ms ease'
                            }}>
                                {
                                    nfts && nfts.length > 0 ?
                                        <>
                                            {nfts.map((nft, index) => {
                                                const imageURL = (nft.metadata && nft.metadata.image) ? nft.metadata.image : ywHugIcon;
                                                const srvrImgURL = nft.serverImg ? nft.serverImg : undefined
                                                return (
                                                    <Box
                                                        key={nft.id}
                                                        sx={{
                                                            background: srvrImgURL ? `url('${API_CONFIG.API_URL}/${srvrImgURL}') no-repeat center` : imageURL ? `url(${imageURL}) no-repeat center` : `url('${API_CONFIG.API_URL}/${ywHugIcon}') no-repeat center`,

                                                            // background: imageURL ? `url(${imageURL}) no-repeat center` : `url('${API_CONFIG.API_URL}/${ywHugIcon}') no-repeat center`,
                                                            backgroundSize: 'cover',
                                                            borderColor: 'primary.main',
                                                            boxSizing: 'border-box',
                                                            aspectRatio: '1',
                                                            borderRadius: '8px', transition: '500ms ease'
                                                        }} >
                                                    </Box>
                                                )
                                            })}
                                        </> :
                                        <>
                                            {tempNFTs.map((temp, index) => {
                                                return (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            background: `url('${API_CONFIG.API_URL}/${ywHugIcon}') no-repeat center`,
                                                            backgroundSize: 'cover',
                                                            borderColor: 'primary.main',
                                                            boxSizing: 'border-box',
                                                            aspectRatio: '1',
                                                            borderRadius: '8px', transition: '500ms ease'
                                                        }} />
                                                )
                                            })}
                                        </>
                                }
                            </Box>
                            :
                            <CollectionImage sx={{
                                transition: '500ms ease',
                                background: `${BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${collection_background}`))} no-repeat center`,
                                '&:hover': {
                                    background: `${BG_URL(PUBLIC_URL(`${collection_background}`))} no-repeat center`,
                                }
                            }} />
                    }

                    <DetailsSection>
                        <FlexRow sx={{ mb: '4px', justifyContent: 'end', gap: '4px' }}>
                            <Heart size='15px' />
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', }}>
                                {collectionLikesCount}
                            </div>
                        </FlexRow>
                        <Typography sx={{ mb: '14px', fontSize: '12px' }}>{col_name}</Typography>
                        <FlexRow sx={{ mb: '4px', alignItems: 'center', gap: '16px' }}>
                            <ButtonPurpleLight
                                br='8px' height={'30px'} text={'Expand Collection'} w={'100%'} onClick={() => setExpandedId(id)} />
                            {pTab == 'private' && isMine ?
                                <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#787878" />
                                : undefined}
                        </FlexRow>
                    </DetailsSection>
                    <Popper
                        PaperProps={{
                            style: {
                            }
                        }}
                        disableScrollLock={true}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        placement='left-start'
                        sx={{
                            marginTop: '20px !important',
                            width: '190px',
                            bgcolor: 'secondary.bg', p: '20px',
                            zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                            overflow: "hidden",
                            boxShadow: localStorage.getItem('theme') == 'dark' ? '0px 0px 12px 1px rgba(227,209,231, 0.25)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <MenuItem id={'edit'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={() => {
                                setEditModal(true)
                                handleClose()
                            }}
                        >
                            edit
                        </MenuItem>
                    </Popper>

                    <Modal
                        open={editModal}
                        onClose={() => {
                            setEditModal(false)
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        disableScrollLock={true}
                    ><Box sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    })}>
                            <Box sx={(theme) => ({
                                borderRadius: { xs: '0', sm: '24px' },
                                width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                                backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                                display: 'flex', flexDirection: 'column',
                                padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                            })}>
                                <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                                    <Box sx={{ padding: '10px' }}>
                                        <Close onClick={() => setEditModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                                    </Box>
                                </FlexRow>

                                <FlexRow sx={{ mb: '12px' }}>
                                    <MyInput name={'col_name'} label={'Name *'} width={'100%'}
                                        icon={<Title sx={{ color: 'primary.light' }} />}
                                        onChange={handleColFormChange}
                                        value={collectionForm.col_name}
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow >
                                <FlexRow sx={{ mb: '12px' }}>
                                    <MyInput name={'col_description'} label={'Description *'} width={'100%'} icon={<DescriptionOutlined sx={{ color: 'primary.light' }} />}
                                        onChange={handleColFormChange}
                                        value={collectionForm.col_description}
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow >

                                {/* <FlexRow sx={{ mb: '12px' }}>
                                    <MyInput name={'base_uri'} label={'Base URI *'} width={'100%'} icon={<LinkOutlined sx={{ color: 'primary.light' }} />}
                                        onChange={handleColFormChange}
                                        value={collectionForm.base_uri}
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow>
                                <FlexRow sx={{ mb: '12px' }}>
                                    <ButtonInput label={'Freeze Metadata'} width={'100%'}
                                        button={<BetweenTwoSelection
                                            color={'secondary.text'}
                                            options={[true, false]}
                                            id={'metaupdate-create-coll'}
                                            name='freeze_metadata'
                                            setOption={value => setCollectionForm((prev) => ({ ...prev, freeze_metadata: value }))}
                                            selected={collectionForm.freeze_metadata}
                                        />
                                        }
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow> */}
                                <FlexRow sx={{ mb: '16px' }}>
                                    <MyInput type='number' name={'royalties_share'} label={'Royalty Share *'}
                                        width={'100%'} icon={<Percent sx={{ color: 'primary.light' }} />}
                                        onChange={handleColFormChange}
                                        value={collectionForm.royalties_share}
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow>
                                <FlexRow sx={{ mb: '16px' }}>
                                    <MyInput name={'royalties_address_screen_cid'} label={'Royalties Address *'} width={'100%'}
                                        icon={<AddReaction sx={{ color: 'primary.light' }} />}
                                        onChange={handleColFormChange}
                                        value={collectionForm.royalties_address_screen_cid}
                                    />
                                    <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                </FlexRow>

                                <ButtonPurple disabled={updateCollButtonDisabled} text={'Update'} onClick={updateCollection} w='100%' />
                            </Box>
                        </Box>

                    </Modal>
                </Card>
            </ClickAwayListener >

        }
    </>
    );
}

export default CollectionCard;