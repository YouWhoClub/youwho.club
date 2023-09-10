import { Box } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{
            height: '100vh', bgcolor: 'primary.middle', color: 'primary.main',
            //  mt: 10,
            display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
        }}>
            footer content
        </Box>
    );
}

export default Footer;