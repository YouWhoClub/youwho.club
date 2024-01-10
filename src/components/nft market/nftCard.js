import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Heart, More } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { MorePopper, YouwhoCoinIcon } from "../utils";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Comment, CommentBankOutlined } from "@mui/icons-material";

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
    gap:'6px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))

const NFTCard = ({ nft, }) => {

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
        { text: 'Details', id: 'nft-card-details', onClick: () => console.log('test1') },
        { text: 'Details', id: 'nft-card-details', onClick: () => console.log('test2') },
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
                                <Heart size={'15px'} />&nbsp;{likes.length}
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
                    <MorePopper tabs={moretabs} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                </DetailsSection>
            </Card>
            {/* </Outter> */}
        </ClickAwayListener>
    );
}

export default NFTCard;