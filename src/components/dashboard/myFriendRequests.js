import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { FriendRequestCard } from "../utils";
import { useEffect, useState } from "react";
import generateSignature from "../../utils/signatureUtils";
import { Box, CircularProgress, Typography } from "@mui/material";
import blueNft from '../../assets/blue-nft.svg'

const MyFriendequests = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(undefined)
    const [requests, setRequests] = useState([])
    const getRequests = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/unaccepted/friend-requests/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('requests', response)

        if (!response.is_error) {
            setRequests(response.data)
            setLoading(false)
        } else {
            if (response.status == 404) {
                setRequests([])
                setLoading(false)

            } else {
                setErr(response.message)
                setLoading(false)
            }
        }
    }

    const acceptFriendRequest = async (receiver, sender) => {
        let data = {
            owner_cid: sender,
            friend_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/accept/friend-request`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);
    }
    useEffect(() => {
        if (globalUser.token) {
            getRequests()
        }
    }, [globalUser.token])

    return (
        <>{loading ? <CircularProgress /> :
            <>{requests.length > 0 ?
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                    {requests.map((req, index) => (
                        <FriendRequestCard
                            image={blueNft} username={req.username}
                            acceptRequest={() => acceptFriendRequest(req.screen_cid, globalUser.cid)}
                        />
                    ))}
                </Box>
                :
                <>{err ? <Typography
                    sx={{ color: 'primary.error', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                    {err}
                </Typography>
                    :
                    <Typography
                        sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        Dear {globalUser.username} you dont have any unaccepted friend requests</Typography>}</>
            }
            </>
        }
        </>
    );
}

export default MyFriendequests;