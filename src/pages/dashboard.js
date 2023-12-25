// import { Avatar } from "@mui/joy";
import styled from "@emotion/styled";
import { Inbox } from "@mui/icons-material";
import {
    Box,
    //  List, ListItem, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material";
import { Gallery, Profile } from "iconsax-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import ProfileCard from "../components/dashboard/ProfileCard";
import PanelLayout from "../components/PanelLayout";
import DashBar from "../components/dashboard/DashBar.js";
import Selection from "../components/selection";
import ProfilePanel from "../components/dashboard/profilePanel";
import { ToastContainer } from 'react-toastify';
import '../index.css'
import VerifyPhoneModal from "../components/user/auth/verifyPhoneModal.js";
const Avatarr = styled(Box)(({ theme }) => ({
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center', alignItems: 'center',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    backgroundColor: theme.palette.primary.ultra,
    cursor: 'pointer',
    border: '0.5px solid',
    borderRadius: '50%',
    textTransform: "uppercase",
    "@media (max-width: 900px)": {
        width: '50px',
        height: '50px',
    },
}))
const YID = styled('div')(({ theme }) => ({
    fontSize: '16px',
    "@media (max-width: 600px)": {
        fontSize: '12px',
    },
}))
const ShowPanel = styled(Box)(({ theme }) => ({
    // marginTop: '30px',
    // marginBottom: '20px',
    transition: '500ms ease',
    display: 'flex',
    justifyContent: 'space-between',


}))

const Dashboard = ({ switchTheme, theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [idCopied, setIdCopied] = useState(false)
    const [selectValue, setSelectValue] = useState(undefined)
    const handleSelect = (e) => {
        e.preventDefault()
        setSelectValue(e.target.id)
    }
    const shortenName = (str) => {
        if (str)
            return str.length > 1 ? str.substring(0, 1) : str;
        return 'undefined'
    }
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + '...' : str;
        return 'undefined'
    }
    const copyidToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied('Failed to copy!');
        }
    };
    const [openModal, setOpenModal] = useState(false)


    // if phone verification is necessary ===>

    // useEffect(() => {
    //     if (globalUser.isLoggedIn) {
    //         if (!globalUser.isPhoneVerified) {
    //             setOpenModal(true)
    //         }
    //     }
    // }, [globalUser.isLoggedIn, globalUser.YouWhoID, globalUser.isPhoneVerified])

    const [progressBarOpen, setProgressBarOpen] = useState(false)

    const listenScrollEvent = e => {
        let card = window.document.getElementById('profile-card')
        let line = window.document.getElementById('line-profile-user')
        let pic = window.document.getElementById('profile-pic')
        // let dashbar = window.document.getElementById('dash-bar')
        let insidePanel = window.document.getElementById('scrollable-profile-panel-inside')
        let outsidePanel = window.document.getElementById('dash')
        if (window.document.getElementById("scrollable-profile-panel-inside").scrollTop > 0 || window.document.getElementById("scrollable-profile-panel").scrollTop > 0) {
            card.classList.add("profileBannerAfterScroll")
            pic.classList.add("profilePicAfterScroll")
            line.classList.add("profileLineAfterScroll")
            insidePanel.classList.remove("insidePanelBeforeScroll")
            insidePanel.classList.add("insidePanelAfterScroll")
            outsidePanel.classList.add("dashAfterScroll")
            if (progressBarOpen) {
                setProgressBarOpen(false)
            }

        }
        else if (window.document.getElementById("scrollable-profile-panel").scrollTop >= 0 && window.document.getElementById("scrollable-profile-panel-inside").scrollTop == 0) {
            card.classList.remove("profileBannerAfterScroll")
            pic.classList.remove("profilePicAfterScroll")
            // dashbar.classList.remove("dashbarAfterScroll")
            insidePanel.classList.add("insidePanelBeforeScroll")
            insidePanel.classList.remove("insidePanelAfterScroll")
            outsidePanel.classList.remove("dashAfterScroll")
            line.classList.remove("profileLineAfterScroll")
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
                id="dash"
                sx={{
                    ml: { xs: 'none', sm: '80px' },
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: 'calc(100% - 80px)' },
                    height: 'calc(100vh - 55px)',
                    gap: { xs: '22px', md: '24px' },
                    boxSizing: 'border-box', padding: '20px 15px 40px'
                }}>
                {globalUser.isLoggedIn ?
                    <>
                        <ProfileCard username={globalUser.username} YouWhoID={globalUser.YouWhoID} setProgressBarOpen={setProgressBarOpen} progressBarOpen={progressBarOpen} />
                        <ShowPanel sx={{
                            flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: '22px', md: '24px' }, boxSizing: 'border-box'
                        }}>
                            {progressBarOpen ?
                                <DashBar username={globalUser.username} /> : undefined}
                            <ProfilePanel />
                        </ShowPanel>
                    </>
                    :
                    <>you are not logged in </>}
            </Box>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
            <VerifyPhoneModal openModal={openModal} setOpenModal={setOpenModal} />

        </PanelLayout >
    );

}

export default Dashboard;