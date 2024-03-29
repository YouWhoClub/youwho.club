import { Box, Skeleton, TextField, Typography } from "@mui/material";
import { RelationCard, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../../utils/data/auth_api";
import { useSelector } from "react-redux";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useNavigate } from "react-router";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";
import API from "../../utils/api";
import TheirAllies from "./TheirAllies";
import TheirFriends from "./TheirFriends";
import { PUBLIC_API } from "../../utils/data/public_api";
import { toast } from "react-toastify";
import TheirFollowings from "./TheirFollowings";
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
const RelationsTab = ({ user }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [activeTab, setActiveTab] = useState('their-fans')
    const [followers, setFollowers] = useState([])
    const [friends, setFriends] = useState([])
    const [followings, setFollowings] = useState([])
    const [myReqs, setMyReqs] = useState([])
    const [err, setErr] = useState(undefined)
    const [searchResults, setSearchResults] = useState(undefined)
    const [relationsLoading, setRelationsLoading] = useState(true)
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

    const getRelations = async () => {
        console.log(user)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/relations/for/${user.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('relations', response)

        if (!response.is_error) {
            let tempFriends = response.data.friends.friends
            let tempFriendsWallets = []
            for (let a = 0; a < response.data.friends.friends.length; a++) {
                tempFriendsWallets.push(response.data.friends.friends[a].screen_cid)
            }

            let tempFolls = []
            if (response.data.followings.length > 0) {
                for (var i = 0; i < response.data.followings.length; i++) {
                    if (!tempFriendsWallets.includes(response.data.followings[i].user_wallet_info.screen_cid)) {
                        for (var j = 0; j < response.data.followings[i].friends.length; j++) {
                            if (response.data.followings[i].friends[j].screen_cid == user.YouWhoID && response.data.followings[i].friends[j].is_accepted == true)
                                tempFolls.push(response.data.followings[i].user_wallet_info)
                        }
                    }
                }
            } else {
                tempFolls = []
            }
            let tempFans = []
            for (let i = 0; i < response.data.followers.friends.length; i++) {
                if (!tempFolls.includes(response.data.followers.friends[i].screen_cid)) {
                    tempFans.push(response.data.followers.friends[i])
                }
            }
            setFriends(tempFriends)
            setFollowers(tempFans)
            setFollowings(tempFolls)
            setRelationsLoading(false)

            console.log('frnds', tempFriends)
            console.log('flwngs', tempFolls)
            console.log('flwrs', tempFans)
        } else {
            if (response.status == 404) {
                setFriends([])
                setFollowers([])
                setRelationsLoading(false)
            } else {
                console.log('relations', response)
                setRelationsLoading(true)
            }
        }
    }
    useEffect(() => {
        if (globalUser.token && user && user.YouWhoID) {
            getMyFollowings()
            getRelations()
        }
    }, [globalUser.token, user, user.YouWhoID])
    const changeTab = (e) => {
        setSearchResults(undefined)
        setActiveTab(e.target.id)
    }
    // const search = async (q, from, to) => {
    //     if (q == '') {
    //         setSearchResults(undefined)
    //         return
    //     }
    //     try {
    //         apiCall.current = PUBLIC_API.request({
    //             path: `/search/?q=${q}&from=${from}&to=${to}`,
    //             method: 'get',
    //         });
    //         let response = await apiCall.current.promise;
    //         if (!response.isSuccess)
    //             throw response
    //         else if (activeTab == 'their-fans') {
    //             let tempFans = []
    //             for (var d = 0; d < followers.length; d++) {
    //                 tempFans.push(followers[d].screen_cid)
    //             }
    //             console.log(tempFans)
    //             let tempArr = []
    //             for (var j = 0; j < response.data.data.users.length; j++) {
    //                 if (tempFans.includes(response.data.data.users[j].screen_cid)) {
    //                     tempArr.push(response.data.data.users[j])
    //                 }
    //             }
    //             setSearchResults(tempArr)
    //         }
    //         else if (activeTab == 'their-friends') {
    //             let tempFriends = []
    //             for (var d = 0; d < friends.length; d++) {
    //                 tempFriends.push(friends[d].screen_cid)
    //             }
    //             console.log(tempFriends)
    //             let tempArr = []
    //             for (var j = 0; j < response.data.data.users.length; j++) {
    //                 if (tempFriends.includes(response.data.data.users[j].screen_cid)) {
    //                     tempArr.push(response.data.data.users[j])
    //                 }
    //             }
    //             setSearchResults(tempArr)
    //         }
    //         else setSearchResults(undefined)
    //     }
    //     catch (err) {
    //         if (err.status == 404) {
    //             setSearchResults([])
    //         } else {
    //             setSearchResults([])
    //         }
    //     }

    // }
    const search = async (q, from, to) => {
        if (q == '') {
            setSearchResults(undefined)
            return
        }
        try {
            apiCall.current = AUTH_API.request({
                path: `/fan/search/relations/for/${user.YouWhoID}/?q=${q}`,
                method: 'get', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            if (activeTab == 'their-friends') {
                setSearchResults(response.data.data.friends.friends)
            } else if (activeTab == 'their-fans') {
                setSearchResults(response.data.data.followers.friends)
            } else if (activeTab == 'their-followings') {
                let tempFolls = []
                let tempFriendsWallets = []
                for (let a = 0; a < response.data.data.friends.friends.length; a++) {
                    tempFriendsWallets.push(response.data.data.friends.friends[a].screen_cid)
                }
                if (response.data.data.followings.length > 0) {
                    for (var i = 0; i < response.data.data.followings.length; i++) {
                        if (!tempFriendsWallets.includes(response.data.data.followings[i].user_wallet_info.screen_cid)) {
                            for (var j = 0; j < response.data.data.followings[i].friends.length; j++) {
                                if (response.data.data.followings[i].friends[j].screen_cid == user.YouWhoID && response.data.data.followings[i].friends[j].is_accepted == true)
                                    tempFolls.push(response.data.data.followings[i].user_wallet_info)
                            }
                        }
                    }
                } else {
                    tempFolls = []
                }
                setSearchResults(tempFolls)
            }
        }
        catch (err) {
            if (err.status == 404) {
                setSearchResults([])
            } else {
                setSearchResults([])
            }
        }

    }

    const sendFriendRequest = async (receiver, sender) => {
        loading();
        let current_tab = activeTab
        setActiveTab('loading')

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
            getRelations()
            setActiveTab(current_tab)
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
        loading();

        let data = {
            owner_cid: sender,
            friend_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/remove/friend`, {
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
            updateToast(true, 'Friend Removed')
            getRelations()
        } else {
            updateToast(false, response.message)
        }
    }
    const removeAllie = async (receiver, sender) => {
        loading();

        let data = {
            owner_cid: sender,
            follower_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/remove/follower`, {
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
            updateToast(true, 'Follower Removed')
            getRelations()
        } else {
            updateToast(false, response.message)
        }

    }
    const [myFollowings, setMyFollowings] = useState([])

    const getMyFollowings = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=100`, {
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
                let tempReqs = []
                for (var i = 0; i < response.data.length; i++) {
                    for (var j = 0; j < response.data[i].friends.length; j++) {
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID && response.data[i].friends[j].is_accepted == true) {
                            tempFolls.push(response.data[i].user_wallet_info.screen_cid)
                        }
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID && response.data[i].friends[j].is_accepted == false) {
                            tempReqs.push(response.data[i].user_wallet_info.screen_cid)
                        }

                    }
                }
                setMyFollowings(tempFolls)
                setMyReqs(tempReqs)
                console.log(tempFolls)
            } else {
                setMyFollowings([])
                setMyReqs([])
            }
        } else {
            if (response.status == 404) {
                setMyReqs([])
                setMyFollowings([])

            } else {
                setErr(response.message)
                console.log(response.message)
            }
        }
    }
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            width: '100%',
            maxWidth: '900px',
            //  my: '10px' 
        }}>
            <SubTabs jc={'center'}>
                <SubTab id={"their-fans"}
                    onClick={changeTab}
                    text={`${user.username}'s Fans`} selected={activeTab == 'their-fans'} />
                <SubTab id={"their-friends"}
                    onClick={changeTab}
                    text={`${user.username}'s Friends`} selected={activeTab == 'their-friends'} />
                <SubTab id={"their-followings"}
                    onClick={changeTab}
                    text={`${user.username}'s Followings`} selected={activeTab == 'their-followings'} />
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
                    onChange={(e) => search(e.target.value, 0, 20)}
                />
            </FilterSelectionBox>
            {activeTab == 'their-fans' &&
                <TheirAllies
                    sendAllieRequest={sendAllieRequest}
                    sendFriendRequest={sendFriendRequest}
                    removeAllie={removeAllie} removeFriend={removeFriend}
                    fans={followers} myFollowings={myFollowings}
                    myReqs={myReqs}
                    fansLoading={relationsLoading}
                    user={user} searchResults={searchResults} />}
            {activeTab == 'their-friends' &&
                <TheirFriends
                    myReqs={myReqs}
                    myFollowings={myFollowings}
                    sendAllieRequest={sendAllieRequest}
                    sendFriendRequest={sendFriendRequest}
                    removeAllie={removeAllie} removeFriend={removeFriend}
                    friends={friends} friendsLoading={relationsLoading}
                    user={user} searchResults={searchResults} />}
            {activeTab == 'their-followings' &&
                <TheirFollowings
                    myReqs={myReqs}
                    myFollowings={myFollowings}
                    sendAllieRequest={sendAllieRequest}
                    sendFriendRequest={sendFriendRequest}
                    removeAllie={removeAllie} removeFriend={removeFriend}
                    followings={followings} followingsLoading={relationsLoading}
                    user={user} searchResults={searchResults} />}
            {activeTab == 'loading' &&
                <Box sx={{ width: '100%', height: '100%', borderRadius: '24px', bgcolor: 'bgOp' }}>
                    <Skeleton sx={{ borderRadius: '16px', }} width={'100%'} height={'400px'} />
                </Box>
            }

        </Box>
    );
}

export default RelationsTab;