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
    borderRadius: '24px', marginBottom: '20px',
    boxShadow: theme.palette.primary.boxShadow, overflow: 'hidden',
    transition:'500ms ease'
}))
const Title = styled(Box)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
border-top-left-radius:24px;
border-top-right-radius:24px;
background: transparent;
width:100%;
justify-content:space-between;
borderBottom: 1px solid #D9D9D9;
height:30px;
@media screen and (max-width: 769px) {
    font-size:14px;
}
  
`;
const AvatarEdit = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    width: '30px',
    height: '30px',
}))

const BannerEdit = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    width: '60px',
    height: '30px',
    backgroundColor: theme.palette.primary.middle,
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.secondary.text,
    margin: '3px 0'
}))

const DashBar = ({ selectValue, tabs, handleSelect, username }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(tabs[0])
    const [editProfile, setEditProfile] = useState(false)
    const globalUser = useSelector(state => state.userReducer)
    const [bio, setBio] = useState('')
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [selectedBanner, setSelectedBanner] = useState(null)
    const avatarFileInput = useRef()
    const bannerFileInput = useRef()
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

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setExpanded(!expanded)
        if (!expanded)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        handleSelect(e)
        // setValue(selectValue)
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
        setExpanded(false)
    }
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + '...' : str;
        return 'undefined'
    }

    const avatarChangeHandler = event => {
        setSelectedAvatar(event.target.files[0])
    }
    const bannerChangeHandler = event => {
        setSelectedBanner(event.target.files[0])
    }

    const fileUploadHandler = async event => {
        loading();
        const promises = [];

        if (selectedAvatar) {
            const avatarfd = new FormData();
            avatarfd.append('img', selectedAvatar)

            const avatarPromise = fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                },
                body: avatarfd,
            }).then(response => response.json());

            promises.push(avatarPromise);
        }

        if (selectedBanner) {
            const bannerfd = new FormData();
            bannerfd.append('img', selectedBanner)

            const bannerPromise = fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/banner`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                },
                body: bannerfd,
            }).then(response => response.json());

            promises.push(bannerPromise);
        }

        if (promises.length > 0) {
            Promise.all(promises)
                .then(results => {
                    const areSuccessful = results.every(result => result.status === 200);
                    if (areSuccessful) {
                        updateToast(true, results[0].message);
                        fetchUser(globalUser.token)
                        // Perform other tasks here
                    } else {
                        // Handle error case when at least one API call fails
                        updateToast(false, 'An error occurred');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error case
                    updateToast(false, 'An error occurred');
                });
        } else {
            // Handle case when no API calls are made
            updateToast(false, 'An error occurred');
        }

    }

    const updateBio = async event => {
        loading()
        if (bio) {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/bio`, {
                method: 'POST',
                body: JSON.stringify({ bio: bio }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                fetchUser(globalUser.token)
                updateToast(true, response.message)
            } else {
                updateToast(false, response.message)
            }
        }
    }

    return (
        <Bar
            id="dash-bar"
            sx={{
                width: { xs: '100%', md: '325px' },
            }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1
            }}>
                {editProfile ?
                    <>
                        <Box sx={{ color: 'primary.text', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', my: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Edit Profile
                            </div>
                            <Close fontSize='16px' cursor='pointer' onClick={() => setEditProfile(false)} />
                        </Box>
                        <Accordion 
                        sx={{
                            my: 1,
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Image</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        id={"img"}
                                        accept="image/*"
                                        onChange={avatarChangeHandler}
                                        ref={avatarFileInput}
                                    />
                                    <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Profile Picture</Typography>
                                    <AvatarEdit
                                        sx={{
                                            cursor: 'pointer',
                                            background: () => {
                                                return (
                                                    selectedAvatar
                                                        ? `url('${URL.createObjectURL(selectedAvatar)}') no-repeat center`
                                                        : globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}') no-repeat center` : '#846894'
                                                )
                                            },
                                            backgroundSize: 'cover'
                                        }}
                                        onClick={() => avatarFileInput.current.click()}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        id={"img"}
                                        accept="image/*"
                                        onChange={bannerChangeHandler}
                                        ref={bannerFileInput}
                                    />
                                    <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Banner Picture</Typography>
                                    <BannerEdit
                                        sx={{
                                            cursor: 'pointer',
                                            background: () => {
                                                return (
                                                    selectedBanner
                                                        ? `url('${URL.createObjectURL(selectedBanner)}') no-repeat center`
                                                        : globalUser.banner ? `url('${API_CONFIG.API_URL}/${globalUser.banner}') no-repeat center` : '#846894'
                                                )
                                            },
                                            backgroundSize: 'cover'
                                        }}
                                        onClick={() => bannerFileInput.current.click()}
                                    />
                                </Box>
                                <Box
                                    onClick={fileUploadHandler}
                                    sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', cursor: 'pointer' }}>
                                    <Typography
                                        sx={{ fontSize: '10px' }}
                                    >Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my: 1,
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Bio</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <TextField value={bio} onChange={e => setBio(e.target.value)} placeholder={globalUser.bio ? globalUser.bio : 'please write a few lines about your self'} multiline inputProps={{ style: { fontSize: 12 } }} />
                                <Box
                                    onClick={updateBio}
                                    sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', cursor: 'pointer' }}>
                                    <Typography
                                        sx={{ fontSize: '10px' }}
                                    >
                                        Save</Typography>
                                    <TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my: 1,
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Social Media</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my: 1,
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Email</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my: 1,
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Mbile Numbe</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </>
                    :
                    <>
                        <Box sx={{ color: 'primary.text', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', my: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                <Face /> &nbsp;
                                {shorten(username)}
                            </div>
                            <Setting2 size='16px' cursor='pointer' onClick={() => setEditProfile(true)} />
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Progressive</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Bio</Typography>
                                    {globalUser.bio ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>YouWho Wallet</Typography>
                                    {globalUser.youwhoID ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Social Links</Typography>
                                    {globalUser.socials ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Email</Typography>
                                    {globalUser.mail ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Mail Varification</Typography>
                                    {globalUser.isMailVerified ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Phone Varification</Typography>
                                    {globalUser.isPhoneVerified ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Invite Friends</Typography>
                                    {globalUser.friends ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>Profile Image</Typography>
                                    {globalUser.avatar ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>First Mint</Typography>
                                    {globalUser.mint ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>First Buy</Typography>
                                    {globalUser.buy ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ fontSize: '12px' }}>First Sell</Typography>
                                    {globalUser.sell ?
                                        <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                        : <Timer color="pink" size='14px' />
                                    }
                                </FlexRow>
                            </AccordionDetails>
                        </Accordion>
                    </>}
            </Box>

        </Bar>
    );
}

export default DashBar;
