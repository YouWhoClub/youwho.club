import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const Foot = styled(Box)(({ theme }) => ({
    height: '220px',borderRadius:'24px',
    background: theme.palette.primary.main,
    color: theme.palette.primary.text,
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',margin:1
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