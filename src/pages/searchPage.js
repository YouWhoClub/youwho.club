import { Box, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { SearchNFTCard, SearchUserCard, Tab, Tabs } from "../components/utils";
import { PUBLIC_API } from "../utils/data/public_api";
import { API_CONFIG } from "../config";
import { useSelector } from "react-redux";
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
const SearchPage = ({ theme, switchTheme }) => {
    const [searchQ, setSearchQ] = useState(window.location.search ? window.location.search.replace('?q=', '') : '')
    const [activeTab, setActiveTab] = useState('users')
    const [userResults, setUserResults] = useState([])
    const [collectionResults, setCollectionResults] = useState([])
    const [NFTResults, setNFTResults] = useState([])
    const apiCall = useRef(null)
    const [myFriends, setMyFriends] = useState([])
    const [myFollowings, setMyFollowings] = useState([])
    const [err, setErr] = useState(undefined)
    const globalUser = useSelector(state => state.userReducer)
    console.log(window.location.search)
    const search = async (q, from, to) => {
        if (searchQ == '') {
            setNFTResults([])
            setCollectionResults([])
            setUserResults([])
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
            console.log(response)
            setNFTResults(response.data.data.nfts)
            setCollectionResults(response.data.data.collection)
            setUserResults(response.data.data.users)
        }
        catch (err) {
            if (err.status == 404) {
                setNFTResults([])
                setCollectionResults([])
                setUserResults([])
            } else {
                setNFTResults([])
                setCollectionResults([])
                setUserResults([])
            }
        }

    }
    const getMyFollowings = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/followings/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('followings', response)
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
    // let searchQ = window.location.search ? window.location.search.replace('?q=', '') : ''
    useEffect(() => {
        if (searchQ)
            search(searchQ, 0, 60)
    }, [searchQ])
    useEffect(() => {
        if (window.location.search)
            setSearchQ(window.location.search)
    }, [window.location.search])
    useEffect(() => {
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    useEffect(() => {
        if (activeTab == 'users')
            getMyFollowings()
    }, [activeTab])

    return (<Box sx={{
        bgcolor: 'primary.bg', display: "flex",
        flexDirection: 'column',
        color: 'primary.text', gap: '32px',
        height: '100vh', alignItems: 'center'
    }}>
        <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
        <Box sx={{
            display: "flex",
            flexDirection: 'column', width: '100%',
            gap: '32px', alignItems: 'center', boxSizing: 'border-box', padding: '20px 22px'
        }}>
            {/* <FilterSelectionBox sx={{ padding: '8px 16px', maxWidth: '480px' }}>
                <span style={{ width: 'max-content', fontSize: '14px' }}>
                    Search:
                </span>
                <input style={{
                    height: '20px',
                    backgroundColor: 'transparent', border: 'none', outline: 'none',
                    color: '#c2c2c2', width: '100%'
                }}
                    value={searchQ}
                    onChange={(e) => {
                        search(e.target.value, 0, 50)
                        setSearchQ(e.target.value)
                    }} />
            </FilterSelectionBox> */}
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '680px' }}>
                <Tabs
                    // mb={'24px'}
                    jc={'center'}
                >
                    <Tab
                        text={`Users`}
                        id={"users"}
                        onClick={(e) => {
                            setActiveTab(e.target.id)
                            window.location.hash = `#${e.target.id}`
                        }}
                        selected={activeTab == 'users'}
                    />
                    <Tab
                        text={`Collections`}
                        id={"collections"}
                        onClick={(e) => {
                            setActiveTab(e.target.id)
                            window.location.hash = `#${e.target.id}`
                        }}
                        selected={activeTab == 'collections'}
                    />
                    <Tab
                        text={`NFTs`}
                        id={"nfts"}
                        onClick={(e) => {
                            setActiveTab(e.target.id)
                            window.location.hash = `#${e.target.id}`
                        }}
                        selected={activeTab == 'nfts'}
                    />

                </Tabs>
            </Box>
            <Box sx={{
                width: '100%', maxWidth: '900px', boxSizing: 'border-box', gap: '10px 8px', p: 1,
                height: 'auto', maxHeight: { xs: 'calc(100vh - 294px)', sm: 'calc(100vh - 302px)', },
                overflowX: 'hidden',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    width: '3px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '20px !important'
                },
                '&::-webkit-scrollbar-thumb': {
                    width: '3px',
                    height: '3px',
                    background: '#9747ff',
                    border: '0.5px solid #9747ff',
                    borderRadius: '20px !important'
                },
                '&::-webkit-scrollbar-button': {
                    width: '1px',
                    height: '1px',
                    background: '#9747ff',
                    border: '0.5px solid #C6BAC5',
                    borderRadius: '50% !important'
                },
                "@media (max-width: 600px)": {
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },

                display: 'flex', justifyContent: 'center', flexWrap: 'wrap'
            }
            } >
                {!searchQ || searchQ == '' ? undefined :
                    <>
                        {activeTab == 'users' && <>
                            {userResults && userResults.length > 0 ? <>
                                {userResults.map((user) => (<SearchUserCard
                                    key={user.screen_cid}
                                    username={user.username}
                                    image={user.avatar}
                                    getMyFollowings={getMyFollowings}
                                    search={() => search(searchQ, 0, 60)}
                                    ywID={user.screen_cid}
                                    myFollowings={myFollowings} />))}
                            </> :
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', sm: '18px' } }}>
                                    No Result Found !
                                </Typography>

                            }
                        </>}
                        {activeTab == 'collections' && <>
                            {collectionResults && collectionResults.length > 0 ? <Box
                                sx={{
                                    display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2px'
                                }}>


                            </Box> :
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', sm: '18px' } }}>
                                    No Result Found !
                                </Typography>
                            }
                        </>}
                        {activeTab == 'nfts' && <>
                            {NFTResults && NFTResults.length > 0 ? <Box
                                sx={{
                                    boxSizing: 'border-box', width: '100%',
                                    display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2px', borderRadius: '24px'
                                }}>

                                {NFTResults.map((nft) => (<SearchNFTCard
                                    nft={nft} />))}

                            </Box> :
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '16px', sm: '18px' } }}>
                                    No Result Found !
                                </Typography>
                            }
                        </>}
                    </>
                }
            </Box>
        </Box>
    </Box >);
}

export default SearchPage;