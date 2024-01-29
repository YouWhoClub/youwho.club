import { Box, CircularProgress, Modal, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import purpleNFT from '../../assets/purple-nft.svg'
import { API_CONFIG } from "../../config"

const MyFollowings = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend, searchResults, setAllFriends }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [followings, setFollowings] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [followingsLoading, setFollowingsLoading] = useState(true)
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

            if (response.data.length > 0) {
                let tempFolls = []
                for (var i = 0; i < response.data.length; i++) {
                    for (var j = 0; j < response.data[i].friends.length; j++) {
                        if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID && response.data[i].friends[j].is_accepted == true) {
                            tempFolls.push(response.data[i].user_wallet_info)

                        }
                    }
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
    useEffect(() => {
        if (globalUser.token) {
            getFollowings()
        }
    }, [globalUser.token])

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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {followings.map((friend, index) => (
                        <RelationCard
                            amFollowing={true}
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