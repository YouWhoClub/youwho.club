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
import Selection from "../components/selection";
import ProfilePanel from "../components/dashboard/profilePanel";
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

const Dashboard = ({ switchTheme }) => {
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

    return (
        <PanelLayout switchTheme={switchTheme}>
            <Box sx={{
                width: { xs: '100%', sm: 'calc(100% - 80px)' }, display: 'flex'
            }}>
                <Box sx={{
                    px: 1, display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    {globalUser.isLoggedIn ?
                        <>
                            <ProfileCard username={globalUser.username} youwhoID={shorten(globalUser.youwhoID)} />
                            <ShowPanel sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                                {/* <Selection width={'200px'} tabs={['zadtan', 'zadtann', 'zadtannn', 'zadtannnn']} handleSelect={handleSelect} selectValue={selectValue} /> */}
                                <Progressive username={globalUser.username} tabs={['zadtan', 'zadtan', 'zadtan', 'zadtan']} />
                                <ProfilePanel />
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