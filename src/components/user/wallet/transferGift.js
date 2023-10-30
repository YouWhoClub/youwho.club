import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Modal, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Close, FormatTextdirectionLToRTwoTone } from '@mui/icons-material'
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import MediaTypeIcon from '../../../assets/icons/media-type.svg'
import frameIcon from '../../../assets/icons/frame.svg'
import fileIcon from '../../../assets/icons/upload-file.svg'
import CoinsIcon from '../../../assets/icons/coins.svg'
import NameIcon from '../../../assets/icons/name.svg'
import TextIcon from '../../../assets/icons/text.svg'
import IDIcon from '../../../assets/icons/id.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import Crop from '../../crop/Crop'
import { MyInput } from '../../utils'
import ButtonOutline from '../../buttons/buttonOutline'
import Web3 from 'web3';
import { useSelector, useDispatch } from "react-redux";
import { setPrivateKey, updateBalance } from "../../../redux/actions";
import { API_CONFIG } from "../../../config";
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';


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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))

const TransferGift = () => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const getBalance = (token) => dispatch(updateBalance(token));
    const [mediaType, setMediaType] = useState('image, .png')
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
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

    // setting polygon-mainnet as web3.js provider

    const provider = "https://polygon-mainnet.infura.io/v3/20f2a17bd46947669762f289a2a0c71c";
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const transfer = async (IpfsURL) => {
        loading();

        if (globalUser.privateKey) {
            const privateKey = Buffer.from(globalUser.privateKey, 'hex');

            const data = {
                recipient: recipientID,
                from_cid: globalUser.cid,
                amount: Number(tokenAmount),
                nft_img_url: IpfsURL,
                nft_name: NFTName,
                nft_desc: NFTDescription,
            }

            const dataString = JSON.stringify(data);
            const dataHash = web3.utils.keccak256(dataString);

            const signObject = web3.eth.accounts.sign(dataHash, privateKey);

            const { signature } = signObject;

            const requestData = {
                ...data,
                tx_signature: signature.replace('0x', ''),
                hash_data: dataHash.replace('0x', ''),
            };

            console.log(signObject);
            console.log(requestData);

            const publicKey = web3.eth.accounts.recover(dataHash, signature);
            console.log(publicKey)

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/deposit/to/0x5a298eE7B1EDA4de9fBf18905974b059221CaC2e`, {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', p: '0' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', p: '10px' }}>
                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '26px', lineHeight: 'normal', fontWeight: '400' }}>Transfer NFT Gift</Typography>
                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '16px', lineHeight: 'normal', fontWeight: '400' }}>Create Nft, Then Transfer It To Your Friend As A NFT Gift !</Typography>
            </Box>
            {
                (globalUser.privateKey) ?
                    <>
                        <Card>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pt: '10px' }}>
                                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>Upload Your NFT</Typography>
                                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '12px', lineHeight: 'normal', fontWeight: '400' }}>You Can Upload NFT in Various Types & Sizes</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', p: '10px' }}>
                                    <FormControl sx={{ width: '326px' }}>
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
                                            width: '326px',
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
                                        <Typography sx={{ fontSize: '15px' }}>Upload NFT File <Typography sx={{ color: 'primary.main', display: 'inline-block' }}>*</Typography></Typography>
                                        <ButtonOutline
                                            onClick={() => imageInput.current.click()}
                                            text={'Browse'}
                                            br={'30px'} />
                                    </Box>
                                    <FormControl sx={{ width: '326px' }}>
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
                                        width: `${aspectRatio === 16 / 9 ? 326 : 176}px`,
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
                        <Card>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pt: '10px' }}>
                                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>NFT Informations</Typography>
                                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '12px', lineHeight: 'normal', fontWeight: '400' }}>Tell Us About Your Friend’s NFT Gift</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                                    <FormControl sx={{ width: '326px' }}>
                                        <Icon url={CoinsIcon} w={27} h={27} sx={{ position: 'absolute', top: '14px', left: '10px', }} />
                                        <TextField
                                            required
                                            id="nft-gift-value"
                                            label='NFT Gift Value'
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    pl: '45px'
                                                },
                                                '& .MuiFormLabel-root': {
                                                    color: 'black'
                                                },
                                                '&& .MuiFormLabel-asterisk': {
                                                    color: 'primary.main',
                                                    fontSize: '16px',
                                                }
                                            }}
                                            value={tokenAmount}
                                            onChange={(e) => setTokenAmount(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: '326px' }}>
                                        <Icon url={NameIcon} w={27} h={27} sx={{ position: 'absolute', top: '14px', left: '10px', }} />
                                        <TextField
                                            required
                                            id="nft-name"
                                            label='NFT Name'
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    pl: '45px'
                                                },
                                                '& .MuiFormLabel-root': {
                                                    color: 'black',
                                                    pl: '30px'
                                                },
                                                '&& .MuiInputLabel-shrink': {
                                                    pl: '0px'
                                                },
                                                '&& .MuiFormLabel-asterisk': {
                                                    color: 'primary.main',
                                                    fontSize: '16px',
                                                }
                                            }}
                                            value={NFTName}
                                            onChange={(e) => setNFTName(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Icon url={TextIcon} w={27} h={27} sx={{ position: 'absolute', top: '14px', left: '10px', }} />
                                        <TextField
                                            required
                                            fullWidth
                                            id="nft-description"
                                            label='NFT Description'
                                            multiline
                                            maxRows={4}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    pl: '45px'
                                                },
                                                '& .MuiFormLabel-root': {
                                                    color: 'black',
                                                    pl: '30px'
                                                },
                                                '&& .MuiInputLabel-shrink': {
                                                    pl: '0px'
                                                },
                                                '&& .MuiFormLabel-asterisk': {
                                                    color: 'primary.main',
                                                    fontSize: '16px',
                                                }
                                            }}
                                            value={NFTDescription}
                                            onChange={(e) => setNFTDescription(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </Card >
                        <Card>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pt: '10px' }}>
                                <Typography sx={{ color: 'primary.text', textAlign: 'center', fontSize: '20px', lineHeight: 'normal', fontWeight: '400' }}>Your Friend’s Address</Typography>
                                <Typography sx={{ fontFamily: 'Inter', color: '#787878', textAlign: 'center', fontSize: '12px', fontWeight: '400' }}>Enter The YouWho Id (Username/Email) of <br />Your Friend To Transfer The NFT Gift To. </Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <FormControl sx={{ width: '326px' }}>
                                    <Icon url={IDIcon} w={27} h={27} sx={{ position: 'absolute', top: '14px', left: '10px', }} />
                                    <TextField
                                        id="nft-username"
                                        label='Username / Email'
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                pl: '45px'
                                            },
                                            '& .MuiFormLabel-root': {
                                                color: 'black',
                                                pl: '30px'
                                            },
                                            '&& .MuiInputLabel-shrink': {
                                                pl: '0px'
                                            }
                                        }}
                                        value={recipientID}
                                        onChange={(e) => setRecipientID(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
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
                        <Button
                            onClick={handleUpload}
                            disabled={(!file || !mediaType || !aspectRatio || !tokenAmount || !NFTName || !NFTDescription || !recipientID || !checked)}
                        >Transfer
                        </Button>
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