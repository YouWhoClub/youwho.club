import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../utils/data/public_api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { RelationCard } from "../utils";
import { useSelector } from "react-redux";
import { AUTH_API } from "../../utils/data/auth_api";
import { API_CONFIG } from "../../config";
import Pagination from "../pagination";

const MyFriendSuggestions = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend,
    search, searchResults, setAllSuggestions, activeTab, removeFollowing }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [suggestions, setSuggestions] = useState([])
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)

    const getUsers = async () => {
        try {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/suggestions/for/?from=${from}&to=${to}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response, 'suggs')
            if (!response.is_error) {
                // setSuggestions(response.data)
                // setAllSuggestions(response.data)
                // setLoading(false)
                // setErr(undefined)

                let frndsArr = response.data.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
                setSuggestions(frndsArr)
                setAllSuggestions(frndsArr)
                setLoading(false)
                setErr(undefined)

                if (response.data.length >= 15) {
                    let pagTabs = []
                    let tabNums = response.data.length / 15
                    for (let i = 0; i < tabNums; i++) {
                        pagTabs.push(i + 1)
                    }
                    setPgTabs(pagTabs)
                    console.log(tabNums)
                    console.log(pagTabs)
                } else {
                    console.log('getting frnds !')
                }

            }
            else throw response
        }
        catch (err) {
            console.log(err)
            setErr(err.message)
        }
    }
    useEffect(() => {
        getUsers()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        getUsers()
    }, [to])

    return (
        <>{loading ? <CircularProgress /> :
            <>{searchResults ?
                <>
                    {searchResults.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {searchResults.map((suggestion, index) => (
                                    <RelationCard
                                        activeTab={activeTab}
                                        getSuggestions={getUsers}
                                        removeAllie={() => removeAllie(suggestion.screen_cid, globalUser.cid)}
                                        removeFriend={() => removeFriend(suggestion.screen_cid, globalUser.cid)}
                                        removeFollowing={() => removeFollowing(suggestion.screen_cid, globalUser.cid)}
                                        image={suggestion.avatar} username={suggestion.username}
                                        sendAllieRequest={() => sendAllieRequest(suggestion.screen_cid, globalUser.cid)}
                                        sendFriendRequest={() =>
                                            sendFriendRequest(suggestion.screen_cid, globalUser.cid)
                                        }
                                        shareClick={shareClick}
                                        amFollowing={suggestion.requested_at}
                                        isAccepted={suggestion.is_accepted}
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
                <>{suggestions.length > 0 ?
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', width: '100%' }}>
                        {suggestions.map((suggestion, index) => (
                            <RelationCard
                                activeTab={activeTab}
                                getSuggestions={getUsers}
                                removeAllie={() => removeAllie(suggestion.screen_cid, globalUser.cid)}
                                removeFriend={() => removeFriend(suggestion.screen_cid, globalUser.cid)}
                                image={suggestion.avatar} username={suggestion.username}
                                sendAllieRequest={() => sendAllieRequest(suggestion.screen_cid, globalUser.cid)}
                                sendFriendRequest={() =>
                                    sendFriendRequest(suggestion.screen_cid, globalUser.cid)
                                }
                                removeFollowing={() => removeFollowing(suggestion.screen_cid, globalUser.cid)}
                                shareClick={shareClick}
                                amFollowing={suggestion.requested_at}
                                isAccepted={suggestion.is_accepted}
                            />
                        ))}
                        <Box sx={{ mt: '30px' }}>
                            <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                        </Box>
                    </Box>
                    : <Typography
                        sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        No suggestions
                    </Typography>}
                </>
            }
            </>
        }
        </>

    );
}

export default MyFriendSuggestions;