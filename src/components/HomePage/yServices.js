import transferImg from '../../assets/exchangeLogo.svg'
import marketImg from '../../assets/marketLogo.svg'
import walletImg from '../../assets/walletLogo.svg'
import transferImgLight from '../../assets/transferLight.svg'
import marketImgLight from '../../assets/galleryLight.svg'
import walletImgLight from '../../assets/walletLight.svg'
import transferImgDark from '../../assets/transferDark.svg'
import marketImgDark from '../../assets/galleryDark.svg'
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
                            link={'/transfer'} image={theme == 'light' ? transferImgDark : transferImgLight} title={'Gift NFT'} content={'gift your nft artworks to your beloved ones by minting them with in-app tokens'} />
                        <NavigateCardTwo link={'/main-gallery'} image={theme == 'light' ? marketImgDark : marketImgLight} title={'NFT Gallery'} content={'trade and advertise on your nfts from any marketplace'} />
                        <NavigateCardTwo link={'/wallet'} image={theme == 'light' ? walletImgDark : walletImgLight} title={'Wallet'} content={'make your YouWho wallet to use our unique features'} />
                    </Box>
                </PurpleBox>
            </Box>
        </Wrapper>
    );
}

export default YWServices;