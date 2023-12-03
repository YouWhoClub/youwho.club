import { Box, CircularProgress, TextField, Typography } from "@mui/material";
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
import MyFriendequests from "./myFriendRequests";
import MyFans from "./myFans";
import MyFriends from "./myFriends";
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
    const [friends, setFriends] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()


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
        console.log('remove-friend-request');
    }
    const removeAllie = async (receiver, sender) => {
        console.log('remove-ally-request');

    }
    const shareClick = async (id) => {
        console.log(id)
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {globalUser.cid ?
                <>
                    <SubTabs jc={'center'}>
                        <SubTab id={"my-requests"} onClick={(e) => setActiveTab(e.target.id)} text={'My Requests'} selected={activeTab == 'my-requests'} />
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
                    {activeTab == 'my-requests' &&
                        <MyFriendequests />
                    }
                    {activeTab == 'my-allies' &&
                        <MyFans sendAllieRequest={sendAllieRequest}
                            sendFriendRequest={sendFriendRequest} shareClick={shareClick}
                            removeAllie={removeAllie} removeFriend={removeFriend} />
                    }
                    {activeTab == 'my-friends' &&
                        <MyFriends sendAllieRequest={sendAllieRequest}
                            sendFriendRequest={sendFriendRequest} shareClick={shareClick}
                            removeAllie={removeAllie} removeFriend={removeFriend} />
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