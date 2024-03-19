import { Box, Modal, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, setPrivateKey } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { API_CONFIG } from "../../config";
import generateSignature from "../../utils/signatureUtils";
import { ButtonInput, MyInput } from "../utils";
import { AddAPhotoOutlined, Close, Description, PriceChange, Subject } from "@mui/icons-material";
import ButtonOutline from "../buttons/buttonOutline";
import Crop from "../crop/Crop";
import styled from "@emotion/styled";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import nftImage from '../../assets/icons/upload-file.svg'
import ButtonPurple from "../buttons/buttonPurple";
const Container = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px', transition: '500ms ease',
    boxShadow: theme.palette.primary.boxShadow,
    "@media (max-width: 600px)": {
        padding: '8px',
        gap: '20px',
    },
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
const MediaImage = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
    borderRadius: '12px',
    width: '100%',
    cursor: 'pointer'
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
const CreatePVRoom = () => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [aspectRatio, setAspectRatio] = useState('16 : 9')
    const [openColCrop, setOpenColCrop] = useState(false)
    const [colPhotoURL, setColPhotoURL] = useState(null);
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const fetchUser = (accesstoken, pvkey) => dispatch(getuser(accesstoken, pvkey));
    const [GalResSent, setGalResSent] = useState(false)
    const [isGallSuccess, setIsGalSuccess] = useState(false)
    const [galleryName, setGalleryName] = useState(undefined)
    // const [gallerySubject, setgallerySubject] = useState(gallery.extra ? gallery.extra[0].gallery_subject : undefined)
    const [galleryDesc, setGalleryDesc] = useState(undefined)
    const [galleryFee, setGalleryFee] = useState(undefined)
    const [gallImageFile, setgallImageFile] = useState(null);
    const [gallPhotoURL, setgallPhotoURL] = useState(null);
    const [openGallCrop, setOpenGallCrop] = useState(false)
    const [galleryForm, setGalleryForm] = useState({
        gal_name: "",
        gal_description: "",
        owner_cid: globalUser.cid,
        extra: [],

    })

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }
    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }

    const navigate = useNavigate()
    const gallImageInput = useRef()
    const handleGallImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setgallImageFile(file);
            setgallPhotoURL(URL.createObjectURL(file));
            setOpenGallCrop(true);
        }
    };
    const handleGalFormChange = (e) => {
        if (e.target.type == 'number') {
            setGalleryForm(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        }
        else {
            setGalleryForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }
    const createGallery = async (galleryId) => {
        loading()
        setGalResSent(true)
        let extra = []
        extra.push({ entry_price: parseInt(galleryFee) })
        let data = {
            owner_cid: galleryForm.owner_cid,
            gal_name: galleryForm.gal_name,
            gal_description: galleryForm.gal_description,
            extra: galleryFee ? extra : null
        }
        let { requestData } = generateSignature(globalUser.privateKey, data)
        console.log(JSON.stringify(requestData))
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/create`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('updat resp?', response);

        if (!response.is_error) {
            setGalResSent(false)
            updateToast(true, response.message)
            if (gallImageFile) {
                uploadGalleryBackground(response.data)
            }
        } else {
            setGalResSent(false)
            updateToast(false, response.message)
        }

    }
    const uploadGalleryBackground = async (resData) => {
        loading();
        setGalResSent(true)

        const myFile = new File([gallImageFile], 'image.jpeg', {
            type: gallImageFile.type,
        });

        const formData = new FormData();
        formData.append('img', myFile)

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/${resData.id}/upload/background`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            updateToast(true, response.message)
            setGalResSent(false)
            setIsGalSuccess(true)

        } else {
            setGalResSent(false)
            updateToast(false, response.message)
        }
    }

    return (<Box sx={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
    }}>
        {globalUser.cid ?
            <>
                {globalUser.privateKey ?
                    <>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                            New Room In Private Gallery
                        </Typography>
                        <Typography sx={{ color: 'secondary.text', textTransform: 'capitalize', fontSize: { xs: '12px', sm: '14px' } }}>
                            Private Rooms can include unlimited number of medias
                        </Typography>

                        <Container sx={{ mt: '24px', }}>
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                Private Room Information
                            </Typography>
                            <FlexColumn sx={{ width: '100%', gap: { xs: '12px', md: '16px' } }}>
                                <MyInput name={'gal_name'} label={'Gallery Name'} width={'100%'}
                                    icon={<Subject sx={{ color: 'primary.light' }} />}
                                    onChange={handleGalFormChange}
                                    value={galleryForm.gal_name}
                                />

                                {/* <MyInput name={'gallery-subject'} label={'Gallery subject'} width={'100%'}
        icon={<Subject sx={{ color: 'primary.light' }} />}
        onChange={(e) => setgallerySubject(e.target.value)}
        value={gallerySubject}
    /> */}

                                <MyInput name={'gallery-price'} type={'number'} label={'Entrance Fee'} width={'100%'}
                                    icon={<PriceChange sx={{ color: 'primary.light' }} />}
                                    onChange={(e) => setGalleryFee(e.target.value)}
                                    value={galleryFee}
                                />
                                <ButtonInput showable={gallPhotoURL ? <Box onClick={() => gallImageInput.current.click()}
                                    sx={{
                                        borderRadius: '12px', width: '100px', height: '35px', background: () => {
                                            return (
                                                gallPhotoURL
                                                    ? `url('${gallPhotoURL}') no-repeat center`
                                                    : `url('${nftImage}') no-repeat center`
                                            )
                                        },
                                        backgroundSize: 'contain',
                                        backgroundColor: 'primary.bg',
                                        aspectRatio: () => aspectRatio == '16 : 9' ? 16 / 9 : 1,
                                    }} /> : undefined} label={'Cover Image'} width={'100%'}
                                    icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                    button={<ButtonOutline
                                        height='35px'
                                        onClick={() => gallImageInput.current.click()}
                                        text={'Browse'}
                                        br={'30px'}
                                    />
                                    } />
                                <input
                                    accept="image/*"
                                    id="nftPhoto"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleGallImageChange}
                                    ref={gallImageInput}
                                />
                                <MyInput name={'gal_description'}
                                    label={'Gallery Description'} width={'100%'}
                                    icon={<Description sx={{ color: 'primary.light' }} />}
                                    onChange={handleGalFormChange}
                                    value={galleryForm.gal_description}
                                />

                            </FlexColumn>
                        </Container>


                        <Modal
                            open={openGallCrop}
                            onClose={() => setOpenGallCrop(false)}
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
                                            setOpenGallCrop(false)
                                        }}>
                                            <Close sx={{ cursor: 'pointer' }} />
                                        </div>
                                    </FlexRow>

                                    <Crop imageURL={gallPhotoURL}
                                        // aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1}
                                        setOpenCrop={setOpenGallCrop}
                                        setFile={setgallImageFile}
                                        setPhotoURL={setgallPhotoURL} />
                                </Box>
                            </Box>
                        </Modal>
                        <Box sx={{
                            width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                        }}>
                            <ButtonPurple
                                text={'Create'}
                                w={'100%'}
                                onClick={!Object.values(galleryForm).every(value => value !== null && value !== "") || !gallImageFile || !galleryFee || GalResSent ? undefined : createGallery}
                                disabled={!Object.values(galleryForm).every(value => value !== null && value !== "") || !galleryFee || !gallImageFile || GalResSent}
                            />
                        </Box>
                    </>
                    :
                    <Container sx={{ mb: '24px' }}>
                        <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                            We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                        </Typography>
                        <MyInput
                            value={signer}
                            onChange={(e) => setSigner(e.target.value)}
                            placeholder="enter private key"
                            width={'100%'}
                            textColor={'black'}
                            py={'8px'} />
                        <ButtonPurple onClick={savePrivateKey} height='35px' text={'Save'} />
                    </Container>
                }

            </> :
            // if didnt create wallet yet =======>
            <>
                <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        Dear
                        <b>
                            &nbsp;
                            {globalUser.mail}
                            &nbsp;
                        </b>
                        to create artworks, private or public galleries in youwho platform ,
                        you must create a youwho wallet first
                    </Typography>
                    <ButtonPurple text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                </FlexColumn>
            </>
        }
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
    </Box >

    );
}

export default CreatePVRoom;