import transferImg from '../../assets/exchangeLogo.svg'
import marketImg from '../../assets/marketLogo.svg'
import walletImg from '../../assets/walletLogo.svg'
import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import NavigateCard from '../HomePagePrev/navigateCard';
import NavigateCardTwo from './navigateCardTwo';

const YWServices = () => {
    return (
        <Box sx={{ px: { xs: '30px', sm: '60px' } }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '90px 0px',
                borderRadius: { xs: '100px 0', sm: '25px' },
                background: 'linear-gradient(259deg, rgba(61, 0, 98, 0.70) 0%, rgba(0, 0, 0, 0.00) 100%), #C182ED',
            }}>
                <Typography variant="h6" sx={{ margin: 0, mb: 4, fontWeight: 500, color: 'white' }}>YouWho Services</Typography>
                <Box sx={{
                    display: 'flex', flexWrap: 'wrap',
                    //  flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <NavigateCardTwo link={'/transfer'} image={transferImg} title={'Transfer'} content={'transfer money by minting nft from any part of the world to any other'} />
                    <NavigateCardTwo link={'/gallery'} image={marketImg} title={'NFT Gallery'} content={'trade and advertise on your nfts from any marketplace'} />
                    <NavigateCardTwo link={'/wallet'} image={walletImg} title={'Wallet'} content={'make your youwho wallet to use our unique features'} />
                </Box>
            </Box>
        </Box>);
}

export default YWServices;