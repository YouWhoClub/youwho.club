import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'
import styled from "@emotion/styled";

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))

const Weblog = ({ switchTheme, theme }) => {
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg', gap: { xs: '50px', md: '100px' }
                }}>
                    <Box sx={{
                        width: '100%',
                        height: { xs: '250px', md: '452px' },
                        backgroundImage: BG_URL(PUBLIC_URL(`${bgimg}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                        display: 'flex', alignItems: 'end', justifyContent: 'end',
                        boxSizing: 'border-box', pb: { xs: '20px', sm: '80px' }, pr: { xs: '40px', sm: '100px' }
                    }}>
                        <Typography variant="h1"
                            sx={{
                                textTransform: 'capitalize',
                                color: 'primary.text', fontWeight: 400, fontSize: { xs: '30px', sm: '40px', md: '96px' }
                            }}>
                            Weblogs
                        </Typography>

                    </Box>
                    <Footer />
                </Box>
            </Wrapper>
        </Box >
    );
}

export default Weblog;



