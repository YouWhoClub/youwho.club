import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ThemeToggler from './HomePage/themeToggler';
import { BG_URL, PUBLIC_URL } from '../utils/utils';
import { Close, CopyAllRounded, InfoSharp, Logout, LogoutOutlined, LogoutRounded, Mail, PermIdentity, Settings, ShareRounded } from '@mui/icons-material';
import profileFace from '../assets/face-pro.svg'
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { API_CONFIG } from '../config';
import { Modal, Typography } from '@mui/material';
import yCoin from "../assets/Ycoin.svg"
import { Notification, NotificationBing, Profile2User, TickSquare, Wallet, Wallet1, Wallet2, Wallet3, WalletMoney } from 'iconsax-react';
import { useNavigate } from 'react-router';
import { HEALTH_API } from '../utils/data/health_api';
import { deleteUnclaimedDeposit, getUnclaimedDeposit, getuser, logOutUser, setRefreshToken } from '../redux/actions';
import ButtonPurple from './buttons/buttonPurple';
const AvatarImg = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', backgroundSize: 'cover',
    width: '45px',
    height: '45px',
    borderRadius: '50%'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // color: theme.palette.primary.text,
    boxSizing: 'border-box',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',

}))
export default function MobileMenuTwo({ openMenu, setOpenMenu, theme, switchTheme, setProgressBarOpen }) {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUnclaimed = () => dispatch(getUnclaimedDeposit(globalUser.token, globalUser.cid));
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const apiCall = React.useRef(undefined)
    const [err, setErr] = React.useState(false)
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
    const refreshUserToken = (refreshToken, tokenExpiration) => dispatch(setRefreshToken(refreshToken, tokenExpiration));
    const logOut = () => dispatch(logOutUser());
    const [openPVKeyModal, setOpenPVKeyModal] = React.useState(false)
    const [keyCopied, setKeyCopied] = React.useState(false)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    React.useEffect(() => {
        getUnclaimed()
    }, [])
    const copyToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setKeyCopied('Copied!');
        } catch (err) {
            setKeyCopied(undefined);
        }
    };

    const checkPVkeyCopyThenDisconnect = () => {
        if (globalUser.privateKey) {
            setOpenPVKeyModal(true)
        } else {
            disconnect()
        }
    }

    async function disconnect() {

        try {

            apiCall.current = HEALTH_API.request({
                path: `/logout`,
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            });
            let response = await apiCall.current.promise;

            if (!response.isSuccess)
                throw response
            // else {
            logOut()
            refreshUserToken('', '')
            deleteUnclaimed()
            setOpenPVKeyModal(false)
            setTimeout(() => {
                navigate('/')
            }, 1000);
            // }

        }
        catch (err) {
            logOut()
            refreshUserToken('', '')
            setOpenPVKeyModal(false)

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }
    const list = (anchor) => (
        <Box
            sx={{
                width: 180, height: '100%', padding: '10px 10px 24px 10px', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
            }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
        >
            <Box sx={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: '8px' }}>
                    <Box sx={{
                        width: '35px', height: '35px',
                        backgroundImage: theme == 'dark' ? BG_URL(PUBLIC_URL(`./w-outline.svg`)) : BG_URL(PUBLIC_URL(`./p-outline.svg`)),
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                    }} />
                    <Close sx={{
                        color: 'primary.text', cursor: 'pointer', fontSize: '16px'
                    }} onClick={() => setOpenMenu(false)} />
                </Box>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px',
                    mb: '18px'
                }}>
                    <AvatarImg
                        sx={{
                            border: '1px solid black',
                            backgroundImage: () => globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}')` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                        }} />
                    <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>
                        {globalUser.username}
                    </Typography>
                </Box>
                <Box sx={{
                    borderRadius: '10px', width: '100%', boxSizing: 'border-box',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '4px 6px', color: 'white',
                    bgcolor: theme == 'light' ? 'primary.main' : 'secondary.middle',
                    boxShadow: theme == 'light' ? '0px 0px 5px 1px #9747FF' : '0px 0px 5px 1px #BEADFA',
                    mb: '14px', height: '30px'
                }}>
                    <FlexRow sx={{ gap: '4px' }}>
                        <Profile2User size={'22px'} />
                        <Typography sx={{
                            fontSize: '10px'
                        }}>
                            YouWho ID
                        </Typography>
                    </FlexRow>
                    <FlexRow sx={{ gap: '4px' }}>
                        <CopyAllRounded sx={{ cursor: 'pointer', fontSize: '18px' }} />
                        <ShareRounded sx={{ cursor: 'pointer', fontSize: '18px' }} />
                    </FlexRow>

                </Box>
                <Box sx={(theme) => ({
                    boxShadow: theme.palette.primary.boxShadow,
                    bgcolor: theme.palette.secondary.bg,
                    borderRadius: '10px', width: '100%', boxSizing: 'border-box',
                    display: 'flex', alignItems: 'center', justifyContent: 'start',
                    padding: '4px 6px', color: 'primary.text', height: '30px', mb: '30px'

                })}>
                    <WalletMoney size={'22px'} />
                    <Typography sx={{
                        fontSize: '10px', ml: '4px'
                    }}>
                        {globalUser.balance}
                    </Typography>
                    <Box sx={{ display: 'flex', height: '22px', fontWeight: 600 }}>
                        <Box sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                            , width: '12px', height: '12px'
                        }} />
                    </Box>

                </Box>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', width: '100%', gap: '4px'
                }}>
                    <FlexRow sx={{
                        width: '100%', gap: '10px', padding: '6px 6px 10px 6px', borderBottom: '1px solid #dedede',
                        // cursor: 'pointer'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <Mail sx={{
                                fontSize: '16px', color: theme == 'dark' ? 'primary.middle' : 'primary.main'
                            }} />
                            {
                                unclaimedDeposits.length ?
                                    <Box
                                        sx={{
                                            backgroundColor: "#C5221F", color: "white",
                                            position: 'absolute', top: 0, right: 0,
                                            width: '10px', height: '10px', borderRadius: '50%',
                                        }} />
                                    :
                                    <></>
                            }
                        </Box>
                        <Typography sx={{ fontSize: '10px' }}>{unclaimedDeposits.length} New Claimings</Typography>
                    </FlexRow>
                    <FlexRow sx={{
                        width: '100%', gap: '10px', padding: '6px 6px 10px 6px', borderBottom: '1px solid #dedede',
                        cursor: 'pointer'
                    }}
                        onClick={() => {
                            setProgressBarOpen(true)
                            localStorage.setItem('openPrg', true)
                        }}>
                        <Settings sx={{
                            fontSize: '16px', color: theme == 'dark' ? 'primary.middle' : 'primary.main'
                        }} />
                        <Typography sx={{ fontSize: '10px' }}>Progressive</Typography>
                    </FlexRow>
                    <FlexRow sx={{
                        width: '100%', gap: '10px', padding: '6px 6px 10px 6px', borderBottom: '1px solid #dedede',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate('/guide')}>
                        <InfoSharp sx={{
                            fontSize: '16px', color: theme == 'dark' ? 'primary.middle' : 'primary.main'
                        }} />
                        <Typography sx={{ fontSize: '10px' }}>Guide Page</Typography>
                    </FlexRow>
                    <FlexRow sx={{
                        cursor: 'pointer',
                        width: '100%', gap: '10px', padding: '6px 6px 10px 6px',
                    }}
                        onClick={checkPVkeyCopyThenDisconnect}>
                        <Logout sx={{
                            fontSize: '16px', color: theme == 'dark' ? 'primary.middle' : 'primary.main'
                        }} />
                        <Typography sx={{ fontSize: '10px' }}>Logout</Typography>
                    </FlexRow>

                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <ThemeToggler theme={theme} switchTheme={switchTheme} />
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                PaperProps={{
                    sx: {
                        bgcolor: 'secondary.bg', padding: '0 !important',
                        borderRadius: '20px 0px 0px 20px',
                    }
                }}
                sx={{
                    display: { xs: 'flex', md: 'none !important', }
                }}
                anchor={'right'}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
            >
                {globalUser.isLoggedIn ?
                    list('right') : undefined}
            </Drawer>

            <Modal
                open={openPVKeyModal}
                onClose={() => {
                    setOpenPVKeyModal(false)
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
                        width: { xs: '100%', sm: 'max-content' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenPVKeyModal(false)}
                                    sx={{ cursor: 'pointer', fontSize: '24px', color: 'primary.text' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                            <Typography
                                sx={{
                                    color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center',
                                    textTransform: 'capitalize'
                                }}>
                                Save Private Key
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center',
                                    textTransform: 'capitalize'
                                }}>
                                Please Save Your Private Key Before Logging out.it will be needed for future uses
                            </Typography>
                            <FlexRow>
                                <Typography
                                    onClick={() => copyToClipBoard(globalUser.privateKey)}
                                    sx={{
                                        color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center',
                                        textTransform: 'capitalize', cursor: 'pointer'
                                    }}>
                                    {globalUser.privateKey}
                                </Typography>
                                <TickSquare style={{ display: keyCopied ? 'block' : 'none', color: 'green' }} />
                            </FlexRow>
                            {/* <Typography sx={{ color: 'primary.text' }}>Logging Out In {logoutTimer} Seconds...</Typography> */}
                            <ButtonPurple w={'max-content'} text={'Log Me Out'} onClick={disconnect} px={'12px'} />
                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>

        </>
    );
}
