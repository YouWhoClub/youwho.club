import styled from "@emotion/styled";
import { Box } from "@mui/material";

const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/w-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '80px',
    height: '80px'
}))

const NavAuth = styled(Box)(({ theme }) => ({
    height: '100px',
    backgroundColor: theme.palette.primary.light,
    position: 'absolute',
    top: 0,
    width:'100%',
    borderRadius: '0 0 30px 30px',
    zIndex: 999,
    display:'flex',
    // display: { xs: 'flex', sm: 'none' },
    justifyContent: 'center',
    alignItems: 'center',
    "@media (max-width: 600px)": {
        height: '140px',
    },

}))
const AuthLayout = ({ children }) => {
    return (<>
        <Box sx={{
            height: '100vh',
            position: 'relative',
            bgcolor: 'primary.light',
            display: "flex", justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <NavAuth><YouWhoIcon /></NavAuth>
            {children}
        </Box>
    </>);
}

export default AuthLayout;