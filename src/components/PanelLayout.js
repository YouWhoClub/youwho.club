import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Bar from "./Bar";

const PanelLayout = ({ switchTheme, children }) => {
    return (<Box sx={{
        height:'100vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            // display: 'none',
            width: '8px',
            background: 'white',
            border: '0.5px solid #846894',
            borderRadius: '20px !important'
        },
        '&::-webkit-scrollbar-thumb': {
            width: '8px',
            height: '8px',
            background: '#846894',
            border: '0.5px solid #846894',
            borderRadius: '20px !important'
        },
        '&::-webkit-scrollbar-button': {
            width: '3px',
            height: '3px',
            background: '#846894',
            border: '0.5px solid #C6BAC5',
            borderRadius: '50% !important'

        },

        // height: '100vh',
        // margin:'0 auto',
        bgcolor: 'primary.bg',
        // display: 'flex',
        // // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
    }}>
        <Navbar switchTheme={switchTheme} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'start', sm: 'end' }, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Bar />
            {children}
        </Box>
    </Box>);
}

export default PanelLayout;