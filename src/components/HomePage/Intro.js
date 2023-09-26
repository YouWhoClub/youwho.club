import { Box } from "@mui/material";

const Intro = ({ theme }) => {
    return (
        <Box sx={{
            height: 'calc(100vh - 55px)',
            bgcolor: 'primary.bg',
            // background: 'primary.bgGradient',
            // pb: '50px',
            // pt: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Box sx={{
                // height: 'calc(100vh - 100px)',
                height: '90%',
                width: '90%',
                backgroundImage: theme == 'dark' ? "url('/w-outline.svg')" : "url('/p-outline.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
            }}>

            </Box>
        </Box>

    );
}

export default Intro;