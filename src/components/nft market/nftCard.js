import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { BuyCrypto, Heart, More, Profile } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { MorePopper, YouwhoCoinIcon } from "../utils";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Comment, CommentBankOutlined, Details, DetailsRounded, DetailsTwoTone, Login, ShoppingBasket, SportsBasketball } from "@mui/icons-material";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";

const Outter = styled(Box)(({ theme }) => ({
    width: '280px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '300px', height: '300px',
    boxSizing: 'border-box', width: '250px',
    // height: '280px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between', gap: '6px',
    padding: '8px 8px 18px 8px',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.bg,
    // boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    boxShadow: theme.palette.primary.boxShadow,
    transition: '400ms ease',
    // cursor: 'pointer',
    '&:hover': {
        // width: '305px', height: '305px',
        // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
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
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    // '&:hover': {
    //     // width: '255px', height: '255px',
    //     width: '255px', height: '155px',
    // }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    // height: '100px',
    gap: '6px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))

const NFTCard = ({ nft, col_data }) => {

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
            onClick: () => console.log('test2'),
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
        <ClickAwayListener onClickAway={handleClickAway}>
            {/* <Outter> */}
            <Card>
                <NFTImage sx={{ background: imageURL ? `url(${imageURL}) no-repeat center` : 'primary.bg', }} />
                <DetailsSection >
                    <FlexRow>
                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px', gap: '12px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <Heart size={'15px'} />&nbsp;
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
            {/* </Outter> */}
        </ClickAwayListener>
    );
}

export default NFTCard;