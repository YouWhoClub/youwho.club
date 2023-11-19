import { Box, ClickAwayListener, FormControl, makeStyles, Menu, MenuItem, Popper, Select, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useEffect, useState } from "react";

const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between', boxSizing: 'border-box',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    height: '36px',
    color: theme.palette.primary.text

}))



const FilterSelection = ({ width, tabs, handleSelect, selectValue, id, icon, text }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = useState(tabs[0])
    const [popWidth, setPopWidth] = useState(width)
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
    useEffect(() => {
        if (width == '100%') {
            let pW = document.getElementById(id)?.offsetWidth
            setPopWidth(`${pW}px`)
        }
        else
            setPopWidth(width)
    }, [document.getElementById(id)?.offsetWidth, width])

    const pWidth = document.getElementById(id)?.offsetWidth
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <FilterSelectionBox
                id={id}
                onClick={handleClick}
                sx={{
                    p: '8px 16px',
                    mt:1,
                    width: { width }, color: 'primary.text',
                    borderBottomRightRadius: expanded ? 0 : '18px',
                    borderBottomLeftRadius: expanded ? 0 : '18px',
                    bgcolor: 'secondary.bg',
                    boxShadow: expanded && (localStorage.getItem('theme') == 'dark' ? '0px 0px 7px 0px rgba(227,209,231, 0.25)' : '0px 0px 7px 0px rgba(0, 0, 0, 0.25)'),
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: "inherit", width: "max-content", }}>
                        {icon ? icon : undefined}
                        {text}
                    </Typography>
                    <Typography>&nbsp;:&nbsp;&nbsp; </Typography>
                    <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>
                        {selectValue ? selectValue : ''}
                    </Typography>
                </Box>
                {expanded ? <ArrowUp2 size="18" style={{}} /> : <ArrowDown2 size="18" style={{}} />}
                <Popper
                    PaperProps={{
                        style: {
                            // width: `${popWidth}px`,
                            // backgroundColor: "transparent",
                        }
                    }}
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
                        width: `${popWidth}`,
                        // width: { width },
                        bgcolor: 'secondary.bg',
                        zIndex: 1400,
                        borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px",
                        borderBottom: "1px solid #DEDEDE", borderRight: "1px solid #DEDEDE", borderLeft: "1px solid #DEDEDE",
                        overflow: "hidden",
                        boxShadow: expanded && (localStorage.getItem('theme') == 'dark' ? '0px 3px 7px 0px rgba(227,209,231, 0.25)' : '0px 3px 7px 0px rgba(0, 0, 0, 0.25)'),
                    }}
                >
                    {tabs.map((tab, index) => (
                        <MenuItem id={tab} sx={{
                            color: 'secondary.text', bgcolor: 'secondary.bg',
                            '&:hover': {
                                bgcolor: 'primary.bgOp',
                            }
                        }}
                            onClick={handleClose}>{tab}</MenuItem>
                    ))}
                </Popper>


            </FilterSelectionBox>
        </ClickAwayListener>

    );
}

export default FilterSelection;