import { Box, Modal, SvgIcon } from "@mui/material";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { HambergerMenu, Location, Mobile, Profile, Wallet } from "iconsax-react";
import { CenterFocusStrong, Close, LogoutOutlined } from "@mui/icons-material";
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
    border: '0.5px solid',
    borderRadius: '50%', cursor: 'pointer',
    width: '40px', height: '40px',
    '&:hover': {
        backgroundColor: theme.palette.primary.light, color: 'whitesmoke'
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
    boxShadow: theme.palette.primary.boxShadow,
    position: "absolute",
    zIndex: 999,
    color: theme.palette.primary.text
}))

const Bar = () => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const [openModal, setOpenModal] = useState(false)
    const [selectValue, setSelectValue] = useState('Location')
    const handleSelect = (e) => {
        e.preventDefault()
        setSelectValue(e.target.id)
    }

    const handleWalletClick = () => {
        if (globalUser.isPhoneVerified) {
            navigate('/wallet')
        } else {
            setOpenModal(true)
        }
    }
    function disconnect() {
        logOut()
    }
    return (
        <BarStyle sx={{
            flexDirection: { xs: 'row', sm: 'column' },
            height: { xs: '50px', sm: '50%' },
            width: {
                xs: '100%', sm: '75px'
            },
            left: { xs: 'unset', sm: 0 },
            bottom: { xs: 0, sm: '25%' },
            borderRadius: { xs: '30px 30px 0 0', sm: '0 30px 30px 0' },
        }}
        >
            <IconHolder onClick={() => navigate('/dashboard')} sx={{ bgcolor: window.location.pathname == '/dashboard' ? 'primary.main' : 'transparent', color: window.location.pathname == '/dashboard' ? 'white' : 'primary.text' }}>
                <Profile cursor='pointer' />
            </IconHolder>
            <IconHolder onClick={() => navigate('/gallery')} sx={{ bgcolor: window.location.pathname == '/gallery' ? 'primary.main' : 'transparent', color: window.location.pathname == '/gallery' ? 'white' : 'primary.text' }}>
                <CenterFocusStrong cursor='pointer' />
            </IconHolder>
            <IconHolder onClick={handleWalletClick} sx={{ bgcolor: window.location.pathname == '/wallet' ? 'primary.main' : 'transparent', color: window.location.pathname == '/wallet' ? 'white' : 'primary.text' }}>
                <Wallet cursor='pointer' />
            </IconHolder>


            {/* // verify phone modal ====> */}

            <VerifyPhoneModal openModal={openModal} setOpenModal={setOpenModal} />

        </BarStyle>
    );
}

export default Bar;