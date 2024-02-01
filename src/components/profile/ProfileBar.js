import styled from "@emotion/styled";
import { CheckRounded, Close, Face } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Modal, Popper, TextField } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { ArrowDown2, ArrowUp2, Check, Clock, Profile, Setting2, TickCircle, Timer } from "iconsax-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_CONFIG } from "../../config";
import { toast } from 'react-toastify';
import { getuser } from "../../redux/actions";
import ButtonOutline from "../buttons/buttonOutline";



const Bar = styled(Box)(({ theme }) => ({
    // height: 'max-content', 
    backgroundColor: theme.palette.secondary.bg,
    // borderRadius: '24px',
    // marginBottom: '20px',
    boxShadow: theme.palette.primary.boxShadow,
    overflow: 'hidden',
    transition: '500ms ease',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '5px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '5px',
        height: '5px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '1px',
        height: '1px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
}))

const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.secondary.text,
    // margin: '3px 0'
}))

const ProfileBar = ({ user, openBar, closeBar }) => {
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
            return str.length > 20 ? str.substring(0, 20) + '...' : str;
        return 'undefined'
    }

    let socials = []
    if (user.extra) {
        for (let i = 0; i < user.extra.length; i++) {
            if (user.extra[i].social)
                socials = user.extra[i].social
        }
    }

    return (
        <>
            {/* mobile and tablet view  */}
            <Modal
                open={openBar}
                onClose={closeBar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'start',
                    backdropFilter: 'blur(10px)', backgroundColor: 'primary.bg',
                    boxSizing: 'border-box', flexDirection: 'column', gap: '32px', padding: '0px 12px 10px 12px'
                })}>
                    <FlexRow sx={{ width: '100%', height: '50px' }}>
                        <Box />
                        <Close onClick={closeBar} cursor="pointer" />
                    </FlexRow>
                    <Typography sx={{ color: 'primary.text', fontSize: '20px' }}>
                        {shorten(user.username)}'s Progressive
                    </Typography>
                    <Bar
                        id="profile-bar-user"
                        sx={{
                            // borderRadius: { xs: '0', sm: '24px' },
                            height: { xs: '100%', sm: 'max-content' },
                            maxHeight: { xs: '100%', sm: '90vh', md: '80vh' },
                            width: { xs: '100%', sm: '400px', md: '325px' },
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'space-between',
                            p: '10px',
                            gap: '15px',
                            backgroundColor: 'transparent !important',
                            boxShadow: 'none !important'
                        }}>
                        <Box sx={{
                            boxSizing: 'border-box', width: '100%',
                            gap: '15px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            {/* <Box sx={{
                                color: 'primary.text', display: 'flex', justifyContent: 'space-between',
                                width: '100%', alignItems: 'center',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <Face sx={{ fontSize: '50px' }} /> &nbsp;
                                    {shorten(user.username)}
                                </div>
                            </Box> */}
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
                                    {socials && socials.length > 0 &&
                                        <>
                                            {socials.map((social) => (<FlexRow>
                                                <Typography sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: 'primary.main',
                                                    fontSize: '12px'
                                                }}>
                                                    {social.name}
                                                </Typography>
                                                <Typography sx={{
                                                    display: "flex", alignItems: "center",
                                                    color: 'primary.text', fontSize: '12px'
                                                }}>
                                                    {social.url}
                                                </Typography>
                                            </FlexRow>))}
                                        </>
                                    }
                                </AccordionDetails>
                            </Accordion>
                            {/* <Accordion sx={{
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
                            </Accordion> */}
                        </Box>
                        {/* 
                        <Box sx={{ justifySelf: 'end !important' }}>
                            <ButtonOutline mt={'20px'} text={'close'} onClick={closeBar} w={'100%'} px={'16px'} />
                        </Box> */}

                    </Bar>
                </Box>
            </Modal>


            {/* desktop view */}
            <Bar
                id="profile-bar-user"
                sx={{
                    width: '325px',
                    height: 'max-content', maxHeight: window.document.getElementById('user-profile-panel').offsetHeight,
                    boxSizing: 'border-box', borderRadius: '24px',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column', alignItems: 'center', p: '16px 12px',
                    gap: '15px'
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
                        {socials && socials.length > 0 &&
                            <>
                                {socials.map((social) => (<FlexRow>
                                    <Typography sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: 'primary.main',
                                        fontSize: '12px'
                                    }}>
                                        {social.name}
                                    </Typography>
                                    <Typography sx={{
                                        display: "flex", alignItems: "center",
                                        color: 'primary.text', fontSize: '12px'
                                    }}>
                                        {social.url}
                                    </Typography>
                                </FlexRow>))}
                            </>
                        }
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

        </>
    );
}

export default ProfileBar;
