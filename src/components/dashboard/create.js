import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, setPrivateKey } from "../../redux/actions";
import { AscSelect, BetweenTwoSelection, ButtonInput, LilDescription, MyInput, SelectInput, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { Add, AddAPhotoOutlined, Close, AddBoxOutlined, BrandingWatermark, CommentOutlined, ConnectedTvRounded, Description, DescriptionOutlined, EmojiSymbols, LinkOutlined, List, Money, TitleOutlined, Percent, AddReaction, PriceChange, Subject, CheckOutlined } from "@mui/icons-material";
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
import CreatePVRoom from "./createPVRoom";
const MediaImage = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
    borderRadius: '12px',
    width: '100%',
    cursor: 'pointer'
}))

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
const NFTImage = styled(Box)(({ theme }) => ({
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


const CreateNFT = ({ setMainActiveTab }) => {
    const [activeTab, setActiveTab] = useState('create-NFT')
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [galleryId, setGalleryId] = useState(null)
    const [privateCollection, setPrivateCollection] = useState([])
    const [mediaType, setMediaType] = useState(undefined)
    const [aspectRatio, setAspectRatio] = useState('16 : 9')
    const [openColCrop, setOpenColCrop] = useState(false)
    const [openNFTCrop, setOpenNFTCrop] = useState(false)
    const [pvRoom, setPVRoom] = useState(undefined)

    const colImageInput = useRef()
    const [colImageFile, setColImageFile] = useState(null);
    const [colPhotoURL, setColPhotoURL] = useState(null);
    const NFTImageInput = useRef()
    const [NFTImageFile, setNFTImageFile] = useState(null);
    const [NFTPhotoURL, setNFTPhotoURL] = useState(null);
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const [isCollSuccses, setIsCollSuccses] = useState(false)
    const [isNFTSuccses, setIsNFTSuccses] = useState(false)
    const [colId, setColId] = useState(undefined)
    const fetchUser = (accesstoken, pvkey) => dispatch(getuser(accesstoken, pvkey));
    const [royaltyShare, setRoyaltyShare] = useState(0)
    const [NFTReqSent, setNFTReqSent] = useState(false)
    const [ColReqSent, setColReqSent] = useState(false)
    const [galleryName, setGalleryName] = useState(undefined)
    // const [gallerySubject, setgallerySubject] = useState(gallery.extra ? gallery.extra[0].gallery_subject : undefined)
    const [galleryDesc, setGalleryDesc] = useState(undefined)
    const [galleryFee, setGalleryFee] = useState(undefined)
    const [galleryBG, setGalleryBG] = useState(undefined)
    const [gallImageFile, setgallImageFile] = useState(null);
    const [gallPhotoURL, setgallPhotoURL] = useState(null);
    const [openGallCrop, setOpenGallCrop] = useState(false)
    const [isGallSuccess, setIsGalSuccess] = useState(false)
    const [GalResSent, setGalResSent] = useState(false)
    const [MediaReqSent, setMediaReqSent] = useState(false)
    const [isMediaSuccses, setIsMediaSuccses] = useState(false)
    const [openMediaCrop, setOpenMediaCrop] = useState(false)
    const MediaImageInput = useRef()
    const [MediaImageFile, setMediaImageFile] = useState(null);
    const [MediaPhotoURL, setMediaPhotoURL] = useState(null);

    const [galleryForm, setGalleryForm] = useState({
        gal_name: "",
        gal_description: "",
        owner_cid: "",
        extra: [],

    })

    const [collectionForm, setCollectionForm] = useState({
        gallery_id: null,
        amount: null, // gas fee of creating collection onchain
        col_name: "",
        col_description: "",
        symbol: "",
        owner_cid: "",
        metadata_updatable: true,
        base_uri: " ",
        royalties_share: 0, // in-app token amount | 100 means 1%
        royalties_address_screen_cid: globalUser.YouWhoID,
        extra: [],
    })
    const [NFTForm, setNFTForm] = useState({
        caller_cid: "",
        amount: null,
        contract_address: "", col_id: null,
        current_owner_screen_cid: "",
        nft_name: "",
        nft_description: "",
        current_price: null,
        extra: [],
        attributes: [],
    })
    useEffect(() => {
        if (globalUser.YouWhoID) {
            getGasFee()
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
        setNFTForm(prev => ({
            ...prev,
            caller_cid: globalUser.cid,
            current_owner_screen_cid: globalUser.YouWhoID,
        }))
        setCollectionForm(prev => ({
            ...prev,
            owner_cid: globalUser.cid,
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
    const handleColFormChange = (e) => {
        if (e.target.type == 'number') {
            if (e.target.name == 'royalties_share') {
                setRoyaltyShare(Number(Number(e.target.value) * 100))
                setCollectionForm(prev => ({
                    ...prev,
                    [e.target.name]: Number(e.target.value)
                }))
            } else {
                setCollectionForm(prev => ({
                    ...prev,
                    [e.target.name]: Number(e.target.value)
                }))
            }
        }
        else {
            setCollectionForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }
    const handleColImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setColImageFile(file);
            setColPhotoURL(URL.createObjectURL(file));
            setOpenColCrop(true);
        }
    };
    const handleNFTImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNFTImageFile(file);
            setNFTPhotoURL(URL.createObjectURL(file));
            setOpenNFTCrop(true);
        }
    };
    const handleMetadataChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMetadata = [...collectionForm.extra];

        if (isNaN(value) || name !== 'value')
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: value };
        else
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: Number(value) };


        setCollectionForm((prev) => ({
            ...prev,
            extra: updatedMetadata,
        }));
    };
    const handleAttributesChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAttributes = [...NFTForm.attributes];

        if (isNaN(value) || name !== 'value')
            updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
        else
            updatedAttributes[index] = { ...updatedAttributes[index], [name]: Number(value) };


        setNFTForm((prev) => ({
            ...prev,
            attributes: updatedAttributes,
        }));
    };
    const handleNFTFormChange = (e) => {
        if (e.target.type == 'number')
            setNFTForm(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        else
            setNFTForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
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
            setCollectionForm(prev => ({ ...prev, amount: response.data }))
            setNFTForm(prev => ({ ...prev, amount: response.data }))
        } else {
            console.log(response.message)
        }
    }
    const getPrivateGallery = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/?from=0&to=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            // setCollectionForm(prev => ({ ...prev, gallery_id: response.data[0].id }))
            // setGalleryId(response.data[0].id)
            setpvGalleries(response.data)

        } else {
            console.log(response.message)
        }
    }
    const getPrivateCollection = async () => {
        setPrivateCollection([])
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/get/all/private/in-gallery/${galleryId}/?from=0&to=50`, {
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
            setPrivateCollection([])
        }
    }
    const uploadCollectionBackground = async resData => {
        loading();

        const myFile = new File([colImageFile], 'image.jpeg', {
            type: colImageFile.type,
        });

        const formData = new FormData();
        formData.append('img', myFile)

        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/${resData.id}/upload/background`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            updateToast(true, response.message)
            setIsCollSuccses(true)
        } else {
            console.log(response.message)
        }
    }
    const createCollection = async () => {
        loading();
        setColReqSent(true)
        if (globalUser.privateKey) {
            let data = {}

            let collForm = collectionForm
            console.log(collectionForm)
            collForm.royalties_share = royaltyShare
            if (collForm.royalties_share > 500) {
                updateToast(false, 'your royalty share can not be more than 5%!')
                return
            }
            if (collForm.extra.length == 0) {
                data = { ...collForm, extra: null }
            } else {
                data = { ...collForm, extra: JSON.stringify(collForm.extra) }
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);
            // console.log(data)
            // console.log(requestData)
            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/create`, {
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
                uploadCollectionBackground(response.data)
                setCollectionForm({
                    gallery_id: null,
                    amount: null, // gas fee of creating collection onchain
                    col_name: "",
                    col_description: "",
                    symbol: "",
                    owner_cid: "",
                    metadata_updatable: true,
                    base_uri: "",
                    royalties_share: 0, // in-app token amount | 100 means 1%
                    royalties_address_screen_cid: globalUser.YouWhoID,
                    extra: [],
                })
                setColReqSent(false)

            } else {
                updateToast(false, response.message)
                console.error(response.message)
                setColReqSent(false)
            }
        } else {
            setColReqSent(false)
            updateToast(false, 'please save your private key first')
        }
    }
    const createOffChainMedia = async () => {
        console.log('coming soon')
    }
    const createNFT = async () => {
        loading();
        setNFTReqSent(true)
        if (globalUser.privateKey) {
            let data = {}

            if (NFTForm.extra.length == 0) {
                data = { ...NFTForm, extra: null }
            } else {
                data = { ...NFTForm, extra: JSON.stringify(NFTForm.extra) }
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            console.log(requestData)
            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/create`, {
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
                createNFTMetadataUri(response.data)
                setNFTForm(prev => ({
                    ...prev,
                    contract_address: "",
                    col_id: null,
                    nft_name: "",
                    nft_description: "",
                    current_price: null,
                    extra: [],
                    attributes: [],
                }))
                setNFTReqSent(false)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
                setNFTReqSent(false)

            }
        } else {
            setNFTReqSent(false)
            updateToast(false, 'please save your private key first')
        }
    }
    const createNFTMetadataUri = async NFTObject => {
        loading();

        if (globalUser.privateKey) {

            const myFile = new File([NFTImageFile], 'image.jpeg', {
                type: NFTImageFile.type,
            });

            const formData = new FormData();
            formData.append('img', myFile)

            const keyValuePairs = [
                ['caller_cid', globalUser.cid],
                ['amount', 0],
                ['col_id', NFTForm.col_id],
                ['nft_id', NFTObject.id],
                ['nft_new_attributes', JSON.stringify(NFTObject.attributes)],
                ['nft_new_extra', JSON.stringify(NFTObject.extra)],
                ['nft_new_name', NFTObject.nft_name],
                ['nft_new_description', NFTObject.nft_description],
            ]

            keyValuePairs.forEach(([key, value]) => {
                formData.append(key, value);
            });


            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, formData);

            formData.append('tx_signature', requestData.tx_signature);
            formData.append('hash_data', requestData.hash_data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/nft/create/metadata-uri`, {
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
                setIsNFTSuccses(true)
                fetchUser(globalUser.token, globalUser.privateKey)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }
    const [descColDesc, setDescColDesc] = useState(false)
    const [descColPVR, setDescColPVR] = useState(false)
    const [descColName, setDescColName] = useState(false)
    const [descColSymbol, setDescColSymbol] = useState(false)
    const [descColCover, setDescColCover] = useState(false)
    const [descColType, setDescColType] = useState(false)
    const [descownerAdd, setDescOwnerAdd] = useState(false)
    const [descRoyaltyShare, setDescRoyaltyShare] = useState(false)
    const [descRoyaltyAdd, setDescRoyaltyAdd] = useState(false)
    const [descNFTmetadata, setDescNFTmetadata] = useState(false)
    const [descNFTPrice, setDescNFTPrice] = useState(false)
    const [descNFTName, setDescNFTName] = useState(false)
    const [descNFTCol, setDescNFTCol] = useState(false)
    const [descNFTDesc, setDescNFTDesc] = useState(false)
    const [IsForMint, setIsForMint] = useState(false)
    const [descMediametadata, setDescMediametadata] = useState(false)
    const [descMediaPrice, setDescMediaPrice] = useState(false)
    const [descMediaName, setDescMediaName] = useState(false)
    const [descMediaCol, setDescMediaCol] = useState(false)
    const [descMediaDesc, setDescMediaDesc] = useState(false)
    const [pvGalleries, setpvGalleries] = useState([])
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
        try {
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
        } catch (error) {
            console.log('errrr?', error);
            updateToast(false, error)

        }
        // let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/create`, {
        //     method: 'POST',
        //     body: JSON.stringify(requestData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${globalUser.token}`,
        //     }
        // })
        // let response = await request.json()
        // console.log('updat resp?', response);

        // if (!response.is_error) {
        //     updateToast(true, response.message)
        //     if (gallImageFile) {
        //         uploadGalleryBackground()
        //     }
        // } else {
        //     updateToast(false, response.message)
        // }

    }
    const handleMediaImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaImageFile(file);
            setMediaPhotoURL(URL.createObjectURL(file));
            setOpenMediaCrop(true);
        }
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
    useEffect(() => {
        if (pvRoom) {
            // console.log(pvRoom)
            setCollectionForm(prev => ({ ...prev, gal_id: pvRoom[0].id }))
            setGalleryId(pvRoom[0].id)
        }
    }, [pvRoom])
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
                            <SubTabs jc={'center'} mb={'24px'}>
                                <SubTab id={"create-private-room"}
                                    onClick={(e) => {
                                        setActiveTab(e.target.id)
                                        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
                                    }}
                                    text={'Create Private Room'}
                                    selected={activeTab == 'create-private-room'} />

                                <SubTab id={"create-collection"}
                                    onClick={(e) => {
                                        setActiveTab(e.target.id)
                                        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
                                    }}
                                    text={'Create Collection'}
                                    selected={activeTab == 'create-collection'} />
                                <SubTab id={"create-NFT"}
                                    onClick={(e) => {
                                        setActiveTab(e.target.id)
                                        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
                                    }}
                                    text={'Create Artwork'} selected={activeTab == 'create-NFT'} />
                            </SubTabs>
                            {activeTab == 'create-NFT' ?
                                //if is for mint logic was necessary==>
                                // <>{IsForMint ?
                                //     <>
                                //         <Container sx={{ mb: '24px' }}>
                                //             <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                //                 <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                //                     Upload Your NFT
                                //                 </Typography>
                                //                 <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                //                     You Can Upload NFT in Various Types & Sizes
                                //                 </Typography>
                                //             </FlexColumn>
                                //             <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                //                 <FlexColumn sx={{
                                //                     gap: { xs: '10px', sm: '16px' }
                                //                 }}>
                                //                     <SelectInput tabs={['Image, .PNG', 'Image, .JPG', 'Video, .MP4']} label={'Your NFT Type'}
                                //                         handleSelect={handleSelectMediaType} value={mediaType} id="nft-type-selection"
                                //                         width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                //                     <ButtonInput label={'Upload NFT File *'} width={'100%'}
                                //                         icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                //                         button={<ButtonOutline
                                //                             height='35px'
                                //                             onClick={() => NFTImageInput.current.click()}
                                //                             text={'Browse'}
                                //                             br={'30px'}
                                //                         />
                                //                         } />
                                //                     <input
                                //                         accept="image/*"
                                //                         id="nftPhoto"
                                //                         type="file"
                                //                         style={{ display: 'none' }}
                                //                         onChange={handleNFTImageChange}
                                //                         ref={NFTImageInput}
                                //                     />
                                //                     <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                //                         handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="nft-aspect-ratio-selection"
                                //                         width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} />
                                //                 </FlexColumn>
                                //                 <NFTImage
                                //                     onClick={() => NFTImageInput.current.click()}
                                //                     sx={{
                                //                         background: () => {
                                //                             return (
                                //                                 NFTPhotoURL
                                //                                     ? `url('${NFTPhotoURL}') no-repeat center`
                                //                                     : `url('${nftImage}') no-repeat center`
                                //                             )
                                //                         },
                                //                         aspectRatio: () => aspectRatio == '16 : 9' ? 16 / 9 : 1,
                                //                     }}
                                //                 />
                                //             </FlexRow>
                                //             <FlexRow sx={{ justifyContent: 'start !important', gap: '4px', pb: '4px' }}>
                                //                 <Box onClick={() => setIsForMint(!IsForMint)} sx={{
                                //                     cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                //                     borderRadius: '4px', border: IsForMint ? 'none' : '1px solid', borderColor: 'primary.main',
                                //                     backgroundColor: IsForMint ? 'primary.main' : 'secondary.bg', width: '18px', height: '18px'
                                //                 }}>
                                //                     {IsForMint &&
                                //                         <CheckOutlined sx={{ color: 'white', fontSize: '12px' }} />
                                //                     }

                                //                 </Box>
                                //                 <Typography
                                //                     sx={{ color: 'primary.gray', fontWeight: 400, textTransform: 'capitalize', fontSize: '12px' }}>
                                //                     put for mint</Typography>
                                //             </FlexRow>

                                //         </Container>
                                //         <Container >
                                //             <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                //                 <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                //                     NFT Informations
                                //                 </Typography>
                                //                 <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                //                     Tell Us About Your NFT Details
                                //                 </Typography>
                                //             </FlexColumn>
                                //             <FlexColumn sx={{ gap: '16px' }}>
                                //                 <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px', alignItems: 'start !important' }}>
                                //                     <FlexColumn sx={{ gap: '8px' }}>
                                //                         <FlexRow>
                                //                             <MyInput
                                //                                 value={NFTForm.current_price}
                                //                                 name={"current_price"}
                                //                                 onChange={handleNFTFormChange}
                                //                                 label={'NFT Price'} width={'100%'}
                                //                                 icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'}
                                //                             />
                                //                             <CommentOutlined
                                //                                 onClick={() => setDescNFTPrice(!descNFTPrice)}
                                //                                 sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                //                         </FlexRow>
                                //                         {descNFTPrice &&
                                //                             <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                //                                 <Box sx={{
                                //                                     display: 'flex', alignItems: 'center'
                                //                                 }}>
                                //                                     <Typography sx={{
                                //                                         fontSize: '12px',
                                //                                         color: 'primary.text', textTransform: 'capitalize'
                                //                                     }}>
                                //                                         price for minting the nft
                                //                                     </Typography>
                                //                                 </Box>
                                //                             </LilDescription>}

                                //                     </FlexColumn>
                                //                     <FlexColumn sx={{ gap: '8px' }}>
                                //                         <FlexRow>
                                //                             <MyInput
                                //                                 value={NFTForm.nft_name}
                                //                                 name={"nft_name"}
                                //                                 onChange={handleNFTFormChange}
                                //                                 label={'NFT Name*'} width={'100%'}
                                //                                 icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-name'}
                                //                             />
                                //                             <CommentOutlined
                                //                                 onClick={() => setDescNFTName(!descNFTName)}
                                //                                 sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                //                         </FlexRow>
                                //                         {descNFTName &&
                                //                             <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                //                                 <Box sx={{
                                //                                     display: 'flex', alignItems: 'center'
                                //                                 }}>
                                //                                     <Typography sx={{
                                //                                         fontSize: '12px',
                                //                                         color: 'primary.text', textTransform: 'capitalize'
                                //                                     }}>
                                //                                         Name of your nft
                                //                                     </Typography>
                                //                                 </Box>
                                //                             </LilDescription>}

                                //                     </FlexColumn>
                                //                 </FlexRow>
                                //                 <FlexColumn sx={{ gap: '12px' }}>
                                //                     <FlexRow>
                                //                         <SelectInput tabs={privateCollection.map(col => (col.col_name))} label={'NFT Collection *'}
                                //                             handleSelect={
                                //                                 (e) => setNFTForm(prev => ({ ...prev, contract_address: privateCollection.filter(col => col.col_name == e.target.id)[0].contract_address, col_id: privateCollection.filter(col => col.col_name == e.target.id)[0].id }))
                                //                             }
                                //                             value={NFTForm.contract_address ? privateCollection.filter(col => col.contract_address == NFTForm.contract_address)[0].col_name : ''}
                                //                             id="nft-collection-selection"
                                //                             width={'100%'} icon={<Icon url={CollIcon} w={27} h={27} />} />
                                //                         <CommentOutlined
                                //                             onClick={() => setDescNFTCol(!descNFTCol)}
                                //                             sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                //                     </FlexRow>
                                //                     {descNFTCol &&
                                //                         <LilDescription id={'nft-col-desc'} width={'100%'}>
                                //                             <Box sx={{
                                //                                 display: 'flex', alignItems: 'center'
                                //                             }}>
                                //                                 <Typography sx={{
                                //                                     fontSize: '12px',
                                //                                     color: 'primary.text', textTransform: 'capitalize'
                                //                                 }}>
                                //                                     Choose your nft collection from your created collections
                                //                                 </Typography>
                                //                             </Box>
                                //                         </LilDescription>}
                                //                 </FlexColumn>
                                //                 <FlexColumn sx={{ gap: '12px' }}>
                                //                     <FlexRow>
                                //                         <MyInput
                                //                             value={NFTForm.nft_description}
                                //                             name={"nft_description"}
                                //                             onChange={handleNFTFormChange}
                                //                             label={'NFT Description*'} width={'100%'}
                                //                             icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-decription'}
                                //                         />
                                //                         <CommentOutlined
                                //                             onClick={() => setDescNFTDesc(!descNFTDesc)}
                                //                             sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                //                     </FlexRow>
                                //                     {descNFTDesc &&
                                //                         <LilDescription id={'nft-desc-desc'} width={'100%'}>
                                //                             <Box sx={{
                                //                                 display: 'flex', alignItems: 'center'
                                //                             }}>
                                //                                 <Typography sx={{
                                //                                     fontSize: '12px',
                                //                                     color: 'primary.text', textTransform: 'capitalize'
                                //                                 }}>
                                //                                     Description of your nft
                                //                                 </Typography>
                                //                             </Box>
                                //                         </LilDescription>}
                                //                 </FlexColumn>

                                //                 <FlexColumn sx={{ mb: '16px', gap: '12px' }}>
                                //                     <FlexRow >
                                //                         <ButtonInput label={'Metadata Addition *'} width={'100%'}
                                //                             icon={<AddBoxOutlined
                                //                                 sx={{ color: 'primary.light' }}
                                //                             />
                                //                             }
                                //                             button={<Add sx={{ color: 'primary.gray' }}
                                //                                 onClick={() => setNFTForm((prev) => ({ ...prev, attributes: [...prev.attributes, { trait_type: "", value: "" }] }))}
                                //                             />
                                //                             } />
                                //                         <CommentOutlined
                                //                             onClick={() => setDescNFTmetadata(!descNFTmetadata)}
                                //                             sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                //                     </FlexRow>
                                //                     {descNFTmetadata &&
                                //                         <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                //                             <Box sx={{
                                //                                 display: 'flex', alignItems: 'center'
                                //                             }}>
                                //                                 <Typography sx={{
                                //                                     fontSize: '12px',
                                //                                     color: 'primary.text', textTransform: 'capitalize'
                                //                                 }}>
                                //                                     NFT metadata is the sum of all data that describes an NFT,
                                //                                     typically including its name, traits, trait rarity, link to
                                //                                     the hosted image, total supply, transaction history,
                                //                                     and other essential data
                                //                                 </Typography>
                                //                             </Box>
                                //                         </LilDescription>}
                                //                 </FlexColumn>
                                //                 {
                                //                     NFTForm.attributes.map((object, index) => {
                                //                         return (<FlexRow key={index} sx={{ mb: '16px' }}>
                                //                             <span>{index + 1}</span>
                                //                             <MyInput name={'trait_type'} label={'Trait Type'} width={'40%'}
                                //                                 onChange={(e) => handleAttributesChange(e, index)}
                                //                                 value={object.trait_type}
                                //                             />
                                //                             <MyInput name={'value'} label={'Value'} width={'40%'}
                                //                                 onChange={(e) => handleAttributesChange(e, index)}
                                //                                 value={object.value}
                                //                             />
                                //                         </FlexRow>)
                                //                     })
                                //                 }
                                //             </FlexColumn>
                                //             {
                                //                 isNFTSuccses &&
                                //                 <Container sx={{ flexDirection: 'row', mt: '24px' }}>
                                //                     <FlexRow sx={{ gap: '40px' }}>
                                //                         <NFTImage
                                //                             sx={{
                                //                                 background: `url(${NFTPhotoURL})`,
                                //                                 aspectRatio: '16 / 9',
                                //                             }}
                                //                         />
                                //                         <FlexColumn sx={{ height: '100%', gap: '16px', justifyContent: 'space-between' }}>
                                //                             <Typography sx={{ color: '#3DCA64', fontSize: { xs: '18px', sm: '22px' }, width: '100%' }}>
                                //                                 NFT Was Created Successfully
                                //                             </Typography>
                                //                             <Typography sx={{ fontSize: '12px', width: '100%' }}>
                                //                                 Created NFT Goes To “ Profile , Private Gallery ”.
                                //                             </Typography>
                                //                             <ButtonPurple
                                //                                 text={'Go To Private Gallery'}
                                //                                 w={'100%'}
                                //                                 onClick={() => {
                                //                                     setMainActiveTab("private-gallery-tab")
                                //                                     setIsNFTSuccses(false)
                                //                                 }}
                                //                             />
                                //                         </FlexColumn>
                                //                     </FlexRow>
                                //                 </Container>
                                //             }
                                //         </Container>
                                //         <Modal
                                //             open={openNFTCrop}
                                //             onClose={() => setOpenNFTCrop(false)}
                                //             aria-labelledby="modal-modal-title"
                                //             aria-describedby="modal-modal-description"
                                //         >
                                //             <Box sx={{
                                //                 width: '100%',
                                //                 height: '100%',
                                //                 display: 'flex', alignItems: 'center', justifyContent: 'center'
                                //             }}>
                                //                 <Box sx={{
                                //                     borderRadius: '24px',
                                //                     width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                                //                     backgroundColor: 'secondary.bg',
                                //                     display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                                //                 }}>
                                //                     <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                                //                         <Typography>Crop</Typography>
                                //                         <div onClick={() => {
                                //                             setOpenNFTCrop(false)
                                //                         }}>
                                //                             <Close sx={{ cursor: 'pointer' }} />
                                //                         </div>
                                //                     </FlexRow>
                                //                     <Crop imageURL={NFTPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenNFTCrop} setFile={setNFTImageFile} setPhotoURL={setNFTPhotoURL} />
                                //                 </Box>
                                //             </Box>
                                //         </Modal>
                                //         <Box sx={{
                                //             width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                                //         }}>
                                //             <ButtonPurple
                                //                 text={'Create'}
                                //                 w={'100%'}
                                //                 disabled={!Object.values(NFTForm).every(value => value !== null && value !== "") || !NFTForm.attributes.length || !NFTImageFile || NFTReqSent}
                                //                 onClick={!Object.values(NFTForm).every(value => value !== null && value !== "") || !NFTForm.attributes.length || !NFTImageFile || NFTReqSent ? undefined : createNFT}
                                //             />
                                //         </Box>
                                //     </> :
                                //     <>
                                //         <Container sx={{ mb: '24px' }}>
                                //             <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                //                 <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                //                     Upload Your Media
                                //                 </Typography>
                                //                 <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                //                     You Can Upload Media in Various Types & Sizes
                                //                 </Typography>
                                //             </FlexColumn>
                                //             <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                //                 <FlexColumn sx={{
                                //                     gap: { xs: '10px', sm: '16px' }
                                //                 }}>
                                //                     <ButtonInput label={'Upload Media File *'} width={'100%'}
                                //                         icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                //                         button={<ButtonOutline
                                //                             height='35px'
                                //                             onClick={() => MediaImageInput.current.click()}
                                //                             text={'Browse'}
                                //                             br={'30px'}
                                //                         />
                                //                         } />
                                //                     <input
                                //                         accept="image/*"
                                //                         id="MediaPhoto"
                                //                         type="file"
                                //                         style={{ display: 'none' }}
                                //                         onChange={handleMediaImageChange}
                                //                         ref={MediaImageInput}
                                //                     />
                                //                     <SelectInput tabs={pvGalleries.map(gal => (gal.gal_name))} label={'Private Room'}
                                //                         handleSelect={(e) => setPVRoom(pvGalleries.filter(gal => gal.gal_name == e.target.id))}
                                //                         value={MediaForm.gal_id ? pvGalleries.filter(gal => gal.id == MediaForm.gal_id)[0].gal_name : ''}
                                //                         id="Media-room-selection"
                                //                         width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />

                                //                     {/* <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                //                                                 handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="Media-aspect-ratio-selection"
                                //                                                 width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} /> */}
                                //                 </FlexColumn>
                                //                 <MediaImage
                                //                     onClick={() => MediaImageInput.current.click()}
                                //                     sx={{
                                //                         background: () => {
                                //                             return (
                                //                                 MediaPhotoURL
                                //                                     ? `url('${MediaPhotoURL}') no-repeat center`
                                //                                     : `url('${nftImage}') no-repeat center`
                                //                             )
                                //                         },
                                //                         aspectRatio: () => aspectRatio == '16 : 9' ? 16 / 9 : 1,
                                //                     }}
                                //                 />
                                //             </FlexRow>
                                //             <FlexColumn sx={{ gap: '12px' }}>
                                //                 <FlexRow>
                                //                     <MyInput
                                //                         value={MediaForm.Media_description}
                                //                         height={'auto'}
                                //                         multiline={true}
                                //                         name={"Media_description"}
                                //                         onChange={handleMediaFormChange}
                                //                         label={'Description*'} width={'100%'}
                                //                         icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'NFT-decription'}
                                //                     />
                                //                     <CommentOutlined
                                //                         onClick={() => setDescMediaDesc(!descMediaDesc)}
                                //                         sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                //                 </FlexRow>
                                //                 {descMediaDesc &&
                                //                     <LilDescription id={'media-desc-desc'} width={'100%'}>
                                //                         <Box sx={{
                                //                             display: 'flex', alignItems: 'center'
                                //                         }}>
                                //                             <Typography sx={{
                                //                                 fontSize: '12px',
                                //                                 color: 'primary.text', textTransform: 'capitalize'
                                //                             }}>
                                //                                 Description of your media
                                //                             </Typography>
                                //                         </Box>
                                //                     </LilDescription>}
                                //             </FlexColumn>
                                //             <FlexRow sx={{ justifyContent: 'start !important', gap: '4px', pb: '4px' }}>
                                //                 <Box onClick={() => setIsForMint(!IsForMint)} sx={{
                                //                     cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                //                     borderRadius: '4px', border: IsForMint ? 'none' : '1px solid', borderColor: 'primary.main',
                                //                     backgroundColor: IsForMint ? 'primary.main' : 'secondary.bg', width: '18px', height: '18px'
                                //                 }}>
                                //                     {IsForMint &&
                                //                         <CheckOutlined sx={{ color: 'white', fontSize: '12px' }} />
                                //                     }

                                //                 </Box>
                                //                 <Typography
                                //                     sx={{ color: 'primary.gray', fontWeight: 400, textTransform: 'capitalize', fontSize: '12px' }}>
                                //                     put for mint</Typography>
                                //             </FlexRow>
                                //         </Container>
                                //         <Modal
                                //             open={openMediaCrop}
                                //             onClose={() => setOpenMediaCrop(false)}
                                //             aria-labelledby="modal-modal-title"
                                //             aria-describedby="modal-modal-description"
                                //         >
                                //             <Box sx={{
                                //                 width: '100%',
                                //                 height: '100%',
                                //                 display: 'flex', alignItems: 'center', justifyContent: 'center'
                                //             }}>
                                //                 <Box sx={{
                                //                     borderRadius: '24px',
                                //                     width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                                //                     backgroundColor: 'secondary.bg',
                                //                     display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                                //                 }}>
                                //                     <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                                //                         <Typography>Crop</Typography>
                                //                         <div onClick={() => {
                                //                             setOpenMediaCrop(false)
                                //                         }}>
                                //                             <Close sx={{ cursor: 'pointer' }} />
                                //                         </div>
                                //                     </FlexRow>
                                //                     <Crop imageURL={MediaPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenMediaCrop} setFile={setMediaImageFile} setPhotoURL={setMediaPhotoURL} />
                                //                 </Box>
                                //             </Box>
                                //         </Modal>

                                //         <Box sx={{
                                //             width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                                //         }}>
                                //             <ButtonPurple
                                //                 text={'Create'}
                                //                 w={'100%'}
                                //                 disabled={true}
                                //                 onClick={createOffChainMedia}
                                //             />
                                //         </Box>

                                //     </>
                                // }
                                // </>
                                <>
                                    <Container sx={{ mb: '24px' }}>
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
                                                        onClick={() => NFTImageInput.current.click()}
                                                        text={'Browse'}
                                                        br={'30px'}
                                                    />
                                                    } />
                                                <input
                                                    accept="image/*"
                                                    id="nftPhoto"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleNFTImageChange}
                                                    ref={NFTImageInput}
                                                />
                                                <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                                    handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="nft-aspect-ratio-selection"
                                                    width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} />
                                            </FlexColumn>
                                            <NFTImage
                                                onClick={() => NFTImageInput.current.click()}
                                                sx={{
                                                    background: () => {
                                                        return (
                                                            NFTPhotoURL
                                                                ? `url('${NFTPhotoURL}') no-repeat center`
                                                                : `url('${nftImage}') no-repeat center`
                                                        )
                                                    },
                                                    aspectRatio: () => aspectRatio == '16 : 9' ? 16 / 9 : 1,
                                                }}
                                            />
                                        </FlexRow>
                                        {/* <FlexRow sx={{ justifyContent: 'start !important', gap: '4px', pb: '4px' }}>
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
 */}
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
                                            <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px', alignItems: 'start !important' }}>
                                                <FlexColumn sx={{ gap: '8px' }}>
                                                    <FlexRow>
                                                        <MyInput
                                                            value={NFTForm.current_price}
                                                            name={"current_price"}
                                                            onChange={handleNFTFormChange}
                                                            label={'NFT Price'} width={'100%'}
                                                            icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescNFTPrice(!descNFTPrice)}
                                                            sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descNFTPrice &&
                                                        <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    price for minting the nft
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                                <FlexColumn sx={{ gap: '8px' }}>
                                                    <FlexRow>
                                                        <MyInput
                                                            value={NFTForm.nft_name}
                                                            name={"nft_name"}
                                                            onChange={handleNFTFormChange}
                                                            label={'NFT Name*'} width={'100%'}
                                                            icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-name'}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescNFTName(!descNFTName)}
                                                            sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descNFTName &&
                                                        <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Name of your nft
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                            </FlexRow>
                                            <FlexColumn sx={{ gap: '12px' }}>
                                                <FlexRow >

                                                    <SelectInput tabs={pvGalleries.map(gal => (gal.gal_name))} label={'Private Room'}
                                                        handleSelect={(e) => setPVRoom(pvGalleries.filter(gal => gal.gal_name == e.target.id))}
                                                        value={pvRoom ? pvGalleries.filter(gal => gal.id == pvRoom[0].id)[0].gal_name : ''}
                                                        id="Media-room-selection"
                                                        width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                                    <CommentOutlined onClick={() => setDescColPVR(!descColPVR)}
                                                        sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                </FlexRow>
                                                {descColPVR &&
                                                    <LilDescription id={'col-desc-desc'} width={'100%'}>
                                                        <Box sx={{
                                                            display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontSize: '12px',
                                                                color: 'primary.text', textTransform: 'capitalize'
                                                            }}>
                                                                private room of your collection contract
                                                            </Typography>
                                                        </Box>
                                                    </LilDescription>}

                                            </FlexColumn>

                                            <FlexColumn sx={{ gap: '12px' }}>
                                                <FlexRow>
                                                    <SelectInput tabs={privateCollection.map(col => (col.col_name))} label={'NFT Collection *'}
                                                        handleSelect={
                                                            (e) => setNFTForm(prev => ({ ...prev, contract_address: privateCollection.filter(col => col.col_name == e.target.id)[0].contract_address, col_id: privateCollection.filter(col => col.col_name == e.target.id)[0].id }))
                                                        }
                                                        value={NFTForm.contract_address ? privateCollection.filter(col => col.contract_address == NFTForm.contract_address)[0].col_name : ''}
                                                        id="nft-collection-selection"
                                                        width={'100%'} icon={<Icon url={CollIcon} w={27} h={27} />} />
                                                    <CommentOutlined
                                                        onClick={() => setDescNFTCol(!descNFTCol)}
                                                        sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                </FlexRow>
                                                {descNFTCol &&
                                                    <LilDescription id={'nft-col-desc'} width={'100%'}>
                                                        <Box sx={{
                                                            display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontSize: '12px',
                                                                color: 'primary.text', textTransform: 'capitalize'
                                                            }}>
                                                                Choose your nft collection from your created collections in the selected private room
                                                            </Typography>
                                                        </Box>
                                                    </LilDescription>}
                                            </FlexColumn>
                                            <FlexColumn sx={{ gap: '12px' }}>
                                                <FlexRow>
                                                    <MyInput
                                                        value={NFTForm.nft_description}
                                                        name={"nft_description"}
                                                        onChange={handleNFTFormChange}
                                                        label={'NFT Description*'} width={'100%'}
                                                        icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-decription'}
                                                    />
                                                    <CommentOutlined
                                                        onClick={() => setDescNFTDesc(!descNFTDesc)}
                                                        sx={{ color: 'primary.light', ml: '4px', cursor: 'pointer' }} />
                                                </FlexRow>
                                                {descNFTDesc &&
                                                    <LilDescription id={'nft-desc-desc'} width={'100%'}>
                                                        <Box sx={{
                                                            display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontSize: '12px',
                                                                color: 'primary.text', textTransform: 'capitalize'
                                                            }}>
                                                                Description of your nft
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
                                                            onClick={() => setNFTForm((prev) => ({ ...prev, attributes: [...prev.attributes, { trait_type: "", value: "" }] }))}
                                                        />
                                                        } />
                                                    <CommentOutlined
                                                        onClick={() => setDescNFTmetadata(!descNFTmetadata)}
                                                        sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                </FlexRow>
                                                {descNFTmetadata &&
                                                    <LilDescription id={'nft-mtdt-desc'} width={'100%'}>
                                                        <Box sx={{
                                                            display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontSize: '12px',
                                                                color: 'primary.text', textTransform: 'capitalize'
                                                            }}>
                                                                NFT metadata is the sum of all data that describes an NFT,
                                                                typically including its name, traits, trait rarity, link to
                                                                the hosted image, total supply, transaction history,
                                                                and other essential data
                                                            </Typography>
                                                        </Box>
                                                    </LilDescription>}
                                            </FlexColumn>
                                            {
                                                NFTForm.attributes.map((object, index) => {
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
                                            isNFTSuccses &&
                                            <Container sx={{ flexDirection: 'row', mt: '24px' }}>
                                                <FlexRow sx={{ gap: '40px' }}>
                                                    <NFTImage
                                                        sx={{
                                                            background: `url(${NFTPhotoURL})`,
                                                            aspectRatio: '16 / 9',
                                                        }}
                                                    />
                                                    <FlexColumn sx={{ height: '100%', gap: '16px', justifyContent: 'space-between' }}>
                                                        <Typography sx={{ color: '#3DCA64', fontSize: { xs: '18px', sm: '22px' }, width: '100%' }}>
                                                            NFT Was Created Successfully
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '12px', width: '100%' }}>
                                                            Created NFT Goes To “ Profile , Private Gallery ”.
                                                        </Typography>
                                                        <ButtonPurple
                                                            text={'Go To Private Gallery'}
                                                            w={'100%'}
                                                            onClick={() => {
                                                                setMainActiveTab("private-gallery-tab")
                                                                setIsNFTSuccses(false)
                                                            }}
                                                        />
                                                    </FlexColumn>
                                                </FlexRow>
                                            </Container>
                                        }
                                    </Container>
                                    <Modal
                                        open={openNFTCrop}
                                        onClose={() => setOpenNFTCrop(false)}
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
                                                        setOpenNFTCrop(false)
                                                    }}>
                                                        <Close sx={{ cursor: 'pointer' }} />
                                                    </div>
                                                </FlexRow>
                                                <Crop imageURL={NFTPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenNFTCrop} setFile={setNFTImageFile} setPhotoURL={setNFTPhotoURL} />
                                            </Box>
                                        </Box>
                                    </Modal>
                                    <Box sx={{
                                        width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                                    }}>
                                        <ButtonPurple
                                            text={'Create'}
                                            w={'100%'}
                                            disabled={!Object.values(NFTForm).every(value => value !== null && value !== "") || !NFTForm.attributes.length || !NFTImageFile || NFTReqSent}
                                            onClick={!Object.values(NFTForm).every(value => value !== null && value !== "") || !NFTForm.attributes.length || !NFTImageFile || NFTReqSent ? undefined : createNFT}
                                        />
                                    </Box>
                                </>
                                : activeTab == 'create-collection' ?// ____________________________________________________________________
                                    <>
                                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                            NFT Contract Information
                                        </Typography>
                                        <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '14px' } }}>
                                            You Can Read Information About Each Field,By Click On The Icon, to Show/Hide The Information.
                                        </Typography>

                                        <Container sx={{ mt: '24px', }}>
                                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                                New Collection Introduction
                                            </Typography>
                                            <FlexColumn>
                                                <FlexColumn sx={{ mb: '16px', }}>
                                                    <FlexRow>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                                            <Typography sx={{ fontSize: '12px' }}>
                                                                Type : &nbsp;
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '12px', fontFamily: 'inter' }}>
                                                                ERC721
                                                            </Typography>
                                                        </Box>
                                                        <CommentOutlined
                                                            onClick={() => setDescColType(!descColType)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColType &&
                                                        <LilDescription id={'col-type-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Type of deployed contract
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '12px', gap: '12px' }}>
                                                    <FlexRow sx={{}}>
                                                        <MyInput name={'col_name'} label={'Name *'} width={'100%'} icon={<TitleOutlined sx={{ color: 'primary.light' }} />}
                                                            onChange={handleColFormChange}
                                                            value={collectionForm.col_name}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescColName(!descColName)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColName &&
                                                        <LilDescription id={'col-name-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Name of your collection
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '12px', gap: '12px' }}>
                                                    <FlexRow >
                                                        <MyInput name={'symbol'} label={'Symbol *'} width={'100%'} icon={<EmojiSymbols sx={{ color: 'primary.light' }} />}
                                                            onChange={handleColFormChange}
                                                            value={collectionForm.symbol}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescColSymbol(!descColSymbol)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColSymbol &&
                                                        <LilDescription id={'col-symb-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Symbol of the collection contract  (somehow it's nickname)!
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}


                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '12px', gap: '12px' }}>
                                                    <FlexRow sx={{ position: 'relative' }}>
                                                        <ButtonInput label={'Cover Image *'} width={'100%'}
                                                            icon={<ConnectedTvRounded sx={{ color: 'primary.light' }} />}
                                                            button={<ButtonOutline
                                                                height='35px'
                                                                onClick={() => colImageInput.current.click()}
                                                                text={'Browse'}
                                                                br={'30px'} />
                                                            } />

                                                        <input
                                                            accept="image/*"
                                                            id="nftPhoto"
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            onChange={handleColImageChange}
                                                            ref={colImageInput}
                                                        />

                                                        <Box
                                                            sx={{
                                                                width: '68px',
                                                                aspectRatio: 16 / 9,
                                                                borderRadius: '12px',
                                                                backgroundColor: 'primary.gray',
                                                                cursor: 'pointer',
                                                                position: 'absolute',
                                                                left: '150px', right: 0,
                                                                display: () => {
                                                                    return (
                                                                        colPhotoURL
                                                                            ? 'block'
                                                                            : 'none'
                                                                    )
                                                                },
                                                                background: () => {
                                                                    return (
                                                                        colPhotoURL
                                                                            ? `url('${colPhotoURL}') no-repeat center`
                                                                            : 'primary.gray'
                                                                    )
                                                                },
                                                                backgroundSize: 'cover'
                                                            }}
                                                            onClick={() => colImageInput.current.click()}
                                                        ></Box>

                                                        <CommentOutlined
                                                            onClick={() => setDescColCover(!descColCover)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColCover &&
                                                        <LilDescription id={'col-cov-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Cover Image of your nft collection
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '12px', gap: '12px' }}>
                                                    <FlexRow >

                                                        <SelectInput tabs={pvGalleries.map(gal => (gal.gal_name))} label={'Private Room'}
                                                            // handleSelect={(e) => setPVRoom(pvGalleries.filter(gal => gal.gal_name == e.target.id))}
                                                            handleSelect={(e) => {
                                                                // setPVRoom(pvGalleries.filter(gal => gal.gal_name == e.target.id))
                                                                setCollectionForm(prev => ({ ...prev, gallery_id: pvGalleries.filter(gal => gal.gal_name == e.target.id)[0].id }))
                                                                setGalleryId(pvGalleries.filter(gal => gal.gal_name == e.target.id)[0].id)
                                                            }}
                                                            value={collectionForm.gallery_id ? pvGalleries.filter(gal => gal.id == collectionForm.gallery_id)[0].gal_name : ''}
                                                            id="Media-room-selection"
                                                            width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                                        <CommentOutlined onClick={() => setDescColPVR(!descColPVR)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColPVR &&
                                                        <LilDescription id={'col-desc-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    private room of your collection contract
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '12px', gap: '12px' }}>

                                                    <FlexRow >
                                                        <MyInput name={'col_description'} label={'Description *'} width={'100%'} icon={<DescriptionOutlined sx={{ color: 'primary.light' }} />}
                                                            onChange={handleColFormChange}
                                                            value={collectionForm.col_description}
                                                        />
                                                        <CommentOutlined onClick={() => setDescColDesc(!descColDesc)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descColDesc &&
                                                        <LilDescription id={'col-desc-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Description of your collection contract
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>
                                            </FlexColumn>
                                        </Container>



                                        {/* this commented section is for metadata addition ==>  */}
                                        {/* <Container sx={{ mt: '24px', }}>
                                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                            The Collection Metadata
                                        </Typography>
                                        <FlexColumn>
                                            <FlexRow sx={{ mb: '16px' }}>
                                                <MyInput name={'base_uri'} label={'Base URI *'} width={'100%'} icon={<LinkOutlined sx={{ color: 'primary.light' }} />}
                                                    onChange={handleColFormChange}
                                                    value={collectionForm.base_uri}
                                                />
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
                                                        name='metadata_updatable'
                                                        setOption={value => setCollectionForm((prev) => ({ ...prev, metadata_updatable: value }))}
                                                        selected={collectionForm.metadata_updatable}
                                                    />
                                                    }
                                                />
                                                <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                            </FlexRow>
                                            <FlexRow sx={{ mb: '16px' }}>
                                                <ButtonInput label={'Metadata Addition *'} width={'100%'}
                                                    icon={<AddBoxOutlined
                                                        sx={{ color: 'primary.light' }}
                                                    />
                                                    }
                                                    button={<Add sx={{ color: 'primary.gray' }}
                                                        onClick={() => setCollectionForm((prev) => ({ ...prev, extra: [...prev.extra, { key: "", value: "" }] }))}
                                                    />
                                                    } />
                                                <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                            </FlexRow>
                                            {
                                                collectionForm.extra.map((object, index) => {
                                                    return (<FlexRow sx={{ mb: '16px' }}>
                                                        <span>{index + 1}</span>
                                                        <MyInput name={'key'} label={'Key'} width={'40%'}
                                                            onChange={(e) => handleMetadataChange(e, index)}
                                                            value={object.key}
                                                        />
                                                        <MyInput name={'value'} label={'Value'} width={'40%'}
                                                            onChange={(e) => handleMetadataChange(e, index)}
                                                            value={object.value}
                                                        />
                                                    </FlexRow>)
                                                })
                                            }

                                        </FlexColumn>
                                    </Container> */}
                                        <Container sx={{ mt: '24px', }}>
                                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                                The Collection Finance
                                            </Typography>
                                            <FlexColumn>
                                                <FlexColumn sx={{ mb: '16px' }}>
                                                    <FlexRow >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                                            <Typography sx={{ fontSize: '12px' }}>
                                                                Owner Address : &nbsp;
                                                            </Typography>
                                                            <Input name="owner_cid" color="primary.gray" style={{ outline: "none", fontSize: '12px' }}
                                                                value={globalUser.YouWhoID}
                                                                disabled={true}
                                                            />
                                                        </Box>
                                                        <CommentOutlined
                                                            onClick={() => setDescOwnerAdd(!descownerAdd)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descownerAdd &&
                                                        <LilDescription id={'col-owner-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Your Collection Contract Address Which will be your youWho ID
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '16px', gap: '12px' }}>
                                                    <FlexRow>
                                                        <MyInput type='number' name={'royalties_share'} label={'Royalty Share *'}
                                                            width={'100%'} icon={<Percent sx={{ color: 'primary.light' }} />}
                                                            onChange={handleColFormChange}
                                                            value={collectionForm.royalties_share}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescRoyaltyShare(!descRoyaltyShare)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descRoyaltyShare &&
                                                        <LilDescription id={'col-royal-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    Percentage of royalty transferred to specified youwho id , cannot be more than 5%!
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}

                                                </FlexColumn>
                                                <FlexColumn sx={{ mb: '16px', gap: '12px' }}>
                                                    <FlexRow>
                                                        <MyInput name={'royalties_address_screen_cid'} label={'Royalties Address *'}
                                                            width={'100%'} icon={<AddReaction sx={{ color: 'primary.light' }} />}
                                                            onChange={handleColFormChange}
                                                            value={collectionForm.royalties_address_screen_cid}
                                                        />
                                                        <CommentOutlined
                                                            onClick={() => setDescRoyaltyAdd(!descRoyaltyAdd)}
                                                            sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                                    </FlexRow>
                                                    {descRoyaltyAdd &&
                                                        <LilDescription id={'col-royal-add-desc'} width={'100%'}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '12px',
                                                                    color: 'primary.text', textTransform: 'capitalize'
                                                                }}>
                                                                    YouWho ID you want your artwork royalty to be transferred to
                                                                </Typography>
                                                            </Box>
                                                        </LilDescription>}
                                                </FlexColumn>
                                            </FlexColumn>
                                        </Container>
                                        {
                                            isCollSuccses &&
                                            <Container sx={{ flexDirection: 'row', mt: '24px' }}>
                                                <FlexRow sx={{ gap: '40px' }}>
                                                    <NFTImage
                                                        sx={{
                                                            background: `url(${colPhotoURL})`,
                                                            aspectRatio: '16 / 9',
                                                        }}
                                                    />
                                                    <FlexColumn sx={{ height: '100%', gap: '16px', justifyContent: 'space-between' }}>
                                                        <Typography sx={{ color: '#3DCA64', fontSize: { xs: '18px', sm: '22px' }, width: '100%' }}>
                                                            Collection Was Created Successfully
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '12px', width: '100%' }}>
                                                            Created Collection Goes To “ Profile , Private Gallery ”.
                                                        </Typography>
                                                        <ButtonPurple
                                                            text={'Go To Private Gallery'}
                                                            w={'100%'}
                                                            onClick={() => {
                                                                setMainActiveTab("private-gallery-tab")
                                                                setIsCollSuccses(false)
                                                            }}
                                                        />
                                                    </FlexColumn>
                                                </FlexRow>
                                            </Container>
                                        }
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
                                                    <Crop imageURL={colPhotoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenColCrop} setFile={setColImageFile} setPhotoURL={setColPhotoURL} />
                                                </Box>
                                            </Box>
                                        </Modal>
                                        <Box sx={{
                                            width: { xs: '100%', sm: '350px' }, mt: '24px', display: 'flex', justifyContent: 'center'
                                        }}>
                                            <ButtonPurple
                                                text={'Create'}
                                                w={'100%'}
                                                onClick={!Object.values(collectionForm).every(value => value !== null && value !== "") || !colImageFile || ColReqSent ? undefined : createCollection}
                                                disabled={!Object.values(collectionForm).every(value => value !== null && value !== "") || !colImageFile || ColReqSent}
                                            />
                                        </Box>
                                    </> :
                                    <CreatePVRoom />
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

export default CreateNFT;