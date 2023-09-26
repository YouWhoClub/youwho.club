import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Box sx={{
            height: '100vh', bgcolor: 'primary.middle', color: 'primary.main',
            //  mt: 10,
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            <Link>About Us</Link>
            <Link>Contact Us</Link>
        </Box>
    );
}

export default Footer;