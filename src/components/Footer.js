import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Foot = styled(Box)(({ theme }) => ({
    height: '220px', borderRadius: '24px',width: '100%',
    background: theme.palette.primary.footer,
    color: theme.palette.primary.text,
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 1
}))
const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'
            }}>
            <Foot sx={{
            }}>
                <Link>About Us</Link>
                <Link>Contact Us</Link>
            </Foot>
            <Typography sx={{ textAlign: 'center', color: 'primary.text' }}>Copyright © 2023 Youhwo.club. All Rights Reserved.</Typography>
        </Box>

    );
}

export default Footer;