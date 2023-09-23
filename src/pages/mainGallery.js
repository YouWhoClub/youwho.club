import { Box } from "@mui/material";
import Bar from "../components/Bar";
import PanelLayout from "../components/PanelLayout";

const MainGallery = () => {
    return (
        <PanelLayout>

            <Box sx={{
                // height: '100vh',
                bgcolor: 'primary.bg',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: 'calc(100% - 80px)' },
            }}>
                <div>hello</div>
                <Bar />
            </Box>
        </PanelLayout>

    );
}

export default MainGallery;