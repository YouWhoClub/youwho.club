import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowDown2, ArrowUp2, Heart, More } from "iconsax-react";
import { useState } from "react";
import ButtonPurple from "../buttons/buttonPurple";
import tempPic from '../../assets/bgDots.svg'

const Card = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '8px',
    flexDirection: 'column',
    justifyContent: '',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '16px',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '22px',
    borderRadius: '18px', width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Acc = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: '9px', width: '100%', height: '40px',
    alignItems: 'center', color: theme.palette.primary.gray,
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow, cursor: "pointer",
}))
const NFTsColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto',
    // boxSizing: 'border-box',
    alignItems: 'center', padding: '8px', gap: '14px',
    borderRadius: '9px',
    //  width: '170px',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.gray,
    boxShadow: theme.palette.primary.boxShadow,
}))
const CollectionDetails = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    alignItems: 'start', gap: '8px',
    width: '100px',
}))
const OtherNFTCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.darkGray,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '70px', height: '70px',
    borderRadius: '8px',
}))
const CollectionImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '200px', height: '144px',
    borderRadius: '8px',
    '&:hover': {
        backgroundImage: BG_URL(PUBLIC_URL(`${tempPic}`))
    }

}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))
const DetailsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    // height: '100px',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.palette.primary.text,
}))

const CollectionCard = ({ image, name, likes, link, expanded, setExpandedId, id }) => {
    const [colDetExpanded, setColDetExpanded] = useState(true)
    return (<>
        {expanded ?
            <Container sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
                <NFTsColumn sx={{ width: { xs: '100%', sm: '170px' } }}>
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                </NFTsColumn>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                    <FlexRow justifyContent={'space-between'} sx={{ fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                        <Typography>
                            Collection Name
                        </Typography>
                        <FlexRow sx={{ width: 'auto !important' }}>
                            <Heart />&nbsp;9
                        </FlexRow>
                    </FlexRow>
                    {colDetExpanded ?
                        <CollectionDetails sx={{ transition: '500ms ease' }}>
                            <FlexRow>Cover Image</FlexRow>
                            <FlexRow>Creation Date</FlexRow>
                            <FlexRow>Owner Address</FlexRow>
                            <FlexRow>Royalties</FlexRow>
                            <FlexColumn>Collection Description</FlexColumn>
                            <FlexColumn>Metadata</FlexColumn>
                        </CollectionDetails> : undefined}
                    <Acc sx={{ fontWeight: 500 }} onClick={() => setColDetExpanded(!colDetExpanded)}>Collection Details &nbsp; {colDetExpanded ? <ArrowUp2 size='12px' /> : <ArrowDown2 size='12px' />}</Acc>
                </Box>

            </Container> :
            <Card>
                <CollectionImage style={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
                    '&:hover': {
                        backgroundImage: BG_URL(PUBLIC_URL(`${tempPic}`))
                    }
                }} />
                <DetailsSection>
                    <FlexRow sx={{ mb: '4px', justifyContent: 'end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}><Heart size='15px' />&nbsp;{likes}</div>
                    </FlexRow>
                    <Typography sx={{ mb: '14px', fontSize: '12px' }}>{name}</Typography>
                    <ButtonPurple text={'Expand Collection'} w={'100%'} onClick={() => setExpandedId(id)} />
                </DetailsSection>
            </Card>
        }
    </>
    );
}

export default CollectionCard;