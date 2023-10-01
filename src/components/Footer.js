import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const Foot = styled(Box)(({ theme }) => ({
    height: '100vh',
    background: theme.palette.primary.middle,
    background: theme.palette.primary.bgGradientDown,
    color: theme.palette.primary.text,
    //  mt: 10,
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
}))
const Footer = () => {
    return (
        <Foot sx={{
        }}>
            <Link>About Us</Link>
            <Link>Contact Us</Link>
        </Foot>
    );
}

export default Footer;