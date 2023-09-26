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
    alignItems: 'center',flexDirection:'column',
}))
const Middle = () => {
    return (<Wrapper sx={{px:5}}>
        <Typography sx={{ color: 'primary.text', textAlign: 'center',  }}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</Typography>
        <Typography sx={{ color: 'primary.text', textAlign: 'center',  }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        </Typography>
    </Wrapper>);
}

export default Middle;
