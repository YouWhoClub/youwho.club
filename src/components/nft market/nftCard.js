import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const Outter = styled(Box)(({ theme }) => ({
    width: '315px', height: '315px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    width: '300px', height: '300px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
    width: '250px', height: '250px',
    borderRadius: '15px',
    border: '1px solid',
    borderColor: theme.palette.primary.light,
    '&:hover': {
        width: '255px', height: '255px',
    }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width:'250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:theme.palette.primary.light,
}))

const NFTCard = ({ image }) => {
    return (
        <Outter>

            <Card onClick={() => alert('TRANSFER MODAL')}>
                <NFTImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                <FlexRow>
                    <div>
                        by:folani
                    </div>
                    <div>
                        price:5$
                    </div>
                </FlexRow>
            </Card>
        </Outter>
    );
}

export default NFTCard;