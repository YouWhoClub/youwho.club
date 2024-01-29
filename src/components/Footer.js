import styled from "@emotion/styled";
import { Box, Modal, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import yLogo from '../assets/youwho-white.svg'
import { MyInput } from "./utils";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPurple from "./buttons/buttonPurple";
import { deleteUnclaimedDeposit, logOutUser, setPrivateKey, setRefreshToken } from "../redux/actions";
import { HEALTH_API } from "../utils/data/health_api";
import { Close } from "@mui/icons-material";
import { TickSquare } from "iconsax-react";
const Foot = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: '24px',
    background: theme.palette.primary.footer,
    color: theme.palette.primary.text, boxSizing: 'border-box',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
}))
const AuthBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '15px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
}))
const YouWhoHugCoinPurple = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-hugcoin.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'start',
    width: '50px',
    height: '50px',
}))
const YouWhoIcon = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-white.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'start', backgroundSize: 'contain',
    width: '50px',
    height: '50px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',

}))

const Footer = () => {
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const setpvkey = () => dispatch(setPrivateKey());
    const [openPVKeyModal, setOpenPVKeyModal] = useState(false)
    const [logoutTimer, setLogoutTimer] = useState(10)
    const deleteUnclaimed = () => dispatch(deleteUnclaimedDeposit());
    const refreshUserToken = (refreshToken, tokenExpiration) => dispatch(setRefreshToken(refreshToken, tokenExpiration));
    const [keyCopied, setKeyCopied] = useState(false)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(null)
    const [email, setEmail] = useState(undefined)
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const copyToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setKeyCopied('Copied!');
        } catch (err) {
            setKeyCopied(undefined);
        }
    };

    const checkPVkeyCopyThenDisconnect = () => {
        if (globalUser.privateKey) {
            setOpenPVKeyModal(true)
            // setInterval(() => {
            //     setLogoutTimer(logoutTimer - 1)
            // }, 1000);
            // setTimeout(() => {
            //     disconnect()
            // }, 10000);
        } else {
            disconnect()
        }
    }

    async function disconnect() {
        let pvkey = globalUser.privateKey

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
            localStorage.setItem('pvk', globalUser.privateKey)
            logOut(globalUser.privateKey)
            setOpenPVKeyModal(false)
            // setpvkey(pvkey)
            refreshUserToken('', '')
            deleteUnclaimed()
            // }

        }
        catch (err) {
            logOut(globalUser.privateKey)
            setOpenPVKeyModal(false)
            localStorage.setItem('pvk', globalUser.privateKey)
            // setpvkey(pvkey)
            refreshUserToken('', '')
            deleteUnclaimed()

            setErr(err.statusText)
            console.log(err.statusText)
        }

    }

    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'
            }}>
            <Foot sx={{
                height: { xs: 'auto', md: '350px' }, flexDirection: { xs: 'column-reverse', md: 'row' },
                padding: { xs: '60px 20px', md: '30px 60px' }, gap: { xs: '80px', md: 'auto' }
            }}>
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column', gap: '60px'
                        // width: { xs: '100%', sm: '50%' },
                    }}>
                    <YouWhoIcon />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between', gap: '60px'
                        }}>
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'column', gap: '25px'
                            }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>Home</Link>
                            {globalUser.isLoggedIn ?
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/profile'}>Panel</Link>
                                :
                                <>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/auth#signin'}>Sign In</Link>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/auth#signup'}>ُSign Up</Link>
                                </>}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'column', gap: '25px',
                            }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/blogs'}>Blogs</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/about-us'}>About Us</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/contact-us'}>Contact Us</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/privacy-policy'}>Privacy Policy</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/terms-of-service'}>Terms Of Service</Link>
                        </Box>
                    </Box>
                </Box>
                {globalUser.isLoggedIn ?
                    <AuthBox>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>
                            Sign Out YouWho Account
                        </Typography>
                        <ButtonPurple text={'Logout'}
                            px={'24px'} w={'max-content'} onClick={checkPVkeyCopyThenDisconnect} />
                    </AuthBox>
                    :
                    <AuthBox>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>
                            Sign in/Sign up With Email Address
                        </Typography>
                        <MyInput label={'Email Address'} onChange={(e) => setEmail(e.target.value)}
                            labelColor={'black'}
                            bgcolor={'white'}
                            p={'22px 35px'}
                            width={'100%'} />
                        <ButtonPurple text={'Sign in / Sign Up'} px={'24px'} w={'max-content'} onClick={() => { navigate(`/auth?${email}`) }} />
                    </AuthBox>
                }
            </Foot>
            <Typography sx={{ textAlign: 'center', color: 'primary.text', my: '15px' }}>Copyright © 2023 Youhwo.club. All Rights Reserved.</Typography>


            <Modal
                open={openPVKeyModal}
                onClose={() => {
                    setOpenPVKeyModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                })}>
                    <Box sx={(theme) => ({
                        borderRadius: { xs: '0', sm: '24px' },
                        width: { xs: '100%', sm: 'max-content' }, height: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'secondary.bg', boxShadow: theme.palette.primary.boxShadow, boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        padding: '30px', alignItems: 'center'
                    })}>
                        <FlexRow sx={{ justifyContent: 'end !important', width: '100%' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Close onClick={() => setOpenPVKeyModal(false)}
                                    sx={{ cursor: 'pointer', fontSize: '24px' }} />
                            </Box>
                        </FlexRow>
                        <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                            <Typography
                                sx={{
                                    color: 'primary.text', fontSize: '16px', width: '100%', textAlign: 'center',
                                    textTransform: 'capitalize'
                                }}>
                                Save Private Key
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center',
                                    textTransform: 'capitalize'
                                }}>
                                Please Save Your Private Key Before Logging out.it will be needed for future uses
                            </Typography>
                            <FlexRow>
                                <Typography
                                    onClick={() => copyToClipBoard(globalUser.privateKey)}
                                    sx={{
                                        color: 'secondary.text', fontSize: '12px', width: '100%', textAlign: 'center',
                                        textTransform: 'capitalize', cursor: 'pointer'
                                    }}>
                                    {globalUser.privateKey}
                                </Typography>
                                <TickSquare style={{ display: keyCopied ? 'block' : 'none', color: 'green' }} />
                            </FlexRow>
                            {/* <Typography sx={{ color: 'primary.text' }}>Logging Out In {logoutTimer} Seconds...</Typography> */}
                            <ButtonPurple w={'max-content'} px={'12px'} text={'Log Me Out'} onClick={disconnect} />

                        </FlexColumn>

                    </Box>
                </Box>
            </Modal>

        </Box>

    );
}

export default Footer;