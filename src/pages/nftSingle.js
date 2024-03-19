import { Box, Skeleton, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { PUBLIC_API } from "../utils/data/public_api";
import ButtonPurple from "../components/buttons/buttonPurple";
import { AddComment, ShareSharp } from "@mui/icons-material";
import { ArrowDown2, ArrowUp2, Heart, HeartRemove } from "iconsax-react";
import generateSignature from "../utils/signatureUtils";
import { API_CONFIG } from "../config";
import { ToastContainer, toast } from "react-toastify";
import styled from "@emotion/styled";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import Ycoin from '../assets/Ycoin.svg'
import { CommentInput, NFTCommentCard, ShareSocialsModal } from "../components/utils";
import ButtonBorder from "../components/buttons/buttonBorder";

const NFTOpenImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%', height: '300px',
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
const ForSaleLabel = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center', backgroundColor: theme.palette.primary.yellow, color: 'black', border: '1px solid black',
    alignItems: 'center', width: '60px', height: '20px',
    position: 'absolute', top: '9px', right: '9px'
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

const NFTSingle = ({ theme, switchTheme }) => {
    const [err, setErr] = useState(undefined)
    const params = useParams()
    const id = params.id
    const apiCall = useRef(null)
    const globalUser = useSelector(state => state.userReducer)
    const [tempLikers, setTempLikers] = useState([])
    const [isTransferred, setIsTransferred] = useState(false)
    const [imageURL, setImageURL] = useState(null);
    const [nft, setnft] = useState(undefined)
    const [col_data, setCol_data] = useState(undefined)
    const [commentContent, setCommentContent] = useState(undefined)
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const [ShareModal, setShareModal] = useState(false)
    const handleClose = () => {
        setShareModal(false)
    }

    const getnft = async () => {
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/nft/get/${id}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            console.log(response)
            setnft(response.data.data)
            setCol_data(response.data.data.collection_data)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setErr('no NFT Found')
            } else if (err.status == 500) {
                setErr('error fetching NFT , please try again later')
            }
        }

    }
    useEffect(() => {
        getnft()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    useEffect(() => {
        if (nft && nft.extra) {
            for (let i = 0; i < nft.extra.length; i++) {
                if (nft.extra[i].is_transferred && nft.extra[i].is_transferred == true) {
                    setIsTransferred(true)
                } else {
                    setIsTransferred(false)
                }
            }
        } else {
            setIsTransferred(false)
        }

    }, [nft])

    useEffect(() => {
        let temp = []
        if (nft) {
            if (nft.likes && nft.likes.length > 0 && nft.likes[0].upvoter_screen_cids) {
                for (let i = 0; i < nft.likes[0].upvoter_screen_cids.length; i++) {
                    temp.push(nft.likes[0].upvoter_screen_cids[i].screen_cid)
                }
            }
        }
        setTempLikers(temp)
    }, [nft])
    const getMetadata = () => {
        if (nft.metadata_uri.includes('https://')) {
            setImageURL(nft.metadata_uri)

        } else {

            let mtdata = nft.metadata_uri.includes('::') ? nft.metadata_uri.split("::")[0].replace("ipfs://", "https://ipfs.io/ipfs/") : nft.metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/")
            fetch(mtdata)
                .then((response) => response.json())
                .then((data) => (setImageURL(data.image)))
                .catch((error) => {
                    // Handle any fetch or parsing errors
                    console.error('Error fetching NFT image:', error);
                })
        }
    }
    useEffect(() => {
        if (nft)
            getMetadata()
    }, [nft])
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
                getnft()
            } else {
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    return (<Box sx={{
        bgcolor: 'primary.bg', display: "flex",
        flexDirection: 'column',
        color: 'primary.text', gap: '32px', backgroundColor: 'primary.bg',
        // height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center', boxSizing: 'border-box'
    }}>
        <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
        <Box sx={{
            bgcolor: 'primary.bg', display: "flex",
            flexDirection: 'column', width: '100%',
            color: 'primary.text', gap: '32px', backgroundColor: 'primary.bg',
            justifyContent: 'space-between',
            // height: '100vh',
            alignItems: 'center', px: { xs: '10px', sm: '30px' }, boxSizing: 'border-box'
        }}>
            {err ? <Typography sx={{ textTransform: 'capitalize', color: 'primary.error', my: '200px' }}>{err}</Typography> :
                <>             {!nft ? <Skeleton sx={{ borderRadius: '24px', }} width={'100%'} height={'300px'} /> :
                    <Box sx={(theme) => ({
                        width: '100%', maxWidth: '900px', borderRadius: { xs: '24px', sm: '24px' },
                        display: 'flex',
                        backgroundColor: 'secondary.bg',
                        boxSizing: 'border-box', flexDirection: { xs: 'column', md: 'row' },
                        gap: '20px', padding: { xs: '10px', sm: '10px 12px 10px 12px' }
                    })}>
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
                                <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 500 }}>{nft.nft_name}</Typography>
                                <FlexRow sx={{
                                    justifyContent: 'start !important', width: 'max-content !important'
                                    , gap: '4px'
                                }}>
                                    <Icon url={Ycoin} w={25} h={25} />
                                    <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 600 }}>{nft.current_price}</Typography>
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
                                        {nft.likes && nft.likes.length > 0 && nft.likes[0].upvoter_screen_cids ? nft.likes[0].upvoter_screen_cids.length : 0}
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
                                        {nft.created_at}
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
                                        {nft.nft_description}
                                    </Typography>
                                </FlexColumn>
                                <Line />
                                <FlexColumn sx={{ width: '100%', alignItems: 'start !important', my: { xs: '8px', md: '10px' } }}>
                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {
                                            nft.attributes &&
                                            nft.attributes.map(attr => (
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
                                        Comments : {nft.comments && nft.comments.length > 0 ?
                                            <span>(  <span style={{ color: '#5F5F5F' }}>{selectedCommentIndex + 1}th</span> / <span style={{ color: '#5F5F5F' }}>{nft.comments.length}</span> )</span>
                                            : undefined}</Typography>

                                    {
                                        nft.comments && nft.comments.length > 0 ?
                                            <FlexRow sx={{ gap: '12px', width: '100%', }}>

                                                <NFTCommentCard username={nft.comments[selectedCommentIndex].owner_username}
                                                    profileImg={nft.comments[selectedCommentIndex].owner_avatar}
                                                    comment={nft.comments[selectedCommentIndex].content} />
                                                <FlexColumn sx={{ alignItems: 'space-between !important', color: 'primary.text' }}>
                                                    <ArrowUp2 size='16px' cursor='pointer'
                                                        onClick={() => setSelectedCommentIndex(selectedCommentIndex - 1 >= 0 ? selectedCommentIndex - 1 : selectedCommentIndex)} />
                                                    <ArrowDown2 size='16px' cursor='pointer'
                                                        onClick={() => setSelectedCommentIndex(selectedCommentIndex + 1 >= nft.comments.length ? selectedCommentIndex : selectedCommentIndex + 1)} />
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
                                    }
                                </FlexColumn>
                                <Line />
                                <ButtonBorder
                                    br={'4px'}
                                    onClick={() => setShareModal(true)}
                                    text={<ShareSharp sx={{ color: 'secondary.text' }} />}
                                    w={'40px'} height={'40px'} />

                            </FlexColumn>
                        </FlexColumn>
                    </Box>
                }
                </>
            }
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
            <Footer />
            {nft &&
                <ShareSocialsModal open={ShareModal} handleClose={handleClose} title={'NFT On YouWho'} toShare={`https://youwho.club/nft/${nft.id}/${nft.nft_name}`} />
            }

        </Box>
    </Box >);
}

export default NFTSingle;