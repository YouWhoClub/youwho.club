import { Box, Modal, SvgIcon } from "@mui/material";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { HambergerMenu, Location, Mobile, Profile, Wallet, Wallet2, WalletMoney } from "iconsax-react";
import { CenterFocusStrong, Close, EastRounded, LogoutOutlined, WalletOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutUser } from "../redux/actions";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import Selection from "./selection";
import { MyInput } from "./utils";
import ButtonOutlineInset from "./buttons/buttonOutlineInset.js";
import VerifyPhoneModal from "./user/auth/verifyPhoneModal";

const IconHolder = styled(Box)(({ theme }) => ({
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    borderColor: theme.palette.secondary.text,
    // border: '0.2px solid',
    borderRadius: '50%', cursor: 'pointer', transition: '500ms ease',
    width: '40px', height: '40px',
    boxShadow: theme.palette.primary.boxShadowInset,
    '&:hover': {
        // backgroundColor: theme.palette.primary.middle,
        //  color: 'whitesmoke',
        boxShadow: theme.palette.primary.boxShadow,
    },
    "@media (max-width: 600px)": {
        width: '40px', height: '40px',
    }

}))
const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/w-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '80px',
    height: '80px'
}))
function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text, textAlign: 'center'
}))
const P = styled('p')(({ theme }) => ({
    color: theme.palette.secondary.text, textAlign: 'center', fontSize: '14px'
}))
const BarStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    backdropFilter: 'blur(10px)',
    boxShadow: '2px 0px 5px 1px rgba(0, 0, 0, 0.25)',
    position: "absolute",
    zIndex: 999,
    color: theme.palette.primary.text
}))

const Bar = () => {
    const globalUser = useSelector(state => state.userReducer)
    console.log(globalUser.token)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const [openModal, setOpenModal] = useState(false)
    const [selectValue, setSelectValue] = useState('Location')
    const handleSelect = (e) => {
        e.preventDefault()
        setSelectValue(e.target.id)
    }


    // if phone verification is necessary ===>

    // const handleWalletClick = () => {
    //     if (globalUser.isPhoneVerified) {
    //         navigate('/wallet')
    //     } else {
    //         setOpenModal(true)
    //     }
    // }
    // const handleProfileClick = () => {
    //     if (globalUser.isPhoneVerified) {
    //         navigate('/profile')
    //     } else {
    //         setOpenModal(true)
    //     }
    // }
    // else ==>
    const handleWalletClick = () => {
        navigate('/wallet')
    }
    const handleProfileClick = () => {
        navigate('/profile')
    }
    function disconnect() {
        logOut()
    }
    return (
        <BarStyle sx={{
            flexDirection: { xs: 'row', sm: 'column' },
            height: { xs: '50px', sm: '300px', md: '350px' },
            width: {
                xs: '100%', sm: '50px'
            }, zIndex: 999,
            left: { xs: 'unset', sm: 0 },
            transform: { xs: 'unset', sm: 'translateY(50%)' },
            bottom: { xs: 0, sm: '50%' },
            borderRadius: { xs: '30px 30px 0 0', sm: '0 30px 30px 0' },
            boxSizing: 'border-box', padding: '10px'
        }}
        >
            <IconHolder onClick={handleProfileClick}
                sx={{
                    bgcolor: window.location.pathname == '/profile' ? 'primary.main' : 'transparent',
                    color: window.location.pathname == '/profile' ? 'white' : 'primary.text',
                    boxShadow: window.location.pathname == '/profile' && (localStorage.getItem('theme') == 'light' ? '0px 0px 6px 1px rgba(0, 0, 0, 0.25) !important' : '0px 0px 4px 1px rgba(0, 0, 0, 0.30) !important'),
                }}>
                <Profile cursor='pointer' size='20px' />
            </IconHolder>
            <IconHolder onClick={() => navigate('/gallery')}
                sx={{
                    bgcolor: window.location.pathname == '/gallery' ? 'primary.main' : 'transparent',
                    color: window.location.pathname == '/gallery' ? 'white' : 'primary.text',
                    boxShadow: window.location.pathname == '/gallery' && (localStorage.getItem('theme') == 'light' ? '0px 0px 6px 1px rgba(0, 0, 0, 0.25) !important' : '0px 0px 4px 1px rgba(0, 0, 0, 0.30) !important'),

                }}>
                <CenterFocusStrong cursor='pointer' fontSize='20px' />
            </IconHolder>
            <IconHolder onClick={handleWalletClick}
                sx={{
                    bgcolor: window.location.pathname == '/wallet' ? 'primary.main' : 'transparent',
                    color: window.location.pathname == '/wallet' ? 'white' : 'primary.text',
                    boxShadow: window.location.pathname == '/wallet' && (localStorage.getItem('theme') == 'light' ? '0px 0px 6px 1px rgba(0, 0, 0, 0.25) !important' : '0px 0px 4px 1px rgba(0, 0, 0, 0.30) !important'),

                }}>
                <Wallet2 cursor='pointer' size='20px' />
            </IconHolder>


            {/* // verify phone modal ====> */}

            <VerifyPhoneModal openModal={openModal} setOpenModal={setOpenModal} />

        </BarStyle >
    );
}

export default Bar;