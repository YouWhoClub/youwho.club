import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { AspectRatio, FileUpload, MovieCreation } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import nftImage from '../../assets/sokhabi-nft.svg'
import ButtonPurple from "../buttons/buttonPurple";

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
    height: '200px'
}))

const CreateNFT = () => {
    const [activeTab, setActiveTab] = useState('create-NFT')
    const globalUser = useSelector(state => state.userReducer)
    const [nftTypeValue, setNFTTypeValue] = useState('to be...')
    const [aspetValue, setAspectValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const handleSelect = (e) => {
        e.preventDefault()
        setSelectValue(e.target.id)
    }
    const handleAspRat = (e) => {
        e.preventDefault()
        setAspectValue(e.target.id)
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: 3 }}>
            <SubTabs jc={'center'} mb={3}>
                <SubTab id={"create-collection"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Collection'} selected={activeTab == 'create-collection'} />
                <SubTab id={"create-NFT"} onClick={(e) => setActiveTab(e.target.id)} text={'Create NFT'} selected={activeTab == 'create-NFT'} />
            </SubTabs>
            {activeTab == 'create-NFT' ?
                <>
                    <Container>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                            Upload Your NFT
                        </Typography>
                        <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                            You Can Upload NFT in Various Types & Sizes
                        </Typography>
                        <FlexRow>
                            <FlexColumn sx={{ mr: 1 }}>
                                <Selection icon={<MovieCreation sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['mp4', 'svg', 'video']} id={'nft-type-selection'} handleSelect={handleSelect} selectValue={nftTypeValue} />
                                <Selection
                                    handleSelect={handleSelect}
                                    icon={<FileUpload sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['upload']}
                                    id={'file-upload-selection'} selectValue={'to be...'} />
                                <Selection icon={<AspectRatio sx={{ color: 'primary.light' }} />}
                                    width={'100%'} tabs={['16:9', '3x4', '24:24']} id={'aspect-ratio-selection'}
                                    handleSelect={handleAspRat} selectValue={'aspect ratio'} />
                            </FlexColumn>
                            <NFTImage sx={{ ml: 1 }} />
                        </FlexRow>
                    </Container>
                    <Container sx={{ mt: 4 }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                            NFT Informations
                        </Typography>
                        <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                            Tell Us About Your NFT Details
                        </Typography>
                        <FlexRow>
                            <Selection
                                icon={<MovieCreation sx={{ color: 'primary.light' }} />}
                                width={'100%'} tabs={['nft price']} id={'nft-price'}
                                handleSelect={handleSelect} selectValue={'to be...'} />
                            <Selection handleSelect={handleSelect} icon={<FileUpload sx={{ color: 'primary.light' }} />}
                                width={'100%'} tabs={['nft name']} id={'nft-name'} selectValue={'to be...'} />
                        </FlexRow>
                        <Selection
                            icon={<MovieCreation sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['nft collection']} id={'nft-coll'}
                            handleSelect={handleSelect} selectValue={'to be...'} />
                        <Selection
                            icon={<MovieCreation sx={{ color: 'primary.light' }} />} width={'100%'} tabs={['nft desciption']} id={'nft-des'}
                            handleSelect={handleSelect} selectValue={'to be...'} />
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
                    </Container>
                </>
            }
        </Box>
    );
}

export default CreateNFT;