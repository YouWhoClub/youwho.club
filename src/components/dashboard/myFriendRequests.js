import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { FriendRequestCard } from "../utils";
import { useEffect, useRef, useState } from "react";
import generateSignature from "../../utils/signatureUtils";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import blueNft from '../../assets/blue-nft.svg'

const MyFriendequests = ({
    //  setAllRequests, 
    searchResults, getFollowings }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [reqsLoading, setReqsLoading] = useState(true)
    const [err, setErr] = useState(undefined)
    const [requests, setRequests] = useState([])
    const [isAccepted, setIsAccepted] = useState([])
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const getRequests = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/unaccepted/friend-requests/?from=0&to=50`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('requests', response)

        if (!response.is_error) {
            // setAllRequests(response.data)
            setRequests(response.data)
            setReqsLoading(false)
        } else {
            if (response.status == 404) {
                // setAllRequests([])
                setRequests([])
                setReqsLoading(false)

            } else {
                setErr(response.message)
                setReqsLoading(false)
            }
        }
    }

    const acceptFriendRequest = async (receiver, sender, id) => {
        loading()
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
        if (!response.is_error) {
            var tempAccepted = isAccepted
            tempAccepted.push(id)
            setIsAccepted(tempAccepted)
            console.log(tempAccepted)
            updateToast(true, 'Friend Request Accepted')
            getRequests()
        } else {
            updateToast(false, response.message)
        }
    }
    useEffect(() => {
        if (globalUser.token) {
            getRequests()
        }
    }, [globalUser.token])

    return (
        <>{reqsLoading ? <CircularProgress /> :
            <>{searchResults ?
                <>
                    {searchResults.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {searchResults.map((req, index) => (
                                    <FriendRequestCard
                                        isAccepted={isAccepted}
                                        id={req.username}
                                        image={req.avatar} username={req.username}
                                        acceptRequest={() => acceptFriendRequest(req.screen_cid, globalUser.cid, req.username)}
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

                <>{requests.length > 0 ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                        {requests.map((req, index) => (
                            <FriendRequestCard
                                isAccepted={isAccepted}
                                id={req.username}
                                image={req.user_avatar} username={req.username}
                                acceptRequest={() => acceptFriendRequest(req.screen_cid, globalUser.cid, req.username)}
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
        }
        </>
    );
}

export default MyFriendequests;