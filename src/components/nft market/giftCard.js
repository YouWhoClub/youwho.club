import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const Outter = styled(Box)(({ theme }) => ({
    width: '315px', height: '315px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    width: '300px', height: '300px',
    borderRadius: '15px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border: '1px solid',
    borderColor: theme.palette.primary.light,
    transition: '400ms ease',
    cursor: 'pointer',
    '&:hover': {
        width: '305px', height: '305px',
        boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '220px', height: '220px',
    borderRadius: '15px',
    border: '1px solid',
    borderColor: theme.palette.primary.light,
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width:'250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:theme.palette.primary.light,
}))

const GiftCard = ({ image }) => {
    return (
        <Outter>

            <Card onClick={() => alert('TRANSFER MODAL')}>
                <NFTImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                &nbsp;
                <FlexRow>
                    <div>
                        price:5$
                    </div>
                </FlexRow>

            </Card>
        </Outter>
    );
}

export default GiftCard;