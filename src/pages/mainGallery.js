import { Box } from "@mui/material";
import Bar from "../components/Bar";

const MainGallery = () => {
    return (
        <Box sx={{
            height: '100vh',
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div>hello</div>
            <Bar />
        </Box>

    );
}

export default MainGallery;