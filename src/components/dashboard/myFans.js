import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import purpleNFT from '../../assets/purple-nft.svg'
import { API_CONFIG } from "../../config"

const MyFans = ({ sendAllieRequest, sendFriendRequest,
    shareClick, removeAllie, removeFriend, followings, search, searchResults, setAllFollowers }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [fans, setFans] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [fansLoading, setFansLoading] = useState(true)
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
                if (followings && followings.length > 0) {
                    let tempFans = []
                    // for (let j = 0; j < followings.length; j++) {
                    for (let i = 0; i < response.data.friends.length; i++) {
                        // console.log(followings.includes(response.data.friends[i].screen_cid))
                        if (!followings.includes(response.data.friends[i].screen_cid)) {
                            tempFans.push(response.data.friends[i])
                        }
                    }
                    // }
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
            getFans()
        }
    }, [globalUser.token])

    return (
        <>{fansLoading ? <CircularProgress /> :
            <>{searchResults ?
                <>
                    {searchResults.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {searchResults.map((fan, index) => (
                                    <RelationCard
                                        removeAllie={() => {
                                            removeAllie(fan.screen_cid, globalUser.cid)
                                            getFans()
                                        }}
                                        image={fan.avatar} username={fan.username} allies={true}

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
                                removeAllie={() => {
                                    removeAllie(fan.screen_cid, globalUser.cid)
                                    getFans()
                                }}
                                image={fan.user_avatar} username={fan.username} allies={true}

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