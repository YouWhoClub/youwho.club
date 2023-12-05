import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import purpleNFT from '../../assets/purple-nft.svg'
import { API_CONFIG } from "../../config"

const MyFriends = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [friends, setFriends] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [FriendsLoading, setFriendsLoading] = useState(true)
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('frieds', response)

        if (!response.is_error) {
            setFriends(response.data.friends)
            setFriendsLoading(false)
        } else {
            if (response.status == 404) {
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

    return (<>{FriendsLoading ? <CircularProgress /> :
        <>{friends.length > 0 ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                {friends.map((friend, index) => (
                    <RelationCard
                        removeAllie={() => removeAllie(friend.Screen_cid, globalUser.cid)}
                        removeFriend={() => removeFriend(friend.Screen_cid, globalUser.cid)}
                        image={friend.user_avatar} username={friend.username} friend={true}
                        sendAllieRequest={() => sendAllieRequest(friend.Screen_cid, globalUser.cid)}
                        sendFriendRequest={() => sendFriendRequest(friend.Screen_cid, globalUser.cid)}
                        shareClick={shareClick}
                    />
                ))}
            </Box>
            : <Typography
                sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                Dear {globalUser.username} you dont have any friends yet</Typography>}
        </>
    }
    </>
    );
}

export default MyFriends;