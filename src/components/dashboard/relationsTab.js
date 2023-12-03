import { Box, TextField, Typography } from "@mui/material";
import { RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../../utils/data/auth_api";
import { useSelector } from "react-redux";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useNavigate } from "react-router";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";
import API from "../../utils/api";
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

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center'
}))
const RelationsTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [activeTab, setActiveTab] = useState('my-allies')
    const [friendsLoading, setFriendsLoading] = useState(true)
    const [friends, setFriends] = useState([{ cid: '0xdd1bff2e074ddd0fbc8940fb01d3c8381be55609', username: 'javad' }])
    const [fans, setFans] = useState([
        { cid: '0xed2b3bdae27c24480f0676f43228a7981c42fdea', username: 'narni' },
        { cid: '0xf7cfcead481272b4a59d591cc1f6d97bf3ae470e', username: 'narnia' },
        { cid: '0xdd1bff2e074ddd0fbc8940fb01d3c8381be55609', username: 'javad' },
        { cid: '0xc9b3f13d981463e076d8dde0d0a5867c57b829f9', username: 'dewo' },
    ])
    const [suggestions, setSuggestions] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    // const getFriendsTest = async () => {
    //     try {
    //         apiCall.current = API.request(`${API_CONFIG.AUTH_API_URL}/fan/get/all/?from=0&to=10`, false, {}, globalUser.token);
    //         const response = await apiCall.current.promise
    //         console.log(response)
    //         if (response.status == 200) {
    //             console.log(response)
    //         }
    //     }
    //     catch (err) {
    //         setErr(err.message)
    //         console.log(err.message)
    //     }
    // }
    useEffect(() => {
        if (globalUser.token) {
            getFriends()
            getFans()
        }
    }, [globalUser.token])
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
            // setFans(response.data)
        } else {
            console.log(response.message)
        }
    }
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('frieds', response)

        if (!response.is_error) {
            // setFriends(response.data)
        } else {
            console.log(response.message)
        }
    }

    const sendFriendRequest = async (receiver, sender) => {
        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
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
    const sendAllieRequest = async (receiver, sender,) => {
        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
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
    const removeFriend = async (receiver, sender) => {
        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        const { requestData } = generateSignature(globalUser.privateKey, data)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
    }
    const removeAllie = async (receiver, sender) => {
        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
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
    const shareClick = async (id) => {
        console.log(id)
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <SubTabs jc={'center'}>
                        <SubTab id={"my-allies"} onClick={(e) => setActiveTab(e.target.id)} text={'My Allies'} selected={activeTab == 'my-allies'} />
                        <SubTab id={"my-friends"} onClick={(e) => setActiveTab(e.target.id)} text={'My Friends'} selected={activeTab == 'my-friends'} />
                        <SubTab id={"expansion-of-communication"} onClick={(e) => setActiveTab(e.target.id)} text={'Expansion of communication '} selected={activeTab == 'expansion-of-communication'} />
                    </SubTabs>
                    <FilterSelectionBox sx={{ padding: '8px 16px', my: 4 }}>
                        <span style={{ width: '180px', fontSize: '14px' }}>
                            Search Username:
                        </span>
                        <input style={{
                            height: '20px',
                            backgroundColor: 'transparent', border: 'none', outline: 'none',
                            color: '#c2c2c2', width: '100%'
                        }} />
                    </FilterSelectionBox>
                    {activeTab == 'my-allies' &&
                        <>{fans.length > 0 ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {fans.map((fan, index) => (
                                    <RelationCard
                                        removeAllie={() => removeAllie(fan.cid, globalUser.cid)}
                                        removeFriend={() => removeFriend(fan.cid, globalUser.cid)}
                                        image={purpleNFT} username={fan.username} allies={true}

                                        sendAllieRequest={() => sendAllieRequest(fan.cid, globalUser.cid)}

                                        sendFriendRequest={() => sendFriendRequest(fan.cid, globalUser.cid)}
                                        shareClick={shareClick} />
                                ))}
                            </Box>
                            : <Typography
                                sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                                Dear {globalUser.username} you dont have any allies yet</Typography>}
                        </>
                    }
                    {activeTab == 'my-friends' &&
                        <>{friends.length > 0 ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {friends.map((friend, index) => (
                                    <RelationCard
                                        removeAllie={() => removeAllie(friend.cid, globalUser.cid)}
                                        removeFriend={() => removeFriend(friend.cid, globalUser.cid)}
                                        image={purpleNFT} username={friend.username} friend={true}
                                        sendAllieRequest={() => sendAllieRequest(friend.cid, globalUser.cid)}
                                        sendFriendRequest={() => sendFriendRequest(friend.cid, globalUser.cid)}
                                        shareClick={shareClick}
                                    />
                                ))}
                            </Box>
                            : <Typography
                                sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                                Dear {globalUser.username} you dont have any friends yet</Typography>}
                        </>
                    }
                    {activeTab == 'expansion-of-communication' &&
                        <>{suggestions.length > 0 ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {suggestions.map((suggestion, index) => (
                                    <RelationCard
                                        removeAllie={() => removeAllie(suggestion.cid, globalUser.cid)}
                                        removeFriend={() => removeFriend(suggestion.cid, globalUser.cid)}
                                        image={purpleNFT} username={suggestion.username}
                                        sendAllieRequest={() => sendAllieRequest(suggestion.cid, globalUser.cid)}
                                        sendFriendRequest={() => sendFriendRequest(suggestion.cid, globalUser.cid)}
                                        shareClick={shareClick}
                                    />
                                ))}
                            </Box>
                            : <Typography
                                sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                                No suggestions
                            </Typography>}
                        </>
                    }
                </>
                :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '32px' }}>
                        <Typography
                            sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.mail}
                                &nbsp;
                            </b>
                            to have friends or fans , you must create your youwho wallet first
                        </Typography>
                        <ButtonPurpleLight text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }

        </Box>
    );
}

export default RelationsTab;