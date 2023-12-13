import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { MyInput, RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../../utils/data/auth_api";
import { useDispatch, useSelector } from "react-redux";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useNavigate } from "react-router";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";
import API from "../../utils/api";
import MyFriendequests from "./myFriendRequests";
import MyFans from "./myFans";
import MyFriends from "./myFriends";
import { toast } from 'react-toastify';
import { setPrivateKey } from "../../redux/actions";
import ButtonPurple from "../buttons/buttonPurple";
import MyFriendSuggestions from "./myFriendSuggestions";
import { PUBLIC_API } from "../../utils/data/public_api";
const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
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
const Container = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow
}))

const RelationsTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [activeTab, setActiveTab] = useState('my-friends')
    const [FollowingsLoading, setFollowingsLoading] = useState(true)
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [signer, setSigner] = useState(undefined)
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])
    const [friends, setFriends] = useState([])
    const [allRequests, setAllRequests] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [searchResults, setSearchResults] = useState(undefined)
    const dispatch = useDispatch();
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const sendFriendRequest = async (receiver, sender) => {
        loading();

        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
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
            updateToast(true, 'Friend Request Sent')
        } else {
            updateToast(false, response.message)
        }
    }
    const sendAllieRequest = async (receiver, sender,) => {
        loading();

        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
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
            updateToast(true, 'Friend Request Sent')
        } else {
            updateToast(false, response.message)
        }

    }
    const removeFriend = async (receiver, sender) => {
        console.log('remove-friend-request');
    }
    const removeAllie = async (receiver, sender) => {
        console.log('remove-ally-request');

    }
    const shareClick = async (id) => {
        console.log(id)
    }
    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }
    const getFollowings = async () => {


        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('followings', response)

        if (!response.is_error) {

            if (response.data.length > 0) {
                let tempFolls = []
                for (var i = 0; i < response.data.length; i++) {
                    // let tempFoll = {}
                    // tempFoll.ywid = response.data[i].user_screen_cid
                    tempFolls.push(response.data[i].user_screen_cid)
                }
                setFollowings(tempFolls)
                console.log(tempFolls)
                setFollowingsLoading(false)
            } else {
                setFollowings([])
                setFollowingsLoading(false)
            }
        } else {
            if (response.status == 404) {
                setFollowings([])
                setFollowingsLoading(false)

            } else {
                setErr(response.message)
                console.log(response.message)
            }
        }
    }
    const search = async (q, from, to) => {
        if (q == '') {
            setSearchResults(undefined)
            return
        }
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/search/?q=${q}&from=${from}&to=${to}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            if (activeTab == 'expansion-of-communication') {
                let tempSuggs = []
                for (var d = 0; d < suggestions.length; d++) {
                    tempSuggs.push(suggestions[d].screen_cid)
                }
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempSuggs.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
            else if (activeTab == 'my-allies') {
                let tempFans = []
                for (var d = 0; d < followers.length; d++) {
                    tempFans.push(followers[d].screen_cid)
                }
                console.log(tempFans)
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempFans.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
            else if (activeTab == 'my-friends') {
                let tempFriends = []
                for (var d = 0; d < friends.length; d++) {
                    tempFriends.push(friends[d].screen_cid)
                }
                console.log(tempFriends)
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempFriends.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
            else if (activeTab == 'my-requests') {
                let tempRequests = []
                for (var d = 0; d < allRequests.length; d++) {
                    tempRequests.push(allRequests[d].screen_cid)
                }
                console.log(tempRequests)
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempRequests.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
            else setSearchResults(undefined)
        }
        catch (err) {
            if (err.status == 404) {
                setSearchResults([])
            } else {
                setSearchResults([])
            }
        }

    }
    const changeTab = (e) => {
        setSearchResults(undefined)
        setActiveTab(e.target.id)
    }
    useEffect(() => {
        if (globalUser.token) {
            getFollowings()
        }
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
        // return () => {
        //     if (apiCall.current !== undefined) {
        //         apiCall.current.cancel();
        //     }
        // }

    }, [globalUser.token])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    {globalUser.privateKey ?
                        <>
                            <SubTabs jc={'center'}>
                                <SubTab id={"my-requests"} onClick={changeTab} text={'My Requests'} selected={activeTab == 'my-requests'} />
                                <SubTab id={"my-allies"} onClick={changeTab} text={'My Allies'} selected={activeTab == 'my-allies'} />
                                <SubTab id={"my-friends"} onClick={changeTab} text={'My Friends'} selected={activeTab == 'my-friends'} />
                                <SubTab id={"expansion-of-communication"} onClick={changeTab} text={'Expansion of communication '} selected={activeTab == 'expansion-of-communication'} />
                            </SubTabs>
                            <FilterSelectionBox sx={{ padding: '8px 16px', my: '24px' }}>
                                <span style={{ width: '180px', fontSize: '14px' }}>
                                    Search Username:
                                </span>
                                <input style={{
                                    height: '20px',
                                    backgroundColor: 'transparent', border: 'none', outline: 'none',
                                    color: '#c2c2c2', width: '100%'
                                }}
                                    onChange={(e) => search(e.target.value, 0, 20)} />
                            </FilterSelectionBox>
                            {activeTab == 'my-requests' &&
                                <MyFriendequests setAllRequests={setAllRequests} searchResults={searchResults} getFollowings={getFollowings} />
                            }
                            {activeTab == 'my-allies' &&
                                <MyFans sendAllieRequest={sendAllieRequest}
                                    sendFriendRequest={sendFriendRequest} shareClick={shareClick}
                                    removeAllie={removeAllie} removeFriend={removeFriend}
                                    followings={followings} searchResults={searchResults} setAllFollowers={setFollowers}
                                />
                            }
                            {activeTab == 'my-friends' &&
                                <MyFriends sendAllieRequest={sendAllieRequest}
                                    sendFriendRequest={sendFriendRequest} shareClick={shareClick}
                                    removeAllie={removeAllie} removeFriend={removeFriend}
                                    searchResults={searchResults} setAllFriends={setFriends} />
                            }
                            {activeTab == 'expansion-of-communication' &&
                                <MyFriendSuggestions sendAllieRequest={sendAllieRequest}
                                    sendFriendRequest={sendFriendRequest} shareClick={shareClick}
                                    removeAllie={removeAllie} removeFriend={removeFriend}
                                    searchResults={searchResults} setAllSuggestions={setSuggestions}
                                />
                            }
                        </>
                        :
                        <Container sx={{ mb: '24px' }}>
                            <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                                We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                            </Typography>
                            <MyInput
                                value={signer}
                                onChange={(e) => setSigner(e.target.value)}
                                placeholder="enter private key"
                                width={'100%'}
                                textColor={'black'}
                                py={'8px'} />
                            <ButtonPurple onClick={savePrivateKey} height='35px' text={'Save'} />
                        </Container>
                    }
                </> :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                        <Typography
                            sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.mail}
                                &nbsp;
                            </b>
                            to have friends or fans , you must create your youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box>
    );
}

export default RelationsTab;