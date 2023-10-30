import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Heart, More } from "iconsax-react";
import { useState } from "react";

const Outter = styled(Box)(({ theme }) => ({
    width: '280px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '300px', height: '300px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.bg,
    // boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    boxShadow: theme.palette.primary.boxShadow,
    transition: '400ms ease',
    // cursor: 'pointer',
    '&:hover': {
        // width: '305px', height: '305px',
        // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
        boxShadow: theme.palette.primary.boxShadowInset,
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '230px', height: '125px',
    borderRadius: '15px',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    // '&:hover': {
    //     // width: '255px', height: '255px',
    //     width: '255px', height: '155px',
    // }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    // height: '100px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))

const NFTCard = ({ image, name, creator, likes,price }) => {
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

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Outter>
                <Card>
                    <NFTImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                    <DetailsSection sx={{ mt: '10px' }}>
                        <FlexRow>
                            <div style={{ display: 'flex', alignItems: 'center' }}><Heart />&nbsp;{likes}</div>
                            <div><More onClick={handleClick} cursor='pointer' /></div>
                        </FlexRow>
                        <Box sx={{ mt: 2 }}>{name}</Box>
                        <FlexRow sx={{ mt: 1 }}>
                            <div>
                                by:{creator}
                            </div>
                            <div>
                                price:{price}$
                            </div>
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
                            <MenuItem id={'details'} sx={{
                                display: 'flex', alignItems: 'center', pb: '12px',
                                color: 'primary.text',
                                borderBottom: '1px solid',
                                borderColor: 'primary.gray',
                                '&:hover': {
                                    bgcolor: 'secondary.bgOp',
                                }
                            }}
                            >
                                Details
                            </MenuItem>
                            <MenuItem id={'details'} sx={{
                                display: 'flex', alignItems: 'center', py: '12px',
                                color: 'primary.text',
                                borderBottom: '1px solid',
                                borderColor: 'primary.gray',
                                '&:hover': {
                                    bgcolor: 'secondary.bgOp',
                                }
                            }}
                            >
                                Details
                            </MenuItem>
                            <MenuItem id={'details'} sx={{
                                display: 'flex', alignItems: 'center', py: '12px',
                                color: 'primary.text',
                                borderBottom: '1px solid',
                                borderColor: 'primary.gray',
                                '&:hover': {
                                    bgcolor: 'secondary.bgOp',
                                }
                            }}
                            >
                                Details
                            </MenuItem>
                            <MenuItem id={'details'} sx={{
                                display: 'flex', alignItems: 'center', pt: '12px',
                                color: 'primary.text',
                                '&:hover': {
                                    bgcolor: 'secondary.bgOp',
                                }
                            }}
                            >
                                Details
                            </MenuItem>
                        </Popper>

                    </DetailsSection>
                </Card>
            </Outter>
        </ClickAwayListener>
    );
}

export default NFTCard;