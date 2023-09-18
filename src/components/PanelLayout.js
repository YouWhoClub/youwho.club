import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Bar from "./Bar";

const PanelLayout = ({ switchTheme, children }) => {
    return (<Box sx={{
        // height: '100vh',
        width:{xs:'100%',xl:'1440px'},
        margin:'0 auto',
        bgcolor: 'primary.bg',
        // display: 'flex',
        // // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
    }}>
        <Navbar switchTheme={switchTheme} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: {xs:'start',sm:'end'}, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Bar />
            {children}
        </Box>
    </Box>);
}

export default PanelLayout;