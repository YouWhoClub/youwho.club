import styled from "@emotion/styled";
import { Close, Face } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Popper, TextField } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { ArrowDown2, ArrowUp2, Profile, Setting2, TickCircle } from "iconsax-react";
import { useState } from "react";
const Bar = styled(Box)(({ theme }) => ({
    width: { xs: '100%', sm: '200px' },
    borderRadius: '24px', marginBottom: '20px',
    // display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)', overflow: 'hidden', height: 'auto'
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
    backgroundColor: theme.palette.primary.middle,
}))

const BannerEdit = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    width: '60px',
    height: '30px',
    backgroundColor: theme.palette.primary.middle,
}))

const DashBar = ({ selectValue, tabs, handleSelect, username }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(tabs[0])
    const [editProfile, setEditProfile] = useState(false)

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

    return (
        <Box sx={{
            width: { xs: '100%', sm: '200px' },
            // mb: 2, 
            // mr: { xs: 0, sm: '20px' },
            height:'max-content',
            borderRadius: '24px',
            boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
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
                        <Accordion sx={{
                            my:1,
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                                    <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Profile Picture</Typography>
                                    <AvatarEdit />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Banner Picture</Typography>
                                    <BannerEdit />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my:1,
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                                <TextField sx={{ fontSize: '12px' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{
                            my:1,
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                            my:1,
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                            my:1,
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                    : <>
                        <Box sx={{ color: 'primary.text', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', my: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Face /> &nbsp;
                                {shorten(username)}
                            </div>
                            <Setting2 size='16px' cursor='pointer' onClick={() => setEditProfile(true)} />
                        </Box>
                        <Accordion sx={{
                            width: '100%',
                            bgcolor: 'primary.bg',
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
                                <div>zadtan</div>
                                <div>zadtan</div>
                                <div>zadtan</div>
                                <div>zadtan</div>
                                <div>zadtan</div>
                            </AccordionDetails>
                        </Accordion>
                    </>}
            </Box>

        </Box>
    );
}

export default DashBar;
