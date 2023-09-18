import { Box } from "@mui/material";
import CustomSlider from "../customSlider";
import GiftCard from "../nft market/giftCard";
import { Link } from "react-router-dom";

const GiftSlides = () => {
    return (<Box sx={{
        height: '100vh',
        bgcolor: 'primary.bg',
        display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        <h5 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }} >Available Gift Cards</h5>
        <CustomSlider>
            <GiftCard />
            <GiftCard />
            <GiftCard />
            <GiftCard />
            <GiftCard />
        </CustomSlider>
        <Link to={'/transfer'} style={{ color: '#90888C', textAlign: 'center', textDecoration: 'none', marginTop: '30px' }}>
            view all
        </Link>
    </Box>
    );
}

export default GiftSlides;