// import { Avatar } from "@mui/joy";
import styled from "@emotion/styled";
import { Inbox } from "@mui/icons-material";
import {
    Box, Skeleton, Typography,
    //  List, ListItem, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import PanelLayout from "../components/PanelLayout";
import Selection from "../components/selection";
import { ToastContainer } from 'react-toastify';
import '../index.css'
import ProfileCard from "../components/profile/ProfileCard.js";
import ProfileBar from "../components/profile/ProfileBar.js";
import ProfilePanel from "../components/profile/profilePanel.js";
import { PUBLIC_API } from "../utils/data/public_api.js";
import { BG_URL, PUBLIC_URL } from "../utils/utils.js";
import { toast } from 'react-toastify';
import bgDots from '../assets/bgDots.svg'
import { API_CONFIG } from "../config.js";
import generateSignature from "../utils/signatureUtils.js";
const ShowPanel = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',


}))

const Profile = ({ switchTheme, theme, props }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [idCopied, setIdCopied] = useState(false)
    const [selectValue, setSelectValue] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [userloading, setuserLoading] = useState(true)
    const apiCall = useRef(undefined)
    const [user, setUser] = useState(undefined)
    const [isFriends, setisFriend] = useState(undefined)
    const [isFollowing, setIsFollowing] = useState('false')
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const sendFriendRequest = async (receiver, sender) => {
        loading();

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
        if (response.message == "Updated Successfully") {
            updateToast(true, 'Friend Request Sent')
            getMyFollowings()
            getMyFriends()
        } else {
            updateToast(false, response.message)
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
            if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].user_screen_cid == user.YouWhoID) {
                        for (var j = 0; j < response.data[i].friends.length; j++) {
                            if (response.data[i].friends[j].screen_cid == globalUser.YouWhoID) {
                                if (response.data[i].friends[j].is_accepted == true) {
                                    setIsFollowing('true')
                                } else {
                                    setIsFollowing('pending')
                                }
                            }
                        }
                    }
                }
            } else {
                setIsFollowing('false')
            }
        } else {
            if (response.status == 404) {
                setIsFollowing('false')

            } else {
                setErr(response.message)
                console.log(response.message)
            }
        }
    }
    const getMyFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('my friends', response)

        if (!response.is_error) {
            let tempIDs = []
            for (var i = 0; i < response.data.friends.length; i++) {
                tempIDs.push(response.data.friends[i].screen_cid)
            }
            if (tempIDs.includes(user.YouWhoID)) {
                setisFriend('true')
            } else {
                setisFriend('false')
            }
        } else {
            if (response.status == 404) {
                setisFriend('false')

            } else {
                console.log(response.message)
            }
        }
    }
    const username = window.location.pathname.replace('/profile/', '')
    const getUser = async () => {
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-user-wallet-info/${username}`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            console.log(response)
            var tempUser = {
                "username": null,
                "avatar": null,
                "bio": null,
                "banner": null,
                "mail": null,
                "YouWhoID": null,
                "stars": null,
                "created_at": null
            }
            tempUser.username = response.data.data.username
            tempUser.banner = response.data.data.banner
            tempUser.avatar = response.data.data.avatar
            tempUser.bio = response.data.data.bio
            tempUser.mail = response.data.data.mail
            tempUser.YouWhoID = response.data.data.screen_cid
            tempUser.stars = response.data.data.stars
            tempUser.created_at = response.data.data.created_at
            console.log(tempUser)
            setUser(tempUser)
            setuserLoading(false)
            setErr(undefined)
        }
        catch (err) {
            console.log(err)
            if (err.data && err.data.message) {
                setErr(err.data.message)
            } else if (err.message) {
                setErr(err.message)
            }
            // else {
            //     setErr('Network Error')
            // }
        }
    }
    useEffect(() => {
        getUser()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    useEffect(() => {
        if (globalUser.token && user) {
            getMyFollowings()
            getMyFriends()
        }
    }, [globalUser.token, user])

    const listenScrollEvent = e => {
        let card = window.document.getElementById('profile-card-user')
        let pic = window.document.getElementById('profile-pic-user')
        let line = window.document.getElementById('line-profile-user')
        // let dashbar = window.document.getElementById('profile-bar-user')
        let insidePanel = window.document.getElementById('scrollable-profile-panel-inside-user')
        let outsidePanel = window.document.getElementById('profile')
        if (window.document.getElementById("scrollable-profile-panel-inside-user").scrollTop > 0 || window.document.getElementById("scrollable-profile-panel-user").scrollTop > 0) {
            card.classList.add("profileBannerAfterScroll")
            pic.classList.add("profilePicAfterScroll")
            line.classList.add("profileLineAfterScroll")
            insidePanel.classList.add("insidePanelUserAfterScroll")
            insidePanel.classList.remove("insidePanelUserBeforeScroll")
            outsidePanel.classList.add("dashAfterScroll")
            if (progressBarOpen) {
                setProgressBarOpen(false)
            }
        }
        else if (window.document.getElementById("scrollable-profile-panel-user").scrollTop >= 0 && window.document.getElementById("scrollable-profile-panel-inside-user").scrollTop == 0) {
            card.classList.remove("profileBannerAfterScroll")
            line.classList.remove("profileLineAfterScroll")
            insidePanel.classList.add("insidePanelUserBeforeScroll")
            pic.classList.remove("profilePicAfterScroll")
            // dashbar.classList.remove("dashbarAfterScroll")
            insidePanel.classList.remove("insidePanelUserAfterScroll")
            outsidePanel.classList.remove("dashAfterScroll")
        }
    }
    const [progressBarOpen, setProgressBarOpen] = useState(false)
    useEffect(() => {
        if (window.document.getElementById("scrollable-profile-panel-user") && window.document.getElementById("scrollable-profile-panel-inside-user")) {

            window.document.getElementById("scrollable-profile-panel-user").addEventListener('scroll', listenScrollEvent)
            window.document.getElementById("scrollable-profile-panel-inside-user").addEventListener('scroll', listenScrollEvent)
        }
    }, [window.document.getElementById("scrollable-profile-panel-user"), window.document.getElementById("scrollable-profile-panel-inside-user")])

    console.log('err', err)

    return (
        <PanelLayout switchTheme={switchTheme} theme={theme} id={"scrollable-profile-panel-user"}>
            <Box
                id="profile"
                sx={{
                    ml: { xs: 'none', sm: '80px' },
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: 'calc(100% - 80px)' },
                    height: 'calc(100vh - 55px)',
                    gap: { xs: '22px', md: '24px' },
                    boxSizing: 'border-box', padding: '20px 15px 40px'

                }}>
                {err ?
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center', alignItems: 'center',
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                        backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
                    }}>
                        <Typography sx={{ color: 'primary.error', textAlign: 'center', textTransform: 'capitalize' }}>
                            {err}
                        </Typography>
                    </Box>
                    :
                    <>
                        {userloading ?
                            <>
                                <Skeleton sx={{ borderRadius: '24px' }} width={'100%'} height={'250px'} />
                                <Skeleton sx={{ borderRadius: '24px' }} width={'100%'} height={'100%'} />
                            </>
                            :
                            <>
                                <ProfileCard
                                    sendFriendRequest={sendFriendRequest}
                                    user={user}
                                    isFriend={isFriends} isFollowing={isFollowing}
                                    setProgressBarOpen={setProgressBarOpen} progressBarOpen={progressBarOpen} />
                                <ShowPanel sx={{

                                    flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '22px', md: '24px' },
                                }}>
                                    {progressBarOpen ?
                                        <ProfileBar user={user} />
                                        : undefined}
                                    <ProfilePanel sendFriendRequest={sendFriendRequest}
                                        user={user} isFriend={isFriends} isFollowing={isFollowing} />
                                </ShowPanel>
                            </>
                        }
                    </>
                }
            </Box>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />

        </PanelLayout >
    );

}

export default Profile;
