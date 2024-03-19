import { Box, CircularProgress, Modal, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import { API_CONFIG } from "../../config"
import Pagination from "../pagination"

const MyFollowings = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend, searchResults, setAllFriends }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [followings, setFollowings] = useState([])
    const [friends, setFriends] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [followingsLoading, setFollowingsLoading] = useState(true)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)

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
    const getFollowings = async () => {
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
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID && response.data[i].friends[j].is_accepted == true && !friends.includes(response.data[i].user_wallet_info.screen_cid)) {
                            tempFolls.push(response.data[i].user_wallet_info)

                        }
                    }
                }
                // setFollowings(tempFolls)
                let fllsArr = tempFolls.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
                setFollowings(fllsArr)
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
                    console.log('getting fans !')
                }

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
    useEffect(() => {
        if (globalUser.token) {
            getFriends()
        }
    }, [globalUser.token])
    useEffect(() => {
        if (friends) {
            console.log(friends, 'my friends')
            getFollowings()
        }
    }, [friends])
    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        if (to && friends)
            getFollowings()
    }, [to, friends])

    return (<>{followingsLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((friend, index) => (
                                <RelationCard
                                    ywid={friend.screen_cid}
                                    amFollowing={true}
                                    isAccepted={true}
                                    removeFriend={() => {
                                        removeFriend(friend.screen_cid, globalUser.cid)
                                        getFollowings()
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
            <>{followings.length > 0 ?
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {followings.map((friend, index) => (
                        <RelationCard
                            amFollowing={true}
                            isAccepted={true}
                            ywid={friend.screen_cid}
                            // removeAllie={() => removeAllie(friend.screen_cid, globalUser.cid)}
                            removeFriend={() => {
                                removeFriend(friend.screen_cid, globalUser.cid)
                                getFollowings()
                            }}
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

export default MyFollowings;