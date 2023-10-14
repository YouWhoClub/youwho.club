import { LogoDevRounded, LogoutOutlined, Mail, MailOutline, MenuBook } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, getUnclaimedDeposit, deleteUnclaimedDeposit, setPrivateKey } from "../redux/actions";
import styled from "@emotion/styled";
import { HambergerMenu, LogoutCurve, Notification, Profile, Wallet } from "iconsax-react";
import { Close, Square } from "@mui/icons-material";
import yCoin from '../assets/yCoin.svg'
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { HEALTH_API } from "../utils/data/health_api";
import { API_CONFIG } from "../config";
import { useState, useRef, useEffect } from "react";
import { PUBLIC_API } from "../utils/data/public_api";

const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/w-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/p-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const YouWhoHugCoinPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-hugcoin.svg')",
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
    boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',

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
    const [signer, setSigner] = useState(undefined)
    const [openModal, setOpenModal] = useState(false)


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

    useEffect(() => {
        if (globalUser.isLoggedIn && globalUser.cid && !globalUser.privateKey) {
            setOpenModal(true)
        }
    }, [globalUser.isLoggedIn, globalUser.cid, globalUser.privateKey]);


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

    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
        setOpenModal(false)
    }

    return (
        <Box sx={{
            height: '55px',
            bgcolor: 'secondary.bg',
            width: '100%',
            position: "sticky",
            top: 0,
            zIndex: 999,
            borderRadius: '0 0 12px 12px',
            boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)'
        }}
        ><Box sx={{
            // width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '30px'
        }}>
                {/* {window.location.pathname == '/' ? */}
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <YouWhoHugCoinPurple onClick={() => navigate('/')} />
                    &nbsp;&nbsp;&nbsp;
                    <Link to={'/about-us'} style={{ textDecoration: 'none', color: theme == 'light' ? 'black' : 'white' }}>About Us</Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to={'/blog'} style={{ textDecoration: 'none', color: theme == 'light' ? 'black' : 'white' }}>Weblog</Link>
                </Box>
                {/* : <YouWhoIcon onClick={() => navigate('/')} />} */}

                {globalUser.isLoggedIn ?
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: 'auto', lg: '30%' }, color: 'primary.text' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{ fontSize: '14px' }}>{globalUser.balance}</span>&nbsp;<Box sx={{
                                backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                                , width: '20px', height: '20px'
                            }} />&nbsp; <Wallet size='16px' />
                        </div>&nbsp;&nbsp;&nbsp;
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Notification size="16px" cursor='pointer' />
                            {
                                unclaimedDeposits.length ?
                                    <span style={{ backgroundColor: "#F84F31", color: "white", fontSize: '10px', borderRadius: '5px', padding: '5px' }}>you have unclaimed gifts!</span>
                                    :
                                    <></>
                            }
                        </div>&nbsp;&nbsp;&nbsp;
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            {window.location.pathname == '/dashboard' || window.location.pathname == '/gallery' || window.location.pathname == '/wallet' ?
                                undefined
                                : <div style={{ display: 'flex', alignItems: 'center', }} onClick={() => navigate('/dashboard')}>
                                    <Profile cursor='pointer' size='16px' />
                                </div>
                            }
                            <div onClick={disconnect}>
                                <LogoutCurve style={{ display: 'flex', alignItems: 'center', }} cursor='pointer' size='16px' />
                            </div>
                        </div>
                    </Box>
                    :
                    <>
                        <FlexRow sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                            <ButtonOutline text={'Sign in'} onClick={() => navigate('/auth')} />
                            <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth')} />
                        </FlexRow>
                        <FlexRow sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            <ButtonPurple text={'Get Started'} onClick={() => navigate('/auth')} />
                        </FlexRow>
                    </>
                }
            </Box>

            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Box sx={{
                        borderRadius: '24px',
                        width: { xs: '100%', sm: '500px' }, height: { xs: '100%', sm: '350px' },
                        backgroundColor: 'secondary.bg',
                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                    }}>
                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}><Typography>PrivateKey</Typography><div onClick={() => {
                            setOpenModal(false)
                        }}><Close sx={{ cursor: 'pointer' }} /></div></FlexRow>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Inputtt>
                                <Square sx={{ color: 'primary.light', fontSize: '30px' }} />
                                <Inputt value={signer} placeholder="enter private key" onChange={(e) => setSigner(e.target.value)} />
                            </Inputtt>
                            <Typography sx={{ width: '100%', mt: 2, fontSize: '13px', mb: 2, color: 'primary.text', textAlign: 'center' }}>
                                We have cleared your private key as you logged out. Please provide your private key to continue. Your private key will be securely stored for future transactions.
                            </Typography>
                        </Box>
                        <ButtonPurple text={'save'} w={'100%'} onClick={savePrivateKey} />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default NavbarTwo;