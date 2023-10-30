import React, { useEffect, useState } from 'react'
import { DialogContent, DialogActions, Box, Typography, Slider, Button } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import CropIcon from '@mui/icons-material/Crop'
import Cropper from 'react-easy-crop'
import getCroppedImg from './utils/cropImage'

function Crop({ imageURL, aspectRatio, setOpenCrop, setFile, setPhotoURL }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    // const getAspectRatio = () => {
    //     const ar = aspectRatio === '16/9' ? 16 / 9 : 1 / 1
    //     console.log(aspectRatio, ar);
    //     return ar
    // }


    const handleCropImage = async () => {
        try {
            const {file, url} = await getCroppedImg(imageURL, croppedAreaPixels, rotation)
            setFile(file)
            setPhotoURL(url)
            setOpenCrop(false)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <DialogContent dividers
                sx={{
                    background: '#333',
                    position: 'relative',
                    height: 400,
                    width: 'auto',
                    minWidth: { sm: 500 }
                }}
            >
                <Cropper
                    image={imageURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspectRatio}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                <Box sx={{ width: '100px', mb: 1 }}>
                    <Box>
                        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                        <Slider
                            valueLabelDisplay='auto'
                            valueLabelFormat={zoomPercent}
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />
                    </Box>
                    <Box>
                        <Typography>Rotation: {rotation}</Typography>
                        <Slider
                            valueLabelDisplay='auto'
                            min={0}
                            max={360}
                            value={rotation}
                            onChange={(e, rotation) => setRotation(rotation)}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: `100%`,
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap'
                        }}>
                        <Button
                            variant='outlined'
                            startIcon={<Cancel />}
                            onClick={() => setOpenCrop(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<CropIcon />}
                            onClick={handleCropImage}
                        >
                            Crop
                        </Button>
                    </Box>
                </Box>
            </DialogActions>
        </>
    )
}

export default Crop

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`
}