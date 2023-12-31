import { Home } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgDots from '../assets/bgDots.svg'
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1440px',
  position: 'relative',
  margin: '0 auto',
  "@media (max-width: 1440px)": {
    width: '100%',
  },
}))

const NotFound = ({ theme, switchTheme }) => {
  return (

    <Box sx={{
      height: '100vh', bgcolor: 'primary.bg',
      display: 'flex', alignItems: 'center', flexDirection: "column"
    }}>
      <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
      <Box
        sx={{
          height: 'calc(100vh - 55px)', width: '100%',
          color: 'primary.text',
          // backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
          display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: "column"
        }}>
        The Page You Are Looking For Was Not Found
        <Link to={'/'} style={{ color: '#C6BAC5', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          Back To Home <Home fontSize="18px" />
        </Link>
      </Box>
    </Box >
  );
}

export default NotFound;