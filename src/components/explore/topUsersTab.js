import styled from "@emotion/styled";
import { TopUserCard } from "../utils";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { PUBLIC_API } from "../../utils/data/public_api";
import { API_CONFIG } from "../../config";

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: 'border-box',
    display: 'flex', gap: '10px', flexDirection: 'column'
}))


const TopUsersTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [users, setUsers] = useState(undefined)
    const getUsers = async () => {
        setErr(undefined)
        // try {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/user/get/all/top/?from=0&to=30`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response, 'userstop')
        if (response.is_error == false) {
            setUsers(response.data.data)
        } else {
            setErr(response.message)
            console.log(response)
        }
        // }
        // catch (err) {
        //     setErr(err.statusText)
        // }
    }

    useEffect(() => {
        getUsers()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])


    return (<Gallery>
        <TopUserCard username={'username'} />
    </Gallery>);
}

export default TopUsersTab;