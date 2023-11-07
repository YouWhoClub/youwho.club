import { Box, Typography } from "@mui/material";
import benfitsPic from '../../assets/complimentPhotos.svg'
import benefitsLight from '../../assets/FEATURESWH.svg'
import benefitsDark from '../../assets/FEATURESDRK.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import styled from "@emotion/styled";

const Section = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.landBG,
    display: 'flex', alignItems: 'center',
}))

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))

const FABSection = ({ theme }) => {

    return (
        <Section
            sx={{
                mt: 10,
            }}>
            <Wrapper>
                <Box sx={{ px: { xs: 0, md: '60px' } }}>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        p: { xs: '50px 10px 200px 10px', md: '100px 89px' },
                        justifyContent: { xs: 'center', md: 'space-between' },
                        flexDirection: { xs: 'column-reverse', md: 'row' }
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{
                                color: 'primary.text', mb: '18px', display: { xs: 'none', md: 'block' },
                                fontWeight: 500, fontSize: { xs: '30px', sm: '30px', md: '32px' }, textAlign: { xs: 'center', md: 'start' }
                            }}>Features and Benefits</Typography>
                            <Typography variant="p" sx={{
                                color: 'primary.text', margin: 0, mb: { xs: '22px', md: '42px' },
                                fontSize: { xs: '18px', sm: '18px', md: '22px' }, fontWeight: 400, textAlign: { xs: 'center', md: 'start' }
                            }}>A Life Magic For You</Typography>
                            <Typography variant="p"
                                sx={{
                                    color: 'primary.text', margin: 0,
                                    fontSize: { xs: '14px', sm: '14px', md: '16px' }, fontFamily: 'Inter', textAlign: 'justify'
                                }}>YouWho is a NFT market place with
                                new unique features.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: { xs: '250px', sm: '550px' }, height: { xs: '250px', sm: '450px' },
                                backgroundImage: theme == 'light' ? BG_URL(PUBLIC_URL(`${benefitsDark}`)) : BG_URL(PUBLIC_URL(`${benefitsLight}`)), backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain', my: { xs: 4, md: 0 }
                            }}>
                        </Box>
                        <Typography variant="h6" sx={{
                            color: 'primary.text', margin: 0, display: { xs: 'block', md: 'none' },
                            fontWeight: 500, fontSize: { xs: '30px', sm: '30px', md: '32px' }, textAlign: { xs: 'center', md: 'start' }
                        }}>Features and Benefits</Typography>
                    </Box>
                </Box>
            </Wrapper>
        </Section>
    );
}

export default FABSection;