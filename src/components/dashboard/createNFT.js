import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MyInput, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { AspectRatio, BrandingWatermark, Description, Details, DetailsTwoTone, FileUpload, MovieCreation, NearMe } from "@mui/icons-material";
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
import { Coin } from "iconsax-react";

const Container = styled(Box)(({ theme }) => ({
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
    const [mediaType, setMediaType] = useState('image, .png')
    const [nftTypeValue, setNFTTypeValue] = useState('to be...')
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
    const [openCrop, setOpenCrop] = useState(false)
    const [tokenAmount, setTokenAmount] = useState(0)
    const [NFTName, setNFTName] = useState(null)
    const [NFTDescription, setNFTDescription] = useState(null)
    const [NFTCollection, setNFTCollection] = useState(null)
    const imageInput = useRef()
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const toastId = useRef(null);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: {xs:2,sm:4} }}>
            <SubTabs jc={'center'} mb={3}>
                <SubTab id={"create-collection"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Collection'} selected={activeTab == 'create-collection'} />
                <SubTab id={"create-NFT"} onClick={(e) => setActiveTab(e.target.id)} text={'Create NFT'} selected={activeTab == 'create-NFT'} />
            </SubTabs>
            {activeTab == 'create-NFT' ?
                <>
                    <Container>
                        <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                Upload Your NFT
                            </Typography>
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                You Can Upload NFT in Various Types & Sizes
                            </Typography>
                        </FlexColumn>
                        <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                            <FlexColumn sx={{
                                mr: { xs: 'unset', sm: 1 }, mb: { xs: 1, sm: 'unset' },
                                gap: { xs: '10px', sm: '16px' }
                            }}>
                                <FormControl sx={{ width: '100%' }}>
                                    <Icon url={MediaTypeIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                                    <InputLabel sx={{ color: 'primary.text' }} id="media-type-label">Your NFT Type</InputLabel>
                                    <Select
                                        displayEmpty
                                        sx={{ pl: '30px', fontSize: '15px', borderRadius: '12px', borderColor: 'primary.gray' }}
                                        labelId="media-type-label"
                                        id="demo-simple-select"
                                        value={mediaType}
                                        label="Your NFT Type"
                                        onChange={(e) => setMediaType(e.target.value)}
                                    >
                                        <MenuItem value={'image, .png'}>Image, .PNG</MenuItem>
                                        <MenuItem value={'image, .jpg'}>Image, .JPG</MenuItem>
                                        <MenuItem value={'video, .mp4'}>Video, .MP4</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box
                                    sx={{
                                        height: '56px',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        border: 1,
                                        borderColor: 'primary.gray',
                                        borderRadius: '12px',
                                        pl: '42px',
                                        pr: '12px',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Icon url={fileIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                                    <Typography sx={{ fontSize: '15px' }}>Upload NFT File <Typography sx={{ color: 'primary.main', display: 'inline-block' }}>*</Typography></Typography>
                                    <ButtonOutline
                                        onClick={() => imageInput.current.click()}
                                        text={'Browse'}
                                        br={'30px'} />
                                </Box>
                                <FormControl sx={{ width: '100%' }}>
                                    <Icon url={frameIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                                    <InputLabel sx={{ color: 'primary.text' }} id="media-type-label">Aspect Ratio</InputLabel>
                                    <Select
                                        displayEmpty
                                        sx={{
                                            borderColor: 'primary.gray',
                                            pl: '30px', fontSize: '15px', borderRadius: '12px',
                                        }}
                                        labelId="media-type-label"
                                        id="demo-simple-select"
                                        value={aspectRatio}
                                        label="Aspect Ratio"
                                        onChange={(e) => setAspectRatio(e.target.value)}
                                    >
                                        <MenuItem value={16 / 9}>16 : 9</MenuItem>
                                        <MenuItem value={1 / 1}>1:1</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* <Selection icon={<MovieCreation sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['mp4', 'svg', 'video']} id={'nft-type-selection'} handleSelect={handleSelect} selectValue={nftTypeValue} />
                                <Selection
                                    handleSelect={handleSelect}
                                    icon={<FileUpload sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['upload']}
                                    id={'file-upload-selection'} selectValue={'to be...'} />
                                <Selection icon={<AspectRatio sx={{ color: 'primary.light' }} />}
                                    width={'100%'} tabs={['16:9', '3x4', '24:24']} id={'aspect-ratio-selection'}
                                    handleSelect={handleAspRat} selectValue={'aspect ratio'} /> */}
                            </FlexColumn>
                            <NFTImage sx={{ ml: { xs: 'unset', sm: 1 } }} />
                        </FlexRow>
                    </Container>
                    <Container sx={{ mt: 4 }}>
                        <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                NFT Informations
                            </Typography>
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                Tell Us About Your NFT Details
                            </Typography>
                        </FlexColumn>
                        <FlexRow sx={{ gap: '12px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <MyInput value={tokenAmount}
                                    onChange={(e) => setTokenAmount(e.target.value)}
                                    label={'NFT Price'} width={'100%'}
                                    icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'} />
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <MyInput value={NFTName}
                                    onChange={(e) => setNFTName(e.target.value)}
                                    label={'NFT Name*'} width={'100%'}
                                    icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-name'} />
                            </FormControl>
                        </FlexRow>
                        <FormControl sx={{ width: '100%' }}>
                            <Icon url={CollIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                            <InputLabel sx={{ color: 'primary.text' }} id="media-type-label">NFT Collection*</InputLabel>
                            <Select
                                displayEmpty
                                sx={{
                                    pl: '30px', fontSize: '15px', borderRadius: '12px', borderColor: 'primary.gray',
                                }}
                                labelId="media-type-label"
                                id="demo-simple-select"
                                value={NFTCollection}
                                label="NFT Collection*"
                                onChange={(e) => setNFTCollection(e.target.value)}
                            >
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '100%' }}>
                            <MyInput value={NFTDescription}
                                onChange={(e) => setNFTDescription(e.target.value)}
                                label={'NFT Description*'} width={'100%'}
                                icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-decription'} />
                        </FormControl>

                    </Container>
                    <Box sx={{
                        width: '100%', mt: 3, display: 'flex', justifyContent: 'center'
                    }}>
                        <ButtonPurple text={'Create'} w={'50%'} />
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

                    <Container sx={{ mt: 3 }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                            New Collection Introduction
                        </Typography>
                        <Box sx={{ height: '300px' }}>to be...</Box>
                    </Container>
                </>
            }
        </Box>
    );
}

export default CreateNFT;