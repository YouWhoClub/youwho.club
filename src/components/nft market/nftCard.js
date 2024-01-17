import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Modal, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowUp2, ArrowDown2, BuyCrypto, Heart, HeartRemove, More, Profile, Coin } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { CommentInput, MorePopper, MyInput, NFTCommentCard, YouwhoCoinIcon } from "../utils";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddComment, Close, Comment, CommentBankOutlined, Details, DetailsRounded, DetailsTwoTone, Login, ShareSharp, ShoppingBasket, SportsBasketball } from "@mui/icons-material";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";
import ButtonPurple from "../buttons/buttonPurple";
import Ycoin from '../../assets/Ycoin.svg'
import ButtonOutlineInset from "../buttons/buttonOutlineInset";
import ButtonBorder from "../buttons/buttonBorder";
import { getuser } from "../../redux/actions";

const Outter = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '22px',
    // borderRadius: '18px',
    width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Card = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box', width: '250px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between', gap: '6px',
    padding: '8px 8px 18px 8px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
    transition: '400ms ease',
    '&:hover': {
        boxShadow: theme.palette.primary.boxShadowInset,
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%', height: '125px',
    borderRadius: '15px',
}))
const NFTOpenImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%', height: '250px',
    borderRadius: '15px',
    boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.4)',
    '&:hover': {
        boxShadow: theme.palette.secondary.boxShadow,
    },

}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
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
const Icon = styled(Box)(({ theme, url, w, h }) => ({
    width: `${w}px`,
    height: `${h}px`,
    color: '#B897CC',
    backgroundImage: BG_URL(PUBLIC_URL(`${url}`)),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    pointerEvents: 'none'
}))

const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    // height: '100px',
    gap: '6px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))
