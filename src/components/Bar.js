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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 50,
            bgcolor: 'primary.ultra',
            width: '100%',
            // px: 4,
            position: "fixed",
            bottom: 0,
            borderRadius: '30px 30px 0 0',
            zIndex: 999,
            // flexDirection: { xs: 'column-reverse', sm: 'row' }
            // '&:hover': {
            //     backgroundColor: 'primary.dark',
            //     opacity: [0.9, 0.8, 0.7],
            // },
        }}
        >
            <Link style={{ textDecoration: "none", color: 'inherit' }} to={'/'}>
                <HomeIcon sx={{
                    color: 'primary.gray'
                }} />
            </Link>

            <Box sx={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {globalUser.isLoggedIn ?
                    <>
                        <div onClick={() => navigate('/dashboard')}>
                            <Profile style={{
                                color: '#C6BAC5',
                                cursor: "pointer"
                            }} />
                        </div>
                        &nbsp;
                        &nbsp;
                        <div
                            onClick={disconnect}
                        >
                            <LogoutOutlined
                                sx={{
                                    color: 'primary.gray',
                                    cursor: "pointer"
                                }} />
                        </div>

                    </>
                    :
                    <>
                        {window.location.pathname == '/' ?
                            <>

                                <ButtonOutline text={'Sign In'} onClick={() => navigate('/auth')} />
                                &nbsp;
                                &nbsp;
                                <ButtonPurple text={'Get Started'} onClick={() => navigate('/display')} />
                            </> :
                            <div>
                                <HambergerMenu style={{
                                    color: '#C6BAC5',
                                    cursor: "pointer"
                                }} />
                            </div>}
                    </>
                }
            </Box>

        </Box>
    );
}

export default Bar;