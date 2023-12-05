import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RelationCard } from "../utils"
import purpleNFT from '../../assets/purple-nft.svg'
import { API_CONFIG } from "../../config"

const MyFans = ({ sendAllieRequest, sendFriendRequest,
    shareClick, removeAllie, removeFriend, }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [fans, setFans] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const [fansLoading, setFansLoading] = useState(true)
    const getFans = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followers/?from=0&to=10`, {
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
                // let tempFans = []
                // for (let i = 0; i < response.data.friends.length; i++) {
                //     if (response.data.friends[i].is_accepted == true) {
                //         tempFans.push(response.data.friends[i])
                //     }
                // }
                setFans(response.data.friends)
                setFansLoading(false)
            } else {
                setFans([])
                setFansLoading(false)
            }
        } else {
            if (response.status == 404) {
                setFans([])
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
            <>{fans.length > 0 ?
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {fans.map((fan, index) => (
                        <RelationCard
                            removeAllie={() => removeAllie(fan.screen_cid, globalUser.cid)}
                            removeFriend={() => removeFriend(fan.screen_cid, globalUser.cid)}
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
    );
}

export default MyFans;