import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Modal, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Close, ContentPaste, ContentPasteGoRounded, ContentPasteRounded, FormatTextdirectionLToRTwoTone } from '@mui/icons-material'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import MediaTypeIcon from '../../../assets/icons/media-type.svg'
import frameIcon from '../../../assets/icons/frame.svg'
import fileIcon from '../../../assets/icons/upload-file.svg'
import CoinsIcon from '../../../assets/icons/coins.svg'
import NameIcon from '../../../assets/icons/name.svg'
import TextIcon from '../../../assets/icons/text.svg'
import IDIcon from '../../../assets/icons/id.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import Crop from '../../crop/Crop'
import { ButtonInput, MyInput, SelectInput } from '../../utils'
import ButtonOutline from '../../buttons/buttonOutline'
import { useSelector, useDispatch } from "react-redux";
import { setPrivateKey, updateBalance } from "../../../redux/actions";
import { API_CONFIG } from "../../../config";
import { toast } from 'react-toastify';
import ButtonPurple from "../../buttons/buttonPurple";
import generateSignature from "../../../utils/signatureUtils";


const Card = styled(Box)(({ theme }) => ({
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
    width: '350px',
    backgroundColor: '#7C42C7',
    padding: '12px 36px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontFamily: `"Josefin Sans", "Inter", sans-serif`,
    fontSize: '16px',

    '&:disabled': {
        backgroundColor: theme.palette.primary.gray
    }
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

const TransferGift = () => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const getBalance = (token) => dispatch(updateBalance(token));
    const [mediaType, setMediaType] = useState(undefined)
    const [aspectRatio, setAspectRatio] = useState('16 / 9')
    const [openCrop, setOpenCrop] = useState(false)
    const [tokenAmount, setTokenAmount] = useState(0)
    const [NFTName, setNFTName] = useState(null)
    const [NFTDescription, setNFTDescription] = useState(null)
    const [recipientID, setRecipientID] = useState(null)
    const [checked, setChecked] = useState(false)
    const imageInput = useRef()
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const [IpfsURL, setIpfsURL] = useState(undefined)
    const [txHash, setTxHash] = useState(null)
    useEffect(() => {
        window.document.getElementById("scrollable-wallet-panel-inside").scrollTo(0, 0);
    }, [])

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

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

    async function uploadImageToIPFS() {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("https://api.nft.storage/upload", {
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZmMWZiMkU4RTM1NUJjZEViMkRjNjY4NjgwNzU3ZDRDQzY3MDY0MkUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODE4MjM4MzQ0MSwibmFtZSI6IllvdVdobyJ9.KAqJdepT5mGN8gNror2H4Lu_RnDroSWIJZkIPJRedvU",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(response);
        }

        const data = await response.json();
        return data;
    }


    const transfer = async (IpfsURL) => {
        loading();

        if (globalUser.privateKey) {
            const data = {
                recipient: recipientID,
                from_cid: globalUser.cid,
                amount: Number(tokenAmount),
                nft_img_url: IpfsURL,
                nft_name: NFTName,
                nft_desc: NFTDescription,
            }

            const { signObject, requestData, publicKey } = generateSignature(globalUser.privateKey, data);

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/deposit/to/0x35e81902dd457f44bae08112c386d9104f1e1ad4`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                setTxHash(response.data.mint_tx_hash)
                updateToast(true, response.message)
                getBalance(globalUser.token)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    const handleUpload = async () => {
        try {
            if (file) {
                const response = await uploadImageToIPFS();
                console.log(response)
                if (response.ok) {
                    transfer(`https://${response.value.cid}.ipfs.nftstorage.link/${response.value.files[0].name}`)
                }
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle errors (e.g., display error message)
        }
    };



    return (
        <Box sx={{
            width: '100%',
            maxWidth: '900px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0', mb: '20px'
        }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', p: '10px' }}>
                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '26px', lineHeight: 'normal', fontWeight: '400' }}>Transfer NFT Gift</Typography>
                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '16px', lineHeight: 'normal', fontWeight: '400' }}>Create Nft, Then Transfer It To Your Friend As A NFT Gift !</Typography>
            </Box>
            {
                (globalUser.privateKey) ?
                    <>
                        <Card>
                            <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    Upload Your NFT
                                </Typography>
                                <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                    You Can Upload NFT in Various Types & Sizes
                                </Typography>
                            </FlexColumn>
                            <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px', }}>
                                <FlexColumn sx={{
                                    gap: { xs: '10px', sm: '16px' }, width: {
                                        xs: '100%', sm: '50 % !important'
                                    }
                                }
                                } >
                                    <SelectInput tabs={['Image, .PNG', 'Image, .JPG', 'Video, .MP4']} label={'Your NFT Type'}
                                        handleSelect={(e) => setMediaType(e.target.id)} value={mediaType} id="nft-type-selection"
                                        width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                    <input
                                        accept="image/*"
                                        id="nftPhoto"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                        ref={imageInput}
                                    />
                                    <ButtonInput label={'Upload NFT File *'} width={'100%'}
                                        icon={<Icon url={fileIcon} w={27} h={27} />}
                                        // showable={ }
                                        button={<ButtonOutline
                                            height='35px'
                                            onClick={() => imageInput.current.click()}
                                            text={'Browse'}
                                            br={'30px'} />
                                        } />
                                    <SelectInput tabs={['16 / 9', '1 / 1',]} label={'Aspect Ratio'}
                                        handleSelect={(e) => setAspectRatio(e.target.id)}
                                        value={aspectRatio} id="nft-aspect-ratio-selection"
                                        width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} />
                                </FlexColumn>
                                <Box sx={{
                                    width: '50%', height: '100%',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Box
                                        sx={{
                                            width: `${aspectRatio === '16 / 9' ? 326 : 176}px`,
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
                                    >

                                    </Box>
                                </Box>
                            </FlexRow>
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
                                        <Crop imageURL={photoURL} aspectRatio={aspectRatio == '16 : 9' ? 16 / 9 : 1} setOpenCrop={setOpenCrop} setFile={setFile} setPhotoURL={setPhotoURL} />
                                    </Box>
                                </Box>
                            </Modal>
                        </Card>
                        <Card>
                            <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    NFT Informations
                                </Typography>
                                <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                    Tell Us About Your Friend’s NFT Gift
                                </Typography>
                            </FlexColumn>
                            <FlexColumn sx={{ gap: '16px' }}>
                                <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                    <MyInput value={tokenAmount}
                                        onChange={(e) => setTokenAmount(e.target.value)}
                                        label={'NFT Gift Value'} width={'100%'}
                                        icon={<Icon url={CoinsIcon} w={27} h={27} />} type={'number'} id={'nft-gift-value'} />
                                    <MyInput value={NFTName}
                                        onChange={(e) => setNFTName(e.target.value)}
                                        label={'NFT Name*'} width={'100%'}
                                        icon={<Icon url={NameIcon} w={27} h={27} />} type={'string'} id={'nft-name'} />
                                </FlexRow>
                                <MyInput value={NFTDescription}
                                    onChange={(e) => setNFTDescription(e.target.value)}
                                    label={'NFT Description*'} width={'100%'}
                                    icon={<Icon url={TextIcon} w={27} h={27} />} type={'string'} id={'nft-decription'} />
                            </FlexColumn>
                        </Card >
                        <Card>
                            <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    Your Friend’s Address
                                </Typography>
                                <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                    Enter The YouWho Id (Username/Email) of
                                    Your Friend To Transfer The NFT Gift To.
                                </Typography>
                            </FlexColumn>
                            <MyInput value={recipientID}
                                onChange={(e) => setRecipientID(e.target.value)}
                                id="nft-username"
                                label='Username / Email' width={{ xs: '100%', sm: '80%' }}
                                icon={<Icon url={IDIcon} w={27} h={27} />}
                                extraIcon={<ContentPasteRounded sx={{ fontSize: '20px', color: 'primary.gray', cursor: 'pointer' }} />} />
                            <FormGroup>
                                <FormControlLabel
                                    required
                                    control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                                    label="I’m Sure About The YouWho Id, I Have Entered."
                                    sx={{
                                        color: 'primary.darkGray',
                                        '& .MuiTypography-root': {
                                            fontSize: '12px',
                                        },
                                        '&& .MuiFormControlLabel-asterisk': {
                                            color: 'primary.main',
                                            fontSize: '16px',
                                        }
                                    }}
                                />
                            </FormGroup>
                        </Card >
                        <ButtonPurple
                            onClick={handleUpload}
                            disabled={(!file || !mediaType || !aspectRatio || !tokenAmount || !NFTName || !NFTDescription || !recipientID || !checked)}
                            text={'transfer'} px={'24px'} w={{ xs: '100%', sm: '350px' }} />
                    </>
                    :
                    <Card>
                        <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                            We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                        </Typography>
                        <MyInput
                            value={signer}
                            onChange={(e) => setSigner(e.target.value)}
                            placeholder="enter private key"
                            width={'400px'}
                            textColor={'black'}
                            py={'8px'} />
                        <Button onClick={savePrivateKey}>save</Button>
                    </Card>
            }
        </Box >
    );
}

export default TransferGift;