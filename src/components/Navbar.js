import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUnclaimedDeposit, getUnclaimedDeposit, getuser, logOutUser, setRefreshToken } from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../utils/data/auth_api";
import { HEALTH_API } from "../utils/data/health_api";
import ThemeSwitcher from "./HomePage/themeSwitchComp";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { LogoutCurve, Notification, Profile, Wallet2 } from "iconsax-react";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import MobileMenu from "./MobileMenu";
import SvgIcon from '@mui/material/SvgIcon';
import yCoin from "../assets/Ycoin.svg"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
const Navbar = ({ navbarType, switchTheme, theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchUser = (accesstoken) => dispatch(getuser(accesstoken));
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
    function refreshPage() {
        window.location.reload(false);
    }

    const checkTokenExpiration = async () => {
        console.log('checked!', (new Date().getTime() > globalUser.tokenExpiration));
        console.log('token exp!', globalUser.tokenExpiration);
        console.log('token refresh!', globalUser.refreshToken);
        console.log('alan time!', new Date().getTime());
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
                    fetchUser(accesstoken)
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
        console.log(tokensObj.tokenExpiration)
        console.log(tokensObj.refreshToken)
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
            console.log(tokenInterval)
        }
        return () => {
            clearInterval(tokenInterval.current);
        };
        // }


    }, [loginInitialRender])

    // testing useEffect intervals ==>
    // useEffect(() => {

    //     if (!loginInitialRender && globalUser.tokenExpiration && globalUser.isLoggedIn) {
    //         // checkTokenExpiration()
    //         const interval = setInterval(checkTokenExpiration, 60000);
    //         setTokenIntervalRef(interval);
    //     }

    //     if (loginInitialRender) {
    //         setLoginInitialRender(false);
    //     }

    //     return () => {
    //         if (tokenIntervalRef) {
    //             clearInterval(tokenIntervalRef);
    //             setTokenIntervalRef(null);
    //         }
    //     };
    // }, [loginInitialRender, globalUser.tokenExpiration, globalUser.isLoggedIn]);


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
            setTimeout(() => {
                navigate('/')
            }, 1000);
            // }

        }
        catch (err) {
            logOut()
            refreshUserToken('', '')

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }


    return (
        <>{navbarType == 'radius' ?
            <NavStyle sx={{
                padding: { xs: '9px 20px', sm: '9px 30px' }
            }}>

                <ThemeSwitcher switchTheme={switchTheme} right={'0'} top={'calc(100vh - 140px)'} m={'15px'} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '27px' }}>
                    {theme == 'light' ?
                        <YouWhoIconPurple onClick={() => navigate('/')} />
                        : <YouWhoIcon onClick={() => navigate('/')} />}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '25px' }}>
                        <Link to={'/about-us'} style={{ textDecoration: 'none', color: theme == 'light' ? 'black' : 'white', fontSize: '18px' }}>About Us</Link>
                        <Link to={'/blog'} style={{ textDecoration: 'none', color: theme == 'light' ? 'black' : 'white', fontSize: '18px' }}>Weblog</Link>
                    </Box>
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
            </NavStyle >
            :
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
            </Box>

        }
        </>
    );
}

export default Navbar;