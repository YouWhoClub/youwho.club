import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonPurple from "../buttons/buttonPurple";
import yCoin from "../../assets/Ycoin.svg"
import twoTokens from "../../assets/twoTokens.svg"
import { ArrowRight } from "iconsax-react";
import styled from "@emotion/styled";

const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const DecorSection = () => {

    return (
        <Wrapper>
            <Box sx={{ px: { xs: 0, md: '60px' } }}>
                <Box sx={{
                    borderRadius: { xs: '0 100px 0 100px', md: '0px 200px 0px 200px' },
                    width: '100%', height: { xs: 'auto', },
                    bgcolor: 'primary.middle',
                    position: 'relative',
                    display: 'flex', justifyContent: 'end',
                }}>
                    <Box sx={{
                        // height: '100%',
                        width: { xs: '100%', md: '40%', lg: '40%' },
                        padding: { xs: '140px 10px 90px 10px', sm: '140px 30px 90px 30px', md: '90px 90px 90px 0px', lg: '90px 120px 90px 0px' },
                        display: 'flex', flexDirection: 'column', justifyContent: 'end',
                    }}>
                        <Typography variant="h4" sx={{
                            color: 'primary.text', margin: 0, mb: { xs: '50px', md: '26px' },
                            fontWeight: 400, fontSize: { xs: '30px', md: '32px' }, textAlign: { xs: 'center', md: 'start' }
                        }}>Earn, Even More Than Spend ?!</Typography>
                        <Typography variant="h6" sx={{
                            color: 'primary.text', margin: 0, mb: { xs: '50px', md: '42px' },
                            fontWeight: 400, fontSize: { xs: '22px', md: '22px' }, textAlign: { xs: 'center', md: 'justify' }
                        }}>this is a subtitle</Typography>
                        <Typography variant="p" sx={{
                            color: 'primary.text', textAlign: 'justify', fontFamily: "Inter",
                            margin: 0, mb: { xs: '50px', md: '36px' },
                            fontSize: { xs: '14px', sm: '16px', }, fontWeight: 400, textTransform: 'capitalize'
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Typography>
                        <Box sx={{ alignSelf: { xs: 'center', md: 'end' } }}>
                            <ButtonPurple text={`Join Now`} icon={<ArrowRight size='18px' />} w={'max-content'} px={'70px'} />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: { xs: '200px', sm: '270px', md: '380px', lg: '490px' },
                            height: { xs: '180px', sm: '240px', md: '380px', lg: '490px' },
                            backgroundImage: { xs: BG_URL(PUBLIC_URL(`${twoTokens}`)), md: BG_URL(PUBLIC_URL(`${yCoin}`)) },
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            position: 'absolute', borderRadius: { xs: 0, md: '50%' },
                            left: { xs: '10px', sm: '30px', md: '40px' },
                            top: { xs: '-100px', sm: '-150px', md: '-150px' }
                        }}>
                    </Box>
                </Box>
            </Box>
        </Wrapper>
    );
}

export default DecorSection;