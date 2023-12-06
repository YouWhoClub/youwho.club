import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { API_CONFIG } from "../../config"
import { Box, CircularProgress, Typography } from "@mui/material"
import { RelationCard } from "../utils"

const TheirFriends = ({ user, sendAllieRequest, sendFriendRequest,
    shareClick, removeAllie, removeFriend, }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [friends, setFriends] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [friendsLoading, setFriendsLoading] = useState(true)

    return (<>{friendsLoading ? <CircularProgress /> :
        <>{friends.length > 0 ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                {friends.map((friend, index) => (
                    <RelationCard
                        removeAllie={() => removeAllie(friend.screen_cid, globalUser.cid)}
                        removeFriend={() => removeFriend(friend.screen_cid, globalUser.cid)}
                        image={friend.user_avatar} username={friend.username} allies={true}

                        sendAllieRequest={() => sendAllieRequest(friend.screen_cid, globalUser.cid)}

                        sendFriendRequest={() => sendFriendRequest(friend.screen_cid, globalUser.cid)}
                        shareClick={shareClick} />
                ))}
            </Box>
            : <Typography
                sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                {user.username} does not have any allies yet</Typography>}
        </>
    }
    </>
    );
}

export default TheirFriends;