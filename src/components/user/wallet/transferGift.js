import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Modal } from "@mui/material";
import { Close } from '@mui/icons-material'
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import MediaTypeIcon from '../../../assets/icons/media-type.svg'
import frameIcon from '../../../assets/icons/frame.svg'
import fileIcon from '../../../assets/icons/upload-file.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import Crop from '../../crop/Crop'
import { MyInput } from '../../utils'
import ButtonOutline from '../../buttons/buttonOutline'



const Card = styled(Box)(({ theme }) => ({
    width: '670px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow
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
const Button = styled('button')(({ theme }) => ({
    backgroundColor: '#7C42C7',
    padding: '12px 36px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontFamily: `"Josefin Sans", "Inter", sans-serif`,
    fontSize: '16px'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))

const TransferGift = () => {
    const [mediaType, setMediaType] = useState('image, .png')
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
    const [openCrop, setOpenCrop] = useState(false)
    const imageInput = useRef()
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', p: '10px' }}>
                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '26px', lineHeight: 'normal', fontWeight: '400' }}>Transfer NFT Gift</Typography>
                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '16px', lineHeight: 'normal', fontWeight: '400' }}>Create Nft, Then Transfer It To Your Friend As A NFT Gift !</Typography>
            </Box>

            <Card>
                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>Upload Your NFT</Typography>
                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '12px', lineHeight: 'normal', fontWeight: '400' }}>You Can Upload NFT in Various Types & Sizes</Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', p: '10px' }}>
                        <FormControl sx={{ width: '314px' }}>
                            <Icon url={MediaTypeIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                            <InputLabel sx={{ color: '#000' }} id="media-type-label">Your NFT Type</InputLabel>
                            <Select
                                displayEmpty
                                sx={{ pl: '30px', fontSize: '15px' }}
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
                        <input
                            accept="image/*"
                            id="profilePhoto"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                            ref={imageInput}
                        />
                        <Box
                            sx={{
                                height: '56px',
                                width: '314px',
                                boxSizing: 'border-box',
                                border: 1,
                                borderColor: 'primary.gray',
                                borderRadius: 1,
                                pl: '42px',
                                pr: '12px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Icon url={fileIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                            <Typography sx={{ fontSize: '15px' }}>Upload NFT File</Typography>
                            <ButtonOutline
                                onClick={() => imageInput.current.click()}
                                text={'Browse'} />
                        </Box>
                        <FormControl sx={{ width: '314px' }}>
                            <Icon url={frameIcon} w={27} h={27} sx={{ position: 'absolute', top: '12px', left: '10px', }} />
                            <InputLabel sx={{ color: '#000' }} id="media-type-label">Aspect Ratio</InputLabel>
                            <Select
                                displayEmpty
                                sx={{ pl: '30px', fontSize: '15px' }}
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
                    </Box>
                    <Box
                        sx={{
                            width: `${aspectRatio === 16 / 9 ? 314 : 176}px`,
                            aspectRatio: `${aspectRatio}`,
                            borderRadius: '12px',
                            backgroundColor: 'primary.gray',
                            cursor: 'pointer',
                            background: () => {
                                return (
                                    photoURL
                                        ? `url('${photoURL}') no-repeat center`
                                        : 'primary.gray'
                                )
                            },
                            backgroundSize: 'cover'
                        }}
                        onClick={() => imageInput.current.click()}
                    ></Box>
                </Box>

                <Modal
                    open={openCrop}
                    onClose={() => setOpenCrop(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Box sx={{
                            borderRadius: '24px',
                            width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                            backgroundColor: 'secondary.bg',
                            display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                        }}>
                            <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                                <Typography>Crop</Typography>
                                <div onClick={() => {
                                    setOpenCrop(false)
                                }}>
                                    <Close sx={{ cursor: 'pointer' }} />
                                </div>
                            </FlexRow>
                            <Crop imageURL={photoURL} aspectRatio={aspectRatio} setOpenCrop={setOpenCrop} setFile={setFile} setPhotoURL={setPhotoURL} />
                        </Box>
                    </Box>
                </Modal>
            </Card >
        </Box >
    );
}

export default TransferGift;