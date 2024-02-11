import transferImg from '../../assets/exchangeLogo.svg'
import marketImg from '../../assets/marketLogo.svg'
import walletImg from '../../assets/walletLogo.svg'
import transferImgLight from '../../assets/transferLight.svg'
import marketImgLight from '../../assets/galleryLight.svg'
import transferImgDark from '../../assets/transferDark.svg'
import marketImgDark from '../../assets/galleryDark.svg'
import walletImgLight from '../../assets/walletLight.svg'
import walletImgDark from '../../assets/walletDark.svg'
import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import NavigateCardTwo from './navigateCardTwo';
import styled from '@emotion/styled';

const PurpleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    padding: '90px 0px',
    background: theme.palette.primary.grad,
    gap: '70px'
}))
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))

const YWServices = ({ theme }) => {
    return (
        <Wrapper sx={{

        }}>
            <Box sx={{
                px: {
                    xs: '0',
                    //  sm: '30px',
                    md: '60px'
                },
            }}>
                <PurpleBox sx={{
                    borderRadius: { xs: '100px 0', md: '25px' },
                }}>
                    <Typography variant="h6"
                        sx={{
                            margin: 0,
                            fontSize: { xs: '30px', sm: '36px' }, fontWeight: 500, color: 'white'
                        }}>YouWho Services</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '50px',
                    }}>
                        <NavigateCardTwo
                            link={'/transfer'} image={theme == 'light' ? transferImgDark : transferImgLight} title={'Gift NFT'}
                            content={'Our transfer gift card service allows you to convert your gift cards to NFTs. This is a great way to turn unused gift cards into valuable digital assets.'} />
                        <NavigateCardTwo link={'/main-gallery'} image={theme == 'light' ? marketImgDark : marketImgLight} title={'NFT Gallery'}
                            content={'With our NFT marketplace, you can discover new NFTs and sell your existing NFTs. We offer a wide variety of NFTs from artists and creators around the world.'} />
                        <NavigateCardTwo link={'/wallet'} image={theme == 'light' ? walletImgDark : walletImgLight} title={'Wallet'}
                            content={'NFT wallet in YouWho, allows you to securely store your NFTs. It also allows you to send and receive NFTs so easily.'} />
                    </Box>
                </PurpleBox>
            </Box>
        </Wrapper>
    );
}

export default YWServices;