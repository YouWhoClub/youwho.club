import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { FriendRequestCard, RelationCard } from "../utils";
import { useEffect, useRef, useState } from "react";
import generateSignature from "../../utils/signatureUtils";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import Pagination from "../pagination";

const MySentRequests = ({
    sendAllieRequest, sendFriendRequest, shareClick, removeFriend, searchResults, activeTab, removeFollowing }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [reqsLoading, setReqsLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [isAccepted, setIsAccepted] = useState([])
    const [followings, setFollowings] = useState([])
    const [friends, setFriends] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)

    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=0&to=200`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('friennnds', response)

        if (!response.is_error) {
            if (response.data.friends.length > 0) {
                let tempfrnds = []
                for (let a = 0; a < response.data.friends.length; a++) {
                    tempfrnds.push(response.data.friends[a].screen_cid)
                }
                setFriends(tempfrnds)
            }
            else {
                setFriends([])

            }
        } else {
            if (response.status == 404) {
                setFriends([])

            } else {
                console.log(response.message)
            }
        }
    }
    const getRequests = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=${from}&to=${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('followings', response)

        if (!response.is_error) {
            console.log(response)
            if (response.data.length > 0) {
                let tempFolls = []
                for (var i = 0; i < response.data.length; i++) {
                    for (var j = 0; j < response.data[i].friends.length; j++) {
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID && response.data[i].friends[j].is_accepted == false && !friends.includes(response.data[i].user_wallet_info.screen_cid)) {
                            tempFolls.push(response.data[i].user_wallet_info)

                        }
                    }
                }
                // setRequests(tempFolls)
                // console.log(tempFolls)
                // setReqsLoading(false)
                let frndsArr = tempFolls.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
                setRequests(frndsArr)
                console.log(frndsArr)
                setReqsLoading(false)

                if (response.data.length >= 15) {
                    let pagTabs = []
                    let tabNums = response.data.length / 15
                    for (let i = 0; i < tabNums; i++) {
                        pagTabs.push(i + 1)
                    }
                    setPgTabs(pagTabs)
                    console.log(tabNums)
                    console.log(pagTabs)
                } else {
                    console.log('getting frnds !')
                }

            } else {
                setRequests([])
                setReqsLoading(false)
            }
        } else {
            if (response.status == 404) {
                setRequests([])
                setReqsLoading(false)

            } else {
                setErr(response.message)
                console.log(response.message)
            }
        }
    }


    useEffect(() => {
        if (globalUser.token) {
            getFriends()
        }
    }, [globalUser.token])
    useEffect(() => {
        if (friends) {
            console.log(friends, 'my friends')
            getRequests()
        }
    }, [friends])
    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        if (to && friends)
            getRequests()
    }, [to, friends])

    return (<>{reqsLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((friend, index) => (
                                <RelationCard
                                    ywid={friend.screen_cid}
                                    amFollowing={true}
                                    isAccepted={false}
                                    activeTab={activeTab}
                                    removeFollowing={() => removeFollowing(friend.screen_cid, globalUser.cid)}
                                    removeFriend={() => {
                                        removeFriend(friend.screen_cid, globalUser.cid)
                                        getRequests()
                                    }}
                                    image={friend.avatar} username={friend.username} friend={true}
                                    sendAllieRequest={() => sendAllieRequest(friend.screen_cid, globalUser.cid)}
                                    sendFriendRequest={() => sendFriendRequest(friend.screen_cid, globalUser.cid)}
                                    shareClick={shareClick}
                                />
                            ))}
                        </Box>
                    </>
                    : <Typography
                        sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        No results
                    </Typography>}
            </>
            :
            <>{requests.length > 0 ?
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {requests.map((friend, index) => (
                        <RelationCard
                            isAccepted={false}
                            activeTab={activeTab}
                            removeFollowing={() => removeFollowing(friend.screen_cid, globalUser.cid)}
                            amFollowing={true}
                            ywid={friend.screen_cid}
                            removeFriend={() => removeFriend(friend.screen_cid, globalUser.cid)}
                            image={friend.avatar} username={friend.username} friend={true}
                            sendAllieRequest={() => sendAllieRequest(friend.screen_cid, globalUser.cid)}
                            sendFriendRequest={() => sendFriendRequest(friend.screen_cid, globalUser.cid)}
                            shareClick={shareClick}
                        />
                    ))}
                    <Box sx={{ mt: '30px' }}>
                        <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                    </Box>

                </Box>
                : <Typography
                    sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                    Dear {globalUser.username} you dont have any followings yet</Typography>}
            </>
        }
        </>
    }



    </>
    );
}

export default MySentRequests;