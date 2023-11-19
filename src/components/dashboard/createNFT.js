import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AscSelect, BetweenTwoSelection, ButtonInput, MyInput, SelectInput, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { Add, AddAPhotoOutlined, AddBox, AddBoxOutlined, AddCard, AddCardOutlined, ArrowBack, ArrowBackIosNewSharp, AspectRatio, BrandingWatermark, Comment, CommentBank, CommentOutlined, ConnectedTvRounded, Description, DescriptionOutlined, Details, DetailsTwoTone, EmojiSymbols, FileUpload, LinkOutlined, List, Money, MovieCreation, NearMe, PlusOne, Title, TitleOutlined } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import nftImage from '../../assets/sokhabi-nft.svg'
import ButtonPurple from "../buttons/buttonPurple";
import MediaTypeIcon from '../../assets/icons/media-type.svg'
import ButtonOutline from "../buttons/buttonOutline";
import frameIcon from '../../assets/icons/frame.svg'
import fileIcon from '../../assets/icons/upload-file.svg'
import NameIcon from '../../assets/icons/name.svg'
import TextIcon from '../../assets/icons/text.svg'
import CoinsIcon from '../../assets/icons/coins.svg'
import CollIcon from '../../assets/icons/collectionIcon.svg'
import { Coin, Link } from "iconsax-react";
import { Input } from "@mui/base";
import { useNavigate } from "react-router";

const Container = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between', width: '100%',
    alignItems: 'center',
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundImage: BG_URL(PUBLIC_URL(`${nftImage}`)),
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
    , borderRadius: '12px',
    width: '100%',
    height: '200px',
    // "@media (min-width: 1440px)": {
    //     height: '250px',
    //   },

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


