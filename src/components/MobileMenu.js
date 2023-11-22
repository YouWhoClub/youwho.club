import styled from "@emotion/styled";
import { Close, LogoutOutlined } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { ArrowRight2, Logout } from "iconsax-react";
import { useNavigate } from "react-router";
import ThemeSwitcher from "./HomePage/themeSwitchComp";
import ButtonPurple from "./buttons/buttonPurple";
import { useDispatch, useSelector } from "react-redux";
import { HEALTH_API } from "../utils/data/health_api";
import { useRef, useState } from "react";
import { logOutUser } from "../redux/actions";


const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.text, boxSizing: 'border-box',
}))
const MenuItem = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px', boxSizing: 'border-box',
    color: theme.palette.primary.text, borderBottom: '1px solid', borderColor: theme.palette.secondary.gray,
    textTransform: 'capitalize'
}))
const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-white.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '30px',
    height: '40px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-purple.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '30px',
    height: '40px'
}))

const MobileMenu = ({ openMenu, setOpenMenu, theme, switchTheme }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const globalUser = useSelector(state => state.userReducer)
    const logOut = () => dispatch(logOutUser());
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(false)

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
        <Modal
            open={openMenu}
            onClose={() => {
                setOpenMenu(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock={true}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                display: { xs: 'flex', sm: 'none' }, boxSizing: 'border-box',
                // padding: '0 15px 20px',
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(10px)', bgcolor: 'secondary.bg'
            }}>
                <FlexRow sx={{ padding: "9px 14px" }}>
                    {theme == 'light' ?
                        <Box sx={{ pl: '10px' }}>
                            <YouWhoIconPurple />
                        </Box>
                        :
                        <Box sx={{ pl: '10px' }}>
                            <YouWhoIcon />
                        </Box>
                    }
                    <Box sx={{ padding: '10px' }}>
                        <Close onClick={() => setOpenMenu(false)} sx={{ cursor: 'pointer', fontSize: '24px' }} />
                    </Box>
                </FlexRow>
                <Box sx={{
                    width: '100%',
                    flexDirection: 'column', display: 'flex', boxSizing: 'border-box',
                    alignItems: 'center', justifyContent: 'center', padding: '15px',
                }}>
                    <MenuItem onClick={() => navigate('/')}>
                        <Typography sx={{ fontSize: '14px' }}>
                            Home
                        </Typography>
                        <ArrowRight2 size='24px' />
                    </MenuItem>
                    {globalUser.isLoggedIn ?
                        <MenuItem onClick={() => navigate('/dashboard')}>
                            <Typography sx={{ fontSize: '14px' }}>
                                Dashboard
                            </Typography>
                            <ArrowRight2 size='24px' />
                        </MenuItem>
                        :
                        <MenuItem onClick={() => navigate('/auth')}>
                            <Typography sx={{ fontSize: '14px' }}>
                                Sign In / Sign Up
                            </Typography>
                            <ArrowRight2 size='24px' />
                        </MenuItem>
                    }
                    <MenuItem onClick={() => navigate('/blogs')}>
                        <Typography sx={{ fontSize: '14px' }}>
                            Blogs
                        </Typography>
                        <ArrowRight2 size='24px' />
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/about-us')}>
                        <Typography sx={{ fontSize: '14px' }}>
                            about us
                        </Typography>
                        <ArrowRight2 size='24px' />
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/contact-us')}>
                        <Typography sx={{ fontSize: '14px' }}>
                            Contat us
                        </Typography>
                        <ArrowRight2 size='24px' />
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/privacy-policy')}>
                        <Typography sx={{ fontSize: '14px' }}>
                            privacy policy
                        </Typography>
                        <ArrowRight2 size='24px' />
                    </MenuItem>
                </Box>

                <FlexRow sx={{ mt: '24px', padding: "0px 14px 20px" }}>
                    <ThemeSwitcher switchTheme={switchTheme} isModalOpen={openMenu} />
                    {globalUser.isLoggedIn ?
                        <ButtonPurple height={'35px'} text={'Logout'} onClick={disconnect} nextIcon={<LogoutOutlined sx={{ fontSize: '14px', color: 'white' }} />} />
                        :
                        <ButtonPurple height={'35px'} text={'Get Started'} onClick={() => navigate('/auth')} /> 
                    }
                </FlexRow>
            </Box>


        </Modal>
    );
}

export default MobileMenu;