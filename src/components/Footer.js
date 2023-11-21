import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import yLogo from '../assets/youwho-white.svg'
const Foot = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: '24px',
    background: theme.palette.primary.dark,
    color: theme.palette.primary.text,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
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
    backgroundPosition: 'start',backgroundSize:'contain',
    width: '50px',
    height: '50px'
}))

const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'
            }}>
            <Foot sx={{
                height: { xs: 'auto', sm: '350px' },
            }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' }, width: '100%',
                    px: { xs: '0', sm: '30px', md: '60px' }, py: '60px'
                }}>
                    <Box
                        sx={{
                            display: 'flex', flexDirection: 'column',
                            // width: { xs: '100%', sm: '50%' },
                        }}>
                        <YouWhoIcon sx={{ mb: 5 }} />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Box
                                sx={{
                                    display: 'flex', flexDirection: 'column', mr: 5
                                }}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/auth'}>Auth</Link>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>Home</Link>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex', flexDirection: 'column',
                                }}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/blog'}>Blogs</Link>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/about-us'}>About Us</Link>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/contact-us'}>Contact Us</Link>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/privacy-policy'}>Privacy Policy</Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Foot>
            <Typography sx={{ textAlign: 'center', color: 'primary.text',my:'15px' }}>Copyright © 2023 Youhwo.club. All Rights Reserved.</Typography>
        </Box>

    );
}

export default Footer;