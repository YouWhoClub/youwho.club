import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUnclaimedDeposit, getUnclaimedDeposit, getuser, logOutUser, setRefreshToken } from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../utils/data/auth_api";
import { HEALTH_API } from "../utils/data/health_api";
import ThemeSwitcher from "./HomePage/themeSwitchComp";
import { Box, ClickAwayListener, IconButton, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowDown2, ArrowUp2, LogoutCurve, Menu, Notification, Profile, SearchNormal, SearchNormal1, TickSquare, Wallet2 } from "iconsax-react";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import MobileMenu from "./MobileMenu";
import SvgIcon from '@mui/material/SvgIcon';
import yCoin from "../assets/Ycoin.svg"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Close, Face, Face2, Face3, Face4, Face5, InfoSharp, LogoutOutlined, Search, Settings, TheaterComedy } from "@mui/icons-material";
import { MorePopper, shorten } from "./utils";
import DashBar from "./dashboard/DashBar";
import ThemeToggler from "./HomePage/themeToggler";
import profileFace from '../assets/face-pro.svg'
import { API_CONFIG } from "../config";
import MobileMenuTwo from "./MobileMenuTwo";
import SearchInput from "./searchInput";

const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-white.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // backgroundSize:'contain',
    width: '45px',
    height: '45px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-purple.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '45px',
    height: '45px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))

