import styled from "@emotion/styled";
import { Box, ClickAwayListener, MenuItem, Popper, Typography, Modal } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { ArrowDown2, ArrowUp2, Heart, More, Coin } from "iconsax-react";
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
import Ycoin from '../../assets/Ycoin.svg'

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
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '50%',
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
const Button = styled('button')(({ theme, color }) => ({
    backgroundColor: 'transparent',
    padding: '8px 24px',
    outline: 'none',
    color: color,
    cursor: 'pointer',
    border: 'none',
    fontFamily: "Inter",
    fontSize: '12px',
}))
const Icon = styled(Box)(({ theme, url, w, h }) => ({
    width: `${w}px`,
    height: `${h}px`,
    color: '#B897CC',
    backgroundImage: BG_URL(PUBLIC_URL(`${url}`)),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    pointerEvents: 'none'
}))

const NFTBuyCard = ({ nft, expanded, setExpandedId, setActiveTab }) => {

    const {
        id,
        attributes,
        metadata_uri,
        nft_name,
        likes,
        current_price,
        comments,
        nft_description,
        created_at,
        contract_address,
        current_owner_screen_cid,
        onchain_id, is_minted,
        is_listed,
        freeze_metadata,
        extra
    } = nft;
    const globalUser = useSelector(state => state.userReducer)
    const [nfts, setNFTs] = useState([]);
    const toastId = useRef(null);
    const [amount, setAmount] = useState(0)
    const [imageURL, setImageURL] = useState(null);



    useEffect(() => {
        getGasFee()
    }, [])

    useEffect(() => {
        getMetadata()
    }, [metadata_uri])

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }


    const getMetadata = () => {
        fetch(metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
            .then((response) => response.json())
            .then((data) => (setImageURL(data.image)))
            .catch((error) => {
                // Handle any fetch or parsing errors
                console.error('Error fetching NFT image:', error);
            })
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

    const buyNFt = async () => {
        loading();

        if (globalUser.privateKey) {
            const data = {
                caller_cid: globalUser.cid,
                nft_id: id,
                amount: amount,
                event_type: "buy",
                buyer_screen_cid: globalUser.YouWhoID,
                contract_address: contract_address,
                metadata_uri: metadata_uri,
                current_owner_screen_cid: current_owner_screen_cid,
                onchain_id: onchain_id,
                is_minted: is_minted,
                is_listed: is_listed,
                nft_name: nft_name,
                nft_description: nft_description,
                current_price: current_price, // mint with primary price of 20 tokens, this must be the one in db
                freeze_metadata: freeze_metadata,
                extra: extra,
                attributes: attributes,
                comments: comments,
                likes: likes,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/buy`, {
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
                setActiveTab("minted-NFTs")
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
                <Box sx={{ display: 'flex', width: '100%', gap: '22px' }}>
                    <NFTImage
                        id="nft-image-of-expanded-collection-card"
                        className="nft-image-of-expanded-collection-card"
                        component="img"
                        src={imageURL}
                    />
                    <Box className="collection-details-of-expanded-collection-card" sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '16px' }}>
                        <Box className="nft-details-of-expanded-collection-card"
                            sx={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                            <FlexColumn sx={{ gap: '8px' }}>
                                <FlexRow justifyContent={'space-between'} sx={{}}>
                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: { xs: '18px', sm: '20px' } }}>
                                        {nft_name}
                                    </Typography>
                                    <FlexRow sx={{ width: 'max-content !important', ml: '8px', gap: '5px' }}>
                                        <Icon url={Ycoin} w={25} h={25} />
                                        <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, color: 'primary.main' }}>
                                            {current_price}
                                        </Typography>
                                    </FlexRow>
                                </FlexRow>
                                <FlexRow>
                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>Creation Date : </Typography>
                                    <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{created_at.slice(0, 10)}</Typography>
                                </FlexRow>
                                <FlexColumn>
                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Description : </Typography>
                                    <Typography sx={{ color: 'primary.gray', fontSize: '14px' }}>&nbsp;{nft_description}</Typography>
                                </FlexColumn>
                                <FlexColumn sx={{
                                    borderTop: '1px solid #DEDEDE', borderBottom: '1px solid #DEDEDE',
                                    py: { xs: '12px', sm: '16px' }, gap: '8px'
                                }}>
                                    <Typography sx={{ color: 'primary.text', fontWeight: 500, fontSize: '14px' }}>NFT Properties : </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {
                                            attributes &&
                                            attributes.map(attr => (
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
                                        comments &&
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
                                <ButtonPurple text={'Buy'} onClick={buyNFt} w='100%' />

                            </FlexColumn>

                        </Box>
                        <Acc sx={(theme) => ({ boxShadow: theme.palette.primary.boxShadowInset })}
                            onClick={() => setExpandedId(undefined)}>
                            <ArrowUp2 size='16px' />
                        </Acc>
                    </Box>

                </Box>
            </Container>
            :
            <Card>
                {<CollectionImage sx={{
                    background: `url(${imageURL}) no-repeat center`,
                }} />}

                <DetailsSection>
                    <FlexRow sx={{ mb: '4px', justifyContent: 'end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}><Heart size='15px' />&nbsp;{likes}</div>
                    </FlexRow>
                    <Typography sx={{ mb: '14px', fontSize: '12px' }}>{nft_name}</Typography>
                    <ButtonPurpleLight
                        br='8px' height={'30px'} text={'Expand Collection'} w={'100%'} onClick={() => setExpandedId(id)} />
                </DetailsSection>
            </Card>
        }
    </>
    );
}

export default NFTBuyCard;