import styled from "@emotion/styled";
import { CheckRounded, Close, Face } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Popper, TextField } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { ArrowDown2, ArrowUp2, Check, Clock, Profile, Setting2, TickCircle, Timer } from "iconsax-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_CONFIG } from "../../config";
import { toast } from 'react-toastify';
import { getuser } from "../../redux/actions";



const Bar = styled(Box)(({ theme }) => ({
    height: 'max-content', backgroundColor: theme.palette.secondary.bg,
    borderRadius: '24px',
    // marginBottom: '20px',
    boxShadow: theme.palette.primary.boxShadow, overflow: 'hidden',
    transition: '500ms ease'
}))

const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.secondary.text,
    margin: '3px 0'
}))

const ProfileBar = ({ user }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [editProfile, setEditProfile] = useState(false)
    const globalUser = useSelector(state => state.userReducer)
    const [bio, setBio] = useState('')
    const toastId = useRef(null);
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + '...' : str;
        return 'undefined'
    }

    return (
        <Bar
            id="profile-bar-user"
            sx={{
                width: { xs: '100%', lg: '325px' }, boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: '16px 12px', gap: '15px'
            }}>
            <Box sx={{
                color: 'primary.text', display: 'flex', justifyContent: 'space-between',
                width: '100%', alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <Face sx={{ fontSize: '50px' }} /> &nbsp;
                    {shorten(user.username)}
                </div>
            </Box>
            <Accordion sx={{
                width: '100%',
                bgcolor: 'secondary.bg',
                color: 'primary.text',
                border: '1px solid', borderColor: 'primary.gray',
                // border: 'none',
                '&:before': {
                    bgcolor: 'transparent',
                },
                // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                boxShadow: 'none !important',
                borderRadius: '24px !important', fontSize: '14px'
            }}>
                <AccordionSummary
                    expandIcon={<ArrowDown2 size='16px' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ minHeight: '30px !important', height: '30px' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '14px' }}>Bio</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '12px' }}>
                        {user.bio}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{
                width: '100%',
                bgcolor: 'secondary.bg',
                color: 'primary.text',
                border: '1px solid', borderColor: 'primary.gray',
                // border: 'none',
                '&:before': {
                    bgcolor: 'transparent',
                },
                // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                boxShadow: 'none !important',
                borderRadius: '24px !important', fontSize: '14px'
            }}>
                <AccordionSummary
                    expandIcon={<ArrowDown2 size='16px' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ minHeight: '30px !important', height: '30px' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '14px' }}>Social Media</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '12px' }}>
                        Social Media
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{
                width: '100%',
                bgcolor: 'secondary.bg',
                color: 'primary.text',
                border: '1px solid', borderColor: 'primary.gray',
                // border: 'none',
                '&:before': {
                    bgcolor: 'transparent',
                },
                // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                boxShadow: 'none !important',
                borderRadius: '24px !important', fontSize: '14px'
            }}>
                <AccordionSummary
                    expandIcon={<ArrowDown2 size='16px' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ minHeight: '30px !important', height: '30px' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '14px' }}>Wallet Circulation</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: '12px' }}>
                        Youwho Wallet account circulation
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Bar>
    );
}

export default ProfileBar;
