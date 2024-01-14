import { Box, TextField, Typography } from "@mui/material";
import { BulletFiltering, ReactionCard, ReactionCardNew, RelationCard, SubTab, SubTabs } from "../utils";
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

    const [filterValue, setFilterValue] = useState('likes')
    const [sortValue, setSortValue] = useState('')
    const handleFilterSelect = (e) => {
        e.preventDefault()
        setFilterValue(e.target.id)
    }
    const handleSortSelect = (e) => {
        e.preventDefault()
        setSortValue(e.target.id)
    }
    const filterOptions = ['likes', 'comments', 'invitations', 'lists']

    const [myInvitations, setMyInvitations] = useState([])
    const [allReactions, setallReactions] = useState([])
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [sells, setSells] = useState([])
    const [lists, setLists] = useState([])
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
    const getrctns = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/reaction/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('acts', response)

        if (!response.is_error) {
            setallReactions(response.data)
            let cms = []
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < response.data[i].comments.length; j++) {
                    let tempObj = response.data[i].comments[j]
                    tempObj.published_at = new Date(response.data[i].comments[j].published_at * 1000).toLocaleString()
                    tempObj.nft_metadata = response.data[i].nft_metadata_uri
                    cms.push(tempObj)
                }
            }
            console.log('cms', cms)
            setComments(cms)
        } else {
            if (response.status == 404) {
                setallReactions([])
            } else {
                setallReactions([])
            }
        }
    }
    useEffect(() => {
        if (filterValue == 'invitations') {
            getInvitations()
        }
        else if (filterValue == 'comments') {
            getAllReactions()
        }
        else if (filterValue == 'likes') {
            getAllReactions()
        }
        else if (filterValue == 'lists') {
            getAllReactions()
        }
        else if (filterValue == 'sells') {
            console.log('get-sells')
        } else {
            getAllReactions()
        }
    }, [filterValue])
    // useEffect(() => {
    //     getAllReactions()
    // }, [sortValue])
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
    const getAllReactions = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/notifs/get/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('acts', response)
        if (!response.is_error) {
            setAllNotifs(response.data.notifs)
            let cms = []
            for (let i = 0; i < response.data.notifs.length; i++) {
                if (response.data.notifs[i].action_type == "CommentNft") {
                    cms.push(response.data.notifs[i])
                }
            }
            let likess = []
            for (let j = 0; j < response.data.notifs.length; j++) {
                if (response.data.notifs[j].action_type == "LikeNft" || response.data.notifs[j].action_type == "DislikeNft") {
                    likess.push(response.data.notifs[j])
                }
            }
            let listss = []
            for (let j = 0; j < response.data.notifs.length; j++) {
                if (response.data.notifs[j].action_type == "ListNft" || response.data.notifs[j].action_type == "DelistNft") {
                    listss.push(response.data.notifs[j])
                }
            }
            // if (sortValue == 'date-time') {
            //     cms.sort((a, b) => a.fired_at > b.fired_at)
            //     likess.sort((a, b) => a.fired_at > b.fired_at)

            // } else if (sortValue == 'highest-price') {
            //     cms.sort((a, b) => a.action_data.current_price > b.action_data.current_price)
            //     likess.sort((a, b) => a.action_data.current_price > b.action_data.current_price)
            // } else {
            //     console.log('nada')
            // }

            console.log(cms)
            console.log(likess)

            setLists(listss)
            setComments(cms)
            setLikes(likess)

        } else {
            console.log(response)

        }
    }
    const setActionObject = (reaction) => {
        if (reaction.action_type == 'UpdatePrivateGallery') {
            return {
                username: reaction.actioner_wallet_info.username,
                action: 'updated private gallery',
                gal_name: reaction.action_data.gal_name,
                gal_img: reaction.gallery_background
            }
        }
        else if (reaction.action_type == "LikeNft") {
            return {
                username: reaction.actioner_wallet_info.username,
                action: 'liked NFT',
                nft_name: reaction.action_data.nft_name,
                metadata: reaction.action_data.metadata_uri
            }
        }
        else if (reaction.action_type == "DislikeNft") {
            return {
                username: reaction.actioner_wallet_info.username,
                action: 'disliked NFT',
                nft_name: reaction.action_data.nft_name,
                metadata: reaction.action_data.metadata_uri
            }
        }
        else if (reaction.action_type == "CommentNft") {
            return {
                username: reaction.actioner_wallet_info.username,
                action: 'commented on NFT',
                nft_name: reaction.action_data.nft_name,
                metadata: reaction.action_data.metadata_uri
            }
        }
        else { return reaction }

    }
    console.log(new Date(1703178189))
    return (
        <Box sx={{
            width: '100%', maxWidth: '700px',
            // maxWidth: '1000px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            {globalUser.cid ?
                <>
                    {/* <Box sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexDirection: { xs: 'column', lg: 'row' }, gap: '15px', mb: '24px'
                    }}>
                        <FilterSelection width={'280px'} tabs={['likes', 'comments', 'invitations', 'lists']}
                            text={'Filter'} id={'filter-reaction-tab'}
                            handleSelect={handleFilterSelect} selectValue={filterValue} />
                        <FilterSelection width={'280px'} tabs={['date-time', 'highest-price'
                            //  'my artworks', 'favorites'
                        ]}
                            text={'Sort By'} id={'sort-reaction-tab'}
                            handleSelect={handleSortSelect} selectValue={sortValue} />
                    </Box> */}
                    <BulletFiltering setOption={setFilterValue} options={filterOptions} selected={filterValue} fontSize={'14px'} width={'100%'} />

                    <Box sx={{ display: 'flex', width: '100%', gap: '15px', flexDirection: 'column', mt: '24px' }}>
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
                                            popperTabs={[
                                                {
                                                    text: `${like.actioner_wallet_info.username}'s profile`,
                                                    id: 'rction-user-profile',
                                                    onClick: () => navigate(`/profile/${like.actioner_wallet_info.username}`)
                                                },
                                            ]}
                                            metadata_uri={like.action_data.metadata_uri}
                                            action={like.action_type == 'LikeNft' ? 'like' : 'dislike'}
                                            text={`${like.actioner_wallet_info.screen_cid == globalUser.YouWhoID ? 'You' : like.actioner_wallet_info.username} ${like.action_type == 'LikeNft' ? 'liked' : 'disliked'} ${like.action_data.nft_name} NFT`}
                                            date={(new Date(like.fired_at * 1000)).toLocaleString()} />
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
                                            popperTabs={[
                                                {
                                                    text: `${comment.actioner_wallet_info.username}'s profile`,
                                                    id: 'rction-user-profile',
                                                    onClick: () => navigate(`/profile/${comment.actioner_wallet_info.username}`)
                                                },
                                            ]}
                                            metadata_uri={comment.action_data.metadata_uri}
                                            action={'comment'}
                                            text={`${comment.actioner_wallet_info.screen_cid == globalUser.YouWhoID ? 'You' : comment.actioner_wallet_info.username} commented on ${comment.action_data.nft_name} NFT`}
                                            date={(new Date(comment.fired_at * 1000)).toLocaleString()} />
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
                        {filterValue == 'lists' &&
                            <>{lists && lists.length > 0 ?
                                <>
                                    {lists.map((list) => (
                                        <ReactionCardNew
                                            metadata_uri={list.action_data.metadata_uri}
                                            action={list.action_type == 'ListNft' ? 'list' : 'unlist'}
                                            text={`${list.actioner_wallet_info.screen_cid == globalUser.YouWhoID ? 'You' : list.actioner_wallet_info.username} ${list.action_type == 'ListNft' ? 'listed' : 'unlisted'} ${list.action_data.nft_name} NFT`}
                                            date={(new Date(list.fired_at * 1000)).toLocaleString()} />
                                    ))}
                                </>
                                :
                                <Typography sx={{
                                    color: 'primary.text', textTransform: 'capitalize',
                                    fontSize: '14px', width: '100%', textAlign: 'center'
                                }}>
                                    You have no list notifications Yet
                                </Typography>
                            }
                            </>
                        }
                        {filterValue == '' ?
                            <> {allNotifs && allNotifs.length > 0 ?
                                <>
                                    {allNotifs.map((react) => (
                                        <ReactionCard
                                            username={react.actioner_wallet_info.screen_cid == globalUser.YouWhoID ? 'You' : react.actioner_wallet_info.username}
                                            action={react.action_type}
                                            active={react.actioner_wallet_info.screen_cid == globalUser.YouWhoID ? 'You' : react.actioner_wallet_info.username}
                                            // passive={'Khosro'}
                                            // nftName={'Blue NFT'}
                                            date={(new Date(react.fired_at * 1000)).toLocaleString()}
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