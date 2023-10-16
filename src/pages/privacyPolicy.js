import { Home } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgDots from '../assets/bgDots.svg'
import NavbarTwo from "../components/NavbarRadius";
import styled from "@emotion/styled";

const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text, textAlign: 'center'
}))
const P = styled('p')(({ theme }) => ({
    color: theme.palette.secondary.text, textAlign: 'center', fontSize: '14px',
}))


const PrivacyPolicy = ({ switchTheme, theme }) => {
    return (
        <Box sx={{
            height: '100vh', bgcolor: 'primary.bg',
            display: 'flex', alignItems: 'center', flexDirection: "column"
        }}>
            <NavbarTwo theme={theme} switchTheme={switchTheme} />
            <Box
                sx={{
                    height: 'calc(100vh - 55px)', width: '100%',
                    color: 'primary.text',
                    backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', flexDirection: "column"
                }}>
                <Title>Privacy Policy</Title>
                <P>
                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </P>
            </Box>
        </Box>
    );
}

export default PrivacyPolicy;