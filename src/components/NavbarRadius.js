import { LogoDevRounded, LogoutOutlined, Mail, MailOutline, MenuBook } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, getUnclaimedDeposit, deleteUnclaimedDeposit } from "../redux/actions";
import styled from "@emotion/styled";
import { HambergerMenu, LogoutCurve, Menu, MenuBoard, Notification, Profile, Wallet, Wallet2 } from "iconsax-react";
import { Close, Square } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { HEALTH_API } from "../utils/data/health_api";
import { API_CONFIG } from "../config";
import { useState, useRef, useEffect } from "react";
import { PUBLIC_API } from "../utils/data/public_api";
import yCoin from "../assets/Ycoin.svg"
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import ThemeSwitcher from "../components/HomePage/themeSwitchComp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileMenu from "./MobileMenu";

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
const YouWhoHugCoinPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/YouWho-hugcoin.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const ThemeSwitchButton = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.themeSwitch,
    borderRadius: '50%',
    border: '1px solid', borderColor: theme.palette.secondary.themeSwitch,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.palette.primary.boxShadow,

    width: '20px', height: '20px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    // borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))
const Inputtt = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
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
const NavbarTwo = ({ switchTheme, theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const getUnclaimed = () => dispatch(getUnclaimedDeposit(globalUser.token, globalUser.cid));
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(false)
    const [intervalRef, setIntervalRef] = useState(null);
    const [openMenu, setOpenMenu] = useState(false)

    // useEffect(() => {
    //     if (globalUser.isLoggedIn && !globalUser.isMailVerified) {
    //         disconnect()
    //     }
    // }, [globalUser.isLoggedIn, globalUser.isMailVerified])

    useEffect(() => {
        if (globalUser.cid) {
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

        return () => {
            if (intervalRef) {
                clearInterval(intervalRef);
                setIntervalRef(null);
            }
        };
    }, [globalUser.cid]);


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
    );
}

export default NavbarTwo;