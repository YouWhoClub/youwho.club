import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Heart, More } from "iconsax-react";

const Outter = styled(Box)(({ theme }) => ({
    width: '305px', height: '305px', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '300px', height: '300px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    backgroundColor:theme.palette.secondary.bg,
    boxShadow: '0px 0px 9px -2px rgba(200,209,231,0.61)',
    transition: '400ms ease',
    cursor: 'pointer',
    '&:hover': {
        // width: '305px', height: '305px',
        boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.51)',
    }
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor:theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '250px', height: '150px',
    borderRadius: '15px',
    // border: '1px solid',
    // borderColor: theme.palette.primary.light,
    '&:hover': {
        // width: '255px', height: '255px',
        width: '255px', height: '155px',
    }
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '250px', height: '100px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.light,marginTop:1
}))

const NFTCard = ({ image }) => {
    return (
        <Outter>

            <Card onClick={() => alert('TRANSFER MODAL')}>
                <NFTImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                <DetailsSection>
                    <FlexRow>
                        <div style={{ display: 'flex', alignItems: 'center' }}><Heart />&nbsp;9</div>
                        <div><More /></div>
                    </FlexRow>
                    <div>NFT name</div>
                    <FlexRow>
                        <div>
                            by:folani
                        </div>
                        <div>
                            price:5$
                        </div>
                    </FlexRow>

                </DetailsSection>
            </Card>
        </Outter>
    );
}

export default NFTCard;