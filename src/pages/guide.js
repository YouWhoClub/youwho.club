import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))

const GuidePage = ({ switchTheme, theme }) => {
    return (<>
    </>);
}

export default GuidePage;