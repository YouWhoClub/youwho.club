import { LogoDevRounded, LogoutOutlined, Mail, MailOutline, MenuBook } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, getUnclaimedDeposit, deleteUnclaimedDeposit, getuser, setRefreshToken } from "../redux/actions";
import styled from "@emotion/styled";
import { HambergerMenu, LogoutCurve, Notification, Profile, Wallet, Wallet2, } from "iconsax-react";
import { Close, Square } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { HEALTH_API } from "../utils/data/health_api";
import { API_CONFIG } from "../config";
import { useState, useRef, useEffect } from "react";
import { PUBLIC_API } from "../utils/data/public_api";
import yCoin from "../assets/Ycoin.svg"
import ThemeSwitcher from "../components/HomePage/themeSwitchComp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileMenu from "./MobileMenu";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { AUTH_API } from "../utils/data/auth_api";


const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    // backgroundImage: "url('/w-outline-animated.svg')",
    backgroundImage: "url('/youwho-white.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '45px',
    height: '45px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    // backgroundImage: "url('/p-outline-animated.svg')",
    backgroundImage: "url('/youwho-purple.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '45px',
    height: '45px'
}))
const YouWhoHugCoinPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-hugcoin.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
const NavbarDashBoard = ({ switchTheme, theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));
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

    useEffect(() => {
        if (globalUser.isLoggedIn && !globalUser.isMailVerified) {
            disconnect()
        }
    }, [globalUser.isLoggedIn, globalUser.isMailVerified])

    useEffect(() => {
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


    useEffect(() => {

        const checkTokenExpiration = async () => {
            console.log('checked!', (new Date().getTime() > globalUser.tokenExpiration));
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
                    else {
                        fetchUser(response.headers.cookie.match(/\/accesstoken=([^&]+)/)[1])
                        dispatch(setRefreshToken(response.headers.cookie.match(/refrestoken=([^&]+)/)[1], new Date().getTime() + 31 * 60000))
                        setUnclaimedInitialRender(true);
                    }
                }
                catch (err) {
                    if (err.data.status == 406)
                        disconnect()

                    console.log(err)
                }
            }
        }

        if (!loginInitialRender && globalUser.tokenExpiration) {
            checkTokenExpiration()
            const interval = setInterval(checkTokenExpiration, 60000);
            setTokenIntervalRef(interval);
        }

        if (loginInitialRender) {
            setLoginInitialRender(false);
        }

        return () => {
            if (tokenIntervalRef) {
                clearInterval(tokenIntervalRef);
                setTokenIntervalRef(null);
            }
        };
    }, [loginInitialRender]);


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
            deleteUnclaimed()
            setTimeout(() => {
                navigate('/')
            }, 1000);
            // }

        }
        catch (err) {
            logOut()

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }

    return (
        <Box sx={{
            height: '55px',
            bgcolor: 'primary.bg',
            width: '100%',
            position: "sticky",
            top: 0,
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
                <ThemeSwitcher left={{ xs: '15px', md: '30px' }} top={'75px'} switchTheme={switchTheme} />
                {/* {window.location.pathname == '/' ? */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '27px' }}>
                    {theme == 'light' ?
                        <YouWhoIconPurple onClick={() => navigate('/')} />
                        : <YouWhoIcon onClick={() => navigate('/')} />}
                </Box>
                {globalUser.isLoggedIn ?
                    <>
                        <Box sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'primary.text', gap: '50px'
                        }}>
                            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', }}>
                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                                    {globalUser.balance}
                                    &nbsp;<Box sx={{
                                        backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
                                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                                        , width: '20px', height: '20px'
                                    }} />
                                </span>
                                <Wallet2 size='25px' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <Notification size="25px" cursor='pointer' />
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
                                {window.location.pathname == '/dashboard' || window.location.pathname == '/gallery' || window.location.pathname == '/wallet' ?
                                    undefined
                                    : <div style={{ display: 'flex', alignItems: 'center', }} onClick={() => navigate('/dashboard')}>
                                        <Profile cursor='pointer' size='25px' />
                                    </div>
                                }
                                <div onClick={disconnect}>
                                    <LogoutCurve style={{ display: 'flex', alignItems: 'center', }} cursor='pointer' size='25px' />
                                </div>
                            </div>
                        </Box>
                        <Box sx={{
                            display: { xs: 'flex', sm: 'none' },
                            alignItems: 'center', justifyContent: 'space-between',
                            color: 'primary.text', gap: '8px'
                        }}>
                            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', }}>
                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                                    {globalUser.balance}
                                    &nbsp;<Box sx={{
                                        backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
                                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                                        , width: '20px', height: '20px'
                                    }} />
                                </span>
                                <Wallet2 size='24px' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <Notification size="24px" cursor='pointer' />
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
                            <IconButton aria-label="menuIcon" sx={{ padding: '10px', color: 'primary.text' }}
                                onClick={() => setOpenMenu(true)}>
                                <FontAwesomeIcon icon={faEllipsisV} size="24px" />
                            </IconButton>
                        </Box>
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
                <MobileMenu theme={theme} switchTheme={switchTheme} openMenu={openMenu} setOpenMenu={setOpenMenu} />

            </Box>
        </Box >
    );
}

export default NavbarDashBoard;