import styled from "@emotion/styled"
import { AccountCircle } from "@mui/icons-material"
import { Box, ClickAwayListener, MenuItem, Popper, TextField, Typography, inputLabelClasses } from "@mui/material"
import { BG_URL, PUBLIC_URL } from "../utils/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { useState } from "react"
import ButtonPurple from "./buttons/buttonPurple"

const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // cursor: 'pointer',
    justifyContent: 'space-around',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    height: '20px',
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
    // height: '70px',
    // width: '100%',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
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
    borderRadius: '12px',
    color: theme.palette.primary.text, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
}))
const AuthInput = styled(Box)(({ theme }) => ({
    borderRadius: '12px',
    // height: '50px',
    color: "black",
    display: 'flex', justifyContent: 'space-between', alignItems: 'end'
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
export const MyInput = ({ icon, textColor,
    labelColor, py, id, label, width, onChange,
    borderColor, type, extraIcon, value, placeholder }) => {
    return (
        <Inputt sx={{
            width: width ? width : '200px', border: '1px solid',
            py: py ? py : '5px',
            // pb: '10px', pt: '5px',
            // pt:'5px',
            borderColor: borderColor ? borderColor : '#DEDEDE'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                <Box sx={{
                    ml: '16px',
                    mr: 1, display: 'flex', alignItems: 'center',
                    // pb: '5px'
                }}>
                    {icon ? icon : undefined}
                </Box>
                <TextField
                    className="myInput"
                    sx={{
                        alignSelf: 'center', alignItems: 'center', display: 'flex', width: '100%',
                        // '&.MuiInputBase-input': {
                        //     margin: '0px 0px 15px 0px !important',
                        // },
                    }}
                    value={value}
                    placeholder={placeholder}
                    // id={id}
                    id="myInput"
                    label={label}
                    variant="standard"
                    onChange={onChange}
                    autoComplete="off"
                    type={type}
                    InputProps={{
                        className: 'myInput',
                        disableUnderline: true,
                        sx: {
                            color: textColor ? textColor : 'primary.gray', width: '100%', alignSelf: 'center', fontSize: '16px',
                            "&:-webkit-autofill": {
                                webkitboxshadow: "0 0 0 1000px white inset"
                            },
                        }
                    }}
                    InputLabelProps={{
                        sx: {
                            color: labelColor ? labelColor : 'primary.text',
                            [`&.${inputLabelClasses.shrink}`]: {
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: labelColor ? labelColor : "primary.text",
                            }
                        }
                    }}
                />
            </Box>
            <Box sx={{ mr: '16px' }}>
                {extraIcon ? extraIcon : undefined}
            </Box>
        </Inputt>
    )

}
export const ShadowInput = ({ icon, text, id, label, width, onChange, borderColor, type, extraIcon, value }) => {
    return (<AuthInput sx={{
        width: width ? width : '200px',
        border: borderColor ? '1px solid' : 'none',
        pb: '10px', pt: '5px',
        borderColor: borderColor ? borderColor : '#DEDEDE',
        boxShadow: borderColor ? 'none' : '0px 0px 5px 1px rgba(0, 0, 0, 0.15)',
    }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', }}>
            <Box sx={{
                ml: '16px',
                mr: 1,
                pb: '5px'
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
                        color: 'primary.gray', width: '100%', fontSize: '16px',
                        //  margin: '0 !important',
                        "&:-webkit-autofill": {
                            webkitboxshadow: "0 0 0 1000px white inset"
                        }
                    }
                }}
                InputLabelProps={{
                    sx: {
                        color: 'black', [`&.${inputLabelClasses.shrink}`]: {
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: "black"
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
                mr: '16px',
                pb: '5px'
            }}>
            {extraIcon ? extraIcon : undefined}
        </Box>
    </AuthInput>
    )

}
export const AscSelect = ({ asc, width, setAsc, id }) => {
    return (<FilterSelectionBox
        sx={{
            py: 1,
            m: 1,
            width: { width }, color: 'primary.text',
            bgcolor: 'secondary.bg',
        }}
    >
        <SelectInputs sx={{ ml: '16px' }}>
            <Box onClick={(e) => setAsc(true)}
                sx={{ cursor: 'pointer', p: '6px', borderRadius: '8px', borderColor: 'primary.text', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: asc ? 'primary.text' : 'transprent', width: '10px', height: '10px' }} />
            </Box>
            &nbsp;ASC
        </SelectInputs>
        <SelectInputs sx={{ mr: '16px' }}>
            <Box onClick={(e) => setAsc(false)}
                sx={{ cursor: 'pointer', p: '6px', borderRadius: '8px', borderColor: 'primary.text', border: '1px solid' }}>
                <Box sx={{ borderRadius: '50%', bgcolor: !asc ? 'primary.text' : 'transprent', width: '10px', height: '10px' }} />
            </Box>
            &nbsp;DESC
        </SelectInputs>
    </FilterSelectionBox>)
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
            <Box sx={{ width: '100%', my: 1, height: '70px' }}>
                <RelationCardComp>
                    <FlexRow>
                        <Box sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                            , width: '40px', height: '40px', borderRadius: '50%'
                        }}
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        {username}
                    </FlexRow>
                    <FlexRow>
                        <ButtonPurple text={'View Profile'} onClick={() => navigate(`/profile/${username}`)} />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} />
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
            </Box>
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
            <Box sx={{ width: '100%', my: 1, height: '110px' }}>
                <RelationCardComp>
                    <FlexRow>
                        <Box sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${nftImage}`)),
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                            , width: { xs: '60px', sm: '80px' }, height: { xs: '60px', sm: '80px' }, borderRadius: '18px'
                        }}
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <FlexColumn>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 700,
                                    fontSize: { xs: '10px', sm: '14px', md: '16px' }
                                }}>
                                {action}</Typography>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 400,
                                    fontSize: { xs: '10px', sm: '14px', md: '16px' }
                                }}>
                                {active}&nbsp;{action}&nbsp;on&nbsp;{passive}'s NFT Named {nftName}</Typography>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 400,
                                    color: 'primary.gray', fontSize: { xs: '10px', sm: '14px', md: '16px' }
                                }}>
                                {date}</Typography>
                        </FlexColumn>
                    </FlexRow>
                    <FontAwesomeIcon cursor='pointer' icon={faEllipsisV} onClick={handleClick} />
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

                </RelationCardComp>
            </Box>
        </ClickAwayListener>
    )
}
