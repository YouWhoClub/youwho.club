import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
const Wrapper = styled(Box)(({ theme }) => ({
    height: '100vh',
    background: theme.palette.primary.bg,
    background: theme.palette.secondary.bgGradient,
    // pb: '50px',
    // pt: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))
const Middle = () => {
    return (<Wrapper>
        <Typography sx={{ color: 'primary.text', textAlign: 'center', px: 5 }}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</Typography>
        <Typography sx={{ color: 'primary.text', textAlign: 'center', px: 5 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
    </Wrapper>);
}

export default Middle;
