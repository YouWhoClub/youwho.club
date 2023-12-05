import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowDown2, ArrowUp2, Heart, More } from "iconsax-react";
import { useEffect, useState, useRef } from "react";
import ButtonPurple from "../buttons/buttonPurple";
import tempPic from '../../assets/bgDots.svg'
import tempNFT from '../../assets/youwho-hugcoin.svg'
import ButtonOutline from "../buttons/buttonOutline";
import purpleNFT from '../../assets/purple-nft.svg'
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight, ArrowUpward } from "@mui/icons-material";
import { NFTCommentCard, MyInput } from "../utils";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { API_CONFIG } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import generateSignature from "../../utils/signatureUtils";




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
    // boxShadow: theme.palette.primary.boxShadow,
    fontWeight: 500,
    cursor: "pointer",
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
    width: '100%',
}))
const OtherNFTCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.darkGray,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '70px', height: '70px',
    aspectRatio: '1',
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
    fontSize: '15px',
    fontWeight: '500'
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

const CollectionCard = ({ likes, link, expanded, setExpandedId, collection }) => {

    const { id, col_name, collection_background, created_at, owner_screen_cid, royalties_address_screen_cid, col_description, extra } = collection
    const [colDetExpanded, setColDetExpanded] = useState(true)
    const globalUser = useSelector(state => state.userReducer)
    const [nfts, setNFTs] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState(0)
    const [isHovered, setIsHovered] = useState(false);
    const toastId = useRef(null);
    const [amount, setAmount] = useState(0)


    useEffect(() => {
        getMetadata()
        getGasFee()
    }, [])

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }


    const getMetadata = () => {
        Promise.all(
            collection.nfts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((nft) =>
                fetch(nft.metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
                    .then((response) => response.json())
                    .then((data) => ({ ...nft, metadata: data }))
                    .catch((error) => {
                        // Handle any fetch or parsing errors
                        console.error('Error fetching NFT image:', error);
                        return nft; // Keep the original NFT object if fetching fails
                    })
            )
        )
            .then((nftsWithMetadata) => {
                setNFTs(nftsWithMetadata);
            })
            .catch((error) => {
                // Handle any Promise.all errors
                console.error('Error fetching NFT images:', error);
            });
    }

    const getGasFee = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get-gas-fee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            setAmount(response.data)
        } else {
            console.log(response.message)
        }
    }


    const createCollection = async () => {
        loading();

        if (globalUser.privateKey) {
            const nft = nfts[selectedNFT]

            const data = {
                caller_cid: globalUser.cid,
                nft_id: nft.id,
                amount: amount,
                event_type: "mint",
                buyer_screen_cid: null,
                contract_address: nft.contract_address,
                metadata_uri: nft.metadata_uri,
                current_owner_screen_cid: nft.current_owner_screen_cid,
                onchain_id: nft.onchain_id,
                is_minted: nft.is_minted,
                is_listed: nft.is_listed,
                nft_name: nft.nft_name,
                nft_description: nft.nft_description,
                current_price: nft.current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: nft.freeze_metadata,
                extra: nft.extra,
                attributes: nft.attributes,
                comments: nft.comments,
                likes: nft.likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            // sending the request

                let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/mint`, {
                    method: 'POST',
                    body: JSON.stringify(requestData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${globalUser.token}`,
                    }
                })
                let response = await request.json()
                console.log(response);

                if (!response.is_error) {
                    updateToast(true, response.message)
                } else {
                    console.error(response.message)
                    updateToast(false, response.message)
                }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }


    return (<>
        {expanded ?
            <Container sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
                <NFTsColumn sx={{
                    // width: { xs: '100%', md: '170px' },
                    display: { xs: 'flex', md: 'grid' }
                }}>
                    {
                        nfts &&
                        nfts.map((nft, index) => {
                            const imageURL = (nft.metadata && nft.metadata.image) ? nft.metadata.image : purpleNFT;
                            const selected = index == selectedNFT;

                            return (
                                <OtherNFTCard
                                    key={nft.id}
                                    onClick={() => setSelectedNFT(index)}
                                    sx={{
                                        background: `url('${imageURL}') no-repeat center`,
                                        cursor: "pointer",
                                        border: () => (selected ? 'solid 2px' : 'none'),
                                        borderColor: 'primary.main',
                                        boxSizing: 'border-box'
                                    }} />
                            )
                        })
                    }
                </NFTsColumn>
                {/* // details of collection and nft ===> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '22px' }}>
                    {/* // details of collection ===> */}
                    <Box className="collection-details-of-expanded-collection-card" sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                        <FlexRow justifyContent={'space-between'} sx={{}}>
                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                {col_name}
                            </Typography>
                            <FlexRow sx={{ width: 'max-content !important', ml: '8px' }}>
                                <Heart size={'24px'} />&nbsp;
                                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                    0
                                </Typography>
                            </FlexRow>
                        </FlexRow>
                        {colDetExpanded ?
                            <CollectionDetails sx={{ transition: '500ms ease' }}>
                                <FlexRow>Cover Image:&nbsp; <Box sx={{ background: `${BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${collection_background}`))} no-repeat center`, backgroundSize: 'cover', width: '68px', height: '38px', borderRadius: '8px' }}></Box></FlexRow>
                                <FlexRow>Creation Date:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{created_at.slice(0, 10)}</Typography></FlexRow>
                                <FlexRow>Owner Address:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{owner_screen_cid}</Typography></FlexRow>
                                <FlexRow>Royalties:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{royalties_address_screen_cid}</Typography></FlexRow>
                                <FlexColumn>Collection Description:&nbsp;<Typography sx={{ fontFamily: 'inter', fontWeight: '500', fontSize: '14px', color: 'primary.darkGray' }}>{col_description}</Typography></FlexColumn>
                                <FlexColumn>Metadata:&nbsp;</FlexColumn>
                            </CollectionDetails>
                            : undefined}
                        <Acc sx={(theme) => ({ boxShadow: theme.palette.primary.boxShadow })}
                            onClick={() => setColDetExpanded(!colDetExpanded)}>Collection Details &nbsp; {colDetExpanded ? <ArrowUp2 size='12px' /> : <ArrowDown2 size='12px' />}</Acc>
                    </Box>
                    {/* // image of nft ===> */}
                    <NFTImage
                        id="nft-image-of-expanded-collection-card"
                        className="nft-image-of-expanded-collection-card"
                        component="img"
                        src={(nfts[selectedNFT].metadata && nfts[selectedNFT].metadata.image) ? nfts[selectedNFT].metadata.image : purpleNFT}
                    />
                    {/* // details of  nft ===> */}
                    <Box className="nft-details-of-expanded-collection-card"
                        sx={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                        <FlexRow sx={{ justifyContent: 'space-between', mb: 4 }}>
                            <ButtonOutline onClick={() => setSelectedNFT(prev => prev > 0 ? prev - 1 : prev)} fontSize='12px' text={'Previous NFT'} height='28px' prevIcon={<ArrowBack fontSize="14px" />} />
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '10px', sm: '12px' } }}>
                                {`${selectedNFT + 1}th of ${nfts.length} NFTs`}
                            </Typography>
                            <ButtonOutline onClick={() => setSelectedNFT(prev => prev < nfts.length - 1 ? prev + 1 : prev)} fontSize='12px' text={'Next NFT'} height='28px' nextIcon={<ArrowForward fontSize="14px" />} />
                        </FlexRow>
                        <FlexRow justifyContent={'space-between'} sx={{ mb: '20px' }}>
                            <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                {nfts[selectedNFT].nft_name}
                            </Typography>
                            <FlexRow sx={{ width: 'auto !important', }}>
                                <Heart size={'24px'} />&nbsp;
                                <Typography sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                                    {nfts[selectedNFT].likes ? nfts[selectedNFT].likes : 0}
                                </Typography>
                            </FlexRow>
                        </FlexRow>
                        <FlexColumn sx={{ gap: '8px' }}>
                            <FlexRow>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Price : </Typography>
                                <Typography sx={{ color: 'primary.main', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].current_price}</Typography>
                            </FlexRow>
                            <ButtonPurple text={'Mint This NFT'} onClick={createCollection} w='100%' />
                            <FlexRow>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>Creation Date : </Typography>
                                <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].created_at.slice(0, 10)}</Typography>
                            </FlexRow>
                            <FlexColumn>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Description : </Typography>
                                <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{nfts[selectedNFT].nft_description}</Typography>
                            </FlexColumn>
                            <FlexColumn sx={{
                                borderTop: '1px solid #DEDEDE', borderBottom: '1px solid #DEDEDE',
                                py: { xs: '12px', sm: '16px' }, gap: '8px'
                            }}>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {
                                        nfts[selectedNFT].metadata &&
                                        nfts[selectedNFT].metadata.attributes.map(attr => (
                                            <NFTPropertyTag>
                                                <PropertyTagTitle>{attr.trait_type} : </PropertyTagTitle>
                                                <PropertyTagAnswer>{attr.value}</PropertyTagAnswer>
                                            </NFTPropertyTag>
                                        ))
                                    }

                                </Box>
                            </FlexColumn>
                            <FlexColumn sx={{ gap: '8px' }}>
                                <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>
                                    Comments : </Typography>

                                {
                                    nfts.comments &&
                                    <FlexRow sx={{ gap: '12px', width: '100%', }}>
                                        <NFTCommentCard username={'youzarsif'}
                                            profileImg={purpleNFT}
                                            comment={'sooooo beautiful I lovee this nft pleasee sell this to me ill buy with a lot of tokns'} />
                                        <FlexColumn sx={{ alignItems: 'space-between !important', color: 'primary.text' }}>
                                            <ArrowUp2 size='16px' cursor='pointer' />
                                            <ArrowDown2 size='16px' cursor='pointer' />
                                        </FlexColumn>
                                    </FlexRow>
                                }
                            </FlexColumn>


                        </FlexColumn>

                    </Box>

                    <Acc sx={(theme) => ({ boxShadow: theme.palette.primary.boxShadowInset })}
                        onClick={() => setExpandedId(undefined)}>
                        Contract Collection &nbsp;
                        <ArrowUp2 size='12px' />
                    </Acc>

                </Box>
            </Container>
            :
            <Card
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {
                    isHovered ?
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                            gridTemplateRows: '1fr 1fr 1fr',
                            height: '144px',
                            width: '200px',
                            boxSizing: 'border-box',
                            padding: '4px', gap: '4px',
                            borderRadius: '9px',
                            alignItems: 'center',
                            backgroundColor: 'primary.gray',
                            boxShadow: 'primary.boxShadow',
                        }}>
                            {
                                nfts &&
                                nfts.map((nft, index) => {
                                    const imageURL = (nft.metadata && nft.metadata.image) ? nft.metadata.image : purpleNFT;

                                    return (
                                        <Box
                                            key={nft.id}
                                            sx={{
                                                background: `url('${imageURL}') no-repeat center`,
                                                backgroundSize: 'cover',
                                                borderColor: 'primary.main',
                                                boxSizing: 'border-box',
                                                aspectRatio: '1',
                                                borderRadius: '8px',
                                            }} >
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        :
                        <CollectionImage sx={{
                            background: `${BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${collection_background}`))} no-repeat center`,
                            '&:hover': {
                                background: `${BG_URL(PUBLIC_URL(`${collection_background}`))} no-repeat center`,
                            }
                        }} />
                }

                <DetailsSection>
                    <FlexRow sx={{ mb: '4px', justifyContent: 'end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}><Heart size='15px' />&nbsp;{likes}</div>
                    </FlexRow>
                    <Typography sx={{ mb: '14px', fontSize: '12px' }}>{col_name}</Typography>
                    <ButtonPurpleLight
                        br='8px' height={'30px'} text={'Expand Collection'} w={'100%'} onClick={() => setExpandedId(id)} />
                </DetailsSection>
            </Card>
        }
    </>
    );
}

export default CollectionCard;