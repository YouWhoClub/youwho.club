import styled from "@emotion/styled";
import { Face } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Popper } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { ArrowDown2, ArrowUp2, Profile, Setting2 } from "iconsax-react";
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

const Progressive = ({ selectValue, tabs, handleSelect, username }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(tabs[0])
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
            borderRadius: '24px',
            boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1
            }}>
                <Box sx={{ color: 'primary.text', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', my: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Face /> &nbsp;
                        {shorten(username)}
                    </div>
                    <Setting2 size='16px' />
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
            </Box>

        </Box>
    );
}

export default Progressive;
