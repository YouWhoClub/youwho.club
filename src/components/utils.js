import styled from "@emotion/styled"
import { AccountCircle } from "@mui/icons-material"
import { Box, ClickAwayListener, MenuItem, Popper, TextField, Typography, inputBaseClasses, inputLabelClasses } from "@mui/material"
import { BG_URL, PUBLIC_URL } from "../utils/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import ButtonPurple from "./buttons/buttonPurple"
import { ArrowDown2, ArrowUp2 } from "iconsax-react"
import ButtonPurpleLight from "./buttons/buttonPurpleLight"

const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // cursor: 'pointer',
    justifyContent: 'space-around',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    height: '36px', boxSizing: 'border-box', padding: '8px 16px',
    color: theme.palette.primary.text
}))
const RelationCardComp = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px',
    justifyContent: 'space-between',
    boxShadow: theme.palette.primary.boxShadow,
    borderRadius: '16px',
    height: '74px',
    width: '100%',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box'
}))
const ReactionCardComp = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px',
    justifyContent: 'space-between',
    boxShadow: theme.palette.primary.boxShadow,
    borderRadius: '16px',
    height: '110px',
    width: '100%',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box', gap: '16px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    color: theme.palette.primary.text,
}))
const SelectInputs = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.text
}))
const Inputt = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    height: '52px',
    padding: '12px 15px', borderRadius: '12px',
    color: theme.palette.primary.text, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
}))
const SelectInputt = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    height: '52px',
    padding: '12px 15px',
    color: theme.palette.primary.text, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
}))
const AuthInput = styled(Box)(({ theme }) => ({
    borderRadius: '12px',
    boxSizing: 'border-box',
    height: '50px',
    padding: '0px 24px 0px 15px',
    color: theme.palette.primary.text,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
}))
const TabsComp = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.gray,
    // width: '100%',
    display: 'flex',
    padding: '12px 0px 24px 0px',
    gap: '10px',
    flexWrap: 'wrap',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
    },
    '&::-webkit-scrollbar-button': {
    },

}))
const TabComp = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '8px 20px',
    whiteSpace: 'nowrap',
    borderRadius: '30px',
    lineHeight: 'normal',
    border: `1px solid ${theme.palette.primary.gray}`,

    '& .MuiTypography-root': {
        fontFamily: 'Inter',
        fontSize: '14px',
        lineHeight: 'normal',
        fontWeight: '400',
        padding: 0,
        "@media (max-width: 600px)": {
            fontSize: '12px',
        },

    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    },
    "@media (max-width: 600px)": {
        padding: '5px 12px',
    },
}))
const SubTabsComp = styled(Box)(({ theme }) => ({
    display: 'flex', flexWrap: 'wrap',
}))
const SubTabComp = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    borderRadius: '30px', fontSize: '12px', border: '1px solid', borderColor: theme.palette.primary.light,
    margin: '2px 4px',
    padding: '5px 20px',
    width: 'max-content',
    // height: '20px',
    textAlign: 'center',
    display: 'flex', alignItems: 'center', backgroundColor: theme.palette.secondary.bg,
    '&:hover': {
        borderColor: theme.palette.secondary.light,
    },
    "@media (max-width: 600px)": {
        padding: '5px 10px',
    },
}))
const TabsSimplee = styled(Box)(({ theme }) => ({
    width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const TabSimplee = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text, borderColor: theme.palette.primary.text,
    margin: '1px 3px',
    padding: '0 10px',
    width: 'max-content',
    cursor: 'pointer',
    height: '30px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    '&:hover': {
        color: theme.palette.secondary.text
    }
}))
const CommentCard = styled(Box)(({ theme }) => ({
    borderRadius: '16px', width: '100%',
    display: 'flex',
    padding: '8px 16px',
    boxSizing: 'border-box', boxShadow: theme.palette.primary.boxShadow
}))
const CommentCardProfileImg = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
    , width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.palette.primary.bgOp
}))

