import { Box, CircularProgress, Modal, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import { API_CONFIG } from "../../config"
import Pagination from "../pagination"

const MyFriends = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend, searchResults, setAllFriends }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [friends, setFriends] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()

    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)


    const [FriendsLoading, setFriendsLoading] = useState(true)
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=${from}&to=${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('frieds', response)

        if (!response.is_error) {
            // setAllFriends(response.data.friends)
            // setFriends(response.data.friends)
            // setFriendsLoading(false)

            let frndsArr = response.data.friends.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
            setAllFriends(frndsArr)
            setFriends(frndsArr)
            setFriendsLoading(false)

            if (response.data.friends.length >= 15) {
                let pagTabs = []
                let tabNums = response.data.friends.length / 15
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
            if (response.status == 404) {
                setAllFriends([])
                setFriends([])
                setFriendsLoading(false)

            } else {

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
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        getFriends()
    }, [to])

    return (<>{FriendsLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((friend, index) => (
                                <RelationCard
                                    isAccepted={true}
                                    amFollowing={true}
                                    ywid={friend.screen_cid}

                                    removeFriend={() => {
                                        removeFriend(friend.screen_cid, globalUser.cid)
                                        getFriends()
                                    }}
                                    image={friend.user_avatar} username={friend.username} friend={true}
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
            <>{friends.length > 0 ?
                <Box sx={{ display: 'flex',alignItems: 'center',  flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {friends.map((friend, index) => (
                        <RelationCard
                            isAccepted={true}
                            // removeAllie={() => removeAllie(friend.screen_cid, globalUser.cid)}
                            removeFriend={() => {
                                removeFriend(friend.screen_cid, globalUser.cid)
                                getFriends()
                            }}
                            amFollowing={true}
                            ywid={friend.screen_cid}

                            image={friend.user_avatar} username={friend.username} friend={true}
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
                    Dear {globalUser.username} you dont have any friends yet</Typography>}
            </>
        }
        </>
    }



    </>
    );
}

export default MyFriends;