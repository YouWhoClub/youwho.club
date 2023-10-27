import { Box, TextField, Typography } from "@mui/material";
import { RelationCard } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))

const RelationsTab = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <FilterSelectionBox sx={{
                py: 1,
                my: 2,
            }}>
                <span style={{marginLeft:'16px'}}>
                    Search Username:
                </span>
                <input style={{ height: '20px',marginRight:'16px',  border: 'none',outline:'none'}} />
            </FilterSelectionBox>
            <RelationCard image={blueNft} username={'Shirin'} friend={true} />
            <RelationCard image={purpleNFT} username={'Farhad'} allies={true} />
            <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
            <RelationCard image={sorkhabiNFT} username={'red_garlic'} friend={true} />
            <RelationCard image={creamNFT} username={'this.me'} friend={true} />
        </Box>
    );
}

export default RelationsTab;