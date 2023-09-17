// import { Avatar } from "@mui/joy";
import styled from "@emotion/styled";
import { Inbox } from "@mui/icons-material";
import {
    Box,
    //  List, ListItem, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material";
import { Gallery } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
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

const Dashboard = () => {
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
        <Box sx={{
            height: 'calc(100vh - 150px)',
            bgcolor: 'primary.dark',
            pb: 5,
            pt: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'white'
        }}>
            {globalUser.isLoggedIn ?
                <>
                    <Avatarr>{shortenName(globalUser.username)}</Avatarr>
                    <div>welcome {globalUser.username}</div>
                    <div>
                        ((  PROFILE DESIGNS ...  ))
                    </div>
                    {/* <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Gallery />
                                </ListItemIcon>
                                <ListItemText primary="Private Gallery" />
                            </ListItemButton>
                        </ListItem>
                    </List> */}
                    {globalUser.youwhoID ?
                        <>
                            <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/gallery/user/${globalUser.youwhoID}`}>Private Gallery</Link>
                            <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/deposits/user/${globalUser.youwhoID}`}>User Deposits</Link>
                            <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/withdraws/user/${globalUser.youwhoID}`}>User Withdraws</Link>
                            <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/gifts/user/${globalUser.youwhoID}`}>Unclaimed Gifts</Link>
                        </> : undefined}
                    <p />
                    <Box
                        sx={{
                            cursor: 'pointer',
                            color: 'primary.gray',
                            '&:hover': {
                                color: 'primary.main',
                            },
                            transition: '300ms ease'

                        }}>
                        {globalUser.youwhoID ?
                            <YID onClick={() => copyidToClipBoard(globalUser.youwhoID)}>youwho id :{globalUser.youwhoID}</YID> :
                            <Link to={'/generate-wallet'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                BUILD YOUR YOUWHO WALLET AND GET YOUR YOUWHO ID
                            </Link>
                        }
                    </Box>
                </>
                :
                <>you are not logged in </>}
            <Bar />

        </Box>
    );
}

export default Dashboard;