const CreateNFT = () => {
    const [activeTab, setActiveTab] = useState('create-NFT')
    const globalUser = useSelector(state => state.userReducer)
    const [mediaType, setMediaType] = useState(undefined)
    const [aspectRatio, setAspectRatio] = useState(undefined)
    const [openCrop, setOpenCrop] = useState(false)
    const [tokenAmount, setTokenAmount] = useState(undefined)
    const [NFTName, setNFTName] = useState(null)
    const [NFTDescription, setNFTDescription] = useState(null)
    const [NFTCollection, setNFTCollection] = useState(null)
    const imageInput = useRef()
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [metadataUpdatable, setMetadataUpdatable] = useState(false);
    const toastId = useRef(null);
    const handleSelectMediaType = (e) => {
        e.preventDefault()
        setMediaType(e.target.id)
    }
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
            {globalUser.cid ?
                <>
                    <SubTabs jc={'center'} mb={'32px'}>
                        <SubTab id={"create-collection"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Collection'} selected={activeTab == 'create-collection'} />
                        <SubTab id={"create-NFT"} onClick={(e) => setActiveTab(e.target.id)} text={'Create NFT'} selected={activeTab == 'create-NFT'} />
                    </SubTabs>
                    {activeTab == 'create-NFT' ?
                        <>
                            <Container sx={{ mb: '32px' }}>
                                <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                        Upload Your NFT
                                    </Typography>
                                    <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                        You Can Upload NFT in Various Types & Sizes
                                    </Typography>
                                </FlexColumn>
                                <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                    <FlexColumn sx={{
                                        gap: { xs: '10px', sm: '16px' }
                                    }}>
                                        <SelectInput tabs={['Image, .PNG', 'Image, .JPG', 'Video, .MP4']} label={'Your NFT Type'}
                                            handleSelect={handleSelectMediaType} value={mediaType} id="nft-type-selection"
                                            width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                        <ButtonInput label={'Upload NFT File *'} width={'100%'}
                                            icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                            button={<ButtonOutline
                                                height='35px'
                                                onClick={() => imageInput.current.click()}
                                                text={'Browse'}
                                                br={'30px'} />
                                            } />
                                        <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                            handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="nft-aspect-ratio-selection"
                                            width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} />
                                    </FlexColumn>
                                    <NFTImage sx={{}} />
                                </FlexRow>
                            </Container>
                            <Container >
                                <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                        NFT Informations
                                    </Typography>
                                    <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                        Tell Us About Your NFT Details
                                    </Typography>
                                </FlexColumn>
                                <FlexColumn sx={{ gap: '16px' }}>
                                    <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                        <MyInput value={tokenAmount}
                                            onChange={(e) => setTokenAmount(e.target.value)}
                                            label={'NFT Price'} width={'100%'}
                                            icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'} />
                                        <MyInput value={NFTName}
                                            onChange={(e) => setNFTName(e.target.value)}
                                            label={'NFT Name*'} width={'100%'}
                                            icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-name'} />
                                    </FlexRow>
                                    <SelectInput tabs={['bla', 'blaa', 'blaaa']} label={'NFT Collection *'}
                                        handleSelect={(e) => setNFTCollection(e.target.id)} value={NFTCollection}
                                        id="nft-collection-selection"
                                        width={'100%'} icon={<Icon url={CollIcon} w={27} h={27} />} />
                                    <MyInput value={NFTDescription}
                                        onChange={(e) => setNFTDescription(e.target.value)}
                                        label={'NFT Description*'} width={'100%'}
                                        icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-decription'} />
                                </FlexColumn>
                            </Container>
                            <Box sx={{
                                width: { xs: '100%', sm: '350px' }, mt: '32px', display: 'flex', justifyContent: 'center'
                            }}>
                                <ButtonPurple text={'Create'} w={'100%'} />
                            </Box>
                        </>
                        :
                        <>
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                NFT Contract Information
                            </Typography>
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '14px' } }}>
                                You Can Read Information About Each Field,By Click On The Icon, to Show/Hide The Information.
                            </Typography>

                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    New Collection Introduction
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                            <Typography sx={{ fontSize: '12px' }}>
                                                Type : &nbsp;
                                            </Typography>
                                            <Input color="primary.gray" style={{ outline: "none", fontSize: '12px' }} />
                                        </Box>
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput label={'Name *'} width={'100%'} icon={<TitleOutlined sx={{ color: 'primary.light' }} />
                                        } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput label={'Symbol *'} width={'100%'} icon={<EmojiSymbols sx={{ color: 'primary.light' }} />
                                        } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <ButtonInput label={'Cover Image *'} width={'100%'}
                                            icon={<ConnectedTvRounded sx={{ color: 'primary.light' }} />}
                                            button={<ButtonOutline
                                                height='35px'
                                                onClick={() => imageInput.current.click()}
                                                text={'Browse'}
                                                br={'30px'} />
                                            } />

                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput label={'Description *'} width={'100%'} icon={<DescriptionOutlined sx={{ color: 'primary.light' }} />
                                        } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                </FlexColumn>
                            </Container>
                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    The Collection Metadata
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <MyInput label={'Base URI *'} width={'100%'} icon={<LinkOutlined sx={{ color: 'primary.light' }} />
                                        } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Metadata Updatable *'} width={'100%'}
                                            icon={<List sx={{ color: 'primary.light' }} />
                                            }
                                            button={<BetweenTwoSelection
                                                color={'secondary.text'}
                                                options={[true, false]}
                                                id={'metaupdate-create-coll'}
                                                setOption={setMetadataUpdatable}
                                                selected={metadataUpdatable}
                                            />
                                            } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Metadata Addition *'} width={'100%'}
                                            icon={<AddBoxOutlined sx={{ color: 'primary.light' }} />
                                            }
                                            button={<Add sx={{ color: 'primary.gray' }} />
                                            } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                </FlexColumn>
                            </Container>
                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    The Collection Finance
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                            <Typography sx={{ fontSize: '12px' }}>
                                                Owner Address : &nbsp;
                                            </Typography>
                                            <Input color="primary.gray" style={{ outline: "none", fontSize: '12px' }} />
                                        </Box>
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Royalty Share *'} width={'100%'}
                                            icon={<Money sx={{ color: 'primary.light' }} />
                                            }
                                            button={<ArrowBack sx={{ color: 'primary.gray', fontSize: '18px' }} />
                                            } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Royalties Address *'} width={'100%'}
                                            icon={<AddBoxOutlined sx={{ color: 'primary.light' }} />
                                            }
                                            button={<Add sx={{ color: 'primary.gray' }} />
                                            } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                </FlexColumn>
                            </Container>
                            <Box sx={{
                                width: { xs: '100%', sm: '350px' }, mt: '32px', display: 'flex', justifyContent: 'center'
                            }}>
                                <ButtonPurple text={'Create'} w={'100%'} />
                            </Box>
                        </>
                    }


                </> :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '32px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.username}
                                &nbsp;
                            </b>
                            to create artworks, private or public galleries in youwho platform ,
                            you must create a youwho wallet first
                        </Typography>
                        <ButtonPurple text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }
        </Box >
    );
}

export default CreateNFT;