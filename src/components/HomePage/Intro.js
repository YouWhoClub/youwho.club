import { Box } from "@mui/material";

const Intro = () => {
    return (
        <Box sx={{
            height: 'calc(100vh - 150px)',
            bgcolor: 'primary.dark',
            pb: '50px',
            pt: '100px'
        }}>

            <Box sx={{
                // height: 'calc(100vh - 100px)',
                height: '100%',
                backgroundImage: "url('/w-outline.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
            }}>

            </Box>
        </Box>

    );
}

export default Intro;