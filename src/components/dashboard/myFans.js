import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import purpleNFT from '../../assets/purple-nft.svg'
import { API_CONFIG } from "../../config"

const MyFans = ({ sendAllieRequest, sendFriendRequest,
    shareClick, removeAllie, searchResults, setAllFollowers }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [fans, setFans] = useState([])
    const [friends, setFriends] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [followings, setFollowings] = useState([])
    const navigate = useNavigate()
    const [fansLoading, setFansLoading] = useState(true)
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=0&to=100`, {
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
            console.log(response)
            if (response.data.length > 0) {
                let tempFolls = []
                for (var i = 0; i < response.data.length; i++) {
                    for (var j = 0; j < response.data[i].friends.length; j++) {
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID) {
                            tempFolls.push(response.data[i].user_wallet_info.screen_cid)

                        }
                    }
                }
                setFollowings(tempFolls)
                console.log(tempFolls)
            } else {
                setFollowings([])
            }
        } else {
            if (response.status == 404) {
                setFollowings([])

            } else {
                setErr(response.message)
                console.log(response.message)
            }
        }
    }
    const getFans = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followers/?from=0&to=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('fans', response)

        if (!response.is_error) {
            if (response.data.friends.length > 0) {
                if (friends && friends.length > 0) {
                    let tempFans = []
                    for (let i = 0; i < response.data.friends.length; i++) {
                        if (!friends.includes(response.data.friends[i].screen_cid)) {
                            tempFans.push(response.data.friends[i])
                        }
                    }
                    setFans(tempFans)
                    setAllFollowers(tempFans)
                    setFansLoading(false)

                } else {
                    setAllFollowers(response.data.friends)
                    setFans(response.data.friends)
                    setFansLoading(false)
                }
            } else {
                setAllFollowers([])
                setFans([])
                setFansLoading(false)
            }
        } else {
            if (response.status == 404) {
                setFans([])
                setAllFollowers([])
                setFansLoading(false)

            } else {

                console.log(response.message)
            }
        }
    }
    useEffect(() => {
        if (globalUser.token) {
            getFollowings()
        }
    }, [globalUser.token])
    useEffect(() => {
        if (followings) {
            console.log(followings, 'my followings')
            getFans()
        }
    }, [followings])
    return (
        <>{fansLoading ? <CircularProgress /> :
            <>{searchResults ?
                <>
                    {searchResults.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {searchResults.map((fan, index) => (
                                    <RelationCard
                                        getSuggestions={getFollowings}
                                        removeAllie={() => {
                                            removeAllie(fan.screen_cid, globalUser.cid)
                                            getFans()
                                        }}
                                        image={fan.avatar} username={fan.username} allies={true}
                                        sendAllieRequest={() => sendAllieRequest(fan.screen_cid, globalUser.cid)}
                                        ywid={fan.screen_cid}
                                        sendFriendRequest={() => sendFriendRequest(fan.screen_cid, globalUser.cid)}
                                        shareClick={shareClick} />
                                ))}
                            </Box>
                        </>
                        : <Typography
                            sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            No results
                        </Typography>}
                </>
                :
                <>{fans.length > 0 ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                        {fans.map((fan, index) => (
                            <RelationCard
                                getSuggestions={getFriends}
                                removeAllie={() => {
                                    removeAllie(fan.screen_cid, globalUser.cid)
                                    getFans()
                                }}
                                image={fan.user_avatar} username={fan.username} allies={true}
                                ywid={fan.screen_cid}

                                sendAllieRequest={() => sendAllieRequest(fan.screen_cid, globalUser.cid)}

                                sendFriendRequest={() => sendFriendRequest(fan.screen_cid, globalUser.cid)}
                                shareClick={shareClick} />
                        ))}
                    </Box>
                    : <Typography
                        sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        Dear {globalUser.username} you dont have any allies yet</Typography>}
                </>
            }
            </>
        }
        </>
    );
}

export default MyFans;