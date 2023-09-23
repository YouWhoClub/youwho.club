import { Box } from "@mui/material";
import Bar from "../components/Bar";
import PanelLayout from "../components/PanelLayout";

const MainGallery = ({ switchTheme }) => {
    return (
        <PanelLayout switchTheme={switchTheme}>

            <Box sx={{
                bgcolor: 'primary.bg',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: 'calc(100% - 80px)' },color:'primary.text'
            }}>
                <div>main gallery</div>
            </Box>
        </PanelLayout>

    );
}

export default MainGallery;