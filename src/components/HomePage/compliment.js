import NavigateCard from "./navigateCard";
import transferImg from '../../assets/exchangeLogo.svg'
import marketImg from '../../assets/marketLogo.svg'
import walletImg from '../../assets/walletLogo.svg'
import bgDots from '../../assets/bgDots.svg'
import youwhoIcon from '../../assets/p-outline.svg'
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const Compliment = () => {
    return (<Box sx={{
        // height: '100vh',
        bgcolor: 'primary.bg',
        py: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
    }}>
        <NavigateCard image={youwhoIcon} title={'Fast'} content={'transfer money by minting nft from any part of the world to any other'} />
        <NavigateCard image={youwhoIcon} title={'Safe'} content={'trade and advertise on your nfts from any marketplace'} />
        <NavigateCard image={youwhoIcon} title={'Easy'} content={'make your youwho wallet to use our unique features'} />
    </Box>);
}

export default Compliment;