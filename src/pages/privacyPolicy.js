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


const PrivacyPolicy = ({ switchTheme, theme }) => {
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
                            Privacy Policy
                        </Typography>
                    </Box>
                    <Typography sx={{
                        color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter', textTransform: 'capitalize'
                    }}>
                        We at YouWho are committed to preserving the privacy of our users. This text explains how, through privacy policies, we describe the use of the information you provide us while using our site.
                        <br />
                        <b>
                            Information We Collect
                        </b>
                        <br />
                        We may collect various types of personal information from our users, including:
                        <br />
                        Personal identification information such as name, email address, phone number, postal address, and payment information.
                        <br />
                        Demographic information such as age, gender, and geographical residence.
                        <br />
                        Website usage information, including visited pages and activities performed.
                        <br />
                        Technical information such as browser type, operating system, and your IP address.
                        <br />
                        <b>
                            How We Use Personal Information:
                        </b>
                        <br />
                        We use your information to provide our services, enhance your user experience, and communicate with you. Specifically, we may use your information for:
                        <br />
                        Processing your orders
                        <br />
                        Responding to your questions and requests
                        <br />
                        Sending marketing emails and updates
                        <br />
                        Personalizing your user experience
                        <br />
                        Improving our products and services
                        <br />
                        Sharing Personal Information:
                        <br />
                        We may share users' personal information with third parties in the following cases:
                        <br />
                        Service providers necessary for offering specific services to the company or its users, such as payment processors.
                        <br />
                        Third parties with user consent, such as marketing service providers and data analytics companies.
                        <br />
                        In response to legal requests from government authorities.
                        <br />
                        <b>
                            Data Quality:
                        </b>
                        <br />
                        We strive to keep your information accurate and up-to-date. If your information changes, please inform us so we can update it.
                        <br />
                        <b>
                            User Rights:
                        </b>
                        <br />
                        We respect users' rights to access, modify, or delete their personal information upon request. Users can also request the company to refrain from collecting or using their personal information.
                        <br />
                        <b>
                            Protection of Personal Information:
                        </b>
                        <br />
                        We employ necessary security measures to protect user personal information from unauthorized access, improper use, disclosure, alteration, or destruction. These measures include encrypted technologies during data transmission, secure data storage environments, and access controls.
                        <br />
                        <b>
                            Changes to Privacy Policies:
                        </b>
                        <br />
                        We may change and update privacy policies as needed. We assure you that any changes will be published on this page.
                        <br />
                        <b>
                            Contact Us:
                        </b>
                        <br />
                        If you have any questions or concerns about our privacy policy, please contact us.
                        <br />
                        Contact Information:
                        <br />
                        Company Website: <b>www.youwho.club</b>
                        <br />
                        Email Address:
                        <br />
                        Phone Number:<b>+443333390905</b>


                    </Typography>
                    <Footer />
                </Box>
            </Wrapper>

        </Box >);
}

export default PrivacyPolicy;