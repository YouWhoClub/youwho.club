import { LogoutOutlined, MenuBook } from "@mui/icons-material";
import { Box } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/actions";
import styled from "@emotion/styled";
import { HambergerMenu, Profile } from "iconsax-react";
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

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const Navbar = () => {
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
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '55px',
            bgcolor: 'transparent',
            // width: '100%',
            // position: "fixed",
            // top: 0,
            // zIndex: 999,
            px:1
        }}
        >
            {window.location.pathname == '/' ?
                <YouWhoIconPurple />
                : <YouWhoIcon onClick={() => navigate('/')} />}

            <ButtonOutline text={'start'} onClick={() => navigate('/auth')} />
        </Box>
    );
}

export default Navbar;