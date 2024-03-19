import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, setPrivateKey } from "../../redux/actions";
import { AscSelect, BetweenTwoSelection, ButtonInput, LilDescription, MyInput, SelectInput, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { Add, AddAPhotoOutlined, Close, AddBoxOutlined, BrandingWatermark, CommentOutlined, ConnectedTvRounded, Description, DescriptionOutlined, EmojiSymbols, LinkOutlined, List, Money, TitleOutlined, Percent, AddReaction, CheckOutlined, Square, PriceChange, Subject } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import nftImage from '../../assets/icons/upload-file.svg'
import ButtonPurple from "../buttons/buttonPurple";
import MediaTypeIcon from '../../assets/icons/media-type.svg'
import ButtonOutline from "../buttons/buttonOutline";
import frameIcon from '../../assets/icons/frame.svg'
import CollIcon from '../../assets/icons/collectionIcon.svg'
import { Coin, Link } from "iconsax-react";
import Crop from '../crop/Crop'
import { Input } from "@mui/base";
import { useNavigate } from "react-router";
import { API_CONFIG } from "../../config";
import { toast, ToastContainer } from 'react-toastify';
import generateSignature from "../../utils/signatureUtils";


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


const CreateMedia = ({ setMainActiveTab }) => {
    const [activeTab, setActiveTab] = useState('create-media')
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [galleryId, setGalleryId] = useState(null)
    const [privateCollection, setPrivateCollection] = useState([])
    const [mediaType, setMediaType] = useState(undefined)
    const [aspectRatio, setAspectRatio] = useState('16 : 9')
    const [openColCrop, setOpenColCrop] = useState(false)
    const [openMediaCrop, setOpenMediaCrop] = useState(false)
    const colImageInput = useRef()
    const [colImageFile, setColImageFile] = useState(null);
    const [colPhotoURL, setColPhotoURL] = useState(null);
    const MediaImageInput = useRef()
    const [MediaImageFile, setMediaImageFile] = useState(null);
    const [MediaPhotoURL, setMediaPhotoURL] = useState(null);
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const [isGallSuccess, setIsGalSuccess] = useState(false)
    const [isMediaSuccses, setIsMediaSuccses] = useState(false)
    const [colId, setColId] = useState(undefined)
    const fetchUser = (accesstoken, pvkey) => dispatch(getuser(accesstoken, pvkey));
    const [royaltyShare, setRoyaltyShare] = useState(0)
    const [MediaReqSent, setMediaReqSent] = useState(false)
    const [GalResSent, setGalResSent] = useState(false)
    const [galleryName, setGalleryName] = useState(undefined)
    // const [gallerySubject, setgallerySubject] = useState(gallery.extra ? gallery.extra[0].gallery_subject : undefined)
    const [galleryDesc, setGalleryDesc] = useState(undefined)
    const [galleryFee, setGalleryFee] = useState(undefined)
    const [galleryBG, setGalleryBG] = useState(undefined)
    const [gallImageFile, setgallImageFile] = useState(null);
    const [gallPhotoURL, setgallPhotoURL] = useState(null);
    const [openGallCrop, setOpenGallCrop] = useState(false)
    const [pvGalleries, setpvGalleries] = useState([])
    const [galleryForm, setGalleryForm] = useState({
        gal_name: "",
        gal_description: "",
        owner_cid: "",
        extra: [],

    })
    const [MediaForm, setMediaForm] = useState({
        caller_cid: "",
        amount: null,
        contract_address: "",
        current_owner_screen_cid: "",
        Media_name: "",
        current_price: null,
        col_id: null,
        gal_id: null,
        NFT_name: "",
        NFT_description: "",
        Media_description: "",
        extra: [],
        attributes: [],
    })
    useEffect(() => {
        if (globalUser.YouWhoID) {
            // getGasFee()
            getPrivateGallery()
        }
    }, [globalUser.YouWhoID])
    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
    }, [])
    useEffect(() => {
        if (galleryId) {
            getPrivateCollection()
        }
    }, [galleryId])
    useEffect(() => {
        setMediaForm(prev => ({
            ...prev,
            caller_cid: globalUser.cid,
            current_owner_screen_cid: globalUser.YouWhoID,
        }))
        setGalleryForm(prev => ({
            ...prev,
            owner_cid: globalUser.cid,
        }))

    }, [globalUser.cid, globalUser.YouWhoID])
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
    const handleSelectMediaType = (e) => {
        e.preventDefault()
        setMediaType(e.target.id)
    }
    const navigate = useNavigate()
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
    const handleMediaImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaImageFile(file);
            setMediaPhotoURL(URL.createObjectURL(file));
            setOpenMediaCrop(true);
        }
    };
    const handleMetadataChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMetadata = [...galleryForm.extra];

        if (isNaN(value) || name !== 'value')
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: value };
        else
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: Number(value) };


        setGalleryForm((prev) => ({
            ...prev,
            extra: updatedMetadata,
        }));
    };
    const handleAttributesChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAttributes = [...MediaForm.attributes];

        if (isNaN(value) || name !== 'value')
            updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
        else
            updatedAttributes[index] = { ...updatedAttributes[index], [name]: Number(value) };


        setMediaForm((prev) => ({
            ...prev,
            attributes: updatedAttributes,
        }));
    };
    const handleMediaFormChange = (e) => {
        if (e.target.type == 'number')
            setMediaForm(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        else
            setMediaForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
    }
    // const getGasFee = async () => {
    //     let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get-gas-fee`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${globalUser.token}`,
    //         }
    //     })
    //     let response = await request.json()

    //     if (!response.is_error) {
    //         setGalleryForm(prev => ({ ...prev, amount: response.data }))
    //         setMediaForm(prev => ({ ...prev, amount: response.data }))
    //     } else {
    //         console.log(response.message)
    //     }
    // }
    const getPrivateGallery = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            setpvGalleries(response.data)
        } else {
            console.log(response.message)
        }
    }
    const getPrivateCollection = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/get/all/private/in-gallery/${galleryId}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response, 'colls')

        if (!response.is_error) {
            setPrivateCollection(response.data)
        } else {
            console.log(response.message)
        }
    }
    const uploadGalleryBackground = async (resData) => {
        loading();

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
            setIsGalSuccess(true)

        } else {
            updateToast(false, response.message)
        }
    }
    const createGallery = async (galleryId) => {
        loading()
        let extra = []
        extra.push({ entry_price: parseInt(galleryFee) })
        let data = {
            owner_cid: globalUser.cid,
            gal_name: galleryName,
            gal_description: galleryDesc,
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
            updateToast(true, response.message)
            if (gallImageFile) {
                uploadGalleryBackground()
            }
        } else {
            updateToast(false, response.message)
        }

    }
    const createMedia = async () => {
        loading();
        setMediaReqSent(true)
        if (globalUser.privateKey) {
            let data = {}

            if (MediaForm.extra.length == 0) {
                data = { ...MediaForm, extra: null }
            } else {
                data = { ...MediaForm, extra: JSON.stringify(MediaForm.extra) }
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            console.log(requestData)
            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/Media/create`, {
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
                createMediaMetadataUri(response.data)
                setMediaForm(prev => ({
                    ...prev,
                    contract_address: "",
                    col_id: null,
                    gal_id: null,
                    NFT_name: "",
                    NFT_description: "",
                    Media_description: "",
                    current_price: null,
                    extra: [],
                    attributes: [],
                }))
                setMediaReqSent(false)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
                setMediaReqSent(false)

            }
        } else {
            setMediaReqSent(false)
            updateToast(false, 'please save your private key first')
        }
    }
    const createMediaMetadataUri = async MediaObject => {
        loading();

        if (globalUser.privateKey) {

            const myFile = new File([MediaImageFile], 'image.jpeg', {
                type: MediaImageFile.type,
            });

            const formData = new FormData();
            formData.append('img', myFile)

            const keyValuePairs = [
                ['caller_cid', globalUser.cid],
                ['amount', 0],
                ['col_id', MediaForm.col_id],
                ['Media_id', MediaObject.id],
                ['Media_new_attributes', JSON.stringify(MediaObject.attributes)],
                ['Media_new_extra', JSON.stringify(MediaObject.extra)],
                ['Media_new_name', MediaObject.Media_name],
                ['Media_new_description', MediaObject.Media_description],
            ]

            keyValuePairs.forEach(([key, value]) => {
                formData.append(key, value);
            });


            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, formData);

            formData.append('tx_signature', requestData.tx_signature);
            formData.append('hash_data', requestData.hash_data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/Media/create/metadata-uri`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (!response.is_error) {
                updateToast(true, response.message)
                setIsMediaSuccses(true)
                fetchUser(globalUser.token, globalUser.privateKey)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const [pvRoom, setPVRoom] = useState(undefined)
    const [descColDesc, setDescColDesc] = useState(false)
    const [descColName, setDescColName] = useState(false)
    const [descColSymbol, setDescColSymbol] = useState(false)
    const [descColCover, setDescColCover] = useState(false)
    const [descColType, setDescColType] = useState(false)
    const [descownerAdd, setDescOwnerAdd] = useState(false)
    const [descRoyaltyShare, setDescRoyaltyShare] = useState(false)
    const [descRoyaltyAdd, setDescRoyaltyAdd] = useState(false)
    const [descMediametadata, setDescMediametadata] = useState(false)
    const [descMediaPrice, setDescMediaPrice] = useState(false)
    const [descMediaName, setDescMediaName] = useState(false)
    const [descMediaCol, setDescMediaCol] = useState(false)
    const [descMediaDesc, setDescMediaDesc] = useState(false)
    const [IsForMint, setIsForMint] = useState(false)
    const gallImageInput = useRef()
    const handleGallImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setgallImageFile(file);
            setgallPhotoURL(URL.createObjectURL(file));
            setOpenGallCrop(true);
        }
    };
    useEffect(() => {
        if (pvRoom) {
            console.log(pvRoom)
            setMediaForm(prev => ({ ...prev, gal_id: pvRoom[0].id }))
        }
    }, [pvRoom])
    useEffect(() => {

        console.log(MediaForm)
    }, [MediaForm])
    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
        }}>
            {globalUser.cid ?
                <>
                    {globalUser.privateKey ?
                        <>
                            {/* <SubTabs jc={'center'} mb={'24px'}>
                                <SubTab id={"create-private-room"}
                                    onClick={(e) => {
                                        setActiveTab(e.target.id)
                                        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
                                    }}
                                    text={'Create Private Room'}
                                    selected={activeTab == 'create-private-room'} />
                                <SubTab id={"create-media"}
                                    onClick={(e) => {
                                        setActiveTab(e.target.id)
                                        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
                                    }}
                                    text={'Create Media'} selected={activeTab == 'create-media'} />
                            </SubTabs> */}
                            {activeTab == 'create-media' ?
                                <>
                                    <Container sx={{ mb: '24px' }}>
                                        <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                                Upload Your Media
                                            </Typography>
                                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                                You Can Upload Media in Various Types & Sizes
                                            </Typography>
                                        </FlexColumn>
                                        <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                            <FlexColumn sx={{
                                                gap: { xs: '10px', sm: '16px' }
                                            }}>
                                                <ButtonInput label={'Upload Media File *'} width={'100%'}
                                                    icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                                    button={<ButtonOutline
                                                        height='35px'
                                                        onClick={() => MediaImageInput.current.click()}
                                                        text={'Browse'}
                                                        br={'30px'}
                                                    />
                                                    } />
                                                <input
                                                    accept="image/*"
                                                    id="MediaPhoto"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleMediaImageChange}
                                                    ref={MediaImageInput}
                                                />
                                                <SelectInput tabs={pvGalleries.map(gal => (gal.gal_name))} label={'Private Room'}
                                                    handleSelect={(e) => setPVRoom(pvGalleries.filter(gal => gal.gal_name == e.target.id))}
                                                    value={MediaForm.gal_id ? pvGalleries.filter(gal => gal.id == MediaForm.gal_id)[0].gal_name : ''}
                                                    id="Media-room-selection"
                                                    width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />

                                                {/* <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                                    handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="Media-aspect-ratio-selection"
                                                    width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} /> */}
                                            </FlexColumn>
                                            <MediaImage
                                                onClick={() => MediaImageInput.current.click()}
                                                sx={{
                                                    background: () => {
                                                        return (
                                                            MediaPhotoURL
                                                                ? `url('${MediaPhotoURL}') no-repeat center`
                                                                : `url('${nftImage}') no-repeat center`
                                                        )
                                                    },
                                                    aspectRatio: () => aspectRatio == '16 : 9' ? 16 / 9 : 1,
                                                }}
                                            />
                                        </FlexRow>
                                        <FlexColumn sx={{ gap: '12px' }}>
                                            <FlexRow>
                                                <MyInput
                                                    value={MediaForm.Media_description}
                                                    height={'auto'}
                                                    multiline={true}
                                                    name={"Media_description"}
                                                    onChange={handleMediaFormChange}
                                                    label={'Description*'} width={'100%'}
                                                    icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'NFT-decription'}
                                                />
                                                <CommentOutlined
                                                    onClick={() => setDescMediaDesc(!descMediaDesc)}
                                                    sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                            </FlexRow>
                                            {descMediaDesc &&
                                                <LilDescription id={'media-desc-desc'} width={'100%'}>
                                                    <Box sx={{
                                                        display: 'flex', alignItems: 'center'
                                                    }}>
                                                        <Typography sx={{
                                                            fontSize: '12px',
                                                            color: 'primary.text', textTransform: 'capitalize'
                                                        }}>
                                                            Description of your media
                                                        </Typography>
                                                    </Box>
                                                </LilDescription>}
                                        </FlexColumn>
                                        <FlexRow sx={{ justifyContent: 'start !important', gap: '4px', pb: '4px' }}>
                                            <Box onClick={() => setIsForMint(!IsForMint)} sx={{
                                                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                borderRadius: '4px', border: IsForMint ? 'none' : '1px solid', borderColor: 'primary.main',
                                                backgroundColor: IsForMint ? 'primary.main' : 'secondary.bg', width: '18px', height: '18px'
                                            }}>
                                                {IsForMint &&
                                                    <CheckOutlined sx={{ color: 'white', fontSize: '12px' }} />
                                                }

                                            </Box>
                                            <Typography
                                                sx={{ color: 'primary.gray', fontWeight: 400, textTransform: 'capitalize', fontSize: '12px' }}>
                                                put for mint</Typography>
                                        </FlexRow>
                                    </Container>
                                    {IsForMint &&
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
                                                <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px', alignItems: 'start !important' }}>
                                                    <FlexColumn sx={{ gap: '8px' }}>
                                                        <FlexRow>
                                                            <MyInput
                                                                value={MediaForm.current_price}
                                                                name={"current_price"}
                                                                onChange={handleMediaFormChange}
                                                                label={'NFT Price'} width={'100%'}
                                                                icon={<Coin color="#BEA2C5" />} type={'number'} id={'NFT-price'}
                                                            />
                                                            <CommentOutlined
                                                                onClick={() => setDescMediaPrice(!descMediaPrice)}
                                                                sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                        </FlexRow>
                                                        {descMediaPrice &&
                                                            <LilDescription id={'NFT-mtdt-desc'} width={'100%'}>
                                                                <Box sx={{
                                                                    display: 'flex', alignItems: 'center'
                                                                }}>
                                                                    <Typography sx={{
                                                                        fontSize: '12px',
                                                                        color: 'primary.text', textTransform: 'capitalize'
                                                                    }}>
                                                                        price for minting the NFT
                                                                    </Typography>
                                                                </Box>
                                                            </LilDescription>}

                                                    </FlexColumn>
                                                    <FlexColumn sx={{ gap: '8px' }}>
                                                        <FlexRow>
                                                            <MyInput
                                                                value={MediaForm.Media_name}
                                                                name={"Media_name"}
                                                                onChange={handleMediaFormChange}
                                                                label={'NFT Name*'} width={'100%'}
                                                                icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'Media-name'}
                                                            />
                                                            <CommentOutlined
                                                                onClick={() => setDescMediaName(!descMediaName)}
                                                                sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                        </FlexRow>
                                                        {descMediaName &&
                                                            <LilDescription id={'NFT-mtdt-desc'} width={'100%'}>
                                                                <Box sx={{
                                                                    display: 'flex', alignItems: 'center'
                                                                }}>
                                                                    <Typography sx={{
                                                                        fontSize: '12px',
                                                                        color: 'primary.text', textTransform: 'capitalize'
                                                                    }}>
                                                                        Name of your NFT
                                                                    </Typography>
                                                                </Box>
                                                            </LilDescription>}

                                                    </FlexColumn>
                                                </FlexRow>
                                                <FlexColumn sx={{ gap: '12px' }}>
                                                    <FlexRow>
                                                        <MyInput
                                                            value={MediaForm.NFT_description}
                                                            name={"NFT_description"}
                                                            onChange={handleMediaFormChange}
                                                            label={'NFT Description*'} width={'100%'}
                                                            icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'NFT-decription'}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescMediaDesc(!descMediaDesc)}
                                                            sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descMediaDesc &&
                                                        <LilDescription id={'NFT-desc-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Description of your NFT
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>

                                                <FlexColumn sx={{ mb: '16px', gap: '12px' }}>
                                                    <FlexRow >
                                                        <ButtonInput label={'Metadata Addition *'} width={'100%'}
                                                            icon={<AddBoxOutlined
                                                                sx={{ color: 'primary.light' }}
                                                            />
                                                            }
                                                            button={<Add sx={{ color: 'primary.gray' }}
                                                                onClick={() => setMediaForm((prev) => ({ ...prev, attributes: [...prev.attributes, { trait_type: "", value: "" }] }))}
                                                            />
                                                            } />
                                                        <CommentOutlined
                                                            onClick={() => setDescMediametadata(!descMediametadata)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descMediametadata &&
                                                        <LilDescription id={'Media-mtdt-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Media metadata is the sum of all data that describes an Media,
                                                                    typically including its name, traits, trait rarity, link to
                                                                    the hosted image, total supply, transaction history,
                                                                    and other essential data
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>
                                                {
                                                    MediaForm.attributes.map((object, index) => {
                                                        return (<FlexRow key={index} sx={{ mb: '16px' }}>
                                                            <span>{index + 1}</span>
                                                            <MyInput name={'trait_type'} label={'Trait Type'} width={'40%'}
                                                                onChange={(e) => handleAttributesChange(e, index)}
                                                                value={object.trait_type}
                                                            />
                                                            <MyInput name={'value'} label={'Value'} width={'40%'}
                                                                onChange={(e) => handleAttributesChange(e, index)}
                                                                value={object.value}
                                                            />
                                                        </FlexRow>)
                                                    })
                                                }
                                            </FlexColumn>
                                            {
                                                isMediaSuccses &&
                                                <Container sx={{ flexDirection: 'row', mt: '24px' }}>
                                                    <FlexRow sx={{ gap: '40px' }}>
                                                        <MediaImage
                                                            sx={{
                                                                background: `url(${MediaPhotoURL})`,
                                                                aspectRatio: '16 / 9',
                                                            }}
                                                        />
                                                        <FlexColumn sx={{ height: '100%', gap: '16px', justifyContent: 'space-between' }}>
                                                            <Typography sx={{ color: '#3DCA64', fontSize: { xs: '18px', sm: '22px' }, width: '100%' }}>
                                                                Media Was Created Successfully
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '12px', width: '100%' }}>
                                                                Created Media Goes To “ Profile , Private Gallery ”.
                                                            </Typography>
                                                            <ButtonPurple
                                                                text={'Go To Private Gallery'}
                                                                w={'100%'}
                                                                onClick={() => {
                                                                    setMainActiveTab("private-gallery-tab")
                                                                    setIsMediaSuccses(false)
                                                                }}
                                                            />
                                                        </FlexColumn>
                                                    </FlexRow>
                                                </Container>
                                            }
                                        </Container>}
                                    <Modal
                                        open={openMediaCrop}
                                        onClose={() => setOpenMediaCrop(false)}
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
                                                        setOpenMediaCrop(false)
                                                    }}>
                                                        <Close sx={{ cursor: 'pointer' }} />
                                                    </div>
                                                </FlexRow>
                                                <Crop imageURL={MediaPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenMediaCrop} setFile={setMediaImageFile} setPhotoURL={setMediaPhotoURL} />
                                            </Box>
                                        </Box>
                                    </Modal>
                                    <Box sx={{
                                        width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                                    }}>
                                        <ButtonPurple
                                            text={'Create'}
                                            w={'100%'}
                                            disabled={!Object.values(MediaForm).every(value => value !== null && value !== "") || !MediaForm.attributes.length || !MediaImageFile || MediaReqSent}
                                            onClick={!Object.values(MediaForm).every(value => value !== null && value !== "") || !MediaForm.attributes.length || !MediaImageFile || MediaReqSent ? undefined : createMedia}
                                        />
                                    </Box>
                                </>
                                : // ____________________________________________________________________
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
                                            <ButtonInput label={'Cover Image'} width={'100%'}
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

                                    <Modal
                                        open={openColCrop}
                                        onClose={() => setOpenColCrop(false)}
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
                                                        setOpenColCrop(false)
                                                    }}>
                                                        <Close sx={{ cursor: 'pointer' }} />
                                                    </div>
                                                </FlexRow>
                                                <Crop imageURL={colPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenColCrop} setFile={setgallImageFile} setPhotoURL={setColPhotoURL} />
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
                            }
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

export default CreateMedia;