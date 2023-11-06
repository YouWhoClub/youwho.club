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
    borderRadius:'50%',
    textTransform:"uppercase",
    "@media (max-width: 900px)": {
        width: '50px',
        height: '50px',
    },
}))


const Profile = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [user, setUser] = useState({ YouWhoID: '0x938203j8s849020hdh38jd', username: 'username' })
    const shortenName = (str) => {
        if (str)
            return str.length > 1 ? str.substring(0, 1) : str;
        return 'undefined'

    }
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
            {/* {globalUser.isLoggedIn ?
                <> */}



            <Avatarr>{shortenName(user.username)}</Avatarr>
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
            {user.YouWhoID ?
                <>
                    <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/gallery/user/${globalUser.YouWhoID}`}>Private Gallery</Link>
                    <Link style={{ textDecoration: 'none', color: 'lightblue' }} to={`/gallery/user/${globalUser.YouWhoID}`}>Public Gallery</Link>
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
                {user.YouWhoID ?
                    <>YouWho id :{user.YouWhoID}</> :
                    <>user does not have YouWho id</>
                }
            </Box>
            {/* </>
                :
                <>you are not logged in </>
            } */}

        </Box >
    );
}

export default Profile;