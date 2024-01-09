import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import { ArrowUp2, Heart, More, Pointer, Setting, Share } from "iconsax-react";
import yCoin from '../../assets/Ycoin.svg'
import ButtonPurple from "../buttons/buttonPurple";
import ButtonOutline from "../buttons/buttonOutline";
import ButtonBorder from "../buttons/buttonBorder";
import { ShareSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
const YouWhoToken = styled(Box)(({ theme }) => ({
    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '12px',
    height: '12px'
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '12px 18px 18px 18px',
    alignItems: 'start',
    gap: '40px',
    borderRadius: '18px', width: '100%',
    // alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const AssetImage = styled(Box)(({ theme }) => ({
    // height: '280px', width: '280px',
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.bg,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
}))
const AssetImageSmall = styled(Box)(({ theme }) => ({
    height: '124px', width: '220px',
    borderRadius: '18px',
    backgroundColor: theme.palette.primary.bg,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
}))

const Card = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    padding: '8px 8px 18px 8px',
    alignItems: 'start', flexDirection: 'column',
    gap: '6px',
    borderRadius: '16px',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Line = styled(Box)(({ theme }) => ({
    width: '100%', height: '1px',
    borderRadius: '16px',
    backgroundColor: '#DEDEDE',

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

const NFTAssetCard = ({ nft }) => {
    const {
        metadata_url,
        contract_address
    } = nft;
    const globalUser = useSelector(state => state.userReducer)
    const [NFTInfo, setNFTInfo] = useState({
        name: '',
        description: '',
        attributes: null,
        imageURL: '',
    });

    useEffect(() => {
        getMetadata()
    }, [metadata_url])

    const getMetadata = () => {
        console.log(metadata_url);
        fetch(metadata_url.replace("ipfs://", "https://ipfs.io/ipfs/"))
            .then((response) => response.json())
            .then((data) => {
                setNFTInfo({
                    name: data.name,
                    description: data.description,
                    attributes: data.attributes,
                    imageURL: data.image,
                })
                console.log(data);

            })
            .catch((error) => {
                // Handle any fetch or parsing errors
                console.error('Error fetching NFT image:', error);
            })
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const openPopper = Boolean(anchorEl);
    const handleClick = (event) => {
        if (!openPopper)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        setDetExpaded(false)
    };
    const handleClickAway = () => {
        setAnchorEl(null);
    }
    const [detExpanded, setDetExpaded] = useState(false)
    return (
        <>{detExpanded ?
            <Container sx={{ flexDirection: { xs: "column", sm: 'row' } }}>
                <AssetImage
                    id="large-asset-image"
                    sx={{
                        // width: '280px',
                        height: '280px',
                        width: '100%',
                        // height: `${document.getElementById("large-asset-image")?.offsetWidth}px`,
                        // backgroundImage: BG_URL(PUBLIC_URL(`${NFTInfo.imageURL}`)),
                        backgroundImage: `url(${NFTInfo.imageURL})`,
                    }}
                />
                <FlexColumn sx={{
                    gap: '16px', width: '100%', height: '280px', justifyContent: 'space-between'
                }}>
                    <FlexRow sx={{ width: '100%' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 500 }}>{NFTInfo.name}</Typography>
                        <FlexRow sx={{ width: 'max-content', gap: '4px' }}>
                            <YouWhoToken sx={{
                                width: '20px !important', height: '20px !important'
                            }}
                            />
                            {/* <Typography sx={{ color: 'primary.text', fontSize: '20px', fontWeight: 600 }}>10</Typography> */}
                        </FlexRow>
                    </FlexRow>
                    <FlexColumn sx={{
                        gap: '6px', width: '100%', alignItems: 'start !important'
                    }}>
                        {/* <FlexRow sx={{ width: 'max-content', gap: '2px' }}>
                            <Heart size='15px' />
                            <Typography sx={{ color: 'primary.text', fontSize: '9px' }}>
                                9
                            </Typography>
                        </FlexRow> */}
                        <FlexColumn sx={{ width: '100%', alignItems: 'start !important' }}>
                            <Typography sx={{ color: 'primary.text', fontSize: '12px', fontWeight: 600 }}>
                                Description:
                            </Typography>
                            <Typography sx={{
                                color: 'secondary.text',
                                fontSize: '12px', fontWeight: 400, textAlign: 'justify'
                            }}>
                                {NFTInfo.description}
                            </Typography>
                        </FlexColumn>
                        <FlexColumn sx={{ width: '100%', alignItems: 'start !important' }}>
                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {
                                    NFTInfo.attributes &&
                                    NFTInfo.attributes.map(attr => (
                                        <NFTPropertyTag>
                                            <PropertyTagTitle>{attr.trait_type} : </PropertyTagTitle>
                                            <PropertyTagAnswer>{attr.value}</PropertyTagAnswer>
                                        </NFTPropertyTag>
                                    ))
                                }
                            </Box>
                        </FlexColumn>
                    </FlexColumn>
                    <Line />
                    <FlexRow sx={{ gap: '8px', width: '100%' }}>
                        {/* <ButtonPurple text={'Buy'} px={'24px'} w={'100%'} /> */}
                        {/* <ButtonBorder
                            br={'4px'}
                            text={<ShareSharp sx={{ color: 'secondary.text' }} />}
                            w={'40px'} height={'40px'} /> */}
                    </FlexRow>
                    <ButtonBorder w={'100%'} text={<ArrowUp2 />} height={'30px'} onClick={handleClose} br={'4px'} />
                </FlexColumn>
            </Container>
            :
            <ClickAwayListener onClickAway={handleClickAway}>
                <Card>
                    <AssetImageSmall sx={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${NFTInfo.imageURL}`)),
                    }} />
                    <FlexColumn sx={{ width: '100%' }}>
                        <FlexRow sx={{ width: '100%', mb: '8px' }}>
                            <FlexRow sx={{ width: 'max-content', gap: '2px' }}>
                                {/* <Heart size='15px' />
                                <Typography sx={{ color: 'primary.text', fontSize: '9px' }}>
                                    9
                                </Typography> */}
                            </FlexRow>
                            <More size='24px' cursor='pointer' onClick={handleClick} />
                        </FlexRow>
                        {/* <FlexRow sx={{ width: '100%', mb: '12px' }}>
                            <FlexRow sx={{ width: 'max-content', gap: '4px' }}>
                                <YouWhoToken />
                                <Typography sx={{ color: 'primary.text', fontSize: '10px' }}>
                                    10
                                </Typography>
                            </FlexRow>
                        </FlexRow> */}
                        <FlexRow sx={{ width: '100%', }}>
                            <Typography sx={{ color: 'primary.text', fontSize: '12px' }}>
                                {NFTInfo.name}
                            </Typography>
                        </FlexRow>
                    </FlexColumn>



                    <Popper
                        PaperProps={{
                            style: {
                            }
                        }}
                        disableScrollLock={true}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openPopper}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        placement='left-start'
                        sx={(theme) => ({
                            marginTop: '20px !important',
                            width: '190px',
                            bgcolor: 'secondary.bg', p: '22px',
                            zIndex: 1400, borderRadius: '20px 0px 20px 20px',
                            overflow: "hidden",
                            boxShadow: theme.palette.primary.boxShadow,
                        })}>

                        <MenuItem id={'nft-details'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            // borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                            onClick={() => setDetExpaded(true)}
                        >
                            NFT Details
                        </MenuItem>
{/* 
                        <MenuItem id={'like'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderBottom: '1px solid',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Like
                        </MenuItem>

                        <MenuItem id={'share'} sx={{
                            display: 'flex', alignItems: 'center', p: '16px 8px',
                            color: 'primary.text',
                            borderColor: 'primary.gray',
                            '&:hover': {
                                bgcolor: 'secondary.bgOp',
                            }
                        }}
                        >
                            Share
                        </MenuItem> */}

                    </Popper>

                </Card>
            </ClickAwayListener>
        }


        </>
    );
}

export default NFTAssetCard;