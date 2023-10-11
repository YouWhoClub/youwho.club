import styled from "@emotion/styled";
import { Box } from "@mui/material";
const Wrapper = styled(Box)(({ theme }) => ({
    // height: 'calc(100vh - 55px)',
    height: '100vh',
    background: theme.palette.primary.bgGradient,
    // background: theme.palette.primary.bgGradient,
    // pb: '50px',
    // pt: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))
const Intro = ({ theme }) => {
    return (
        <Wrapper>
            <Box sx={{
                // height: 'calc(100vh - 100px)',
                height: '80%',
                width: '80%',
                backgroundImage: theme == 'dark' ? "url('/w-outline.svg')" : "url('/p-outline.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
            }}>
            </Box>
        </Wrapper>

    );
}

export default Intro;