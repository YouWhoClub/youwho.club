import { LogoDevRounded, LogoutOutlined, Mail, MailOutline, MenuBook } from "@mui/icons-material";
import { Box } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, getUnclaimedDeposit, deleteUnclaimedDeposit } from "../redux/actions";
import styled from "@emotion/styled";
import { HambergerMenu, LogoutCurve, Notification, Profile, Wallet } from "iconsax-react";
import yCoin from '../assets/Ycoin.svg'
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { HEALTH_API } from "../utils/data/health_api";
import { API_CONFIG } from "../config";
import { useState, useRef, useEffect } from "react";

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
    boxShadow:'0px 0px 9px -2px rgba(227,209,231,0.9)',

    width: '20px', height: '20px'
}))

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
const Navbar = ({ switchTheme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const unclaimedDeposits = useSelector(state => state.unclaimedDepositReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const getUnclaimed = () => dispatch(getUnclaimedDeposit(globalUser.token, globalUser.cid));
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(false)

    useEffect(() => {
        if (globalUser.cid) {
            getUnclaimed()
            setInterval(() => {
                getUnclaimed()
            }, 10000);
        }
        console.log(unclaimedDeposits, 'here');

    }, [])


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
            else {
                logOut()
                deleteUnclaimed()
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }

        }
        catch (err) {
            setErr(err.statusText)
        }

    }

    return (
        <Box sx={{
            height: '55px',
            bgcolor: 'primary.bgOp',
            width: '100%',
            position: "sticky",
            top: 0,
            zIndex: 999,
        }}
        ><Box sx={{
            // width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1
        }}>
                {/* {window.location.pathname == '/' ? */}
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <YouWhoHugCoinPurple onClick={() => navigate('/')} />
                    <ThemeSwitchButton onClick={switchTheme} ></ThemeSwitchButton>
                </Box>
                {/* : <YouWhoIcon onClick={() => navigate('/')} />} */}

                {globalUser.isLoggedIn ?
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: 'auto', lg: '30%' }, color: 'primary.text' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{ fontSize: '14px' }}>{globalUser.balance}</span><Box sx={{
                                backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
                                , width: '20px', height: '20px'
                            }} /> <Wallet size='16px' />
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
                    <ButtonOutline text={'start'} onClick={() => navigate('/auth')} />
                }
            </Box>
        </Box>
    );
}

export default Navbar;