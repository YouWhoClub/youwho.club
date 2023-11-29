import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import yLogo from '../assets/youwho-white.svg'
import { MyInput } from "./utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import ButtonPurple from "./buttons/buttonPurple";
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

const Footer = () => {
    const [email, setEmail] = useState(undefined)
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()
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
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/dashboard'}>Panel</Link>
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
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/blog'}>Blogs</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/about-us'}>About Us</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/contact-us'}>Contact Us</Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/privacy-policy'}>Privacy Policy</Link>
                        </Box>
                    </Box>
                </Box>
                {globalUser.isLoggedIn ? undefined :
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
        </Box>

    );
}

export default Footer;