import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { FriendRequestCard } from "../utils";
import { useEffect, useRef, useState } from "react";
import generateSignature from "../../utils/signatureUtils";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import blueNft from '../../assets/blue-nft.svg'

const MySentRequests = ({
    searchResults, }) => {
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


    useEffect(() => {
        if (globalUser.token) {
            getRequests()
        }
    }, [globalUser.token])

    return (
        <>
            my sent requests
        </>
    );
}

export default MySentRequests;