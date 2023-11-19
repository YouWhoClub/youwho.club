import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowDown2, ArrowUp2, Heart, More } from "iconsax-react";
import { useState } from "react";
import ButtonPurple from "../buttons/buttonPurple";
import tempPic from '../../assets/bgDots.svg'
import tempNFT from '../../assets/youwho-hugcoin.svg'
import ButtonOutline from "../buttons/buttonOutline";
import purpleNFT from '../../assets/purple-nft.svg'
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight, ArrowUpward } from "@mui/icons-material";
import { NFTCommentCard } from "../utils";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";

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
    // display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    flexWrap: 'wrap',
    height: 'auto',
    boxSizing: 'border-box',
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
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    // height: '420px',
    borderRadius: '9px',
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))
const NFTPropertyTag = styled(Box)(({ theme }) => ({
    display: 'flex', width: 'auto', padding: '4px 10px',
    justifyContent: 'center',
    alignItems: 'center', border: '1px solid #DEDEDE', borderRadius: '4px'
}))
const PropertyTagTitle = styled('span')(({ theme }) => ({
    fontSize: '10px', color: theme.palette.primary.text,
}))
const PropertyTagAnswer = styled('span')(({ theme }) => ({
    fontSize: '10px', color: theme.palette.secondary.text,
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
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
            <Container sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
                <NFTsColumn sx={{
                    // width: { xs: '100%', md: '170px' },
                    display: { xs: 'flex', md: 'grid' }
                }}>
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                    <OtherNFTCard />
                </NFTsColumn>
                {/* // details of collection and nft ===> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '22px' }}>
                    {/* // details of collection ===> */}
                    <Box className="collection-details-of-expanded-collection-card" sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                        <FlexRow justifyContent={'space-between'} sx={{}}>
                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                Collection Name
                            </Typography>
                            <FlexRow sx={{ width: 'auto !important', }}>
                                <Heart size={'24px'} />&nbsp;
                                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                    9
                                </Typography>
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
                    {/* // image of nft ===> */}
                    <NFTImage
                        id="nft-image-of-expanded-collection-card"
                        className="nft-image-of-expanded-collection-card"
                        sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${tempNFT}`)),
                            height: `${document.getElementById("nft-image-of-expanded-collection-card")?.offsetWidth}px`,
                        }} />
                    {/* // details of  nft ===> */}
                    <Box className="nft-details-of-expanded-collection-card"
                        sx={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                        <FlexRow sx={{ justifyContent: 'space-between', mb: 4 }}>
                            <ButtonOutline fontSize='12px' text={'Previous NFT'} height='28px' prevIcon={<ArrowBack fontSize="14px" />} />
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '10px', sm: '12px' } }}>
                                5th of 10 NFTs
                            </Typography>
                            <ButtonOutline fontSize='12px' text={'Next NFT'} height='28px' nextIcon={<ArrowForward fontSize="14px" />} />
                        </FlexRow>
                        <FlexRow justifyContent={'space-between'} sx={{ mb: '20px' }}>
                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                NFT Name
                            </Typography>
                            <FlexRow sx={{ width: 'auto !important', }}>
                                <Heart size={'24px'} />&nbsp;
                                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                    9
                                </Typography>
                            </FlexRow>
                        </FlexRow>
                        <FlexColumn sx={{ gap: '8px' }}>
                            <FlexRow>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Price : </Typography>
                                <Typography sx={{ color: 'primary.main', fontSize: '14px' }}> 20 yc</Typography>
                            </FlexRow>
                            <ButtonPurple text={'Mint This NFT'} w='100%' />
                            <FlexRow>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>Creation Date : </Typography>
                                <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}> 20.10.2024</Typography>
                            </FlexRow>
                            <FlexColumn>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Description : </Typography>
                                <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}> Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description</Typography>
                            </FlexColumn>
                            <FlexColumn sx={{
                                borderTop: '1px solid #DEDEDE', borderBottom: '1px solid #DEDEDE',
                                py: { xs: '12px', sm: '16px' }, gap: '8px'
                            }}>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                    <NFTPropertyTag>
                                        <PropertyTagTitle>Type : </PropertyTagTitle>
                                        <PropertyTagAnswer> Image</PropertyTagAnswer>
                                    </NFTPropertyTag>
                                </Box>
                            </FlexColumn>
                            <FlexColumn sx={{ gap: '8px' }}>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>
                                    Comments : </Typography>
                                <FlexRow sx={{ gap: '12px', width: '100%', }}>
                                    <NFTCommentCard username={'youzarsif'}
                                        profileImg={purpleNFT}
                                        comment={'sooooo beautiful I lovee this nft pleasee sell this to me ill buy with a lot of tokns'} />
                                    <FlexColumn sx={{ alignItems: 'space-between !important', color: 'primary.text' }}>
                                        <ArrowUp2 size='16px' cursor='pointer' />
                                        <ArrowDown2 size='16px' cursor='pointer' />
                                    </FlexColumn>
                                </FlexRow>
                            </FlexColumn>


                        </FlexColumn>

                    </Box>

                </Box>
            </Container>
            :
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
                    <ButtonPurpleLight
                        br='8px' height={'30px'} text={'Expand Collection'} w={'100%'} onClick={() => setExpandedId(id)} />
                </DetailsSection>
            </Card>
        }
    </>
    );
}

export default CollectionCard;