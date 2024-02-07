import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { API_CONFIG } from "../../config"
import { Box, CircularProgress, Typography } from "@mui/material"
import { RelationCard } from "../utils"

const TheirAllies = ({ user, sendAllieRequest, sendFriendRequest, myFollowings, myReqs,
    shareClick, removeAllie, removeFriend, fans, fansLoading, searchResults }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    console.log(myFollowings)

    return (<>{fansLoading ? <CircularProgress /> :
        <>{searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            {searchResults.map((fan, index) => (
                                <RelationCard
                                    removeAllie={() => removeAllie(fan.screen_cid, globalUser.cid)}
                                    removeFriend={() => removeFriend(fan.screen_cid, globalUser.cid)}
                                    image={fan.avatar} username={fan.username}
                                    amFollowing={myFollowings.includes(fan.screen_cid) || myReqs.includes(fan.screen_cid)}
                                    isAccepted={myReqs.includes(fan.screen_cid) ? false : myFollowings.includes(fan.screen_cid) ? true : false}
                                    ywid={fan.screen_cid}

                                    sendAllieRequest={() => sendAllieRequest(fan.screen_cid, globalUser.cid)}

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
                            removeAllie={() => removeAllie(fan.screen_cid, globalUser.cid)}
                            removeFriend={() => removeFriend(fan.screen_cid, globalUser.cid)}
                            image={fan.user_avatar} username={fan.username}
                            amFollowing={myFollowings.includes(fan.screen_cid) || myReqs.includes(fan.screen_cid)}
                            isAccepted={myReqs.includes(fan.screen_cid) ? false : myFollowings.includes(fan.screen_cid) ? true : false}
                            sendAllieRequest={() => sendAllieRequest(fan.screen_cid, globalUser.cid)}
                            ywid={fan.screen_cid}

                            sendFriendRequest={() => sendFriendRequest(fan.screen_cid, globalUser.cid)}
                            shareClick={shareClick} />
                    ))}
                </Box>
                : <Typography
                    sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                    {user.username} does not have any allies yet</Typography>}
            </>
        }
        </>
    }
    </>
    );
}

export default TheirAllies;