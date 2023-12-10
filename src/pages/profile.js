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
import NavbarTransparent from "../components/NavbarTransparent";
import PanelLayout from "../components/PanelLayout";
import Selection from "../components/selection";
import { ToastContainer } from 'react-toastify';
import '../index.css'
import ProfileCard from "../components/profile/ProfileCard.js";
import ProfileBar from "../components/profile/ProfileBar.js";
import ProfilePanel from "../components/profile/profilePanel.js";
import { PUBLIC_API } from "../utils/data/public_api.js";
import { BG_URL, PUBLIC_URL } from "../utils/utils.js";
import bgDots from '../assets/bgDots.svg'
const ShowPanel = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',


}))

const Profile = ({ switchTheme, theme, props }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [idCopied, setIdCopied] = useState(false)
    const [selectValue, setSelectValue] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const apiCall = useRef(undefined)
    const [user, setUser] = useState(undefined)

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
            setLoading(false)
            setErr(undefined)
        }
        catch (err) {
            setErr(err.message)
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

    const listenScrollEvent = e => {
        let card = window.document.getElementById('profile-card-user')
        let pic = window.document.getElementById('profile-pic-user')
        let dashbar = window.document.getElementById('profile-bar-user')
        let insidePanel = window.document.getElementById('scrollable-profile-panel-inside-user')
        let outsidePanel = window.document.getElementById('profile')
        if (window.document.getElementById("scrollable-profile-panel-inside-user").scrollTop > 0 || window.document.getElementById("scrollable-profile-panel-user").scrollTop > 0) {
            card.classList.add("profileBannerAfterScroll")
            pic.classList.add("profilePicAfterScroll")
            // dashbar.classList.add("dashbarAfterScroll")
            // insidePanel.classList.add("insidePanelAfterScroll")
            outsidePanel.classList.add("dashAfterScroll")
        }
        else if (window.document.getElementById("scrollable-profile-panel-user").scrollTop >= 0 && window.document.getElementById("scrollable-profile-panel-inside-user").scrollTop == 0) {
            card.classList.remove("profileBannerAfterScroll")
            pic.classList.remove("profilePicAfterScroll")
            // dashbar.classList.remove("dashbarAfterScroll")
            // insidePanel.classList.remove("insidePanelAfterScroll")
            outsidePanel.classList.remove("dashAfterScroll")
        }
    }

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
                    width: '100%',
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
                        {loading ?
                            <>
                                <Skeleton sx={{ borderRadius: '24px' }} width={'100%'} height={'250px'} />
                                <Skeleton sx={{ borderRadius: '24px' }} width={'100%'} height={'100%'} />
                            </>
                            :
                            <>
                                <ProfileCard user={user} />
                                <ShowPanel sx={{
                                    flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '22px', md: '24px' },
                                }}>
                                    <ProfileBar user={user} />
                                    <ProfilePanel user={user} />
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