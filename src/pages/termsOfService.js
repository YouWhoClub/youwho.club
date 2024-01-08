import bgDots from '../assets/bgDots.svg'
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/xtrPageBanner.svg'

const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text, textAlign: 'center'
}))
const P = styled('p')(({ theme }) => ({
    color: theme.palette.secondary.text, textAlign: 'center', fontSize: '14px',
}))
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const TermsOfService = ({ switchTheme, theme }) => {
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
                        width: '100%', borderRadius: '24px',
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
                            Terms Of Service
                        </Typography>
                    </Box>
                    <Typography sx={{
                        color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter', textTransform: 'capitalize'
                    }}>

                        <br />Terms of Service for YouWho
                        <br /><br /><b>Introduction</b>
                        <br />YouWho is an online platform that allows users to create, buy, and sell NFTs.
                        <br />By using YouWho, you agree to the following terms of service.
                        <br /><br /><b>Definitions</b>
                        <br />NFT: A unique digital asset that cannot be replaced by another asset of the same type.
                        <br />User: Any person who uses YouWho.
                        <br />Content: Any information that is published on YouWho, including NFTs, profiles, comments, messages, and so on.
                        <br /><br /><b>Intellectual Property Rights</b>
                        <br />All intellectual property rights to YouWho's content belong to YouWho.
                        <br />Users are only authorized to use YouWho's content for legal purposes.
                        <br /><br /><b>Use of Content</b>
                        <br />Users are only authorized to use YouWho's content for legal purposes.
                        <br />Users are not authorized to use YouWho's content for commercial purposes without YouWho's written permission.
                        <br />Users are not authorized to use YouWho's content in a way that infringes on the intellectual property rights of the content owners.
                        <br /><br /><b>User Responsibilities</b>
                        <br />Users are responsible for all activities they perform using YouWho.
                        <br />Users are responsible for the content they publish on YouWho.
                        <br />Users are responsible for any damages that may be caused to YouWho or other users as a result of their use of YouWho.
                        <br /><br /><b>YouWho Rights and Obligations</b>
                        <br />YouWho has the right to remove any content that violates intellectual property rights, laws, or the terms of service.
                        <br />YouWho has the right to block any user accounts that violate intellectual property rights, laws, or the terms of service.
                        <br />YouWho is not responsible for any damages that may be caused to users as a result of their use of YouWho.
                        <br /><br /><b>Changes to the Terms of Service</b>
                        <br />YouWho has the right to change the terms of service at any time.
                        <br />Users are responsible for reviewing any changes to the terms of service.
                        <br /><br /><b>Dispute Resolution</b>
                        <br />In the event of a dispute between YouWho and users, the dispute should first be attempted to be resolved through negotiation.
                        <br />If the dispute cannot be resolved through negotiation, the dispute must be resolved through the courts.
                        <br /><br /><b>Acceptance of the Terms of Service</b>
                        <br />To use the YouWho website and services, you agree to the terms of service.
                    </Typography>
                    <Footer />
                </Box>
            </Wrapper>

        </Box >);
}

export default TermsOfService;