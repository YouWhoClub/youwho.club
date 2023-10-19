import styled from "@emotion/styled";
import { Box, keyframes } from "@mui/material";
import { useNavigate } from "react-router";

const YouWhoIcon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  backgroundImage: "url('/w-outline-animated.svg')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '80px',
  height: '80px'
}))

const heightChange = keyframes`
  from {
    height: 100%;
  }
  to{
    height:100px;
  }
`
const heightChangeMob = keyframes`
  from {
    height: 100%;
  }
  to{
    height:140px;
  }
`

const NavAuth = styled(Box)(({ theme }) => ({
  height: '100px',
  // animation: `${heightChange} 1s linear`,
  backgroundColor: theme.palette.primary.light,
  position: 'absolute',
  top: 0,
  width: '100%',
  borderRadius: '0 0 30px 30px',
  zIndex: 999,
  display: 'flex',
  // display: { xs: 'flex', sm: 'none' },
  justifyContent: 'center',
  alignItems: 'center',
  "@media (max-width: 600px)": {
    height: '140px',
    animation: `${heightChangeMob} 1s linear`,
  },

}))
const AuthLayout = ({ children }) => {
  const navigate = useNavigate()
  return (<>
    <Box sx={{
      textTransform: 'capitalize',
      height: '100vh',
      position: 'relative',
      bgcolor: 'primary.light',
      display: "flex", justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <NavAuth><YouWhoIcon onClick={() => navigate('/')} /></NavAuth>
      {children}
    </Box>
  </>);
}

export default AuthLayout;