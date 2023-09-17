import { Box, SvgIcon } from "@mui/material";
import ButtonOutline from "./buttons/buttonOutline";
import ButtonPurple from "./buttons/buttonPurple";
import { HambergerMenu, Profile } from "iconsax-react";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutUser } from "../redux/actions";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


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
            flexDirection:'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '50%',
            bgcolor: 'primary.ultra',
            width: '75px',
            // px: 4,
            position: "fixed",
            left: 0,
            borderRadius: '0 30px 30px 0',
            zIndex: 999,
        }}
        >
        </Box>
    );
}

export default Bar;