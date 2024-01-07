import styled from "@emotion/styled"
import { AccountCircle, AddAPhotoOutlined, Close, Description, PriceChange, Search, Subject, Title, Token } from "@mui/icons-material"
import { Box, CircularProgress, ClickAwayListener, MenuItem, Modal, Popper, TextField, Typography, inputBaseClasses, inputLabelClasses } from "@mui/material"
import { BG_URL, PUBLIC_URL } from "../utils/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"
import ButtonPurple from "./buttons/buttonPurple"
import { ArrowDown2, ArrowSwapHorizontal, ArrowUp2, DollarCircle, More, OceanProtocol } from "iconsax-react"
import ButtonPurpleLight from "./buttons/buttonPurpleLight"
import ButtonOutline from "./buttons/buttonOutline"
import { API_CONFIG } from "../config"
import profileFace from '../assets/face-pro.svg'
import ButtonOutlineInset from "./buttons/buttonOutlineInset"
import generateSignature from "../utils/signatureUtils"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import yCoin from "../assets/Ycoin.svg"
import { PUBLIC_API } from "../utils/data/public_api"
import Crop from "./crop/Crop"
import { getuser } from "../redux/actions"
import ywHugCoinLogo from '../assets/youwho-hugcoin.svg'
import gassFeeLight from '../assets/gassfeeLight.svg'
import web3Light from '../assets/web3Light.svg'
import blockchainLight from '../assets/blockchainLight.svg'
import cryptoLight from '../assets/cryptoLight.svg'
import xpnsvNFTLight from '../assets/xpnsvNFTLight.svg'
import calenLight from '../assets/calenLight.svg'
import gassFeeDark from '../assets/gassfeeDark.svg'
import web3Dark from '../assets/web3Dark.svg'
import blockchainDark from '../assets/blockchainDark.svg'
import cryptoDark from '../assets/cryptoDark.svg'
import xpnsvNFTDark from '../assets/xpnsvNFTDark.svg'
import calenDark from '../assets/calenDark.svg'
import walletImgLight from '../assets/walletLight.svg'
import walletImgDark from '../assets/walletDark.svg'

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
    // maxWidth: '700px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box'
}))
const TopUserCardComp = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 12px',
    justifyContent: 'space-between',
    boxShadow: theme.palette.primary.boxShadow,
    borderRadius: '16px', gap: '12px',
    height: '74px',
    width: '100%',
    // maxWidth: '700px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box'
}))
const ReactionCardCompNew = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 12px',
    justifyContent: 'space-between',
    boxShadow: theme.palette.primary.boxShadow,
    borderRadius: '16px',
    height: '75px',
    width: '100%',
    //  maxWidth: '700px',
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
    //  maxWidth: '700px',
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
    // padding: '12px 15px',
    borderRadius: '12px',
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
    borderColor: theme.palette.primary.gray, boxSizing: 'border-box',
    // width: '100%',
    display: 'flex',
    // padding: '12px 24px 24px',
    gap: '10px',
    transition: '500ms ease',
    // flexWrap: 'wrap',
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
    borderRadius: '30px', boxSizing: 'border-box',
    lineHeight: 'normal',
    border: `1px solid ${theme.palette.secondary.gray}`,

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
        backgroundColor: theme.palette.secondary.middle,
        boxShadow: theme.palette.primary.boxShadow,
        color: 'white',
    },
    "@media (max-width: 600px)": {
        padding: '5px 12px',
    },
}))
const SubTabsComp = styled(Box)(({ theme }) => ({
    gap: '10px',
    display: 'flex', flexWrap: 'wrap', padding: '7px 22px', boxSizing: 'border-box', alignItems: 'center',
}))
const SubTabComp = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    borderRadius: '30px', fontSize: '12px', border: '1px solid', borderColor: theme.palette.primary.light,
    padding: '6px 22px',
    width: 'max-content',
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
const PVGalleryCardComp = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    //  width: '50%',
    display: 'flex',
    padding: '8px', gap: '12px', boxSizing: 'border-box',
    boxSizing: 'border-box', boxShadow: theme.palette.primary.boxShadow, backgroundColor: theme.palette.secondary.bg
}))
const PVGalleryCardImage = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    width: '200px',
    height: '144px',
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundColor: theme.palette.primary.bgOp
}))
const CommentCardProfileImg = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
    , width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.palette.primary.bgOp
}))



//-------------------- ^ styles -------- comps > -------------------- //


//------------------------functions >> --------------------------------- //
export const shorten = (str, lngth) => {
    if (str)
        return str.length > parseInt(lngth) ? str.substring(0, parseInt(lngth)) + '...' : str;
    return 'undefined'
}
//------------------------functions--------------------------------- //
export const YouwhoCoinIcon = styled(Box)(({ w, h }) => ({
    width: `${w}px`,
    height: `${h}px`,
    borderRadius: '50%',
    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    pointerEvents: 'none'
}))


