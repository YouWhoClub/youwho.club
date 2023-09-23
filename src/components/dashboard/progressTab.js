import styled from "@emotion/styled";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Popper } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
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

const Progressive = ({ selectValue, tabs, handleSelect }) => {
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
    return (
        <Box sx={{
            width: { xs: '100%', sm: '200px' }, mb: 2, mr: { xs: 0, sm: '20px' },
        }}>
            <Accordion sx={{
                bgcolor: 'primary.bg',
                color: 'primary.text',
                // border: 'none',
                '&:before': {
                    bgcolor: 'transparent',
                },
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                borderRadius: '24px !important',
            }}>
                <AccordionSummary
                    expandIcon={<ArrowDown2 />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Progressive</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ borderTop: '1px solid', borderColor: 'primary.gray' }}
                >
                    <p>zadtan</p>
                    <p>zadtan</p>
                    <p>zadtan</p>
                    <p>zadtan</p>
                    <p>zadtan</p>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default Progressive;
{/* <ClickAwayListener onClickAway={handleClickAway}>

    <Bar>
    <Title
        onClick={handleClick}
        sx={{
            color: 'primary.text', borderBottomRightRadius: expanded ? 0 : '24px',
            boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
            borderBottomLeftRadius: expanded ? 0 : '24px', fontWeight: expanded ? 500 : 400,
            borderBottom: expanded ? '1px solid' : 'unset', borderColor: 'secondary.gray'
        }}
    >

        <span style={{ color: "inherit", width: "max-content", paddingLeft: '16px' }}>{selectValue ? selectValue : tabs[0]}</span>
        {expanded ? <ArrowUp2 size="18" style={{ paddingRight: '16px' }} /> : <ArrowDown2 size="18" style={{ paddingRight: '16px' }} />}
        <Popper
            disableScrollLock={true}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            placement='bottom-end'
            sx={{
                // width: '100%',
                boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
                zIndex: 1400,
                borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px",
                //  borderBottom: "1px solid #d9d9d9", borderRight: "1px solid #d9d9d9", borderLeft: "1px solid #d9d9d9",
                overflow: "hidden"
            }}
        >
            {tabs.map((tab, index) => (
                <MenuItem id={tab} sx={{
                    color: 'secondary.text', bgcolor: 'primary.bg',
                    '&:hover': {
                        bgcolor: 'secondary.light',
                    }
                }}
                    onClick={handleClose}>{tab}</MenuItem>
            ))}
        </Popper>
    </Title>

    </Bar>
</ClickAwayListener> */}
