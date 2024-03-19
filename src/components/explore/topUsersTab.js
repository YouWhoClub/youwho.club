import styled from "@emotion/styled";
import { BulletFiltering, TopUserCard } from "../utils";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PUBLIC_API } from "../../utils/data/public_api";
import { API_CONFIG } from "../../config";
import { toast } from "react-toastify";
import generateSignature from "../../utils/signatureUtils";

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: 'border-box', alignItems: 'center',
    display: 'flex', gap: '10px', flexDirection: 'column'
}))
const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))


const TopUsersTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [users, setUsers] = useState(undefined)
    const [filterValue, setFilterValue] = useState('most-followers')
    const filterOptions = ['most-followers', 'most-nfts', 'most-collections', 'most-galleries']
    const [searchResults, setSearchResults] = useState(undefined)
    const [searchQ, setSearchQ] = useState(undefined)
    const [myFriends, setMyFriends] = useState([])
    const [myFollowings, setMyFollowings] = useState([])
    const getUsers = async () => {
        setErr(undefined)
        setUsers(undefined)
        // try {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get/all/top/?from=0&to=50`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response, 'userstop')
        if (response.is_error == false) {
            if (filterValue == 'most-followers') {
                let arr = response.data.followers_info.sort((a, b) => a.friends_count > b.friends_count);
                setUsers(arr)
            }
            else if (filterValue == 'most-nfts') {
                let arr = response.data.nfts_info.sort((a, b) => parseInt(a.minted_ones + a.none_minted_ones) > parseInt(b.minted_ones + b.none_minted_ones));
                setUsers(response.data.nfts_info)
            }
            else if (filterValue == 'most-collections') {
                setUsers(response.data.collections_info)
            }
            else if (filterValue == 'most-galleries') {
                setUsers(response.data.private_galleries_infos)
            }
            else setUsers([])



        } else {
            setErr(response.message)
            console.log(response)
        }
        // }
        // catch (err) {
        //     setErr(err.statusText)
        // }
    }
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=0&to=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('frieds', response)

        if (!response.is_error) {
            let tempIDs = []
            for (var i = 0; i < response.data.friends.length; i++) {
                tempIDs.push(response.data.friends[i].screen_cid)
            }

            setMyFriends(tempIDs)
        } else {
            if (response.status == 404) {
                setMyFriends([])

            } else {

                console.log(response.message)
            }
        }
    }
    useEffect(() => {
        getUsers()
        getFriends()
        getMyFollowings()

    }, [filterValue])
    useEffect(() => {
        if (searchResults && searchQ) {
            search(searchQ, 0, 20)
        }
    }, [users])
    useEffect(() => {
        getUsers()
        getFriends()
        getMyFollowings()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    const search = async (q, from, to) => {
        if (q == '') {
            setSearchResults(undefined)
            return
        }
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/search/?q=${q}&from=${from}&to=${to}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            let tempUsers = []
            for (var i = 0; i < users.length; i++) {
                tempUsers.push(users[i].owner_wallet_info.screen_cid)
            }
            let tempArr = []
            for (var j = 0; j < response.data.data.users.length; j++) {
                if (tempUsers.includes(response.data.data.users[j].screen_cid)) {
                    tempArr.push(response.data.data.users[j].screen_cid)
                }
            }
            let tempRes = users.filter((user) => tempArr.includes(user.owner_wallet_info.screen_cid))
            setSearchResults(tempRes)
        }
        catch (err) {
            if (err.status == 404) {
                setSearchResults([])
            } else {
                setSearchResults([])
            }
        }

    }
    const getMyFollowings = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        // console.log('followings', response)
        if (!response.is_error) {
            setMyFollowings(response.data)

        } else {
            if (response.status == 404) {
                setMyFollowings([])
            } else {
                setMyFollowings(undefined)
                setErr(response.message)
                console.log(response.message)
            }
        }
    }

    return (<Gallery>
        <Box sx={{
            width: { xs: '100%', sm: '80%', md: '70%' }, boxSizing: 'border-box',
            display: 'flex', gap: { xs: '8px', md: '16px' }, flexDirection: 'column'
        }}>
            <FilterSelectionBox sx={{ padding: '8px 16px', }}>
                <span style={{ width: 'max-content', fontSize: '14px' }}>
                    Name:
                </span>
                <input style={{
                    height: '20px',
                    backgroundColor: 'transparent', border: 'none', outline: 'none',
                    color: '#c2c2c2', width: '100%'
                }}
                    onChange={(e) => {
                        search(e.target.value, 0, 20)
                        setSearchQ(e.target.value)
                    }} />
            </FilterSelectionBox>
            <BulletFiltering setOption={setFilterValue} options={filterOptions} selected={filterValue} fontSize={'14px'} width={'100%'} />
        </Box>
        {searchResults ?
            <>
                {searchResults.length > 0 ?
                    <>
                        {searchResults.map((user) => (
                            <TopUserCard
                                key={user.owner_wallet_info.username}
                                ywID={user.owner_wallet_info.screen_cid}
                                myFollowings={myFollowings}
                                getMyFollowings={getMyFollowings}
                                isFriend={myFriends.includes(user.owner_wallet_info.screen_cid)}
                                username={user.owner_wallet_info.username}
                                image={user.owner_wallet_info.avatar}
                                lilData={
                                    filterValue == 'most-followers' ?
                                        [
                                            { 'created': user.owner_wallet_info.created_at },
                                            { 'name': 'allies', value: user.friends_count }
                                        ]
                                        : filterValue == 'most-nfts' ?
                                            [
                                                { 'created': user.owner_wallet_info.created_at },
                                                { 'name': 'minted nfts', value: user.minted_ones },
                                                { 'name': 'unminted nfts', value: user.none_minted_ones },
                                            ]
                                            : filterValue == 'most-collections' ?
                                                [
                                                    { 'created': user.owner_wallet_info.created_at },
                                                    { 'name': 'collections', value: user.collections_count }
                                                ]
                                                :
                                                [
                                                    { 'created': user.owner_wallet_info.created_at },
                                                    { 'name': 'galleries', value: user.galleries_count }
                                                ]
                                }
                            />))}

                    </>
                    :
                    <Typography sx={{ my: '24px', color: 'secondary.text', textTransform: 'capitalize' }}>
                        no result for your search
                    </Typography>}
            </>
            : <>
                {users ?
                    <>
                        {users.length > 0 ?
                            <>
                                {users.map((user) => (
                                    <TopUserCard
                                        key={user.owner_wallet_info.username}
                                        ywID={user.owner_wallet_info.screen_cid}
                                        myFollowings={myFollowings}
                                        getMyFollowings={getMyFollowings}
                                        isFriend={myFriends.includes(user.owner_wallet_info.screen_cid)}
                                        username={user.owner_wallet_info.username}
                                        image={user.owner_wallet_info.avatar}
                                        lilData={
                                            filterValue == 'most-followers' ?
                                                [
                                                    { 'created': user.owner_wallet_info.created_at },
                                                    { 'name': 'allies', value: user.friends_count }
                                                ]
                                                : filterValue == 'most-nfts' ?
                                                    [
                                                        { 'created': user.owner_wallet_info.created_at },
                                                        { 'name': 'minted nfts', value: user.minted_ones },
                                                        { 'name': 'unminted nfts', value: user.none_minted_ones },
                                                    ]
                                                    : filterValue == 'most-collections' ?
                                                        [
                                                            { 'created': user.owner_wallet_info.created_at },
                                                            { 'name': 'collections', value: user.collections_count }
                                                        ]
                                                        :
                                                        [
                                                            { 'created': user.owner_wallet_info.created_at },
                                                            { 'name': 'galleries', value: user.galleries_count }
                                                        ]
                                        }
                                    />))}

                            </>
                            :
                            <Typography sx={{ my: '24px', color: 'secondary.text', textTransform: 'capitalize' }}>
                                no user yet
                            </Typography>}
                    </>
                    :
                    <CircularProgress />}

            </>}
    </Gallery>);
}

export default TopUsersTab;