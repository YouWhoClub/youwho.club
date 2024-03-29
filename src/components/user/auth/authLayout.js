import styled from "@emotion/styled";
import { Box, keyframes } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const YouWhoIcon = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  backgroundImage: "url('/w-outline-animated.svg')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '90px',
  height: '90px',
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
  const globalUser = useSelector(state => state.userReducer)
  const navigate = useNavigate()
  return (
    <Box sx={{
      textTransform: 'capitalize',
      height: '100vh',
      position: 'relative',
      bgcolor: 'primary.ultra',
      display: "flex", justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column', overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': { display: 'none', },
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
      {!globalUser.isLoggedIn || !globalUser.isMailVerified ?

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // height: { xs: 'calc(100vh - 138px)', sm: 'auto' },
          height: 'calc(100vh - 138px)',
          width: '100%',
        }}>
          {children}
        </Box>
        : undefined}
    </Box >
  );
}

export default AuthLayout;