import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Heart, More, Share } from "iconsax-react";

const Outter = styled(Box)(({ theme }) => ({
    // width: '200px', height: '175px', padding: '5px',
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '200px', height: '175px',
    // width: '100%',
    padding: '7px 7px 14px 7px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    boxShadow: theme.palette.primary.boxShadow,
    transition: '400ms ease',
    cursor: 'pointer',
    '&:hover': {
        // width: '305px', height: '305px',
        boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
        boxShadow: theme.palette.primary.boxShadowInset,
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '185px', height: '105px',
    borderRadius: '18px',
    '&:hover': {
    }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.light, marginTop: '12px'
}))

const NFTCardLanding = ({ image }) => {
    return (
        <Outter sx={{ py: '10px' }}>
            <Card onClick={() => alert('TRANSFER MODAL')}>
                <NFTImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                <DetailsSection>
                    <FlexRow>
                        <p style={{ margin: 0 }}>NFT name</p>
                        <Share />
                    </FlexRow>
                    <FlexRow>
                        <p style={{ margin: 0 }}>10$</p>
                    </FlexRow>

                </DetailsSection>
            </Card>
        </Outter >
    );
}

export default NFTCardLanding;