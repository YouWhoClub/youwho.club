import NavigateCard from "./navigateCard";
import transferImg from '../../assets/exchangeLogo.svg'
import marketImg from '../../assets/marketLogo.svg'
import walletImg from '../../assets/walletLogo.svg'
import bgDots from '../../assets/bgDots.svg'
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const Navigation = () => {
    return (<Box sx={{
        height: '100vh',
        bgcolor: 'primary.bg',
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap',
        backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
    }}>
        <NavigateCard link={'/transfer'} image={transferImg} title={'Transfer'} content={'transfer money by minting nft from any part of the world to any other'} />
        <NavigateCard link={'/market'} image={marketImg} title={'NFT Market Place'} content={'trade and advertise on your nfts from any marketplace'} />
        <NavigateCard link={'/wallet'} image={walletImg} title={'Wallet'} content={'make your youwho wallet to use our unique features'} />
    </Box>);
}

export default Navigation;