const NavStyle = styled(Box)(({ theme }) => ({
    height: '55px',
    width: '100%',
    position: "sticky",
    top: 0,
    zIndex: 999, boxSizing: 'border-box',
    borderRadius: '0 0 12px 12px',
    boxShadow: theme.palette.primary.boxShadow,
    backgroundColor: theme.palette.secondary.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between',


    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },

}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',

}))


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
const Navbar = ({ navbarType, switchTheme, theme, openedBar, setOpenedBar }) => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchUser = (accesstoken, pvkey) => dispatch(getuser(accesstoken, pvkey));
    const refreshUserToken = (refreshToken, tokenExpiration) => dispatch(setRefreshToken(refreshToken, tokenExpiration));
    const logOut = () => dispatch(logOutUser());
    const tokenRef = useRef(null);
    const getUnclaimed = () => dispatch(getUnclaimedDeposit(tokenRef.current, globalUser.cid));
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(false)
    const [intervalRef, setIntervalRef] = useState(null);
    const [tokenIntervalRef, setTokenIntervalRef] = useState(null);
    const [openMenu, setOpenMenu] = useState(false)
    const [unclaimedInitialRender, setUnclaimedInitialRender] = useState(true);
    const [loginInitialRender, setLoginInitialRender] = useState(true);
    const [tokensObj, setTokenObj] = useState({})
    const tokenInterval = useRef(null)
    const [openPVKeyModal, setOpenPVKeyModal] = useState(false)
    const [keyCopied, setKeyCopied] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [progressBarOpen, setProgressBarOpen] = useState(false)

    const handleClick = (event) => {
        if (!open) {
            setAnchorEl(window.document.getElementById("avatar-nav"));
        }
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }
    const [logoutTimer, setLogoutTimer] = useState(10)
    useEffect(() => {
        if (globalUser.isLoggedIn && !globalUser.isMailVerified) {
            disconnect()
        }
    }, [globalUser.isLoggedIn, globalUser.isMailVerified])

    useEffect(() => {
        if (globalUser.token) {
            if (globalUser.privateKey) {
                fetchUser(globalUser.token, globalUser.privateKey)
            }
            else {
                fetchUser(globalUser.token)

            }

        }
        tokenRef.current = globalUser.token;
    }, [globalUser.token]);

    useEffect(() => {
        if (!unclaimedInitialRender && globalUser.cid) {
            getUnclaimed();
            const intervalId = setInterval(() => {
                getUnclaimed();
            }, 10000);
            setIntervalRef(intervalId);
        } else {
            if (intervalRef) {
                clearInterval(intervalRef);
                setIntervalRef(null);
            }
        }

        if (unclaimedInitialRender) {
            setUnclaimedInitialRender(false);
        }

        return () => {
            if (intervalRef) {
                clearInterval(intervalRef);
                setIntervalRef(null);
            }
        };
    }, [globalUser.cid, unclaimedInitialRender]);
    function refreshPage() {
        window.location.reload(false);
    }
    // useEffect(() => {
    //     checkToken()
    // }, [globalUser.refreshToken])
    const checkToken = async () => {
        if (globalUser.tokenExpiration)
            try {
                apiCall.current = AUTH_API.request({
                    path: `/login`,
                    method: "post",
                    body: { identifier: '', password: '' },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${globalUser.refreshToken}`,
                    },
                });
                let response = await apiCall.current.promise;

                if (!response.isSuccess)
                    throw response
                let dt = new Date();
                dt = new Date(dt.getTime() + 30 * 60 * 1000)
                let accesstoken = response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1]
                let refreshToken = response.headers.cookie.match(/refrestoken=([^&]+)/)[1]
                let tokenExpiration = dt.getTime()
                fetchUser(accesstoken, globalUser.privateKey)
                refreshUserToken(refreshToken, tokenExpiration)
                setUnclaimedInitialRender(true);
                let tempTokensObj = {}
                tempTokensObj.accesstoken = accesstoken
                tempTokensObj.refreshToken = refreshToken
                tempTokensObj.tokenExpiration = tokenExpiration
                setTokenObj(tempTokensObj)
                console.log('cheeeekingg and changin yeaah')
                // tokenInterval.current = null
                // setLoginInitialRender(true)
                // refreshPage()
            }
            catch (err) {
                if (err.data.status == 406)
                    disconnect()

                console.log(err)
            }
    }
    const checkTokenExpiration = async () => {
        // console.log('checked!', (new Date().getTime() > globalUser.tokenExpiration));
        // console.log('token exp!', globalUser.tokenExpiration);
        // console.log('token refresh!', globalUser.refreshToken);
        // console.log('alan time!', new Date().getTime());
        if (globalUser.isLoggedIn && globalUser.tokenExpiration) {
            if (new Date().getTime() > globalUser.tokenExpiration) {
                try {
                    apiCall.current = AUTH_API.request({
                        path: `/login`,
                        method: "post",
                        body: { identifier: '', password: '' },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${globalUser.refreshToken}`,
                        },
                    });
                    let response = await apiCall.current.promise;

                    if (!response.isSuccess)
                        throw response
                    let dt = new Date();
                    dt = new Date(dt.getTime() + 30 * 60 * 1000)
                    let accesstoken = response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1]
                    let refreshToken = response.headers.cookie.match(/refrestoken=([^&]+)/)[1]
                    let tokenExpiration = dt.getTime()
                    fetchUser(accesstoken, globalUser.privateKey)
                    refreshUserToken(refreshToken, tokenExpiration)
                    setUnclaimedInitialRender(true);
                    let tempTokensObj = {}
                    tempTokensObj.accesstoken = accesstoken
                    tempTokensObj.refreshToken = refreshToken
                    tempTokensObj.tokenExpiration = tokenExpiration
                    setTokenObj(tempTokensObj)
                    // tokenInterval.current = null
                    // setLoginInitialRender(true)
                    // refreshPage()
                }
                catch (err) {
                    if (err.data.status == 406)
                        disconnect()

                    console.log(err)
                }
            }
            else console.log('token ok')
        } else {
            console.log('not logged in')
        }
    }
    useEffect(() => {
        //Implementing the setInterval method
        // const interval = setInterval(checkTokenExpiration, 30000);
        //Clearing the interval
        if (tokensObj.tokenExpiration == globalUser.tokenExpiration && tokensObj.refreshToken == globalUser.refreshToken) {
            clearInterval(tokenInterval.current);
            setLoginInitialRender(true)
        }
    }, [tokensObj, globalUser.tokenExpiration, globalUser.refreshToken]);


    useEffect(() => {

        if (loginInitialRender) {
            setLoginInitialRender(false)
        }
        else {
            checkTokenExpiration()
            tokenInterval.current = setInterval(checkTokenExpiration, 60000);
        }
        return () => {
            clearInterval(tokenInterval.current);
        };
        // }


    }, [loginInitialRender])

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
            // localStorage.setItem('pvk', globalUser.privateKey)

            logOut(globalUser.privateKey)
            refreshUserToken('', '')
            deleteUnclaimed()
            setOpenPVKeyModal(false)
            setTimeout(() => {
                navigate('/')
            }, 500);
            // }

        }
        catch (err) {
            // localStorage.setItem('pvk', globalUser.privateKey)

            logOut(globalUser.privateKey)
            refreshUserToken('', '')
            setOpenPVKeyModal(false)

            setErr(err.statusText)
            // console.log(err.statusText)
        }

    }

    const copyToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setKeyCopied('Copied!');
        } catch (err) {
            setKeyCopied(undefined);
        }
    };
    const faceClickPopperTabs = [
        {
            text: 'Theme', id: 'dash-nav-thm-switch',
            onClick: undefined, icon: <ThemeToggler theme={theme} switchTheme={switchTheme} />
        },
        {
            text: 'Progressive', id: 'dash-nav-prgrss-tab', onClick: () => {
                setProgressBarOpen(true)
                localStorage.setItem('openPrg', true)
                handleClose()
            }, icon: <Settings sx={{ fontSize: '24px', color: theme == 'dark' ? 'primary.middle' : 'primary.main' }} />
        },
        {
            text: 'Guide Page', id: 'dash-nav-guide-tab', onClick: () => navigate('/guide'),
            icon: <InfoSharp sx={{ fontSize: '24px', color: theme == 'dark' ? 'primary.middle' : 'primary.main' }} />
        },
        {
            text: 'Logout', id: 'dash-nav-logout', onClick: checkPVkeyCopyThenDisconnect,
            icon: <LogoutOutlined sx={{ fontSize: '24px', color: theme == 'dark' ? 'primary.middle' : 'primary.main' }} />
        },
    ]

    // useEffect(() => {
    //     if (globalUser.isLoggedIn) {
    //         navigate('/profile')
    //     } else {
    //         navigate('/')
    //     }
    // }, [globalUser, globalUser.isLoggedIn])
    return (
        <>{navbarType == 'radius' ?
            <NavStyle sx={{
                padding: { xs: '9px 20px', sm: '9px 30px' }
            }}>

                {/* <ThemeSwitcher switchTheme={switchTheme} right={'0'} top={'calc(100vh - 140px)'} m={'15px'} /> */}
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '12px', md: '27px' } }}> */}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '12px', md: '27px' } }}>
                    {theme == 'light' ?
                        <Link sx={{ color: 'inherit', textDecoration: 'none' }} to={'/'} target="_blank">
                            <YouWhoIconPurple />
                        </Link>
                        : <Link sx={{ color: 'inherit', textDecoration: 'none' }} to={'/'} target="_blank">
                            <YouWhoIcon />
                        </Link>
                    }
                    <Box sx={{
                        display: { xs: 'none', sm: 'flex' }, alignItems: 'center',
                        gap: { xs: '15px', md: '25px' },
                        color: 'primary.text', fontSize: { xs: '14px', md: '18px' }
                    }}>
                        {window.location.pathname !== '/' ?
                            <Link to={'/'} style={{
                                textDecoration: 'none', fontSize: 'inherit',
                                fontWeight: 400,
                                color: 'inherit'
                            }}>Home</Link>
                            : undefined}
                        <Link to={'/about-us'} style={{
                            textDecoration: window.location.pathname == '/about-us' ? 'underline' : 'none', fontSize: 'inherit',
                            fontWeight: window.location.pathname == '/about-us' ? 700 : 400,
                            color: window.location.pathname == '/about-us' ? '#9747FF' : 'inherit'
                        }}>About Us</Link>
                        <Link to={'/contact-us'} style={{
                            textDecoration: window.location.pathname == '/contact-us' ? 'underline' : 'none', fontSize: 'inherit',
                            fontWeight: window.location.pathname == '/contact-us' ? 700 : 400,
                            color: window.location.pathname == '/contact-us' ? '#9747FF' : 'inherit'
                        }}>Contact Us</Link>
                        <Link to={'/blogs'} style={{
                            textDecoration: window.location.pathname == '/blogs' ? 'underline' : 'none', fontSize: 'inherit',
                            fontWeight: window.location.pathname == '/blogs' ? 700 : 400,
                            color: window.location.pathname == '/blogs' ? '#9747FF' : 'inherit'
                        }}>Weblogs</Link>
                    </Box>
                    {window.location.pathname == '/search' ?
                        undefined :
                        <SearchInput />
                    }
                    {/* <SearchInput /> */}

                </Box>
                {/* </Box> */}

                {globalUser.isLoggedIn ?
                    <>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'primary.text', gap: { xs: '8px', sm: '13px' }
                        }}>
                            {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/search'} target="_blank">
                                <SearchNormal1 size='25px' cursor={'pointer'} />
                            </Link> */}
                            <ThemeToggler theme={theme} switchTheme={switchTheme} />
                            <ButtonPurple onClick={() => navigate('/welcome')}
                                text={'Go To Panel'} height={'35px'} />
                        </Box>
                    </>

                    :
                    <>

                        <FlexRow sx={{ display: { xs: 'none', sm: 'flex' }, gap: '13px', alignItems: 'center' }}>
                            <ThemeToggler theme={theme} switchTheme={switchTheme} />
                            <ButtonOutline text={'Sign in'} onClick={() => navigate('/auth#signin')} height={'35px'} />
                            <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth#signup')} height={'35px'} />
                        </FlexRow>
                        <FlexRow sx={{ display: { xs: 'flex', sm: 'none' }, gap: '8px', alignItems: 'center' }}>
                            <ThemeToggler theme={theme} switchTheme={switchTheme} />
                            <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth#signup')} height={'35px'} />
                            <IconButton aria-label="menuIcon" sx={{ padding: '10px', color: 'primary.text' }}
                                onClick={() => setOpenMenu(true)}>
                                <FontAwesomeIcon icon={faEllipsisV} size="24px" />
                            </IconButton>
                        </FlexRow>
                    </>
                }
                <MobileMenu theme={theme} switchTheme={switchTheme} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </NavStyle >
            :
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{
                    height: '55px',
                    bgcolor: 'primary.bg',
                    width: '100%',
                    position: "sticky",
                    top: 0, boxSizing: 'border-box', py: '5px',
                    zIndex: 999,
                    borderRadius: '0 0 12px 12px', display: 'flex', alignItems: 'center'
                    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)'
                }}
                ><Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: '15px', md: '30px' }
                }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '27px' }}>
                            {theme == 'light' ?
                                <Link sx={{ color: 'inherit', textDecoration: 'none' }} to={'/'} target="_blank">
                                    <YouWhoIconPurple />
                                </Link>
                                :
                                <Link sx={{ color: 'inherit', textDecoration: 'none' }} to={'/'} target="_blank">
                                    <YouWhoIcon />
                                </Link>
                            }
                        </Box>
                        {globalUser.isLoggedIn ?
                            <>
                                <Box sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center', justifyContent: 'space-between',
                                    color: 'primary.text', gap: '30px'
                                }}>
                                    <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center', }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '12px', gap: '1px' }}>
                                            {globalUser.balance}
                                            <Box sx={{ display: 'flex', height: '24px', }}>
                                                <Box sx={{
                                                    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
                                                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                                                    , width: '12px', height: '12px'
                                                }} />
                                            </Box>
                                        </Box>
                                        <Wallet2 size='25px' />
                                    </Box>
                                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                        <Notification size="25px" cursor='pointer' onClick={() => navigate('/wallet#claim')} />
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
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                        <Box sx={{ display: 'flex', alignItems: "center", gap: '3px', cursor: 'pointer' }} onClick={handleClick}>
                                            {!open ?
                                                <ArrowDown2 size={'10px'} /> : <ArrowUp2 size={'10px'} />}
                                            <Typography sx={{ fontSize: '12px', color: 'primary.text', fontFamily: 'Inter' }}>
                                                {shorten(globalUser.username, 15)}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: "center", gap: '1px', cursor: 'pointer', }}>
                                                {/* <Face sx={{ cursor: 'pointer', fontSize: '25px' }} /> */}
                                                <Box id="avatar-nav" sx={{
                                                    width: '25px', height: '25px', borderRadius: '50%', bgcolor: 'secondary.bg',
                                                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover',
                                                    backgroundImage: () => globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}')` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                                                }} />
                                            </Box>
                                        </Box>
                                    </div>
                                </Box>
                                <Box sx={{
                                    display: { xs: 'flex', sm: 'none' },
                                    alignItems: 'center', justifyContent: 'space-between',
                                    color: 'primary.text', gap: '12px',
                                }}>
                                    <Menu cursor={'pointer'} onClick={() => setOpenMenu(true)} />
                                </Box>
                                <MorePopper tabs={faceClickPopperTabs} open={open} anchorEl={anchorEl} handleClose={handleClose} />
                            </>
                            :
                            <>
                                <FlexRow sx={{ display: { xs: 'none', sm: 'flex' }, gap: '13px', alignItems: 'center' }}>
                                    <ButtonOutline text={'Sign in'} onClick={() => navigate('/auth#signin')} height={'35px'} />
                                    <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth#signup')} height={'35px'} />
                                </FlexRow>
                                <FlexRow sx={{ display: { xs: 'flex', sm: 'none' }, gap: '8px', alignItems: 'center' }}>
                                    <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth#signup')} height={'35px'} />
                                    <IconButton aria-label="menuIcon" sx={{ padding: '10px', color: 'primary.text' }}
                                        onClick={() => setOpenMenu(true)}>
                                        <FontAwesomeIcon icon={faEllipsisV} size="24px" />
                                    </IconButton>
                                </FlexRow>
                            </>
                        }
                        <MobileMenuTwo theme={theme} setProgressBarOpen={setProgressBarOpen}
                            switchTheme={switchTheme} openMenu={openMenu} setOpenMenu={setOpenMenu} />

                    </Box>
                    {progressBarOpen || openedBar ?
                        <DashBar closeBar={() => {
                            setProgressBarOpen(false)
                            localStorage.setItem('openPrg', false)
                            if (openedBar) {
                                setOpenedBar(false)
                            }
                        }} openBar={progressBarOpen || openedBar} username={globalUser.username} /> : undefined}

                </Box>


            </ClickAwayListener>
        }

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
                                    sx={{ cursor: 'pointer', fontSize: '24px' }} />
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
                                Please Save Your Private Key Somewhere safe Before Logging out.it will be needed for future uses
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

export default Navbar;