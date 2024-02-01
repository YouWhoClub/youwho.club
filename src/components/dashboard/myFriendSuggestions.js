import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../../utils/data/public_api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { RelationCard } from "../utils";
import pinkNFT from '../../assets/pink-nft.svg'
import { useSelector } from "react-redux";
import { AUTH_API } from "../../utils/data/auth_api";
import { API_CONFIG } from "../../config";

const MyFriendSuggestions = ({ sendAllieRequest, sendFriendRequest, shareClick, removeAllie, removeFriend,
    search, searchResults, setAllSuggestions }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [suggestions, setSuggestions] = useState([])
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const getUsers = async () => {
        try {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/suggestions/for/?from=0&to=100`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            if (!response.is_error) {
                setSuggestions(response.data)
                setAllSuggestions(response.data)
                setLoading(false)
                setErr(undefined)
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

    return (
        <>{loading ? <CircularProgress /> :
            <>{searchResults ?
                <>
                    {searchResults.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                {searchResults.map((suggestion, index) => (
                                    <RelationCard
                                        removeAllie={() => removeAllie(suggestion.screen_cid, globalUser.cid)}
                                        removeFriend={() => removeFriend(suggestion.screen_cid, globalUser.cid)}
                                        image={suggestion.avatar} username={suggestion.username}
                                        sendAllieRequest={() => sendAllieRequest(suggestion.screen_cid, globalUser.cid)}
                                        sendFriendRequest={() => {
                                            sendFriendRequest(suggestion.screen_cid, globalUser.cid)
                                            getUsers()
                                        }}
                                        shareClick={shareClick}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                        {suggestions.map((suggestion, index) => (
                            <RelationCard
                                removeAllie={() => removeAllie(suggestion.screen_cid, globalUser.cid)}
                                removeFriend={() => removeFriend(suggestion.screen_cid, globalUser.cid)}
                                image={suggestion.avatar} username={suggestion.username}
                                sendAllieRequest={() => sendAllieRequest(suggestion.screen_cid, globalUser.cid)}
                                sendFriendRequest={() => {
                                    sendFriendRequest(suggestion.screen_cid, globalUser.cid)
                                    getUsers()
                                }}
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
        }
        </>

    );
}

export default MyFriendSuggestions;