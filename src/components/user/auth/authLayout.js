import styled from "@emotion/styled";
import { Box, keyframes } from "@mui/material";
import { useNavigate } from "react-router";

const YouWhoIcon = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  backgroundImage: "url('/w-outline-animated.svg')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '60px',
  height: '60px',
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
      bgcolor: 'primary.ultra',
      display: "flex", justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      {/* <NavAuth sx={{ pt: { xs: 'none', sm: 5 } }}> */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '16px',
        mb: '32px',

      }}>
        <YouWhoIcon onClick={() => navigate('/')} sx={{}} />
      </Box>
      {/* </NavAuth> */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: 'calc(100vh - 108px)', sm: 'auto' },
        width: '100%',
      }}>
        {children}
      </Box>
    </Box >
  </>);
}

export default AuthLayout;