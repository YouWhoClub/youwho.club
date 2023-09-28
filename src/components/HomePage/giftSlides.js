import { Box } from "@mui/material";
import CustomSlider from "../customSlider";
import GiftCard from "../nft market/giftCard";
import { Link, useNavigate } from "react-router-dom";
import ButtonOutline from "../buttons/buttonOutline";

const GiftSlides = () => {
    const navigate = useNavigate()

    return (<Box sx={{
        // height: '100vh',
        // bgcolor: 'primary.bg',
        display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        {/* <h5 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }} >Available Gift Cards</h5> */}
        <CustomSlider>
            <GiftCard price={5} sender={true}/>
            <GiftCard price={10} sender={true}/>
            <GiftCard price={25} sender={true}/>
            <GiftCard price={50} sender={true}/>
            <GiftCard price={100} sender={true}/>
        </CustomSlider>
        <Box sx={{
            display: 'flex', justifyContent: 'center', width: '100%', mt: 5
        }}>
            <ButtonOutline text={'view all'} w={'100%'} onClick={() => navigate('/transfer')} />
        </Box>
    </Box>
    );
}

export default GiftSlides;