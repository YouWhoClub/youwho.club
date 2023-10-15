import { Box, ClickAwayListener, FormControl, makeStyles, Menu, MenuItem, Popper, Select } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useEffect, useState } from "react";

const SelectionBox = styled(Box)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
justify-content:space-between;
border: 1px solid #DEDEDE;
border-radius: 12px;
overflow:hidden;
height:50px;
@media screen and (max-width: 769px) {
    font-size:14px;
 }
  
`;



const Selection = ({ width, tabs, handleSelect, selectValue, id, icon }) => {
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
            <SelectionBox
                id={id}
                className="p-3"
                onClick={handleClick}
                sx={{
                    width: { width }, color: 'primary.text',
                    borderBottomRightRadius: expanded ? 0 : '12px',
                    borderBottomLeftRadius: expanded ? 0 : '12px',
                    fontWeight: expanded ? 500 : 400,
                    bgcolor: 'secondary.bg'
                }}
            >
                <span style={{ color: "inherit", width: "max-content", paddingLeft: '16px' }}>{icon ? icon : undefined}{selectValue ? selectValue : tabs[0]}</span>
                {expanded ? <ArrowUp2 size="18" style={{ paddingRight: '16px' }} /> : <ArrowDown2 size="18" style={{ paddingRight: '16px' }} />}
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
                        borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px",
                        borderBottom: "1px solid #DEDEDE", borderRight: "1px solid #DEDEDE", borderLeft: "1px solid #DEDEDE",
                        overflow: "hidden"
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


            </SelectionBox>
        </ClickAwayListener>

    );
}

export default Selection;