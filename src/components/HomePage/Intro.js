import { Box } from "@mui/material";

const Intro = () => {
    return (
        <Box sx={{
            height: 'calc(100vh - 55px)',
            bgcolor: 'primary.dark',
            // pb: '50px',
            // pt: '100px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>

            <Box sx={{
                // height: 'calc(100vh - 100px)',
                height: '90%',
                width: '90%',
                backgroundImage: "url('/w-outline.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
            }}>

            </Box>
        </Box>

    );
}

export default Intro;