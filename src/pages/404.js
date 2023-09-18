import { Home } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: '100vh', bgcolor: 'primary.bg', color: 'primary.light',
        display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: "column"
      }}>
      The Page You Are Looking For Was Not Found
      <Link to={'/'} style={{ color: '#C6BAC5',fontSize:'12px', display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'20px'}}>
        Back To Home <Home fontSize="18px" />
      </Link>
    </Box>
  );
}

export default NotFound;