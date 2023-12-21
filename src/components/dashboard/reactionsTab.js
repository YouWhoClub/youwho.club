import { Box, TextField, Typography } from "@mui/material";
import { ReactionCard, ReactionCardNew, RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import FilterSelection from "../filterSelection";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { API_CONFIG } from "../../config";
import ButtonOutline from "../buttons/buttonOutline";
import { toast } from "react-toastify";
import generateSignature from "../../utils/signatureUtils";


const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center'
}))

const ReactionsTab = () => {
    const globalUser = useSelector(state => state.userReducer)

    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const handleFilterSelect = (e) => {
        e.preventDefault()
        setFilterValue(e.target.id)
    }
    const handleSortSelect = (e) => {
        e.preventDefault()
        setSortValue(e.target.id)
    }
    const [myInvitations, setMyInvitations] = useState([])
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [sells, setSells] = useState([])
    const [allNotifs, setAllNotifs] = useState([])
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
    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
    }, [])
    const getInvitations = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/i-invited-to/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('invs', response)

        if (!response.is_error) {
            setMyInvitations(response.data)
        } else {
            if (response.status == 404) {
                setMyInvitations([])
            } else {
                setMyInvitations([])
            }
        }
    }
    useEffect(() => {
        if (filterValue == 'invitations') {
            getInvitations()
        }
        else if (filterValue == 'comments') {
            console.log('get-comments')
        }
        else if (filterValue == 'likes') {
            console.log('get-likes')
        }
        else if (filterValue == 'sells') {
            console.log('get-sells')
        } else {
            console.log('get all reactions')
        }
    }, [filterValue])
    const acceptGalleryInvitation = async (receiver, sender, galleryId) => {
        loading()
        let data = {
            owner_cid: sender,
            from_screen_cid: receiver,
            gal_id: galleryId
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/accept/invitation-request`, {
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
            updateToast(true, 'Invitation Accepted')
            getInvitations()
        } else {
            updateToast(false, response.message)
        }
    }
    console.log(new Date(1703178189))
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexDirection: { xs: 'column', lg: 'row' }, gap: '15px', mb: '24px'
                    }}>
                        <FilterSelection width={'280px'} tabs={['likes', 'comments', 'sells', 'invitations', 'all']}
                            text={'Filter'} id={'filter-reaction-tab'}
                            handleSelect={handleFilterSelect} selectValue={filterValue} />
                        <FilterSelection width={'280px'} tabs={['date-time', 'my artworks', 'favorites']}
                            text={'Sort By'} id={'sort-reaction-tab'}
                            handleSelect={handleSortSelect} selectValue={sortValue} />
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', gap: '15px', flexDirection: 'column' }}>
                        {filterValue == 'invitations' &&
                            <>{myInvitations && myInvitations.length > 0 ?
                                <>
                                    {myInvitations.map((invitation) => (
                                        <ReactionCardNew
                                            image={invitation.gallery_background}
                                            action={`Invitation to "${invitation.gal_name}" gallery From "${invitation.owner_username}"`}
                                            text={`it costs free for you`}
                                            date={(new Date(invitation.requested_at * 1000)).toLocaleString()}
                                            popperTabs={[{
                                                text: 'Private Gallery Details',
                                                id: 'reaction-gall-invitation-view',
                                                onClick: () => navigate(`/profile/${invitation.owner_username}`)
                                            }, {
                                                text: `${invitation.owner_username}'s profile`,
                                                id: 'reaction-gall-invitation-profile-view',
                                                onClick: () => navigate(`/profile/${invitation.owner_username}`)
                                            }]}
                                            actionButton={<ButtonOutline
                                                fontSize={'10px'} height={'20px'}
                                                br={'30px'} w={'max-content'} px={'20px'}
                                                text={'Accept'}
                                                onClick={() => acceptGalleryInvitation(invitation.owner_screen_cid, globalUser.cid, invitation.id)} />}
                                        />
                                    ))}</>
                                :
                                <Typography sx={{
                                    color: 'primary.text', textTransform: 'capitalize',
                                    fontSize: '14px', width: '100%', textAlign: 'center'
                                }}>
                                    You have no Invitations Yet
                                </Typography>
                            }
                            </>
                        }
                        {filterValue == 'likes' &&
                            <>{likes && likes.length > 0 ?
                                <>
                                    {likes.map((like) => (
                                        <ReactionCardNew
                                            image={purpleNFT}
                                            action={'like'}
                                            text={`like on nft`}
                                            date={'10.9.2012 12:03AM'} />
                                    ))}</>
                                :
                                <Typography sx={{
                                    color: 'primary.text', textTransform: 'capitalize',
                                    fontSize: '14px', width: '100%', textAlign: 'center'
                                }}>You have no likes Yet</Typography>
                            }
                            </>
                        }
                        {filterValue == 'comments' &&
                            <>{comments && comments.length > 0 ?
                                <>
                                    {comments.map((comment) => (
                                        <ReactionCardNew
                                            image={purpleNFT}
                                            action={'comment'}
                                            text={`comment on nft`}
                                            date={'10.9.2012 12:03AM'} />
                                    ))}</>
                                :
                                <Typography sx={{
                                    color: 'primary.text', textTransform: 'capitalize',
                                    fontSize: '14px', width: '100%', textAlign: 'center'
                                }}>You have no comments Yet
                                </Typography>
                            }
                            </>
                        }
                        {filterValue == 'all' || filterValue == '' ?
                            <> {allNotifs && allNotifs.length > 0 ?
                                <>
                                    {allNotifs.map((react) => (
                                        <ReactionCard
                                            username={'Khosro'}
                                            action={'like'}
                                            active={'You'}
                                            passive={'Khosro'}
                                            nftName={'Blue NFT'}
                                            date={'10.9.2012 12:03AM'}
                                        />
                                    ))}</>
                                :
                                <Typography sx={{
                                    color: 'primary.text', textTransform: 'capitalize',
                                    fontSize: '14px', width: '100%', textAlign: 'center'
                                }}>You have no reactions Yet
                                </Typography>
                            }
                            </> : undefined
                        }
                        {/* <ReactionCard nftImage={purpleNFT} username={'Farhad'} action={'comment'} active={'Farhad'} passive={'you'} nftName={'Purple NFT'} date={'10.9.2012 12:03AM'} />
                        <ReactionCard nftImage={blueNft} 
                        username={'Khosro'} action={'like'} active={'You'} passive={'Khosro'} nftName={'Blue NFT'} date={'10.9.2012 12:03AM'}
                         />
                        <ReactionCard nftImage={pinkNFT} username={'Shirin'} action={'like'} active={'Shirin'} passive={'you'} nftName={'Pink NFT'} date={'10.9.2012 12:03AM'} />
                        <ReactionCard nftImage={torqNFT} username={'Tequilla__'} action={'comment'} active={'You'} passive={'Tequilla__'} nftName={'Turquoise NFT'} date={'10.9.2012 12:03AM'} /> */}
                    </Box>
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
                            to communicate and do activities , you must create your YouWho wallet First
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box >
    );
}

export default ReactionsTab;