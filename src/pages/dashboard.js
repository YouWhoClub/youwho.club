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
import NavbarTransparent from "../components/NavbarTransparent";
import ProfileCard from "../components/dashboard/ProfileCard";
import PanelLayout from "../components/PanelLayout";
import DashBar from "../components/dashboard/DashBar.js";
import Selection from "../components/selection";
import ProfilePanel from "../components/dashboard/profilePanel";
import { ToastContainer } from 'react-toastify';

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
    marginTop: '20px',
    marginBottom: '20px',
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

    const listenScrollEvent = e => {
        let card = window.document.getElementById('profile-card')
        let pic = window.document.getElementById('profile-pic')
        let insidePanel = window.document.getElementById('scrollable-profile-panel-inside')
        if (window.document.getElementById("scrollable-profile-panel").scroll > '300px' || window.document.getElementById("scrollable-profile-panel-inside").scroll > '1px') {
            card.style.height = '100px'
            pic.style.height = '50px'
            pic.style.width = '50px'
            insidePanel.style.overflowY = 'scroll'
        }
        if (window.document.getElementById("scrollable-profile-panel-inside").scroll < '1px') {
            card.style.height = '250px'
            pic.style.height = '100px'
            pic.style.width = '100px'
            insidePanel.style.overflowY = 'hidden'
        }
    }

    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel").addEventListener('scroll', listenScrollEvent)
    }, [])



    return (
        <PanelLayout switchTheme={switchTheme} theme={theme} id={"scrollable-profile-panel"}>
            <Box sx={{
                width: { xs: '90%', sm: 'calc(100% - 80px)' }, display: 'flex'
            }}>
                <Box sx={{
                    px: { xs: 'none', sm: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', mt: 1
                }}>
                    {globalUser.isLoggedIn ?
                        <>
                            <ProfileCard username={globalUser.username} youwhoID={globalUser.youwhoID} />
                            <ShowPanel sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                                {/* <Selection width={'200px'} tabs={['zadtan', 'zadtann', 'zadtannn', 'zadtannnn']} handleSelect={handleSelect} selectValue={selectValue} /> */}
                                <DashBar username={globalUser.username} tabs={['zadtan', 'zadtan', 'zadtan', 'zadtan']} />
                                <ProfilePanel />
                            </ShowPanel>
                        </>
                        :
                        <>you are not logged in </>}
                </Box>
                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
            </Box>
        </PanelLayout >
    );

}

export default Dashboard;