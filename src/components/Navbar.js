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
    width: '80px',
    height: '80px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/p-outline.svg')",
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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 100,
            bgcolor: 'primary.ultra',
            width: '100%',
            // px: 4,
            py: { xs: 4, sm: 0 },
            position: "fixed",
            top: 0,
            borderRadius: '0 0 30px 30px',
            zIndex: 999,
            // flexDirection: { xs: 'column-reverse', sm: 'row' }
            // '&:hover': {
            //     backgroundColor: 'primary.dark',
            //     opacity: [0.9, 0.8, 0.7],
            // },
        }}
        >
            {window.location.pathname == '/' ?
                <YouWhoIconPurple />
                : <YouWhoIcon onClick={() => navigate('/')} />}

        </Box>
    );
}

export default Navbar;