const Line = styled(Box)(({ theme }) => ({
    width: '100%', height: '1px',
    borderRadius: '16px',
    backgroundColor: '#DEDEDE',

}))
const NFTCard = ({ nft, col_data, getNFTs }) => {

    const {
        id,
        attributes,
        metadata_uri,
        nft_name,
        likes,
        current_price,
        comments,
        nft_description,
        created_at,
        contract_address,
        current_owner_screen_cid,
        onchain_id, is_minted,
        is_listed,
        freeze_metadata,
        extra
    } = nft;
    const globalUser = useSelector(state => state.userReducer)
    const [nfts, setNFTs] = useState([]);
    const toastId = useRef(null);
    const [amount, setAmount] = useState(0)
    const [imageURL, setImageURL] = useState(null);
    const [tempLikers, setTempLikers] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [commentContent, setCommentContent] = useState(undefined)
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [openTransferModal, setOpenTransferModal] = useState(false)
    const [TransferTo, setTransferTo] = useState(null)
    const [NFTPrice, setNFTPrice] = useState(null)
    const dispatch = useDispatch()
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const handleTransferCancel = () => {
        setOpenTransferModal(false)
        setTransferTo(null)
    }
    const handleCancel = () => {
        setOpenModal(false)
        setNFTPrice(null)
    }

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
    useEffect(() => {
        getMetadata()
    }, [metadata_uri])
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const getMetadata = () => {
        fetch(metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
            .then((response) => response.json())
            .then((data) => (setImageURL(data.image)))
            .catch((error) => {
                // Handle any fetch or parsing errors
                console.error('Error fetching NFT image:', error);
            })
    }
    const buyNFt = async () => {
        loading();

        if (globalUser.privateKey) {
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
                extra: extra,
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
                fetchUser(globalUser.token)
                getNFTs()
                setExpanded(false)
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
                getNFTs()
                setExpanded(false)
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
            console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                getNFTs()
                setExpanded(false)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
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
                getNFTs()
                setExpanded(false)
                // navigate('/dashboard#assets-tab')

            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
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
                getNFTs()
                setExpanded(false)
                setExpanded(false)
            } else {
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    const moretabs = [
        is_listed && globalUser.YouWhoID !== current_owner_screen_cid ? {
            text: 'Buy',
            id: 'nft-buy-p', fColor: 'primary.main',
            onClick: () => navigate(`/profile/${current_owner_screen_cid}`),
            icon: <ShoppingBasket sx={{ fontSize: '16px', color: 'primary.main' }} />
        } : {},
        {
            text: 'Owners Profile',
            id: 'nft-owner-profile',
            onClick: () => navigate(`/profile/${current_owner_screen_cid}`)
            , icon: <Profile size={'16px'} />
        },
        {
            text: 'Details', id: 'nft-card-details',
            onClick: () => {
                setExpanded(true)
                setAnchorEl(null)
            },
            icon: <DetailsRounded sx={{ fontSize: '16px' }} />
        },
    ]

    const moretabsNotLoggedIn = [
        {
            text: 'Login/SignUp First', id: 'nft-card-auth-go', onClick: () => navigate('/auth'),
            fColor: 'primary.main', icon: <Login sx={{ fontSize: '16px', color: 'primary.main' }} />
        },
    ]

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Card>
                    <NFTImage sx={{ background: imageURL ? `url(${imageURL}) no-repeat center` : 'primary.bg', }} />
                    <DetailsSection >
                        <FlexRow>
                            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px', gap: '12px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                    {(tempLikers.includes(globalUser.YouWhoID)) ?
                                        <Heart variant="Bold" size={'15px'} />
                                        : <Heart size={'15px'} />
                                    }
                                    {likes && likes.length > 0 && likes[0].upvoter_screen_cids ? likes[0].upvoter_screen_cids.length : 0}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <CommentBankOutlined sx={{ fontSize: '15px' }} />&nbsp;{comments.length}
                                </Box>
                            </Box>
                            <More onClick={handleClick} cursor='pointer' />
                        </FlexRow>
                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px', gap: '4px' }}>
                            <YouwhoCoinIcon w={12} h={12} />
                            <Typography sx={{ color: 'primary.text', fontSize: '10px' }}>
                                {current_price}
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>
                            {nft_name}
                        </Typography>
                        <MorePopper tabs={globalUser.isLoggedIn ? moretabs : moretabsNotLoggedIn} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                    </DetailsSection>
                </Card>


            </ClickAwayListener>

            <Modal
                open={expanded}
                onClose={() => setExpanded(false)}
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
                        // justifySelf: 'start !important',
                        pr: '30px', pt: '15px',
                        display: { xs: 'none !important', sm: 'flex !important' }
                    }}>
                        <Box />
                        <Close sx={{
                            boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)', padding: { xs: '0', md: '4px' },
                            borderRadius: '50%', color: 'white'
                        }}
                            onClick={() => setExpanded(false)} cursor="pointer" />
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
                        <Outter sx={{
                            flexDirection: { xs: "column", md: 'row' }
                            , height: 'max-content',
                            maxHeight: { xs: '100%', sm: '80vh', md: '70vh' },
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { display: 'none', },
                            borderRadius: { xs: '0', sm: '18px' }
                        }}>
                            <FlexRow sx={{
                                position: 'sticky', top: 0,
                                width: '100%', height: 'auto', justifySelf: 'start !important',
                                display: { xs: 'flex', sm: 'none !important' }
                            }}>
                                <Box />
                                <Close sx={{
                                    backgroundColor: 'secondary.bg',
                                    boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)', padding: { xs: '2px', md: '4px' },
                                    borderRadius: '50%', color: { xs: 'primary.color', md: 'white' }
                                }}
                                    onClick={() => setExpanded(false)} cursor="pointer" />
                            </FlexRow>


                            <NFTOpenImage
                                id="nft-image-of-expanded-nft-card"
                                className="nft-image-of-expanded-nft-card"
                                component="img"
                                src={imageURL}
                            />
                            <FlexColumn sx={{
                                gap: '16px', width: '100%', justifyContent: 'space-between'
                            }}>
                                <FlexRow sx={{ width: '100%' }}>
                                    <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 500 }}>{nft_name}</Typography>
                                    <FlexRow sx={{
                                        justifyContent: 'start !important', width: 'max-content !important'
                                        , gap: '4px'
                                    }}>
                                        <Icon url={Ycoin} w={25} h={25} />
                                        <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 600 }}>{current_price}</Typography>
                                    </FlexRow>
                                </FlexRow>
                                <FlexColumn sx={{
                                    gap: '6px', width: '100%', alignItems: 'start !important'
                                }}>
                                    <FlexRow sx={{ justifyContent: 'start !important', width: 'max-content', gap: '2px' }}>
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
                                <FlexRow sx={{
                                    gap: '8px',
                                    // flexWrap: 'wrap',
                                    width: '100%', my: { xs: '8px', md: '10px' },
                                }}>
                                    {is_listed && globalUser.YouWhoID !== current_owner_screen_cid
                                        ?
                                        <ButtonPurple text={'Buy'} px={'24px'} w={'calc(100% - 40px)'} onClick={buyNFt} /> : undefined
                                    }
                                    {!is_listed && globalUser.YouWhoID == current_owner_screen_cid
                                        ?
                                        <>
                                            <ButtonPurple text={'Add To Sales List'} fontSize={'14px'} onClick={() => setOpenModal(true)} w='calc(100% - 150px)' px={'24px'} />
                                            <ButtonOutlineInset text={'Transfer'} fontSize={'14px'} onClick={() => setOpenTransferModal(true)} w='max-content' px={'16px'} />
                                        </> : undefined
                                    }
                                    {is_listed && globalUser.YouWhoID == current_owner_screen_cid ?
                                        <ButtonPurple text={'Remove From Sales List'} onClick={removeFromList} w='calc(100% - 40px)' />
                                        : undefined}
                                    <ButtonBorder
                                        br={'4px'}
                                        text={<ShareSharp sx={{ color: 'secondary.text' }} />}
                                        w={'40px'} height={'40px'} />
                                </FlexRow>
                            </FlexColumn>
                        </Outter>
                    </Box>

                </Box>
            </Modal >





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

export default NFTCard;