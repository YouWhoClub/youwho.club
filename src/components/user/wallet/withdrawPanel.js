import { Box, Typography } from "@mui/material";
import GiftCard from "../../nft market/giftCard";

const WithdrawPanel = () => {
    return (<Box sx={{ display: 'flex', flexDirection: 'column' , alignItems:'center'}}>
        <Typography sx={{ color: 'primary.text' }}>Unclaimed Gifts</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center' }}>
            <GiftCard price={25} sender={false}/>
            <GiftCard price={50} sender={false}/>
            <GiftCard price={40} sender={false}/>
            <GiftCard price={10} sender={false}/>
        </Box>
    </Box>);
}

export default WithdrawPanel;