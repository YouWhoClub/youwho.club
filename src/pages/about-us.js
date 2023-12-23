import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'

const AboutUs = ({ switchTheme, theme }) => {
    return (<Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
    }}>
        <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
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
                    About us
                </Typography>
            </Box>
            <Typography sx={{
                color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter', textTransform: 'capitalize'
            }}>
                An About Us page isn't just where you share the story of your brand. It's also where you tell your customer what you do for them and how you work to meet their needs in that area. It isn't so much “Here's what we're about,” but more like “Here's who we are, why we started, and what we can do for you.”
                An About Us page isn't just where you share the story of your brand. It's also where you tell your customer what you do for them and how you work to meet their needs in that area. It isn't so much “Here's what we're about,” but more like “Here's who we are, why we started, and what we can do for you.”
                An About Us page isn't just where you share the story of your brand. It's also where you tell your customer what you do for them and how you work to meet their needs in that area. It isn't so much “Here's what we're about,” but more like “Here's who we are, why we started, and what we can do for you.”
                An About Us page isn't just where you share the story of your brand. It's also where you tell your customer what you do for them and how you work to meet their needs in that area. It isn't so much “Here's what we're about,” but more like “Here's who we are, why we started, and what we can do for you.”
                An About Us page isn't just where you share the story of your brand. It's also where you tell your customer what you do for them and how you work to meet their needs in that area. It isn't so much “Here's what we're about,” but more like “Here's who we are, why we started, and what we can do for you.”
            </Typography>
            <Footer />
        </Box>
    </Box >
    );
}

export default AboutUs;