export const Tabs = ({ children, mb, w, jc }) => {
    return (
        <TabsComp
            sx={{ mb: mb, width: w ? w : '100%', justifyContent: jc ? jc : 'start', padding: { xs: '12px 0px 24px', md: '12px 24px 24px' } }}
        >
            {children}
        </TabsComp>
    )
}
export const Tab = ({ text, onClick, id, selected, icon }) => {
    return (
        <TabComp
            sx={
                selected ? {
                    backgroundColor: 'primary.main', color: 'white',
                    boxShadow: localStorage.getItem('theme') == 'light' ? '0px 0px 6px 1px rgba(0, 0, 0, 0.25)' : '0px 0px 5px 2px rgba(0, 0, 0, 0.30)',
                }
                    : {
                        backgroundColor: 'secondary.bg', color: 'secondary.text',
                        boxShadow: localStorage.getItem('theme') == 'light' ? '0px 0px 6px 0px rgba(0, 0, 0, 0.25) inset' : 'inset 0px 0px 6px 0px rgba(0, 0, 0, 0.30)'
                    }
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

        sx={{ mb: mb, width: w ? w : '100%', justifyContent: jc ? jc : 'unset' }}
    >{children}</SubTabsComp>)
}
export const SubTab = ({ text, onClick, id, selected, icon }) => {
    return (<SubTabComp
        sx={{
            boxShadow: selected ? (localStorage.getItem('theme') == 'light' ? '0px 0px 4px 0px #9747FF' : '0px 0px 4px 0px #BEA2C5') : 'unset',
            color: selected ? (localStorage.getItem('theme') == 'light' ? 'primary.main' : 'primary.light') : 'secondary.text',
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
    borderColor, type, button, value, placeholder, mb, showable }) => {
    return (
        <Inputt sx={{
            width: width ? width : '200px', border: '1px solid',
            mb: mb ? mb : undefined,
            borderColor: borderColor ? borderColor : '#DEDEDE',
            p: '12px 15px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                <Box sx={{
                    mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon ? icon : undefined}
                </Box>
                <Typography sx={{ fontSize: '12px', color: 'primary.text' }}>{label}</Typography>
                {showable ? showable : undefined}
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
export const MyInput = ({ icon, textColor, name,
    labelColor, id, label, width, onChange, bgcolor,
    borderColor, type, extraIcon, value, placeholder, mb, p }) => {
    return (
        <Inputt sx={{
            width: width ? width : '200px', border: '1px solid',
            mb: mb ? mb : undefined,
            borderColor: borderColor ? borderColor : '#DEDEDE',
            bgcolor: bgcolor ? bgcolor : 'transparent', padding: p ? p : '12px 15px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                {icon ? <Box sx={{
                    mr: '10px', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon}
                </Box> : undefined}
                <TextField
                    autoFocus={true}
                    type={type}
                    autoComplete="off"
                    value={value}
                    name={name}
                    InputProps={{
                        autoFocus: true,
                        disableUnderline: true,
                        autoComplete: "new-password",
                        sx: {
                            display: 'flex', alignItems: 'center',
                            // my: '5px !important',
                            color: textColor ? textColor : 'primary.gray', width: '100%', fontSize: '12px',
                            //  margin: '0 !important',
                            "&:-webkit-autofill": {
                                webkitboxshadow: "none !important", backgroundColor: 'transparent !important'
                            },
                            [`&.${inputBaseClasses.input}`]: {
                                padding: '0 !important', color: textColor ? textColor : 'primary.gray',
                            }
                            // .MuiInputBase-input-MuiInput-input
                        }
                    }}
                    InputLabelProps={{
                        sx: {
                            top: '-7px !important',
                            fontSize: '12px',
                            color: labelColor ? labelColor : 'primary.text',
                            [`&.${inputLabelClasses.shrink}`]: {
                                top: '5px !important',
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: labelColor ? labelColor : 'primary.text',
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
export const ShadowInput = ({ icon, text, id, label, width, onChange, borderColor, type, extraIcon, value, mb, mt }) => {
    return (<AuthInput sx={(theme) => ({
        width: width ? width : '272px',
        border: borderColor ? '1px solid' : 'none',
        mb: mb ? mb : undefined, mt: mt ? mt : undefined,
        borderColor: borderColor ? borderColor : '#DEDEDE',
        boxShadow: borderColor ? 'none' : theme.palette.primary.boxShadow,
    })}>
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
export const RelationCard = ({
    image, username, date,
    friend, allies, menuItems,
    shareClick, sendAllieRequest, removeAllie, sendFriendRequest, removeFriend }) => {
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
    const [alertModal, setAlertModal] = useState(false)

    const navigate = useNavigate()
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <RelationCardComp sx={{ gap: '16px' }}>
                <FlexRow sx={{ gap: '16px' }}>
                    <Box sx={{
                        backgroundColor: 'primary.bg',
                        backgroundImage: () => image ? `url('${API_CONFIG.API_URL}/${image}')` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                        // backgroundImage: image ? BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${image}`)) : 'primary.bg',
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
                    {/* // if we wanter to give an array for meu items logic ==> */}
                    {/* {menuItems.length > 0 ?
                        <>
                            {menuItems.map((mI, index) => (
                                <MenuItem id={mI.id} sx={{
                                    display: 'flex', alignItems: 'center', p: '16px 8px',
                                    color: 'primary.text',
                                    borderBottom: index == menuItems.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'primary.gray',
                                    '&:hover': {
                                        bgcolor: 'secondary.bgOp',
                                    }
                                }}
                                    onClick={mI.onClick}
                                >
                                    {mI.text}
                                </MenuItem>
                            ))}
                        </>
                        :
                        <></>
                    } */}
                    <MenuItem id={'share'} sx={{
                        display: 'flex', alignItems: 'center', p: '16px 8px',
                        color: 'primary.text',
                        borderBottom: '1px solid',
                        borderColor: 'primary.gray',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    }}
                        onClick={shareClick}>
                        Share
                    </MenuItem>
                    {friend ?
                        <MenuItem id={'isfiends'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderBottom: allies ? '1px solid' : 'none',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={() => {
                                setAlertModal(true)
                                handleClose()
                            }}
                        >
                            Remove Friend
                        </MenuItem>
                        : <MenuItem id={'notisfiends'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderBottom: allies ? '1px solid' : 'none',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={sendFriendRequest}
                        >
                            Be {username}'s Ally
                        </MenuItem>
                    }
                    {allies ?
                        <MenuItem id={'isallies'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={removeAllie}
                        >
                            Remove From Allies
                        </MenuItem>
                        : undefined}
                </Popper>



                <Modal
                    open={alertModal}
                    onClose={() => {
                        setAlertModal(false)
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableScrollLock={true}
                >
                    <Box sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    })}>
                        <Box sx={(theme) => ({
                            borderRadius: { xs: '0', sm: '24px' },
                            width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                            backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                            display: 'flex', flexDirection: 'column',
                            padding: '30px', alignItems: 'center'
                        })}>
                            <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                                <Box sx={{ padding: '10px' }}>
                                    <Close onClick={() => setAlertModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                                </Box>
                            </FlexRow>
                            <Typography sx={{
                                color: 'primary.text', textTransform: 'capitalize', fontSize: '14px', width: '100%', textAlign: 'center'
                            }}>Removing Friend(unfollowing them) Will Remove him/her from any of your private galleries that they joined , are you sure ?</Typography>
                            <ButtonPurple px={'12px'} mt={'48px'} text={'go on'} onClick={removeFriend} />
                        </Box>
                    </Box>
                </Modal>

            </RelationCardComp>

        </ClickAwayListener >
    )
}
export const FriendRequestCard = ({
    image, username, date, id, isAccepted,
    acceptRequest }) => {
    const navigate = useNavigate()
    return (
        <RelationCardComp
            // id={id}
            sx={{
                gap: '16px',
                display: isAccepted.includes(id) ? 'none !important' : 'flex'
            }}>
            <FlexRow sx={{ gap: '16px' }}>
                <Box sx={{
                    backgroundColor: 'primary.bg',
                    background: () => image ? `url('${API_CONFIG.API_URL}/${image}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                    , width: '40px', height: '40px', borderRadius: '50%',
                }}
                />
                <Typography sx={{ fontWeight: 500, color: 'primary.text' }}>
                    {username}
                </Typography>
            </FlexRow>
            <FlexRow sx={{ gap: '16px' }}>
                <ButtonPurple br='4px'
                    w={'max-content'}
                    text={'Accept Request'}
                    onClick={acceptRequest}
                    height='30px' />
                <ButtonOutline br='4px'
                    text={'View Profile'}
                    onClick={() => navigate(`/profile/${username}`)}
                    height='30px' />
            </FlexRow>
        </RelationCardComp>
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
                        display: 'flex', alignItems: 'center', p: '16px 8px',
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
                        display: 'flex', alignItems: 'center', p: '16px 8px',
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
                        display: 'flex', alignItems: 'center', p: '16px 8px',
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
export const ReactionCardNew = ({ text, action, image, date, popperTabs, actionButton }) => {
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
            <ReactionCardCompNew>
                <FlexRow sx={{ gap: '16px', width: '100%' }}>
                    <Box sx={{
                        background: () => image ? `url('${API_CONFIG.API_URL}/${image}') no-repeat center` : 'primary.bg',
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                        , width: { xs: '50px', sm: '54px' }, height: { xs: '50px', sm: '54px' }, borderRadius: '8px'
                    }}
                    />
                    <FlexColumn sx={{ width: { xs: 'calc(100% - 50px)', sm: 'calc(100% - 54px)' } }}>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 700,
                                fontSize: { xs: '10px', sm: '14px', md: '16px' },
                            }}>
                            {action}
                        </Typography>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 400,
                                fontSize: { xs: '10px', sm: '14px', md: '14px' }
                            }}>
                            {text}
                        </Typography>
                        <FlexRow sx={{ width: '100%' }}>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 400,
                                    color: 'primary.gray', fontSize: { xs: '10px', sm: '14px', md: '14px' }
                                }}>
                                {date}</Typography>
                            {actionButton ?
                                actionButton : undefined}
                        </FlexRow>
                    </FlexColumn>
                </FlexRow>
                <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#787878" />
                <MorePopper tabs={popperTabs} handleClose={handleClose} anchorEl={anchorEl} open={open} />
            </ReactionCardCompNew>
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
export const MorePopper = ({ tabs, open, anchorEl, handleClose }) => {
    return (
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
            sx={(theme) => ({
                marginTop: '20px !important',
                width: '190px',
                bgcolor: 'secondary.bg', p: '20px',
                zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                overflow: "hidden",
                boxShadow: theme.palette.primary.boxShadow
                // boxShadow: theme == 'light' ? '0px 0px 10px 0px rgba(0, 0, 0, 0.45)' : '0px 0px 12px 1px rgba(227,209,231, 0.25)',
                // boxShadow: localStorage.getItem('theme') == 'dark' ? '0px 0px 12px 1px rgba(227,209,231, 0.25)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
            })}
        >
            {tabs ? <>
                {tabs.map((tab, index) => (
                    <MenuItem id={tab.id} sx={(theme) => ({
                        display: 'flex', alignItems: 'center', p: '16px 8px',
                        color: 'primary.text',
                        borderBottom: index == tabs.length - 1 ? 'none' : '1px solid',
                        borderColor: 'primary.gray', gap: '10px',
                        '&:hover': {
                            bgcolor: 'secondary.bgOp',
                        }
                    })} onClick={tab.onClick}>
                        {tab.icon ? tab.icon : undefined}
                        <Typography sx={{ m: 0, color: 'primary.text', fontSize: { xs: '14px', sm: '16px' } }}>
                            {tab.text}
                        </Typography>
                    </MenuItem>
                ))}
            </> : undefined}
        </Popper>

    )
}
export const SmallPeopleCard = ({ image, name, action, removeFromInviteList, friend, inviteList, addToInvitedList }) => {
    const [isAdded, setIsAdded] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [alertOnRemove, setAlertOnremove] = useState(false)

    return (
        <>
            <FlexRow sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Box sx={{
                        borderRadius: '50%', width: '30px', height: '30px', backgroundColor: 'primary.bg',
                        background: () => image ? `url('${API_CONFIG.API_URL}/${image}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                    }} /><Typography sx={{ color: 'primary.text', fontSize: '12px' }}>{name}</Typography>
                </Box>
                {action == 'addPeople' &&
                    <>
                        {isAdded ?
                            <ButtonOutline br={'30px'} height={'20px'}
                                text={'Added'} w={'70px'}
                                onClick={() => {
                                    removeFromInviteList(friend.screen_cid)
                                    setIsAdded(false)
                                }} />

                            :
                            <ButtonOutline br={'30px'} height={'20px'}
                                onClick={() => {
                                    addToInvitedList(friend.screen_cid)
                                    setIsAdded(true)
                                }}
                                text={'Add'} w={'70px'} />}
                    </>
                }
                {action == 'removePeople' &&
                    <>
                        {!isRemoved ?
                            <ButtonOutline br={'30px'} height={'20px'}
                                text={'Remove'} w={'70px'}
                                onClick={() => setAlertOnremove(true)} />
                            :
                            undefined}
                    </>
                }
            </FlexRow>


            {/* allert on remove from gallery modal ==> */}
            <Modal
                open={alertOnRemove}
                onClose={() => {
                    setAlertOnremove(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setAlertOnremove(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <Typography
                                sx={{
                                    color: 'primary.text', fontSize: '16px', width: '100%',
                                    textAlign: 'center', textTransform: 'capitalize'
                                }}>
                                Are You Sure You Want To Remove {friend.username} From gallery's Joined List?
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'secondary.text', fontSize: '12px', width: '100%',
                                    textAlign: 'center', textTransform: 'capitalize'
                                }}>
                                to remove {friend.username} from your gallery , you must send back their payed tokens to them
                            </Typography>
                            <FlexRow sx={{ gap: { xs: '12px', md: '16px' }, width: '100%' }}>
                                <ButtonOutlineInset text={'Not Yet'} onClick={() => setAlertOnremove(false)} w={'100px'} />
                                <ButtonPurple
                                    text={'Im Sure'} w={'100%'}
                                    onClick={() => {
                                        removeFromInviteList(friend.screen_cid)
                                        setIsRemoved(true)
                                        setAlertOnremove(false)
                                    }} />
                            </FlexRow>

                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>

        </>

    )
}
export const PVGalleryCard = ({ gallery, requestToJoin,
    galleryIndex, joinedCount, isMine, getUserPVGalleries, exitGallery,
    galleryId, openGalleryClick, getJoinedPeople, joinedList, joinedLoading }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openGalleryDetails, setOpenGalleryDetails] = useState(false)
    const [openInviteModal, setOpenInviteModal] = useState(false)
    const [openJoinedListModal, setOpenJoinedListModal] = useState(false)
    const [galleryName, setGalleryName] = useState(gallery.gal_name)
    // const [gallerySubject, setgallerySubject] = useState(gallery.extra ? gallery.extra[0].gallery_subject : undefined)
    const [galleryDesc, setGalleryDesc] = useState(gallery.gal_description)
    const [galleryFee, setGalleryFee] = useState(gallery.extra ? gallery.extra[0].entry_price : undefined)
    const [galleryBG, setGalleryBG] = useState(gallery.gallery_background)
    const [disableButton, setDisableButton] = useState(true)
    const [gallExtra, setGallExtra] = useState(null)
    const [friends, setFriends] = useState([])
    const [FriendsLoading, setFriendsLoading] = useState(true)
    const [searchFriendsValue, setSearchFriendsValue] = useState(undefined)
    const [inviteList, setInviteList] = useState([])
    const [inviteListUpdating, setInviteListUpdating] = useState(false)
    const [searchResults, setSearchResults] = useState(undefined)
    const gallImageInput = useRef()
    const [gallImageFile, setgallImageFile] = useState(null);
    const [gallPhotoURL, setgallPhotoURL] = useState(null);
    const [openGallCrop, setOpenGallCrop] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const apiCall = useRef(null)
    const dispatch = useDispatch();
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const addToInvitedList = (youwhoID) => {
        let tempList = inviteList
        tempList.push(youwhoID)
        setInviteList(tempList)
    }
    const removeFromInviteList = (youwhoID) => {
        let tempList = inviteList
        const index = tempList.indexOf(youwhoID);
        if (index > -1) { // only splice array when item is found
            tempList.splice(index, 1); // 2nd parameter means remove one item only
        }
        setInviteList(tempList)
    }
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
    const handleEditClick = () => {
        handleClose()
        setOpenEditModal(true)
    }
    const handleJoinedListClick = () => {
        getJoinedPeople(gallery.id)
        handleClose()
        setOpenJoinedListModal(true)
    }
    const handleInviteClick = () => {
        getFriends()
        handleClose()
        setOpenInviteModal(true)
    }
    const toastId = useRef(null);
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const updateGallery = async (galleryId) => {
        loading()
        if (galleryId) {
            setDisableButton(true)
            let extra = []
            // if (gallerySubject) {
            // extra.push({ gallery_subject: gallerySubject })
            // }
            // if (galleryFee) {
            extra.push({ entry_price: parseInt(galleryFee) })
            // }
            let data = {
                owner_cid: globalUser.cid,
                collections: gallery.collections,
                gal_name: galleryName,
                gal_description: galleryDesc,
                extra: galleryFee ? extra : null
            }
            let { requestData } = generateSignature(globalUser.privateKey, data)
            console.log(JSON.stringify(requestData))
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/${galleryId}/update`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log('updat resp?', response);

            if (!response.is_error) {
                setDisableButton(false)
                updateToast(true, response.message)
                if (gallImageFile) {
                    uploadGalleryBackground()
                }
                getUserPVGalleries()
            } else {
                setDisableButton(false)
                updateToast(false, response.message)
            }
        }
    }
    const uploadGalleryBackground = async () => {
        loading();

        const myFile = new File([gallImageFile], 'image.jpeg', {
            type: gallImageFile.type,
        });

        const formData = new FormData();
        formData.append('img', myFile)

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/${gallery.id}/upload/background`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            updateToast(true, response.message)
            setOpenEditModal(false)
            getUserPVGalleries()

        } else {
            updateToast(false, response.message)
        }
    }
    const joinGallery = async (galleryId) => {
        loading()
        let data = {
            caller_cid: globalUser.cid,
            owner_screen_cid: gallery.owner_screen_cid,
            gal_id: galleryId,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/enter`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('enter resp?', response);
        if (!response.is_error) {
            updateToast(true, 'joined')
            fetchUser(globalUser.token)
            getUserPVGalleries()
            setIsJoined(true)
        } else {
            updateToast(false, response.message)
        }
    }
    const batchInvite = (inviteList) => {
        for (let i = 0; i < inviteList.length; i++) {
            inviteToGallery(inviteList[i])
        }
    }
    const inviteToGallery = async (userID) => {
        loading()
        let data = {
            gallery_owner_cid: globalUser.cid,
            to_screen_cid: userID,
            gal_id: galleryId,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/send/invitation-request`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('invite resp?', response);
        if (!response.is_error) {
            updateToast(true, 'sent')
            setOpenInviteModal(false)
        } else {
            updateToast(false, response.message)
        }
    }
    const removeFromGallery = async (userID) => {
        loading()
        let data = {
            caller_cid: globalUser.cid,
            friend_screen_cid: userID,
            gal_id: galleryId,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/remove/invited-friend`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('remove resp?', response);
        if (!response.is_error) {
            updateToast(true, 'removed')
            getJoinedPeople()
            fetchUser(globalUser.token)
        } else {
            updateToast(false, response.message)
        }
    }
    const deleteMyPVGallery = async () => {
        loading()
        if (galleryIndex == 0) {
            updateToast(false, 'you cant delete your initial private gallery')
            // return
        } else {
            console.log('for later features , after adding more than one pv gallery')
        }
    }
    const getFriends = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/all/friends/?from=0&to=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('friends', response)

        if (!response.is_error) {
            let tempNonJoiners = []
            let tempFriends = response.data.friends
            for (let f = 0; f < response.data.friends.length; f++) {
                if (!gallery.invited_friends.includes(response.data.friends[f].screen_cid)) {
                    tempNonJoiners.push(response.data.friends[f])
                }
            }
            setFriends(tempNonJoiners)
            setFriendsLoading(false)
        } else {
            if (response.status == 404) {
                setFriends([])
                setFriendsLoading(false)

            } else {

                console.log(response.message)
            }
        }
    }
    const search = async (searchTab, q, from, to) => {
        if (q == '') {
            setSearchResults(undefined)
            return
        }
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/search/?q=${q}&from=${from}&to=${to}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            if (searchTab == 'invite-friends') {
                let tempFriends = []
                for (var d = 0; d < friends.length; d++) {
                    tempFriends.push(friends[d].screen_cid)
                }
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempFriends.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
            if (searchTab == 'remove-friends') {
                let tempFriends = []
                for (var d = 0; d < joinedList.length; d++) {
                    tempFriends.push(joinedList[d].screen_cid)
                }
                let tempArr = []
                for (var j = 0; j < response.data.data.users.length; j++) {
                    if (tempFriends.includes(response.data.data.users[j].screen_cid)) {
                        tempArr.push(response.data.data.users[j])
                    }
                }
                setSearchResults(tempArr)
            }
        }
        catch (err) {
            if (err.status == 404) {
                setSearchResults([])
            } else {
                setSearchResults([])
            }
        }

    }
    useEffect(() => {
        if (galleryName)
            setDisableButton(false)
        else setDisableButton(true)
    }, [galleryName])
    const mineTabs = [
        { text: 'Send Invitation', id: 'gall-card-invitation', onClick: handleInviteClick },
        { text: 'Joined List', id: 'gall-card-joined-list', onClick: handleJoinedListClick },
        { text: 'Edit', id: 'gall-card-edit', onClick: handleEditClick },
        { text: 'Delete', id: 'gall-card-delete', onClick: deleteMyPVGallery },
    ]
    const joinedOthersTabs = [
        {
            text: 'Galley Details', id: 'gall-card-details', onClick: () => {
                setOpenGalleryDetails(true)
                handleClose()
            }
        },
        { text: 'Exit Gallery', id: 'gall-card-exit', onClick: () => exitGallery(globalUser.cid, gallery.id) },
    ]
    const othersTabs = [
        {
            text: 'Galley Details', id: 'gall-card-details', onClick: () => {
                setOpenGalleryDetails(true)
                handleClose()
            }
        },
    ]
    const handleGallImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setgallImageFile(file);
            setgallPhotoURL(URL.createObjectURL(file));
            setOpenGallCrop(true);
        }
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (isMine) {
            setIsJoined(false)
        } else {
            let tempList = []
            for (let i = 0; i < gallery.invited_friends.length; i++) {
                tempList.push(gallery.invited_friends[i].screen_cid)
            }
            if (tempList.includes(globalUser.YouWhoID)) {
                setIsJoined(true)
            } else {
                setIsJoined(false)
            }

        }
    }, [isMine])
    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <PVGalleryCardComp sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                    <PVGalleryCardImage sx={{
                        backgroundImage: () => gallery.gallery_background ? `url('${API_CONFIG.API_URL}/${gallery.gallery_background}')` : BG_URL(PUBLIC_URL(`${ywHugCoinLogo}`)),
                    }} />
                    <FlexColumn sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'end !important' }}>
                            <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#999999" />
                        </Box>
                        <FlexRow>
                            <Typography sx={{
                                display: { xs: 'block', sm: 'none', md: 'none' },
                                fontWeight: 500, fontFamily: 'Inter', fontSize: { xs: '12px', sm: '16px' }
                            }}>{shorten(gallery.gal_name, 20)}</Typography>
                            <Typography sx={{
                                display: { xs: 'none', sm: 'block', md: 'block' },
                                fontWeight: 500, fontFamily: 'Inter', fontSize: { xs: '12px', sm: '16px' }
                            }}>{shorten(gallery.gal_name, 30)}</Typography>
                        </FlexRow>
                        <Typography sx={{ fontWeight: 400, fontSize: { xs: '9px', sm: '11px' }, fontFamily: 'Inter' }}>{gallery.invited_friends.length} people joined</Typography>
                        <FlexRow sx={{ justifyContent: 'start !important', gap: '4px' }}>
                            <Typography sx={{ fontWeight: 400, fontSize: { xs: '10px', sm: '12px' }, fontFamily: 'Inter' }}>Entrance Fee :</Typography>
                            <YouwhoCoinIcon w={20} h={20} />
                            <Typography sx={{ fontWeight: 400, color: 'secondary.text', fontSize: { xs: '10px', sm: '12px' }, fontFamily: 'Inter' }}>{gallery.extra ? gallery.extra[0].entry_price : '--'}</Typography>
                        </FlexRow>
                        {isMine ?
                            <ButtonPurpleLight onClick={openGalleryClick}
                                text={'open'} w={'100%'} px={'16px'} height={'30px'} br={'8px'} />
                            :
                            <>
                                {isJoined ?
                                    <ButtonPurpleLight
                                        onClick={openGalleryClick} text={'view'} w={'100%'} px={'16px'} height={'30px'} br={'8px'} />
                                    :
                                    <ButtonPurpleLight
                                        onClick={() => joinGallery(gallery.id)}
                                        text={'request to join'} w={'100%'} px={'16px'} height={'30px'} br={'8px'} />
                                }
                            </>
                        }
                        {
                            isMine ?
                                <MorePopper tabs={mineTabs} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                                :
                                <MorePopper tabs={isJoined ? joinedOthersTabs : othersTabs} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                        }
                    </FlexColumn>
                </PVGalleryCardComp>
            </ClickAwayListener>
            {/* edit gallery modal ==> */}
            <Modal
                open={openEditModal}
                onClose={() => {
                    setOpenEditModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenEditModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <Typography
                                sx={{ color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center' }}>
                                Edit {shorten(gallery.gal_name, 15)} Gallery</Typography>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                                <MyInput name={'gallery-name'} label={'Gallery Name'} width={'100%'}
                                    icon={<Subject sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => setGalleryName(e.target.value)}
                                    value={galleryName}
                                />

                                {/* <MyInput name={'gallery-subject'} label={'Gallery subject'} width={'100%'}
                                    icon={<Subject sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => setgallerySubject(e.target.value)}
                                    value={gallerySubject}
                                /> */}

                                <MyInput name={'gallery-price'} type={'number'} label={'Entrance Fee'} width={'100%'}
                                    icon={<PriceChange sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => setGalleryFee(e.target.value)}
                                    value={galleryFee}
                                />
                                <ButtonInput label={'Cover Image'} width={'100%'}
                                    icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                    button={<ButtonOutline
                                        height='35px'
                                        onClick={() => gallImageInput.current.click()}
                                        text={'Browse'}
                                        br={'30px'}
                                    />
                                    } />
                                <input
                                    accept="image/*"
                                    id="nftPhoto"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleGallImageChange}
                                    ref={gallImageInput}
                                />
                                <MyInput name={'gallery-description'}
                                    label={'Gallery Description'} width={'100%'}
                                    icon={<Description sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => setGalleryDesc(e.target.value)}
                                    value={galleryDesc}
                                />

                            </FlexColumn>
                            <FlexRow sx={{ gap: { xs: '12px', md: '16px' }, width: '100%' }}>
                                <ButtonOutlineInset text={'Not Yet'} onClick={() => setOpenEditModal(false)} w={'100px'} />
                                <ButtonPurple disabled={disableButton}
                                    text={'Save Changes'} w={'100%'} onClick={disableButton ? undefined : () => updateGallery(galleryId)} />
                            </FlexRow>

                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>
            {/* invite friends modal ==> */}
            <Modal
                open={openInviteModal}
                onClose={() => {
                    setOpenInviteModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenInviteModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <Typography
                                sx={{ color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center' }}>
                                Send Invitation Links to Join The Private Gallery</Typography>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                                <MyInput name={'gallery-invite-search'} label={'Search From friends'} width={'100%'}
                                    icon={<Search sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => search('invite-friends', e.target.value, 0, 5)}
                                />

                                <Box sx={{
                                    border: '1px solid #DEDEDE', borderRadius: '12px', width: '100%', padding: '12px 12px 12px 15px',
                                    boxSizing: 'border-box', gap: '8px', display: 'flex', flexDirection: 'column'
                                }}>
                                    <FlexRow sx={{ justifyContent: 'start !important', gap: '10px' }}>
                                        <Subject sx={{ color: 'primary.light' }} />
                                        <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>Select Friends</Typography>
                                    </FlexRow>
                                    {FriendsLoading ? <CircularProgress sx={{ fontSize: '14px' }} /> :
                                        <>
                                            {searchResults ?
                                                <>{searchResults.length > 0 ?
                                                    <FlexColumn sx={{ gap: '8px' }}>
                                                        {searchResults.map((friend) => (
                                                            <SmallPeopleCard
                                                                friend={friend}
                                                                addToInvitedList={addToInvitedList}
                                                                removeFromInviteList={removeFromInviteList}
                                                                inviteList={inviteList}
                                                                image={friend.avatar}
                                                                name={friend.username} ywid={friend.screen_cid}
                                                                action={'addPeople'} />
                                                        ))}
                                                    </FlexColumn>
                                                    :
                                                    <Typography sx={{ color: 'primary.text', textAlign: 'center', width: '100%', textTransform: 'capitalize', fontSize: '12px' }}>
                                                        no result for you search
                                                    </Typography>
                                                }
                                                </>
                                                :
                                                <FlexColumn sx={{ gap: '8px' }}>
                                                    {friends.length > 0 ?
                                                        <>
                                                            {friends.map((friend) => (
                                                                <SmallPeopleCard
                                                                    friend={friend}
                                                                    addToInvitedList={addToInvitedList}
                                                                    removeFromInviteList={removeFromInviteList}
                                                                    inviteList={inviteList}
                                                                    image={friend.user_avatar}
                                                                    name={friend.username} ywid={friend.screen_cid}
                                                                    action={'addPeople'} />
                                                            ))}
                                                        </> :
                                                        <Typography sx={{
                                                            color: 'primary.text',
                                                            textTransform: 'capitalize', textAlign: 'center', width: '100%',
                                                            fontSize: '12px'
                                                        }}>
                                                            no uninvited friend found
                                                        </Typography>
                                                    }
                                                </FlexColumn>

                                            }
                                        </>
                                    }
                                </Box>

                            </FlexColumn>
                            <FlexRow sx={{ gap: { xs: '12px', md: '16px' }, width: '100%' }}>
                                <ButtonOutlineInset text={'Not Yet'} onClick={() => setOpenInviteModal(false)} w={'100px'} />
                                <ButtonPurple disabled={disableButton}
                                    text={'Send'} w={'100%'} onClick={disableButton ? undefined : () => batchInvite(inviteList)} />
                            </FlexRow>

                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>
            {/* joined list and remove friends modal ==> */}
            <Modal
                open={openJoinedListModal}
                onClose={() => {
                    setOpenJoinedListModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenJoinedListModal(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <Typography
                                sx={{ color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center' }}>
                                The Private Gallery Joined List
                            </Typography>
                            {joinedList ? <>
                                <Typography sx={{
                                    color: 'secondary.text',
                                    fontSize: '12px',
                                    width: '100%', textAlign: 'center'
                                }}>
                                    {joinedList.length} people of your friends are joined in this gallery
                                </Typography>
                                <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                                    <MyInput name={'gallery-joined-search'} label={'Search From The List'} width={'100%'}
                                        icon={<Search sx={{ color: 'primary.light' }} />}
                                        onChange={(e) => search('remove-friends', e.target.value, 0, 5)}
                                    />

                                    <Box sx={{
                                        border: '1px solid #DEDEDE', borderRadius: '12px', width: '100%', padding: '12px 12px 12px 15px',
                                        boxSizing: 'border-box', gap: '8px', display: 'flex', flexDirection: 'column'
                                    }}>
                                        <FlexRow sx={{ justifyContent: 'start !important', gap: '10px' }}>
                                            <Subject sx={{ color: 'primary.light' }} />
                                            <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>Select Friends</Typography>
                                        </FlexRow>
                                        {joinedLoading ? <CircularProgress sx={{ fontSize: '14px' }} /> :
                                            <>
                                                {searchResults ?
                                                    <>{searchResults.length > 0 ?
                                                        <FlexColumn sx={{ gap: '8px' }}>
                                                            {searchResults.map((friend) => (
                                                                <SmallPeopleCard
                                                                    friend={friend}
                                                                    removeFromInviteList={removeFromGallery}
                                                                    image={friend.avatar}
                                                                    name={friend.username} ywid={friend.screen_cid}
                                                                    action={'removePeople'} />
                                                            ))}
                                                        </FlexColumn>
                                                        :
                                                        <Typography sx={{ color: 'primary.text', textAlign: 'center', width: '100%', textTransform: 'capitalize', fontSize: '12px' }}>
                                                            no result for you search
                                                        </Typography>
                                                    }
                                                    </>
                                                    :
                                                    <FlexColumn sx={{ gap: '8px' }}>
                                                        {joinedList.length > 0 ?
                                                            <>
                                                                {joinedList.map((friend) => (
                                                                    <SmallPeopleCard
                                                                        friend={friend}
                                                                        removeFromInviteList={removeFromGallery}
                                                                        image={friend.avatar}
                                                                        name={friend.username} ywid={friend.screen_cid}
                                                                        action={'removePeople'} />
                                                                ))}
                                                            </> :
                                                            <Typography sx={{
                                                                color: 'primary.text',
                                                                textTransform: 'capitalize', textAlign: 'center', width: '100%',
                                                                fontSize: '12px'
                                                            }}>
                                                                no joined friend found
                                                            </Typography>
                                                        }
                                                    </FlexColumn>

                                                }
                                            </>
                                        }
                                    </Box>

                                </FlexColumn>
                            </> :
                                <CircularProgress />}
                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>
            {/* crop modal ==> */}
            <Modal
                open={openGallCrop}
                onClose={() => setOpenGallCrop(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Box sx={{
                        borderRadius: '24px',
                        width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                        backgroundColor: 'secondary.bg',
                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                    }}>
                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                            <Typography>Crop</Typography>
                            <div onClick={() => {
                                setOpenGallCrop(false)
                            }}>
                                <Close sx={{ cursor: 'pointer' }} />
                            </div>
                        </FlexRow>

                        <Crop imageURL={gallPhotoURL}
                            // aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1}
                            setOpenCrop={setOpenGallCrop}
                            setFile={setgallImageFile}
                            setPhotoURL={setgallPhotoURL} />
                    </Box>
                </Box>
            </Modal>
            {/* gallery details modal ==> */}
            <Modal
                open={openGalleryDetails}
                onClose={() => {
                    setOpenGalleryDetails(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenGalleryDetails(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <Typography
                                sx={{ color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center' }}>
                                Private Gallery Details</Typography>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                                <MyInput bgcolor={'primary.bgOp'} name={'gallery-name'} label={'Gallery Name'} width={'100%'}
                                    icon={<Subject sx={{ color: 'primary.light' }} />}
                                    value={galleryName}
                                />

                                {/* <MyInput bgcolor={'primary.bgOp'} name={'gallery-subject'} label={'Gallery subject'} width={'100%'}
                                    icon={<Subject sx={{ color: 'primary.light' }} />}
                                    value={gallerySubject}
                                /> */}

                                <MyInput bgcolor={'primary.bgOp'} name={'gallery-price'} type={'number'} label={'Entrance Fee'} width={'100%'}
                                    icon={<PriceChange sx={{ color: 'primary.light' }} />}
                                    value={galleryFee}
                                />
                                <MyInput bgcolor={'primary.bgOp'} name={'gallery-description'}
                                    label={'Gallery Description'} width={'100%'}
                                    icon={<Description sx={{ color: 'primary.light' }} />}
                                    value={galleryDesc}
                                />
                            </FlexColumn>

                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>

        </>
    )
}
export const ChargeYourWalletModal = ({ neededPrice, open, handleClose }) => {
    const [tokensValue, setTokensValue] = useState(undefined)
    const [usdValue, setusdValue] = useState(undefined)
    const [disableButton, setdisableButton] = useState(false)
    const globalUser = useSelector(state => state.userReducer)
    const [isCharged, setIsCharged] = useState(false)
    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock={true}
        >
            <Box sx={(theme) => ({
                width: '100%',
                height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)'
            })}>
                <Box sx={(theme) => ({
                    borderRadius: { xs: '0', sm: '24px' },
                    width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: 'auto' },
                    backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column',
                    padding: '30px', justifyContent: 'space-between', alignItems: 'center'
                })}>
                    {isCharged ?
                        <FlexColumn sx={{ width: '100%', gap: { xs: '20px', md: '32px' } }}>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '8px', md: '12px' }, }}>
                                <FlexRow sx={{ justifyContent: 'center !important' }}>
                                    <Typography
                                        sx={{ color: 'primary.text', fontSize: '16px', textAlign: 'center' }}>
                                        SUCCESSFULL!
                                    </Typography>
                                    <OceanProtocol size={'50px'} />
                                </FlexRow>
                                <Typography
                                    sx={{ color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center' }}>
                                    Your Wallet Balance Charged Successfully.
                                </Typography>
                            </FlexColumn>

                            <FlexColumn sx={{ width: '100%', gap: { xs: '5px', md: '5px' }, }}>
                                <YouwhoCoinIcon w={'50px'} h={'50px'} />
                                <Typography sx={{
                                    color: 'primary.text', fontWeight: 500,
                                    fontSize: '16px', width: '100%', textAlign: 'center'
                                }}>
                                    New balance : {globalUser.balance}
                                </Typography>
                            </FlexColumn>
                            <FlexRow sx={{ width: '100%' }}>
                                <ButtonPurple
                                    text={'Back To YouWho'} w={'100%'}
                                    onClick={() => handleClose()} />
                            </FlexRow>

                        </FlexColumn>
                        : <>
                            <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                                <Box sx={{ padding: '10px' }}>
                                    <Close onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                                </Box>
                            </FlexRow>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '30px', md: '50px' } }}>
                                <FlexColumn sx={{ width: '100%', gap: { xs: '8px', md: '12px' }, }}>
                                    <Typography
                                        sx={{ color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center' }}>
                                        Your Wallet Balance Is Insufficient!
                                    </Typography>
                                    <Typography
                                        sx={{ color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center' }}>
                                        you must charge your wallet first !
                                        you need at least <b>"{neededPrice} tokens"</b>.
                                    </Typography>
                                </FlexColumn>

                                <FlexColumn sx={{ width: '100%', gap: { xs: '5px', md: '5px' }, color: 'primary.gray' }}>
                                    <MyInput name={'yw-tokens-charge'} type={'number'} label={'YouWho Tokens'} width={'100%'}
                                        icon={<Token sx={{ color: 'primary.light' }} />}
                                        value={tokensValue}
                                    />
                                    <ArrowSwapHorizontal />
                                    <MyInput name={'usd-charde'}
                                        label={'Gallery Description'} width={'100%'}
                                        icon={<DollarCircle sx={{ color: 'primary.light' }} />}
                                        value={usdValue}
                                    />
                                </FlexColumn>
                                <FlexRow sx={{ gap: { xs: '12px', md: '16px' }, width: '100%' }}>
                                    <ButtonOutlineInset text={'Not Yet'} onClick={() => handleClose()} w={'100px'} />
                                    <ButtonPurple disabled={disableButton}
                                        text={'Charge'} w={'100%'}
                                        onClick={disableButton ? undefined : () => setIsCharged(true)} />
                                </FlexRow>

                            </FlexColumn>
                        </>}
                </Box>
            </Box>
        </Modal>

    )
}
export const TopUserCard = ({
    image, username, lilData, isFriend, myFollowings, ywID }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const toastId = useRef(null);
    const globalUser = useSelector(state => state.userReducer)
    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
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
    const popperTabs = [
        { text: `${username}'s profile`, id: 'top-user-prf-vw', onClick: () => navigate(`/profile/${username}`) },
    ]
    const [isFollowing, setIsFollowing] = useState('false');
    useEffect(() => {
        if (myFollowings) {
            if (myFollowings.length > 0) {
                for (var i = 0; i < myFollowings.length; i++) {
                    if (myFollowings[i].user_screen_cid == ywID) {
                        for (var j = 0; j < myFollowings[i].friends.length; j++) {
                            if (myFollowings[i].friends[j].screen_cid == globalUser.YouWhoID) {
                                if (myFollowings[i].friends[j].is_accepted == true) {
                                    setIsFollowing('true')
                                } else {
                                    setIsFollowing('pending')
                                }
                            }
                        }
                    }
                }
            } else {
                setIsFollowing('false')
            }
        }
        else {
            setIsFollowing('loading')
        }
    }, [myFollowings])

    const sendFriendRequest = async (receiver, sender) => {
        loading();

        let data = {
            owner_cid: sender,
            to_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/send/friend-request`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);
        if (response.message == "Updated Successfully") {
            updateToast(true, 'Friend Request Sent')
            setIsFollowing('pending')
        } else {
            updateToast(false, response.message)
        }
    }
    const removeFriend = async (receiver, sender) => {
        loading();

        let data = {
            owner_cid: sender,
            friend_screen_cid: receiver,
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(requestData)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/remove/friend`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response);
        if (response.message == "Updated Successfully") {
            updateToast(true, 'Friend Removed')
            setIsFollowing('false')
        } else {
            updateToast(false, response.message)
        }
    }



    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <TopUserCardComp>
                <Box sx={{
                    gap: '12px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{
                        backgroundColor: 'primary.bg',
                        backgroundImage: () => image ? `url('${API_CONFIG.API_URL}/${image}')` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                        // backgroundImage: image ? BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${image}`)) : 'primary.bg',
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                        , width: '54px', height: '54px', borderRadius: '50%',
                    }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
                        <Typography sx={{ fontWeight: 700, color: 'primary.text', fontSize: '14px' }}>
                            {username}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {lilData.map((data) => (<Box sx={(theme) => ({
                                height: '14px', padding: '2px 10px', width: 'max-content', boxSizing: 'border-box',
                                boxShadow: theme.palette.primary.boxShadow, borderRadius: '30px', fontSize: '8px',
                                color: theme.palette.primary.darkGray, bgcolor: theme.palette.secondary.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
                            })}>
                                {data.created && <><span>From</span>&nbsp;<b>{new Date(data.created).toLocaleString('default', { month: 'short' })}{new Date(data.created).getFullYear()}</b></>}
                                <b>{data.value}</b>
                                &nbsp;
                                <span>{data.name}</span>
                            </Box>))}
                        </Box>
                    </Box>
                </Box>
                {globalUser.YouWhoID !== ywID &&
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'end',
                        justifySelf: 'flex-end !important'

                    }}>
                        <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} color="#787878" />
                        {isFollowing == 'loading' ? <CircularProgress size={'10px'} /> :
                            isFollowing == 'false' ?
                                <ButtonPurpleLight br='30px'
                                    px={'16px'}
                                    py={'4px'}
                                    fontSize={'10px'}
                                    w={'max-content'}
                                    text={'Friend Request'}
                                    onClick={() => sendFriendRequest(ywID, globalUser.cid)}
                                    height='20px' />
                                : isFollowing == 'pending' ?
                                    <ButtonPurpleLight br='30px'
                                        disabled={true}
                                        px={'16px'}
                                        py={'4px'}
                                        fontSize={'10px'}
                                        w={'max-content'}
                                        text={'Pending Request'}
                                        height='20px' />
                                    :
                                    <ButtonOutline br='30px'
                                        px={'16px'}
                                        py={'4px'}
                                        fontSize={'10px'}
                                        w={'max-content'}
                                        text={'Remove Friend'}
                                        onClick={() => removeFriend(ywID, globalUser.cid)}
                                        height='20px' />
                        }
                    </Box>
                }
                <MorePopper tabs={popperTabs} handleClose={handleClose} anchorEl={anchorEl} open={open} />
            </TopUserCardComp>
        </ClickAwayListener >
    )
}
export const blogContents = [
    {
        id: 1, title: 'What is YouWho Id (Wallet)',
        subtitle: 'Wallet: Your Digital Asset Home',
        shortDes: 'CID or Crypto Id in general, is a Secp256k1 (same one used in EVM based blockchains) based digital signature used as a unique Id for all YouWho users which allows them to sign any in-game(app) operations like depositing, withdrawal and transferring YouWho digital assets and verifying the generated signatures inside the server signed by its private key.',
        content: <>
            CID or Crypto Id in general, is a Secp256k1 (same one used in EVM based blockchains) based digital signature used as a unique Id for all YouWho users which allows them to sign any in-game(app) operations like depositing, withdrawal and transferring YouWho digital assets and verifying the generated signatures inside the server signed by its private key.
            <br />so the whole security of digital assets in YouWho depends on the whole security of the Blockchain technology!
            <br />Structure A Crypto Id in YouWho consists of three sets of hex characters namely secp256k1_public_key , secp256k1_secret_key and secp256k1_public_address which are the public key, secret key and keccak256 of public key address respectively.
            <br />YouWho won't store any private or secret key in server side, users must save them some where for future signing hence losing them will cause the player to lose all his digital assets in the whole blockchain network!
            <br />How is it being used?
            <br />In a cryptographical sense, any player that wants to call a very high secure API, MUST sign the request body with the received private key and send the signature along with those inputs that he has signed them to the related API.
            <br />Since secp256k1 ECC curve is being used in EVM based blockchains thus the generated keypair can be imported as a new account inside EVM based wallets like Metamask.
        </>,
        imageLight: walletImgLight,
        imageDark: walletImgDark,
        date: 'Dec2023'
    },
    {
        id: 2, title: 'What are gas fees?',
        subtitle: 'What are gas fees?',
        shortDes: 'In the realm of NFTs (Non-Fungible Tokens), Gas Fees stand as a vital concept, drawing intense attention during transactions and asset transfers...',
        content: <>
            What are gas fees?
            <br />
            In the realm of NFTs (Non-Fungible Tokens), Gas Fees stand as a vital concept, drawing intense attention during transactions and asset transfers.<br />
            These fees not only manifest as a component of transaction processes but also significantly impact user experiences.
            <br />
            Gas fees correlate with the computational resources required to execute a specific transaction or operation within the blockchain network.For instance, when buying or selling an NFT, if several users are simultaneously engaging in transactions, gas fees might increase.
            <br />
            These fees are allocated to miners to incentivize them to confirm and verify transactions on the network.Therefore, gas fees act as a form of reward to miners for processing transactions.
            <br />
            In essence, gas fees reflect the dynamic nature of the network and user demand for transaction execution.A precise understanding of these fees is crucial, enabling users to make informed decisions regarding the timing and cost of their transactions.</>,
        imageLight: gassFeeLight,
        imageDark: gassFeeDark,
        date: 'Dec2023'
    },
    {
        id: 3,
        title: 'What is web3?',
        subtitle: 'web3: The Future of the internet,decentralized and intelligent',
        shortDes: 'Web 3.0, or the third phase of the Internet, is rapidly taking shape with the goal of transforming users from passive consumers into active contributors to the creation and production of web content and services...',
        content: <>
            What is web3?
            <br />
            <b>
                "web3: The Future of the internet,decentralized and intelligent"
            </b>
            <br />
            Web 3.0, or the third phase of the Internet, is rapidly taking shape with the goal of transforming users from passive consumers into active contributors to the creation and production of web content and services. It introduces several key features:
            <br />
            <b>
                Artificial Intelligence (AI) Integration:
            </b>
            <br />
            Web 3.0 utilizes artificial intelligence technologies for data analysis, information processing, and providing personalized recommendations to users. This improvement in AI enhances the overall user experience.
            <br />
            <b>
                Blockchain Technology Implementation:
            </b>
            <br />
            To enhance security and privacy, Web 3.0 leverages blockchain technology. This allows data to be recorded in an immutable and transparent manner across the network, ensuring integrity and trust.
            <br />
            <b>
                Enhanced User Interaction:
            </b>
            <br />
            A primary objective of Web 3.0 is to increase interaction between users and websites. These interactions may occur through technologies such as Virtual Reality (VR) or Augmented Reality (AR), creating more immersive and engaging user experiences.
            <br />
            <b>
                Decentralized Data and Content Distribution:
            </b>
            <br />
            Web 3.0 empowers users to act as content creators and data custodians, shifting the power from centralized entities to individuals and ordinary users. This decentralization fosters a more democratic and inclusive digital environment.
            <br />
            <b>
                New Standards and Protocols:
            </b>
            <br />
            Web 3.0 employs new standards and protocols for better communication between data and devices. This aids in establishing more efficient and effective connections among various components of the Internet.
            <br />
            Web 3.0 is an evolving concept aimed at creating a better and more interactive web experience. It emphasizes the utilization of emerging technologies to empower users, enhance security, and redefine the relationship between individuals and the digital world. While still in its early stages of development, Web 3.0 holds the promise of shaping a more user-centric, decentralized, and intelligent Internet.
        </>,
        imageLight: web3Light,
        imageDark: web3Dark,
        date: 'Dec2023'
    },
    {
        id: 4,
        title: 'What is blockchain?',
        subtitle: 'Blockchain: A Magical Bridge to Digital Security and Revolution in Data Relations.',
        shortDes: 'Blockchain is an emerging technology recognized as the fundamental foundation for executing digital currencies like Bitcoin. This technology harnesses a powerful ...',
        content: <>
            What is blockchain?
            <br />
            <b>
                Blockchain: A Magical Bridge to Digital Security and Revolution in Data Relations.
            </b>
            <br />
            Blockchain is an emerging technology recognized as the fundamental foundation for executing digital currencies like Bitcoin. This technology harnesses a powerful data structure that stores information in the form of blocks. Each block contains data related to a specific transaction or event and is connected to its preceding block.
            <br />One prominent feature of blockchain is the immutability of the stored information. In other words, altering or deleting a block is highly challenging and requires validation from the entire network, providing a high level of security.
            <br />Blockchain is acknowledged as the primary platform for secure transactions in the digital world. Its applications include facilitating fund transfers between individuals, recording asset ownership, executing smart contracts, and even creating digital currencies (cryptocurrencies).
            <br />This technology has led to increased transparency, cost reduction, and enhanced credibility across various processes. Additionally, from a technical perspective, blockchain relies on advanced encryption algorithms to safeguard information against cyber attacks.
            <br />Further insights into blockchain include:
            <br />
            <b>
                Blockchain Structure:
            </b>
            <br />Blockchain is a chain-like structure where each block contains information such as date, time, and transaction data.
            <br />Each block holds a set of data and is linked to the previous block through a unique hash.
            <br />
            <b>
                Security:
            </b>
            <br />Security in blockchain is ensured through encryption and unique hashes.
            <br />Altering a block requires changing not only that block but also all subsequent blocks, making it a challenging and seemingly impossible task.
            <br />
            <b>
                Decentralized Technology:
            </b>
            <br />Blockchain is managed by a social network of computers or "nodes." Each node maintains a version of the blockchain and independently participates in decision-making and transaction verification.
            <br />
            <b>
                Execution of Smart Contracts:
            </b>
            <br />Blockchain enables the execution of smart contracts—coded programs defining conditions and regulations for automated, intermediary-free execution.
            <br />
            <b>
                Diverse Industry Applications:
            </b>
            <br />Initially created for digital currencies like Bitcoin, blockchain is now employed in various industries, including banking, insurance, supply chain, healthcare, legal, and even arts and entertainment.
            <br />
            <b>
                Advantages of Blockchain:
            </b>
            <br />Cost Reduction: Due to reduced reliance on intermediaries.
            <br />Increased Transparency: All transactions are publicly accessible.
            <br />High Security: Utilizing advanced encryption algorithms.
            <br />Smart Contract Applications: Enhancing automation and efficiency.
            <br /><br />Blockchain represents a cultural shift in accessibility, security, and transaction execution in the digital realm.
        </>,
        imageLight: blockchainLight,
        imageDark: blockchainDark,
        date: 'Dec2023'
    },
    {
        id: 5,
        title: 'What is cryptocurrency?',
        subtitle: '"Cryptocurrency: Pioneering a New Global Realm of Digital Currencies"',
        shortDes: 'Cryptocurrency, or digital currencies, is an emerging concept in the financial world based on blockchain technology. These currencies enable financial transactions through advanced encryption technology and operate without centralized control.',
        content: <>
            What is cryptocurrency?
            <br />
            <b>
                "Cryptocurrency: Pioneering a New Global Realm of Digital Currencies"
            </b>
            <br />
            Cryptocurrency, or digital currencies, is an emerging concept in the financial world based on blockchain technology. These currencies enable financial transactions through advanced encryption technology and operate without centralized control.
            <br />
            Cryptocurrencies are often recognized as a means for peer-to-peer fund transfers, eliminating the need for traditional banking intermediaries. Their reliance on blockchain technology, which operates in an immutable and transparent manner, has enhanced trust and security in financial transactions.
            <br />
            Each cryptocurrency is typically an independent unit, with some of the most well-known examples including Bitcoin, Ethereum, Ripple, and Litecoin. These currencies differ from one another based on their underlying features and infrastructure technologies.
            <br />
            Cryptocurrencies, as a novel technology, have not only impacted the financial sector but have also found applications in various industries such as technology, security, and even arts and entertainment. Their high-security features, transaction speed, and user flexibility have garnered widespread attention.
            <br />
            These digital currencies represent a paradigm shift not only in the financial landscape but also across diverse sectors, showcasing their potential to reshape how transactions and interactions occur in our increasingly digital world.
        </>,
        imageLight: cryptoLight,
        imageDark: cryptoDark,
        date: 'Dec2023'
    },
    {
        id: 6,
        title: 'How to buy and sell NFTs?',
        subtitle: 'Embarking on the Journey: A Guide Beyond Clichés for Buying and Selling NFTs',
        shortDes: 'As you step into the intriguing world of NFTs, the first bridge you must cross is known as "blockchain." Much like a magical bridge, blockchain guides you to the other side of the realm of digital art and technology...',
        content:
            <>
                How to buy and sell NFTs?
                <br />
                <b>
                    Embarking on the Journey: A Guide Beyond Clichés for Buying and Selling NFTs
                </b>
                <br />
                As you step into the intriguing world of NFTs, the first bridge you must cross is known as "blockchain." Much like a magical bridge, blockchain guides you to the other side of the realm of digital art and technology. Below, with step-by-step explanations, we make the process of unlocking this bridge for buying and selling NFTs easy for you.
                <br />
                <b>
                    1. Prerequisites:
                </b>
                In the first step, to kickstart, you need to consider a few prerequisites. Create a digital wallet and familiarize yourself with basic NFT concepts, such as non-fungible tokens and blockchain intricacies.
                <br />

                <b>2. Choosing a Marketplace:</b>
                Every traveler needs a destination. Here, selecting an NFT marketplace can be the beginning of your journey. Some markets function as "digital art galleries," while others are recognized as "exchange markets."
                <br />
                <b>3. Registration and Account Creation: </b>
                To begin, you'll need to register in the chosen marketplace. This step involves creating a user account to store your information and facilitate interaction with other users.
                <br />
                <b>4. Search and Selection of NFTs: </b>
                Similar to buying art in a gallery, here you can also enjoy works from various artists. Planning to purchase an NFT includes examining artist information, work descriptions, and the legal status of the token.
                <br />
                <b>5. Buying and/or Selling:</b>
                Now that you've found your choice, you can acquire the NFT. If you opt to sell, understanding the selling process and setting prices are critical aspects to learn, allowing you to expand the influence of your artistic and digital endeavors.
                <br />
                With the world you are now stepping into, the experience of buying and selling NFTs will be accompanied by numerous wonders at every moment.
            </>,
        imageLight: xpnsvNFTLight,
        imageDark: xpnsvNFTDark,
        date: 'Dec2023'
    },
    {
        id: 7,
        title: 'What are NFT drops?',
        subtitle: 'NFT Treasury: Unveiling Jewels in the Guise of Drops',
        shortDes: 'In the tumultuous world of digital art and blockchain technology, NFT drops stand as one of the pervasive wonders guiding art enthusiasts toward new frontiers of creativity...',
        content: <>
            What are NFT drops?
            <br />
            <b>
                NFT Treasury: Unveiling Jewels in the Guise of Drops
            </b>
            <br />
            In the tumultuous world of digital art and blockchain technology, NFT drops stand as one of the pervasive wonders guiding art enthusiasts toward new frontiers of creativity. In this virtual realm, NFT drops provide an exciting and captivating experience where art and technology seamlessly converge.
            <br />
            <b>
                1. Discovery of Innovation:
            </b>
            <br />
            NFT drops represent a special and unique event where digital artists showcase the extent of their creativity. This innovation elevates the digital art world to a new level of creative thinking, meticulous planning, and artistry.
            <br />
            <b>
                2. Direct Connection with Artists:
            </b>
            <br />
            NFT drops enable enthusiasts to get closer to their favorite artists. These events provide an opportunity for individuals to directly connect with beloved artists and acquire uniquely crafted pieces.
            <br />
            <b>
                3. Excitement of Ownership:
            </b>
            <br />
            Purchasing an NFT in these events carries its own unique thrill and excitement. Individuals not only become owners of a digital artwork but also experience the exclusive aspects of blockchain technology.
            <br />
            <b>
                4. Social Impact:
            </b>
            <br />
            These events form artistic communities and promote social interactions. Art enthusiasts and artists connect with each other in a virtual space, celebrating mutual influence and shared impact.
            <br />
            <b>
                5. Economic Dynamics:
            </b>
            <br />
            By transforming artworks into NFTs, a new economic dynamic emerges. Artists benefit from the sale of their works to NFT owners, balancing financial flows within the artistic community.
            <br />
            Thus, NFT drops are not just an artistic event but an experience that encompasses social, economic, and technological dimensions, guiding art enthusiasts and artists toward an engaging and innovative world.
        </>,
        imageLight: calenLight,
        imageDark: calenDark,
        date: 'Dec2023'
    },
]
export const BulletFiltering = ({ selected, width, setOption, id, options, color, fontSize }) => {
    return (<Box
        sx={{
            bgcolor: 'secondary.bg',
            display: 'flex',
            alignItems: 'center', flexWrap: 'wrap',
            columnGap: { xs: '12px', sm: '32px' }, padding: '12px 18px', boxSizing: 'border-box', border: '1px solid #DEDEDE',
            borderRadius: '18px',
            rowGap: { xs: '6px', sm: '12px' }, width: width ? width : 'auto',
            color: color ? color : 'primary.text',
            fontSize: fontSize ? fontSize : '12px'
        }}
    >
        {options && options.map((opt, index) => (
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center', textTransform: 'capitalize',
                color: 'primary.text', gap: '8px'
            }}>
                <Box onClick={(e) => setOption(options[index])}
                    sx={{
                        cursor: 'pointer', p: '4px',
                        borderRadius: '5px',
                        borderColor: selected == options[index] ? 'primary.text' : 'primary.gray', border: '1px solid'
                    }}>
                    <Box sx={{
                        borderRadius: '50%',
                        bgcolor: selected == options[index] ? 'primary.text' : 'transprent', width: '8px', height: '8px'
                    }} />
                </Box>
                {String(options[index]).replace('-', ' ')}
            </Box>

        ))
        }
    </Box >)
}