//-------------------- ^ styles -------- comps > -------------------- //
export const Tabs = ({ children, mb, w, jc }) => {
    return (
        <TabsComp
            sx={{ py: 1, mb: mb, width: w ? w : '100%', justifyContent: jc ? jc : 'unset', }}
        >
            {children}
        </TabsComp>
    )
}
export const Tab = ({ text, onClick, id, selected, icon }) => {
    return (
        <TabComp
            sx={
                selected ? { backgroundColor: 'primary.main', color: 'white', boxShadow: localStorage.getItem('theme') == 'light' ? '0px 0px 6px 1px rgba(0, 0, 0, 0.25)' : '0px 0px 4px 1px rgba(227,209,231,0.9)', }
                    : { backgroundColor: 'secondary.bg', color: 'secondary.text', boxShadow: localStorage.getItem('theme') == 'light' ? '0px 0px 4px 1px rgba(0, 0, 0, 0.25) inset' : 'inset 0px 0px 4px 1px rgba(227,209,231,0.9)' }
            }
            id={id}
            onClick={onClick}
        >
            {icon ? icon : undefined}
            < Typography sx={{ pointerEvents: 'none' }}>
                {text}
            </Typography >
        </TabComp >
    )
}
export const SubTabs = ({ children, mb, w, jc }) => {
    return (<SubTabsComp

        sx={{ py: 1, mb: mb, width: w ? w : '100%', justifyContent: jc ? jc : 'unset' }}
    >{children}</SubTabsComp>)
}
export const SubTab = ({ text, onClick, id, selected, icon }) => {
    return (<SubTabComp
        sx={{
            boxShadow: selected ? '0px 0px 4px 0px #8B3BBC' : 'unset',
            color: selected ? 'primary.main' : 'secondary.text',
        }}
        id={id} onClick={onClick}>
        {icon ? icon : undefined}
        &nbsp;
        {text}
    </SubTabComp>)
}
export const TabsSimple = ({ children, mb }) => {
    return (<TabsSimplee
        sx={{ mb: mb ? mb : 'unset' }}
    >{children}</TabsSimplee>)
}
export const TabSimple = ({ text, onClick, id, selected }) => {
    return (<TabSimplee
        sx={{ borderBottom: selected ? '1px solid' : 'unset', }}
        id={id} onClick={onClick}>
        {text}
    </TabSimplee>)
}
export const ButtonInput = ({ icon, textColor,
    labelColor, py, id, label, width, onChange,
    borderColor, type, button, value, placeholder, mb }) => {
    return (
        <Inputt sx={{
            width: width ? width : '200px', border: '1px solid',
            mb: mb ? mb : undefined,
            borderColor: borderColor ? borderColor : '#DEDEDE'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                <Box sx={{
                    mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon ? icon : undefined}
                </Box>
                <Typography sx={{ fontSize: '12px', color: 'primary.text' }}>{label}</Typography>
            </Box>
            <Box
                sx={{
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                {button ? button : undefined}
            </Box>
        </Inputt>
    )

}
export const SelectInput = ({ icon, textColor,
    labelColor, label, width, onChange,
    borderColor, type, button, value, placeholder, mb,
    tabs, handleSelect, id, }) => {
    const [expanded, setExpanded] = useState(false)
    const [popWidth, setPopWidth] = useState(width)
    const [anchorEl, setAnchorEl] = useState(null);
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
        else {
            setPopWidth(width)
        }
    }, [document.getElementById(id)?.offsetWidth, width])

    return (
        <ClickAwayListener onClickAway={handleClickAway}>

            <SelectInputt sx={{
                width: width ? width : '200px', border: '1px solid',
                mb: mb ? mb : undefined,
                bgcolor: 'secondary.bg',
                borderRadius: expanded ? '12px 12px 0 0' : '12px',
                borderColor: borderColor ? borderColor : '#DEDEDE',
            }}
                onClick={handleClick}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                    <Box sx={{
                        mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {icon ? icon : undefined}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '12px', color: 'primary.text' }}>{label}</Typography>
                        {value ?
                            <Typography sx={{ fontSize: '12px', color: 'secondary.text' }}>{value}</Typography>
                            : undefined}
                    </Box>
                </Box>
                <Box
                    sx={{
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DEDEDE'
                    }}>
                    {expanded ? <ArrowUp2 size={'24px'} />
                        : <ArrowDown2 size={'24px'} />}
                </Box>


                <Popper
                    PaperProps={{
                        style: {
                            // width: `${popWidth}px`,
                            // backgroundColor: "transparent",
                        }
                    }}
                    disableScrollLock={true}
                    id="select-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'select-button',
                    }}
                    placement='bottom-end'
                    sx={{
                        // width:'100%',    
                        // width: `${document.getElementById(id)?.offsetWidth}px`,
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

            </SelectInputt>
        </ClickAwayListener>
    )

}
export const MyInput = ({ icon, textColor,
    labelColor, py, id, label, width, onChange,
    borderColor, type, extraIcon, value, placeholder, mb }) => {
    return (
        <Inputt sx={{
            width: width ? width : '200px', border: '1px solid',
            mb: mb ? mb : undefined,
            borderColor: borderColor ? borderColor : '#DEDEDE'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                <Box sx={{
                    mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon ? icon : undefined}
                </Box>
                <TextField
                    autoFocus={true}
                    type={type}
                    autoComplete="off"
                    value={value}
                    InputProps={{
                        autoFocus: true,
                        disableUnderline: true,
                        autoComplete: "new-password",
                        sx: {
                            display: 'flex', alignItems: 'center',
                            // my: '5px !important',
                            color: 'primary.gray', width: '100%', fontSize: '12px',
                            //  margin: '0 !important',
                            "&:-webkit-autofill": {
                                webkitboxshadow: "none !important", backgroundColor: 'transparent !important'
                            },
                            [`&.${inputBaseClasses.input}`]: {
                                padding: '0 !important', color: 'primary.gray'
                            }
                            // .MuiInputBase-input-MuiInput-input
                        }
                    }}
                    InputLabelProps={{
                        sx: {
                            top: '-7px !important',
                            fontSize: '12px',
                            color: 'primary.text', [`&.${inputLabelClasses.shrink}`]: {
                                top: '5px !important',
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: "primary.text",
                                fontSize: '12px',
                            }
                        }
                    }}
                    id={id}
                    sx={{ alignItems: 'center', display: 'flex', width: '100%' }}
                    label={label} variant="standard"
                    onChange={onChange} />
            </Box>
            <Box
                sx={{
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                {extraIcon ? extraIcon : undefined}
            </Box>
        </Inputt>
    )

}
export const ShadowInput = ({ icon, text, id, label, width, onChange, borderColor, type, extraIcon, value, mb }) => {
    return (<AuthInput sx={{
        width: width ? width : '272px',
        border: borderColor ? '1px solid' : 'none', mb: mb ? mb : undefined,
        borderColor: borderColor ? borderColor : '#DEDEDE',
        boxShadow: borderColor ? 'none' : localStorage.getItem('theme') == 'light' ? '0px 0px 5px 1px rgba(0, 0, 0, 0.15)' : '0px 0px 5px 1px rgba(227,209,231,0.7)',
    }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
            <Box sx={{
                mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon ? icon : undefined}
            </Box>
            <TextField
                autoFocus={true}
                type={type}
                autoComplete="off"
                value={value}
                InputProps={{
                    autoFocus: true,
                    disableUnderline: true,
                    autoComplete: "new-password",
                    sx: {
                        display: 'flex', alignItems: 'center',
                        // my: '5px !important',
                        color: 'primary.gray', width: '100%', fontSize: '12px',
                        //  margin: '0 !important',
                        "&:-webkit-autofill": {
                            webkitboxshadow: "none !important", backgroundColor: 'transparent !important'
                        },
                        [`&.${inputBaseClasses.input}`]: {
                            padding: '0 !important', color: 'primary.gray'
                        }
                        // .MuiInputBase-input-MuiInput-input
                    }
                }}
                InputLabelProps={{
                    sx: {
                        top: '-7px !important',
                        fontSize: '12px',
                        color: 'primary.text', [`&.${inputLabelClasses.shrink}`]: {
                            top: '5px !important',
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: "primary.text",
                            fontSize: '12px',
                        }
                    }
                }}
                id={id}
                sx={{ alignItems: 'center', display: 'flex', width: '100%' }}
                label={label} variant="standard"
                onChange={onChange} />
        </Box>
        <Box
            sx={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
            {extraIcon ? extraIcon : undefined}
        </Box>
    </AuthInput>
    )

}
export const AscSelect = ({ asc, width, setAsc, id }) => {
    return (<FilterSelectionBox
        sx={{
            mt: 1,
            width: { width }, color: 'primary.text',
            bgcolor: 'secondary.bg',
        }}
    >
        <SelectInputs sx={{}}>
            <Box onClick={(e) => setAsc(true)}
                sx={{ cursor: 'pointer', p: '6px', borderRadius: '8px', borderColor: 'primary.text', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: asc ? 'primary.text' : 'transprent', width: '10px', height: '10px' }} />
            </Box>
            &nbsp;ASC
        </SelectInputs>
        <SelectInputs sx={{}}>
            <Box onClick={(e) => setAsc(false)}
                sx={{ cursor: 'pointer', p: '6px', borderRadius: '8px', borderColor: 'primary.text', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: !asc ? 'primary.text' : 'transprent', width: '10px', height: '10px' }} />
            </Box>
            &nbsp;DESC
        </SelectInputs>
    </FilterSelectionBox>)
}
export const BetweenTwoSelection = ({ selected, width, setOption, id, options, color, fontSize }) => {
    return (<Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            width: width ? width : 'auto',
            // color: color ? color : 'primary.text',
            color: 'secondary.text', fontSize: fontSize ? fontSize : '12px'
        }}
    >
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'secondary.text'
        }}>
            <Box onClick={(e) => setOption(options[0])}
                sx={{ cursor: 'pointer', p: '4px', borderRadius: '5px', borderColor: 'primary.gray', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: selected == options[0] ? 'secondary.text' : 'transprent', width: '8px', height: '8px' }} />
            </Box>&nbsp;
            {String(options[0])}
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'secondary.text'
        }}>
            <Box onClick={(e) => setOption(options[1])}
                sx={{ cursor: 'pointer', p: '4px', borderRadius: '5px', borderColor: 'primary.gray', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: selected == options[1] ? 'secondary.text' : 'transprent', width: '8px', height: '8px' }} />
            </Box>&nbsp;
            {String(options[1])}
        </Box>
    </Box>)
}
export const RelationCard = ({ image, friend, username, allies, date }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (!open)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }

    const navigate = useNavigate()
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <RelationCardComp sx={{ gap: '16px' }}>
                <FlexRow sx={{ gap: '16px' }}>
                    <Box sx={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                        , width: '40px', height: '40px', borderRadius: '50%',
                    }}
                    />
                    <Typography sx={{ fontWeight: 500, color: 'primary.text' }}>
                        {username}
                    </Typography>
                </FlexRow>
                <FlexRow sx={{ gap: '16px' }}>
                    <ButtonPurpleLight br='4px'
                        text={'View Profile'}
                        onClick={() => navigate(`/profile/${username}`)}
                        height='30px' />
                    <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#787878" />
                </FlexRow>
                <Popper
                    PaperProps={{
                        style: {
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
                    placement='left-start'
                    sx={{
                        marginTop: '20px !important',
                        width: '190px',
                        bgcolor: 'secondary.bg', p: '20px',
                        zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                        overflow: "hidden",
                        // boxShadow: theme == 'light' ? '0px 0px 10px 0px rgba(0, 0, 0, 0.45)' : '0px 0px 12px 1px rgba(227,209,231, 0.25)',
                        boxShadow: localStorage.getItem('theme') == 'dark' ? '0px 0px 12px 1px rgba(227,209,231, 0.25)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <MenuItem id={'share'} sx={{
                        display: 'flex', alignItems: 'center', pb: '12px',
                        color: 'primary.text',
                        borderBottom: '1px solid',
                        borderColor: 'primary.gray',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    }}
                    >
                        Share
                    </MenuItem>
                    {friend ?
                        <MenuItem id={'isfiends'} sx={{
                            display: 'flex', alignItems: 'center', py: '12px',
                            color: 'primary.text',
                            borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Remove Friend
                        </MenuItem>
                        : <MenuItem id={'notisfiends'} sx={{
                            display: 'flex', alignItems: 'center', py: '12px',
                            color: 'primary.text',
                            borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            "Be My Friend" Request
                        </MenuItem>
                    }
                    {allies ?
                        <MenuItem id={'isallies'} sx={{
                            display: 'flex', alignItems: 'center', pt: '12px',
                            color: 'primary.text',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Remove From Allies
                        </MenuItem>
                        : <MenuItem id={'isallies'} sx={{
                            display: 'flex', alignItems: 'center', pt: '12px',
                            color: 'primary.text',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            "Be My Allie" Invitation
                        </MenuItem>
                    }
                </Popper>

            </RelationCardComp>
        </ClickAwayListener>
    )
}
export const ReactionCard = ({ active, passive, action, nftName, nftImage, username, date }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (!open)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }

    const navigate = useNavigate()
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <ReactionCardComp>
                <FlexRow sx={{ gap: '16px' }}>
                    <Box sx={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${nftImage}`)),
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                        , width: { xs: '60px', sm: '80px' }, height: { xs: '60px', sm: '80px' }, borderRadius: '18px'
                    }}
                    />
                    <FlexColumn>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 700,
                                fontSize: { xs: '10px', sm: '14px', md: '16px' }, mb: '8px'
                            }}>
                            {action}</Typography>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 400,
                                fontSize: { xs: '10px', sm: '14px', md: '14px' }
                            }}>
                            {active}&nbsp;{action}&nbsp;on&nbsp;{passive}'s NFT Named {nftName}</Typography>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 400,
                                color: 'primary.gray', fontSize: { xs: '10px', sm: '14px', md: '14px' }
                            }}>
                            {date}</Typography>
                    </FlexColumn>
                </FlexRow>
                <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#787878" />
                <Popper
                    PaperProps={{
                        style: {
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
                    placement='left-start'
                    sx={{
                        marginTop: '20px !important',
                        width: '190px',
                        bgcolor: 'secondary.bg', p: '20px',
                        zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                        overflow: "hidden",
                        // boxShadow: theme == 'light' ? '0px 0px 10px 0px rgba(0, 0, 0, 0.45)' : '0px 0px 12px 1px rgba(227,209,231, 0.25)',
                        boxShadow: localStorage.getItem('theme') == 'dark' ? '0px 0px 12px 1px rgba(227,209,231, 0.25)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <MenuItem id={'nft-det'} sx={{
                        display: 'flex', alignItems: 'center', pb: '12px',
                        color: 'primary.text',
                        borderBottom: '1px solid',
                        borderColor: 'primary.gray',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    }}
                    >
                        NFT Details
                    </MenuItem>
                    <MenuItem id={'users-profile'} sx={{
                        display: 'flex', alignItems: 'center', py: '12px',
                        color: 'primary.text',
                        borderBottom: '1px solid',
                        borderColor: 'primary.gray',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    }}
                    >
                        {username}'s Profile
                    </MenuItem>
                    <MenuItem id={'select-action'} sx={{
                        display: 'flex', alignItems: 'center', pt: '12px',
                        color: 'primary.text',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    }}
                    >
                        Select
                    </MenuItem>
                </Popper>
            </ReactionCardComp>
        </ClickAwayListener>
    )
}
export const NFTCommentCard = ({ username, comment, profileImg }) => {
    return (
        <CommentCard sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'start', sm: 'center' }, }}>
            <FlexRow>
                <CommentCardProfileImg sx={{
                    mr: '8px',
                    backgroundImage: BG_URL(PUBLIC_URL(`${profileImg}`)),
                }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'primary.text' }}>{username} :&nbsp;</Typography>
            </FlexRow>
            <Typography sx={{ fontSize: '10px', fontWeight: 400, color: 'primary.gray' }}>{comment}</Typography>
        </CommentCard>
    )
}
