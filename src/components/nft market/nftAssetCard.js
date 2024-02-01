import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography, Modal } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import { ArrowUp2, ArrowDown2, Heart, HeartRemove, More, Pointer, Coin, Setting, Share } from "iconsax-react";
import yCoin from '../../assets/Ycoin.svg'
import ButtonPurple from "../buttons/buttonPurple";
import ButtonOutline from "../buttons/buttonOutline";
import ButtonBorder from "../buttons/buttonBorder";
import { CardGiftcard, GifTwoTone, ShareSharp } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState, useRef } from "react";
import tempPic from '../../assets/bgDots.svg'
import tempNFT from '../../assets/youwho-hugcoin.svg'
import { AddBoxOutlined, AddComment, AddReaction, ArrowBack, ArrowForward, ArrowLeft, ArrowRight, ArrowUpward, Close, CommentOutlined, DescriptionOutlined, LinkOutlined, Percent, Title } from "@mui/icons-material";
import { NFTCommentCard, MyInput, ButtonInput, BetweenTwoSelection, CommentInput } from "../utils";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { API_CONFIG } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import generateSignature from "../../utils/signatureUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ywHugIcon from '../../assets/Y-HUG-COIN.svg'
import { getuser } from "../../redux/actions";
import { useNavigate } from "react-router";
import ButtonOutlineInset from "../buttons/buttonOutlineInset";
const YouWhoToken = styled(Box)(({ theme }) => ({
    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '12px',
    height: '12px'
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    // alignItems: 'center',
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    // gap: '40px',
    height: 'max-content',
    borderRadius: '18px', width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const AssetImage = styled(Box)(({ theme }) => ({
    // height: '280px', width: '280px',
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.bg,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', backgroundSize: 'cover'
}))
const AssetImageSmall = styled(Box)(({ theme }) => ({
    height: '124px', width: '220px',
    borderRadius: '18px',
    backgroundColor: theme.palette.primary.bg,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
}))

const Card = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '8px 8px 18px 8px',
    alignItems: 'start', flexDirection: 'column',
    gap: '6px',
    borderRadius: '16px',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Line = styled(Box)(({ theme }) => ({
    width: '100%', height: '1px',
    borderRadius: '16px',
    backgroundColor: '#DEDEDE',

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
const NFTAssetCard = ({ nft, col_data, getAssets }) => {
    const {
        metadata_uri,
        contract_address,
        created_at,
        is_minted,
        is_listed,
        likes,
        comments,
        current_price,
        nft_description,
        nft_name,
        onchain_id,
        current_owner_screen_cid,
        attributes,
        id,
        extra,
        freeze_metadata
    } = nft;
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const globalUser = useSelector(state => state.userReducer)
    const [NFTInfo, setNFTInfo] = useState({
        name: '',
        description: '',
        attributes: null,
        imageURL: '',
    });
    const dispatch = useDispatch()
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
    const [commentContent, setCommentContent] = useState(undefined)
    const [amount, setAmount] = useState(0)
    const [NFTPrice, setNFTPrice] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [openTransferModal, setOpenTransferModal] = useState(false)
    const [TransferTo, setTransferTo] = useState(null)
    const [isGifted, setIsGifted] = useState(false)
    const navigate = useNavigate()
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopper = Boolean(anchorEl);
    const handleClick = (event) => {
        if (!openPopper)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        setDetExpaded(false)
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }
    const [detExpanded, setDetExpaded] = useState(false)
    useEffect(() => {
        getMetadata()
    }, [metadata_uri])
    const sellNFT = async () => {
        loading();

        if (globalUser.privateKey) {
            const data = {
                caller_cid: globalUser.cid,
                nft_id: nft.id,
                col_id: col_data.id,
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
                fetchUser(globalUser.token)
                getAssets()
                setDetExpaded(false)

                // navigate('/profile#assets-tab')

            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const buyNFt = async () => {
        loading();

        if (globalUser.privateKey) {
            let nftextra = extra
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
                nft_id: id,
                col_id: col_data.id,
                amount: amount,
                event_type: "buy",
                buyer_screen_cid: globalUser.YouWhoID,
                contract_address: contract_address,
                metadata_uri: metadata_uri,
                current_owner_screen_cid: current_owner_screen_cid,
                onchain_id: onchain_id,
                is_minted: is_minted,
                is_listed: is_listed,
                nft_name: nft_name,
                nft_description: nft_description,
                current_price: current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: freeze_metadata,
                extra: nftextra,
                attributes: attributes,
                comments: comments,
                likes: likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

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
                getAssets()
                setDetExpaded(false)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const removeFromList = async () => {
        loading();

        if (globalUser.privateKey) {
            const data = {
                caller_cid: globalUser.cid,
                nft_id: id,
                col_id: col_data.id,
                amount: amount,
                event_type: "delist",
                buyer_screen_cid: null,
                contract_address: contract_address,
                metadata_uri: metadata_uri,
                current_owner_screen_cid: current_owner_screen_cid,
                onchain_id: onchain_id,
                is_minted: is_minted,
                is_listed: is_listed,
                nft_name: nft_name,
                nft_description: nft_description,
                current_price: current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: freeze_metadata,
                extra: extra,
                attributes: attributes,
                comments: comments,
                likes: likes,
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
            console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                getAssets()
                setDetExpaded(false)
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
                col_id: col_data.id,
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
            console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                navigate('/profile#assets-tab')
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const getMetadata = () => {
        console.log(metadata_uri);
        if (metadata_uri.includes('https://')) {
            setIsGifted(true)
            setNFTInfo({
                name: nft_name,
                description: nft_description,
                attributes: attributes,
                imageURL: metadata_uri,
            })

        } else {
            fetch(metadata_uri.includes('::') ? metadata_uri.split("::")[0].replace("ipfs://", "https://ipfs.io/ipfs/") : metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
                .then((response) => response.json())
                .then((data) => {
                    setNFTInfo({
                        name: data.name,
                        description: data.description,
                        attributes: data.attributes,
                        imageURL: data.image,
                    })
                    console.log(data);

                })
                .catch((error) => {
                    // Handle any fetch or parsing errors
                    console.error('Error fetching NFT image:', error);
                })
        }
    }
    const handleTransferCancel = () => {
        setOpenTransferModal(false)
        setTransferTo(null)
    }
    const handleCancel = () => {
        setOpenModal(false)
        setNFTPrice(null)
    }
    const [tempLikers, setTempLikers] = useState([])
    useEffect(() => {
        let temp = []
        if (nft) {
            if (likes && likes.length > 0 && likes[0].upvoter_screen_cids) {
                console.log(likes)
                for (let i = 0; i < likes[0].upvoter_screen_cids.length; i++) {
                    temp.push(likes[0].upvoter_screen_cids[i].screen_cid)
                }
            }
        }
        console.log(temp)
        setTempLikers(temp)
    }, [nft, likes])
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
    useEffect(() => {
        getGasFee()
    }, [])
    const [isTransferred, setIsTransferred] = useState(false)
    useEffect(() => {
        if (extra) {
            for (let i = 0; i < extra.length; i++) {
                if (extra[i].is_transferred && extra[i].is_transferred == true) {
                    setIsTransferred(true)
                } else {
                    setIsTransferred(false)
                }
            }
        } else {
            setIsTransferred(false)
        }

    }, [nft, extra])
    console.log(nft)
    const addReactionOnNFT = async (colId, callerId, nftID, reactionType, commentContent, like, dislike) => {
        loading();
        if (globalUser.privateKey) {

            let data = {
                col_id: colId,
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
            console.log('nft reaction', response);
            if (!response.is_error) {
                updateToast(true, `${reactionType} updated`)
                if (reactionType == 'comment') {
                    setCommentContent(undefined)
                }
                getAssets()
                setDetExpaded(false)
            } else {
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    return (
        <>{detExpanded ?
            <Modal
                open={detExpanded}
                onClose={handleClose}
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
                            onClick={handleClose} cursor="pointer" />
                    </FlexRow>

                    <Box sx={(theme) => ({
                        width: { xs: '100%', sm: '600px', md: '900px' },
                        height: { xs: '100%', md: 'max-content' },
                        // width: '100%', height: '100%',
                        // justifySelf: 'center !important',
                        borderRadius: { xs: '0', sm: '24px' },
                        display: 'flex', alignItems: 'center', justifyContent: 'start',
                        backdropFilter: 'blur(10px)', backgroundColor: 'transparent',
                        boxSizing: 'border-box', flexDirection: 'column',
                        gap: '20px', padding: { xs: '0', sm: '10px 12px 10px 12px' }
                    })}>


                        <Container sx={{
                            gap: { xs: '20px', md: '40px' },
                            flexDirection: { xs: "column", sm: 'row' },
                            maxHeight: { xs: '100%', sm: '75vh', md: '80vh' },
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { display: 'none', },
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
                                    onClick={handleClose} cursor="pointer" />
                            </FlexRow>

                            <AssetImage
                                id="large-asset-image"
                                sx={{
                                    // width: '280px',
                                    height: '300px',
                                    width: '100%',
                                    // height: `${document.getElementById("large-asset-image")?.offsetWidth}px`,
                                    // backgroundImage: BG_URL(PUBLIC_URL(`${NFTInfo.imageURL}`)),
                                    backgroundImage: `url(${NFTInfo.imageURL})`,
                                }}
                            />
                            <FlexColumn sx={{
                                gap: '16px', width: '100%', justifyContent: 'space-between'
                            }}>
                                <FlexRow sx={{ width: '100%' }}>
                                    <FlexRow>
                                        {isGifted && <CardGiftcard sx={{ color: 'primary.main', fontSize: '22px' }} />}
                                        <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 500 }}>{nft_name}</Typography>
                                    </FlexRow>
                                    <FlexRow sx={{ width: 'max-content', gap: '4px' }}>
                                        <YouWhoToken sx={{
                                            width: '20px !important', height: '20px !important'
                                        }}
                                        />
                                        <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 600 }}>{current_price}</Typography>
                                    </FlexRow>
                                </FlexRow>
                                <FlexColumn sx={{
                                    gap: '6px', width: '100%', alignItems: 'start !important'
                                }}>
                                    <FlexRow sx={{ width: 'max-content', gap: '2px' }}>
                                        {(tempLikers.includes(globalUser.YouWhoID)) ?
                                            <HeartRemove variant="Bulk" size={'24px'} cursor={'pointer'}
                                                onClick={() => addReactionOnNFT(
                                                    col_data.id,
                                                    globalUser.cid,
                                                    id,
                                                    'dislike',
                                                    '',
                                                    false,
                                                    true)} />
                                            : <Heart size={'24px'} cursor={'pointer'}
                                                onClick={() => addReactionOnNFT(col_data.id, globalUser.cid,
                                                    id, 'like', '', true, false)} />
                                        }
                                        <Typography sx={{ color: 'primary.text', fontSize: '9px' }}>
                                            {likes && likes.length > 0 && likes[0].upvoter_screen_cids ? likes[0].upvoter_screen_cids.length : 0}
                                        </Typography>
                                    </FlexRow>
                                    <FlexRow sx={{ justifyContent: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                            Creation Time:
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text',
                                            fontSize: '12px', fontWeight: 400, textAlign: 'justify'
                                        }}>
                                            {created_at}
                                        </Typography>

                                    </FlexRow>
                                    <FlexColumn sx={{ width: '100%', alignItems: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                            NFT Description:
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text',
                                            fontSize: '12px', fontWeight: 400, textAlign: 'justify'
                                        }}>
                                            {nft_description}
                                        </Typography>
                                    </FlexColumn>
                                    <FlexRow sx={{ justifyContent: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                            Collection Name:
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text',
                                            fontSize: '12px', fontWeight: 400, textAlign: 'justify'
                                        }}>
                                            {col_data.col_name}
                                        </Typography>
                                    </FlexRow>
                                    <FlexRow sx={{ justifyContent: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                            Collection Owner:
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text',
                                            fontSize: { xs: '8px', sm: '10px' }, fontWeight: 400, textAlign: 'justify'
                                        }}>
                                            {col_data.owner_screen_cid}
                                        </Typography>

                                    </FlexRow>
                                    <FlexColumn sx={{ width: '100%', alignItems: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                            Collection Description:
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondary.text',
                                            fontSize: '12px', fontWeight: 400, textAlign: 'justify'
                                        }}>
                                            {col_data.col_description}
                                        </Typography>
                                    </FlexColumn>
                                    <Line />
                                    <FlexColumn sx={{ width: '100%', alignItems: 'start !important', my: { xs: '8px', md: '10px' } }}>
                                        <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {
                                                attributes &&
                                                attributes.map(attr => (
                                                    <NFTPropertyTag>
                                                        <PropertyTagTitle>{attr.trait_type} : </PropertyTagTitle>
                                                        <PropertyTagAnswer>{attr.value}</PropertyTagAnswer>
                                                    </NFTPropertyTag>
                                                ))
                                            }
                                        </Box>
                                    </FlexColumn>
                                    <Line />

                                    <FlexColumn sx={{ width: '100%', gap: '8px', my: { xs: '8px', md: '10px' }, alignItems: 'start !important' }}>
                                        <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>
                                            Comments : {comments && comments.length > 0 ?
                                                <span>(  <span style={{ color: '#5F5F5F' }}>{selectedCommentIndex + 1}th</span> / <span style={{ color: '#5F5F5F' }}>{comments.length}</span> )</span>
                                                : undefined}</Typography>

                                        {
                                            comments && comments.length > 0 ?
                                                <FlexRow sx={{ gap: '12px', width: '100%', }}>

                                                    <NFTCommentCard username={comments[selectedCommentIndex].owner_username}
                                                        profileImg={comments[selectedCommentIndex].owner_avatar}
                                                        comment={comments[selectedCommentIndex].content} />
                                                    <FlexColumn sx={{ alignItems: 'space-between !important', color: 'primary.text' }}>
                                                        <ArrowUp2 size='16px' cursor='pointer'
                                                            onClick={() => setSelectedCommentIndex(selectedCommentIndex - 1 >= 0 ? selectedCommentIndex - 1 : selectedCommentIndex)} />
                                                        <ArrowDown2 size='16px' cursor='pointer'
                                                            onClick={() => setSelectedCommentIndex(selectedCommentIndex + 1 >= comments.length ? selectedCommentIndex : selectedCommentIndex + 1)} />
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
                                                    col_data.id,
                                                    globalUser.cid,
                                                    id,
                                                    'comment',
                                                    commentContent,
                                                    false,
                                                    false)}
                                                text={'Send'}
                                                br={'30px'}
                                            />
                                            } />
                                    </FlexColumn>
                                    <Line />
                                </FlexColumn>
                                {/* <FlexRow sx={{
                                    gap: '8px',
                                    width: '100%', my: { xs: '8px', md: '10px' },
                                }}>
                                    {!isGifted && is_listed && globalUser.YouWhoID !== current_owner_screen_cid && !isTransferred
                                        ?
                                        <ButtonPurple text={'Buy'} px={'24px'} w={'calc(100% - 40px)'} onClick={buyNFt} /> : undefined
                                    }
                                    {!isGifted && !is_listed && globalUser.YouWhoID == current_owner_screen_cid && !isTransferred
                                        ?
                                        <>
                                            <ButtonPurple text={'Add To Sales List'} fontSize={'14px'} onClick={() => setOpenModal(true)} w='calc(100% - 150px)' px={'24px'} />
                                            <ButtonOutlineInset text={'Transfer'} fontSize={'14px'} onClick={() => setOpenTransferModal(true)} w='max-content' px={'16px'} />
                                        </> : undefined
                                    }
                                    {!isGifted && is_listed && globalUser.YouWhoID == current_owner_screen_cid && !isTransferred ?
                                        <ButtonPurple text={'Remove From Sales List'} onClick={removeFromList} w='calc(100% - 40px)' />
                                        : undefined}
                                    <ButtonBorder
                                        br={'4px'}
                                        text={<ShareSharp sx={{ color: 'secondary.text' }} />}
                                        w={'40px'} height={'40px'} />
                                </FlexRow> */}
                                {/* <ButtonBorder w={'100%'} text={<ArrowUp2 />} height={'30px'} onClick={handleClose} br={'4px'} /> */}
                            </FlexColumn>
                        </Container>


                    </Box>
                </Box>
            </Modal >

            :
            <ClickAwayListener onClickAway={handleClickAway}>
                <Card>
                    <AssetImageSmall sx={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${NFTInfo.imageURL}`)),
                    }} />
                    <FlexColumn sx={{ width: '100%' }}>
                        <FlexRow sx={{ width: '100%', mb: '8px' }}>
                            <FlexRow sx={{ width: 'max-content', gap: '2px' }}>
                                <Heart size='15px' />
                                <Typography sx={{ color: 'primary.text', fontSize: '9px' }}>
                                    {likes && likes.length > 0 && likes[0].upvoter_screen_cids ? likes[0].upvoter_screen_cids.length : 0}
                                </Typography>
                            </FlexRow>
                            <More size='24px' cursor='pointer' onClick={handleClick} />
                        </FlexRow>
                        <FlexRow sx={{ width: '100%', mb: '12px' }}>
                            <FlexRow sx={{ width: 'max-content', gap: '4px' }}>
                                <YouWhoToken />
                                <Typography sx={{ color: 'primary.text', fontSize: '10px' }}>
                                    {current_price}
                                </Typography>
                                {isGifted && <CardGiftcard sx={{ color: 'primary.main', fontSize: '18px' }} />}
                            </FlexRow>
                        </FlexRow>
                        <FlexRow sx={{ width: '100%', }}>
                            <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>
                                {nft_name}
                            </Typography>
                        </FlexRow>
                    </FlexColumn>



                    <Popper
                        PaperProps={{
                            style: {
                            }
                        }}
                        disableScrollLock={true}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openPopper}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        placement='left-start'
                        sx={(theme) => ({
                            marginTop: '20px !important',
                            width: '190px',
                            bgcolor: 'secondary.bg', p: '22px',
                            zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                            overflow: "hidden",
                            boxShadow: theme.palette.primary.boxShadow,
                        })}>

                        <MenuItem id={'nft-details'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            // borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={() => {
                                setDetExpaded(true)
                                setAnchorEl(null)
                            }}
                        >
                            NFT Details
                        </MenuItem>
                        {/* 
                        <MenuItem id={'like'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Like
                        </MenuItem>

                        <MenuItem id={'share'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Share
                        </MenuItem> */}

                    </Popper>

                </Card>
            </ClickAwayListener>
        }

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
    );
}

export default NFTAssetCard;