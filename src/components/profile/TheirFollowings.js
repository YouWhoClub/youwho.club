import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { API_CONFIG } from "../../config"
import { Box, CircularProgress, Typography } from "@mui/material"
import { RelationCard } from "../utils"

const TheirFollowings = ({ user, sendAllieRequest, sendFriendRequest, myFollowings,
    shareClick, removeAllie, removeFriend, followings, followingsLoading, searchResults }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    console.log('my flwngs', myFollowings)
    return (<>{followingsLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((friend, index) => (
                                <RelationCard
                                    amFollowing={myFollowings && myFollowings.includes(friend.screen_cid)}
                                    removeAllie={() => removeAllie(friend.Screen_cid, globalUser.cid)}
                                    removeFriend={() => removeFriend(friend.Screen_cid, globalUser.cid)}
                                    image={friend.avatar} username={friend.username}
                                    sendAllieRequest={() => sendAllieRequest(friend.Screen_cid, globalUser.cid)}
                                    sendFriendRequest={() => sendFriendRequest(friend.Screen_cid, globalUser.cid)}
                                    ywid={friend.screen_cid}
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
                            amFollowing={myFollowings && myFollowings.includes(friend.screen_cid)}
                            removeAllie={() => removeAllie(friend.screen_cid, globalUser.cid)}
                            removeFriend={() => removeFriend(friend.screen_cid, globalUser.cid)}
                            image={friend.avatar} username={friend.username}
                            sendAllieRequest={() => sendAllieRequest(friend.screen_cid, globalUser.cid)}
                            sendFriendRequest={() => sendFriendRequest(friend.screen_cid, globalUser.cid)}
                            ywid={friend.screen_cid}
                            shareClick={shareClick}
                        />
                    ))}
                </Box>
                : <Typography
                    sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                    {user.username} does not have any followings yet</Typography>}
            </>
        }
        </>
    }
    </>
    );
}

export default TheirFollowings;