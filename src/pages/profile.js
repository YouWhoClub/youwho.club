// import { Avatar } from "@mui/joy";
import styled from "@emotion/styled";
import { Inbox } from "@mui/icons-material";
import {
    Box,
    //  List, ListItem, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material";
import { useEffect, useState } from "react";
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

const ShowPanel = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',


}))

const Profile = ({ switchTheme, theme, props }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [idCopied, setIdCopied] = useState(false)
    const [selectValue, setSelectValue] = useState(undefined)

    const username = window.location.pathname.replace('/profile/', '')
    const user = {
        username: username,
        identifier: `${username}@youwho.co`,
        cid: 'sdfffffffff',
        YouWhoID: '0xkwd4nd'
    }

    const listenScrollEvent = e => {
        let card = window.document.getElementById('profile-card')
        let pic = window.document.getElementById('profile-pic')
        let dashbar = window.document.getElementById('profile-bar')
        let insidePanel = window.document.getElementById('scrollable-profile-panel-inside')
        let outsidePanel = window.document.getElementById('profile')
        if (window.document.getElementById("scrollable-profile-panel-inside").scrollTop > 0 || window.document.getElementById("scrollable-profile-panel").scrollTop > 0) {
            card.classList.add("profileBannerAfterScroll")
            pic.classList.add("profilePicAfterScroll")
            // dashbar.classList.add("dashbarAfterScroll")
            // insidePanel.classList.add("insidePanelAfterScroll")
            outsidePanel.classList.add("dashAfterScroll")
        }
        else if (window.document.getElementById("scrollable-profile-panel").scrollTop >= 0 && window.document.getElementById("scrollable-profile-panel-inside").scrollTop == 0) {
            card.classList.remove("profileBannerAfterScroll")
            pic.classList.remove("profilePicAfterScroll")
            // dashbar.classList.remove("dashbarAfterScroll")
            // insidePanel.classList.remove("insidePanelAfterScroll")
            outsidePanel.classList.remove("dashAfterScroll")
        }
    }

    useEffect(() => {
        if (window.document.getElementById("scrollable-profile-panel") && window.document.getElementById("scrollable-profile-panel-inside")) {

            window.document.getElementById("scrollable-profile-panel").addEventListener('scroll', listenScrollEvent)
            window.document.getElementById("scrollable-profile-panel-inside").addEventListener('scroll', listenScrollEvent)
        }
    }, [window.document.getElementById("scrollable-profile-panel"), window.document.getElementById("scrollable-profile-panel-inside")])



    return (
        <PanelLayout switchTheme={switchTheme} theme={theme} id={"scrollable-profile-panel"}>
            <Box
                id="profile"
                sx={{
                    ml: { xs: 'none', sm: '80px' },
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: 'calc(100vh - 55px)',
                    gap: { xs: '22px', md: '30px' },
                    boxSizing: 'border-box', padding: '20px 15px 40px'
                }}>
                <ProfileCard user={user} YouWhoID={user.YouWhoID} />
                <ShowPanel sx={{
                    flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '22px', md: '30px' },
                }}>
                    <ProfileBar username={username} />
                    <ProfilePanel user={user} />
                </ShowPanel>
            </Box>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />

        </PanelLayout >
    );

}

export default Profile;