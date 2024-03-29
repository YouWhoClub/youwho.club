import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { API_CONFIG } from "../../config"
import { Box, CircularProgress, Typography } from "@mui/material"
import { RelationCard } from "../utils"

const TheirFriends = ({ user, sendAllieRequest, sendFriendRequest, myFollowings, myReqs,
    shareClick, removeAllie, removeFriend, friends, friendsLoading, searchResults }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    console.log('my flwngs', myFollowings)
    console.log('my reqs', myReqs)
    useEffect(() => {
        console.log(myReqs)
    }, [myReqs])
    return (<>{friendsLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((friend, index) => (
                                <RelationCard
                                    amFollowing={myFollowings.includes(friend.screen_cid) || myReqs.includes(friend.screen_cid)}
                                    isAccepted={myReqs.includes(friend.screen_cid) ? false : myFollowings.includes(friend.screen_cid) ? true : false}
                                    removeAllie={() => removeAllie(friend.Screen_cid, globalUser.cid)}
                                    removeFriend={() => removeFriend(friend.Screen_cid, globalUser.cid)}
                                    image={friend.user_avatar} username={friend.username}
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

            <>{friends.length > 0 ?
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {friends.map((friend, index) => (
                        <RelationCard
                            amFollowing={myFollowings.includes(friend.screen_cid) || myReqs.includes(friend.screen_cid)}
                            isAccepted={myReqs.includes(friend.screen_cid) ? false : myFollowings.includes(friend.screen_cid) ? true : false}
                            removeAllie={() => removeAllie(friend.screen_cid, globalUser.cid)}
                            removeFriend={() => removeFriend(friend.screen_cid, globalUser.cid)}
                            image={friend.user_avatar} username={friend.username}
                            sendAllieRequest={() => sendAllieRequest(friend.screen_cid, globalUser.cid)}
                            sendFriendRequest={() => sendFriendRequest(friend.screen_cid, globalUser.cid)}
                            ywid={friend.screen_cid}
                            shareClick={shareClick}
                        />
                    ))}
                </Box>
                : <Typography
                    sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                    {user.username} does not have any friends yet</Typography>}
            </>
        }
        </>
    }
    </>
    );
}

export default TheirFriends;