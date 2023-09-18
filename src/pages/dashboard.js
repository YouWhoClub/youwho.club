// import { Avatar } from "@mui/joy";
import styled from "@emotion/styled";
import { Inbox } from "@mui/icons-material";
import {
    Box,
    //  List, ListItem, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material";
import { Gallery, Profile } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/dashboard/ProfileCard";
import PanelLayout from "../components/PanelLayout";
import Progressive from "../components/dashboard/progressTab";
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
    display: 'flex',
    justifyContent: 'space-between', alignItems: 'center',

}))

const Dashboard = ({ switchTheme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [idCopied, setIdCopied] = useState(false)
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

    return (
        <PanelLayout switchTheme={switchTheme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', sm: 'calc(100% - 90px)' },
            }}>
                <Box sx={{
                    px: 1, display: 'flex',
                    flexDirection: 'column',
                }}>
                    {globalUser.isLoggedIn ?
                        <>
                            <ProfileCard username={globalUser.username} youwhoID={globalUser.youwhoID} />
                            <ShowPanel>
                                <Progressive />
                            </ShowPanel>
                        </>
                        :
                        <>you are not logged in </>}
                </Box>
            </Box>
        </PanelLayout >
    );

}

export default Dashboard;