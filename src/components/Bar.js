import { Box, SvgIcon } from "@mui/material";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { HambergerMenu, Profile, Wallet } from "iconsax-react";
import { CenterFocusStrong, LogoutOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutUser } from "../redux/actions";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
const Bar = () => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    function disconnect() {
        logOut()
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: { xs: '50px', sm: '50%' },
            bgcolor: 'secondary.bg',
            backdropFilter: 'blur(10px)',
            boxShadow: {
                xs: '0px -2px 9px -2px rgba(227,209,231,0.9)', sm: '0px 0px 9px -2px rgba(227,209,231,0.9)'
            },
            width: {
                xs: '100%', sm: '75px'
            },
            // px: 4,
            position: "absolute",
            left: { xs: 'unset', sm: 0 },
            bottom: { xs: 0, sm: '25%' },
            borderRadius: { xs: '30px 30px 0 0', sm: '0 30px 30px 0' },
            zIndex: 999,
            color: 'primary.text'
        }}
        >
            <IconHolder onClick={() => navigate('/dashboard')} sx={{ bgcolor: window.location.pathname == '/dashboard' ? 'primary.main' : 'transparent', color: window.location.pathname == '/dashboard' ? 'white' : 'primary.text' }}>
                <Profile cursor='pointer' />
            </IconHolder>
            <IconHolder onClick={() => navigate('/gallery')} sx={{ bgcolor: window.location.pathname == '/gallery' ? 'primary.main' : 'transparent', color: window.location.pathname == '/gallery' ? 'white' : 'primary.text' }}>
                <CenterFocusStrong cursor='pointer' />
            </IconHolder>
            <IconHolder onClick={() => navigate('/wallet')} sx={{ bgcolor: window.location.pathname == '/wallet' ? 'primary.main' : 'transparent', color: window.location.pathname == '/wallet' ? 'white' : 'primary.text' }}>
                <Wallet cursor='pointer' />
            </IconHolder>
        </Box >
    );
}

export default Bar;