import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonPurple from "../buttons/buttonPurple";
import yCoin from "../../assets/Ycoin.svg"
import twoTokens from "../../assets/twoTokens.svg"
import { ArrowDown, ArrowDown2, ArrowRight, ArrowUp2 } from "iconsax-react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ArrowForward } from "@mui/icons-material";
import { shorten } from "../utils";
import { useState } from "react";

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const DecorSection = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [expandText, setExpandText] = useState(false)
    const navigate = useNavigate()
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
                        }}>Have you ever thought that with NFTs, you could earn even more than you spend?</Typography>
                        <Typography variant="p" sx={{
                            color: 'primary.text', textAlign: 'justify', letterSpacing: '0.05px', fontFamily: "Inter",
                            margin: 0, mb: { xs: '50px', md: '36px' }, lineHeight: '25px',
                            fontSize: { xs: '14px', sm: '16px', }, fontWeight: 400, textTransform: 'capitalize'
                        }}>
                            {expandText ?
                                <>
                                    NFTs open up a whole new world of possibilities that could change your life. With NFTs, you can:
                                    <br />
                                    Collect unique digital artworks that become more valuable over time.
                                    <br />
                                    Access digital music and videos that are only available to NFT holders.
                                    <br />
                                    Participate in NFT-based games and earn rewards that can be exchanged for cryptocurrencies or other assets.
                                    <br />
                                    With <b>YouWho</b>, you can maximize your opportunities. you also can:
                                    <br />
                                    Invest in a wide variety of NFTs from artists and creators around the world.
                                    <br />
                                    Connect with other NFT enthusiasts in an active online community.
                                    <br />
                                    Use your NFTs to generate income and access exclusive benefits.
                                    <br />
                                    And that's just the tip of the iceberg.
                                    <br />
                                    So sign up today and take the first step to becoming a part of the future of art and entertainment.
                                    <Box sx={{ mt: '2px', display: 'flex', alignItems: 'center', fontSize: '12px', color: 'primary.gray', width: '100%', justifyContent: 'end', cursor: 'pointer', }}
                                        onClick={() => setExpandText(false)}>
                                        <Typography sx={{ fontSize: '12px', color: 'primary.gray' }}>
                                            Read Less
                                        </Typography>
                                        <ArrowUp2 size={'14px'} />
                                    </Box>
                                </>
                                :
                                <>
                                    NFTs open up a whole new world of possibilities that could change your life. With NFTs, you can:
                                    <br />
                                    Collect unique digital artworks that become more valuable over time.
                                    <br />
                                    Access digital music and videos that are only available to NFT holders.
                                    <br />
                                    Participate in NFT-based games and earn rewards that can be exchanged for cryptocurrencies or other assets.
                                    <br />
                                    <Box sx={{ mt: '2px', display: 'flex', alignItems: 'center', fontSize: '12px', color: 'primary.gray', width: '100%', justifyContent: 'end', cursor: 'pointer', }}
                                        onClick={() => setExpandText(true)}>
                                        <Typography sx={{ fontSize: '12px', color: 'primary.gray' }}>
                                            Read More
                                        </Typography>
                                        <ArrowDown2 size={'14px'} />
                                    </Box>
                                </>
                            }
                        </Typography>
                        <Box sx={{ alignSelf: { xs: 'center', md: 'end' } }}>
                            <ButtonPurple text={`Join Now`}
                                nextIcon={<ArrowForward sx={{ fontSize: '18px' }} />}
                                onClick={globalUser.isLoggedIn ? () => navigate('/gallery') : () => navigate('/auth#signup')} icon={<ArrowRight size='18px' />} w={'max-content'} px={'70px'} />
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