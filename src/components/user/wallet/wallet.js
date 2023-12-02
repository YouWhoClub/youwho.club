import styled from "@emotion/styled";
import PanelLayout from "../../PanelLayout";
import { Box, Typography, Modal, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ContentCopy, ShareOutlined, SettingsOutlined, Sync, ArrowUpward, ArrowDownward, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import WithdrawPanel from "./withdrawPanel";
import ChargeWallet from "./chargeWallet";
import TransferGift from "./transferGift";
import Turnover from "./turnover";
import yCoin from '../../../assets/Ycoin.svg'
import Chip from '../../../assets/icons/Chip.svg'
import cardBackgroundImage from '../../../assets/cardBackground.png'
import gift from '../../../assets/icons/gift-open-outline.svg'
import giftOpen from '../../../assets/icons/gift-outline.svg'
import giftWhite from '../../../assets/icons/gift-open-outline-white.svg'
import giftOpenWhite from '../../../assets/icons/gift-outline-white.svg'
import { ToastContainer, toast } from 'react-toastify';
import { Tab, Tabs } from "../../utils";
import Crop from '../../crop/Crop'
import { API_CONFIG } from "../../../config";
import { getuser } from "../../../redux/actions";

const ScrollablePanel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        // display: 'none',
        width: '5px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '5px',
        height: '5px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '1px',
        height: '1px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
}))


const ShowPanel = styled(Box)(({ theme }) => ({
    // marginTop: '50px', 
    width: '100%',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
}))
const Panel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    transition: '500ms ease',
    width: '100%',
    // borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',

}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))

const Button = styled('button')(({ theme, color }) => ({
    backgroundColor: 'transparent',
    padding: '8px 24px',
    outline: 'none',
    color: color,
    cursor: 'pointer',
    border: 'none',
    fontFamily: "Inter",
    fontSize: '12px',
}))


const Wallet = ({ privateKey }) => {
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));
    const [keyCopied, setKeyCopied] = useState(false)
    const [idCopied, setIdCopied] = useState(false)
    const [state, setState] = useState('charge-wallet')
    const [openSetting, setOpenSetting] = useState(false)
    const [openCrop, setOpenCrop] = useState(false)
    const [cardTextColor, setCardTextColor] = useState('white')
    const [cardBackground, setCardBackground] = useState('default')
    const [finalCard, setFinalCard] = useState({ color: 'white', background: 'default' })
    const imageInput = useRef()
    const toastId = useRef(null);
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    useEffect(() => {
        if (globalUser.walletBackground) {
            setCardBackground('custom')
            setFinalCard(prev => ({ ...prev, background: 'custom' }))
        }
    }, [globalUser.walletBackground])


    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    async function uploadBackgroundImage() {
        loading();

        const myFile = new File([file], 'image.jpeg', {
            type: file.type,
        });

        const formData = new FormData();
        formData.append("img", myFile);

        console.log(formData)

        const request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/wallet-back`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
            },
            body: formData,
        });

        const response = await request.json();

        if (!response.is_error) {
            updateToast(true, response.message);
            fetchUser(globalUser.token);
            setOpenSetting(false);
            setFile(null)
        } else {
            console.error("Error uploading image:", response.message);
            updateToast(false, `An error occurred: ${response.message}`);
        }
    }



    const handleSave = async () => {
        setFinalCard(prev => ({ ...prev, color: cardTextColor, background: cardBackground }))
        if (file && cardBackground == 'custom') {
            uploadBackgroundImage()
        } else {
            setOpenSetting(false)
        }
    }

    const handleCancel = async () => {
        setCardTextColor(finalCard.color)
        setCardBackground(finalCard.background)
        setOpenSetting(false)
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    const copyToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setKeyCopied('Copied!');
        } catch (err) {
            setKeyCopied('Failed to copy!');
        }
    };
    const copyIdToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied('Failed to copy!');
        }
    };

    return (
        <Box
            sx={{
                width: { xs: 'calc(100% - 30px)', sm: 'calc(100% - 80px)' },
                pr: { xs: 'none', sm: '15px', md: '30px' },
                pl: { xs: 'none', sm: '90px' },
                display: 'flex',
                // boxSizing:'border-box'
            }}
        >

            <Box
                id="wallet"
                sx={{
                    // px: { xs: 'none', md: 1 },
                    // mr: { xs: 'none', md: '30px' },
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    width: '100%',
                    gap: { xs: '22px', md: '50px' },
                    boxSizing: 'border-box', padding: '20px 15px 40px',
                    height: 'auto'
                }}>

                <Box
                    sx={(theme) => ({
                        width: { xs: '100%', sm: 'max-content' },
                        height: { xs: '250px', sm: '300px' },
                        backgroundImage: () => (globalUser.walletBackground && finalCard.background == 'custom') ? BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${globalUser.walletBackground}`)) : BG_URL(PUBLIC_URL(`${cardBackgroundImage}`)),
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                        boxShadow: theme.palette.primary.boxShadow,
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        p: '24px 24px 24px 24px',
                        flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box',
                        color: finalCard.color
                    })}
                >
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', overflow: 'hidden', gap: { xs: '6px', sm: '12px' } }}>
                            <Box sx={{
                                width: '35px', height: '45px',
                                backgroundImage: BG_URL(PUBLIC_URL(`./w-outline.svg`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                            }} />
                            <Box sx={{ width: '72px', height: '16px', backgroundImage: BG_URL(PUBLIC_URL(`./w-typography.svg`)), backgroundRepeat: 'no-repeat' }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                            <div>
                                <ContentCopy
                                    // size={25}
                                    sx={{ cursor: 'pointer', fontSize: { xs: '18px', sm: '24px' } }}
                                    onClick={() => copyIdToClipBoard(globalUser.YouWhoID)} />
                            </div>
                            <div>
                                <ShareOutlined
                                    // size={25}
                                    sx={{ cursor: 'pointer', fontSize: { xs: '18px', sm: '24px' } }} />
                            </div>
                            <div onClick={() => setOpenSetting(true)}>
                                <SettingsOutlined
                                    // size={25}
                                    sx={{ cursor: 'pointer', fontSize: { xs: '18px', sm: '24px' } }} />
                            </div>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        gap: '24px', px: '8px', boxSizing: 'border-box'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "32px", }}>
                            <Box sx={{
                                width: '50px', height: '35px',
                                mr: '16px',
                                backgroundImage: BG_URL(PUBLIC_URL(`${Chip}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
                            }} />
                            <Box sx={{
                                backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
                                , width: '35px', height: '35px', mr: '4px'
                            }} />
                            <span>
                                {globalUser.balance}
                            </span>
                        </Box>

                        <Box sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexWrap: "wrap",
                            gap: '6px'
                        }}>
                            <Typography onClick={() => copyIdToClipBoard(globalUser.YouWhoID)}
                                sx={{
                                    width: '100%', fontSize: { xs: '14px', sm: '21px' }, fontStyle: 'normal', fontWeight: '400',
                                    lineHeight: 'normal', textAlign: 'start', mb: '6px'
                                }}>{globalUser.YouWhoID}</Typography>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '16px' } }}>{globalUser.username}</Typography>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '16px' } }}>{globalUser.mail}</Typography>
                        </Box>

                    </Box>

                    <Modal
                        open={openSetting}
                        onClose={() => setOpenSetting(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(255, 255, 255, 0.50)', backdropFilter: "blur(16.5px)", } }}
                    >
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {
                                openCrop ?
                                    <Box sx={{
                                        borderRadius: { xs: 0, sm: '24px' },
                                        width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                                        backgroundColor: 'secondary.bg', boxSizing: 'border-box', color: 'primary.text',
                                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between',
                                        boxShadow: '0px 0px 20px 0px black',
                                    }}>
                                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                                            <Typography>Crop</Typography>
                                            <div onClick={() => {
                                                setOpenCrop(false)
                                            }}>
                                                <Close sx={{ cursor: 'pointer' }} />
                                            </div>
                                        </FlexRow>
                                        <Crop imageURL={photoURL} aspectRatio={2 / 1} setOpenCrop={setOpenCrop} setFile={setFile} setPhotoURL={setPhotoURL} />
                                    </Box> :
                                    <Box sx={{
                                        borderRadius: '24px',
                                        width: { xs: '100%', sm: '533px' }, height: { xs: '100%', sm: '260px' },
                                        backgroundColor: 'secondary.bg', color: 'primary.text', boxSizing: 'border-box',
                                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between',
                                        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
                                    }}>
                                        <Box>
                                            <Typography sx={{ fontSize: '16px' }}>
                                                YouWho Card Text Color
                                            </Typography>
                                            <FormControl >
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="row-radio-buttons-color-group-label"
                                                    name="color-radio-buttons-group"
                                                    value={cardTextColor}
                                                    onChange={(e) => setCardTextColor(e.target.value)}
                                                >
                                                    <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'inter', fontSize: '12px' } }} value="white" control={<Radio />} label="White" />
                                                    <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'inter', fontSize: '12px' } }} value="black" control={<Radio />} label="Black" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: '16px' }}>
                                                Youwho Card Text Background Image
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '50px' }}>
                                                <FormControl >
                                                    <RadioGroup
                                                        aria-labelledby="row-radio-buttons-image-group-label"
                                                        name="image-radio-buttons-group"
                                                        value={cardBackground}
                                                        onChange={(e) => setCardBackground(e.target.value)}
                                                    >
                                                        <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'inter', fontSize: '12px' } }} value="custom" control={<Radio />} label="Browse Custom Image" />
                                                        <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'inter', fontSize: '12px' } }} value="default" control={<Radio />} label="Default" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <Box
                                                    onClick={() => imageInput.current.click()}
                                                    sx={{
                                                        width: '100px', height: '60px', borderRadius: '10px', cursor: () => cardBackground == 'default' ? 'default' : 'pointer', pointerEvents: () => cardBackground == 'default' ? 'none' : 'auto',
                                                        backgroundImage: () => cardBackground == 'default' ? BG_URL(PUBLIC_URL(`${cardBackgroundImage}`)) : photoURL ? BG_URL(PUBLIC_URL(`${photoURL}`)) : BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${globalUser.walletBackground}`)),
                                                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                                                    }}
                                                ></Box>
                                                <input
                                                    accept="image/*"
                                                    id="profilePhoto"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleChange}
                                                    ref={imageInput}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button style={{ borderRight: '1px solid #DEDEDE' }} color="#F675A8" onClick={handleCancel}>cancel</Button>
                                            <Button color="#3DCA64" onClick={handleSave}>save</Button>
                                        </Box>

                                    </Box>
                            }
                        </Box>
                    </Modal >
                </Box >

                <ShowPanel>
                    <Panel>


                        <Tabs mb={'32px'} jc={'center'} w={'100%'}>
                            <Tab
                                icon={<ArrowDownward size="16px" sx={{ mr: '4px', pointerEvents: 'none' }} />}
                                text={`Charge Wallet`}
                                id={"charge-wallet"}
                                onClick={(e) => setState(e.target.id)}
                                selected={state == 'charge-wallet'}
                            />
                            {/* <Tab
                        icon={<ArrowUpward size="16px" sx={{ mr: '4px', pointerEvents: 'none' }} />}
                        text={`Withdraw`} id={"withdraw"}
                        onClick={(e) => setState(e.target.id)}
                        selected={state == 'withdraw'}
                    /> */}
                            <Tab
                                icon={<Box sx={{ width: '20px', height: '20px', mr: '7px', pointerEvents: 'none', backgroundImage: () => state == 'transfer' ? BG_URL(PUBLIC_URL(`${giftOpenWhite}`)) : BG_URL(PUBLIC_URL(`${giftOpen}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />}
                                text={`Transfer NFT Gift`}
                                id={"transfer"}
                                onClick={(e) => setState(e.target.id)}
                                selected={state == 'transfer'}
                            />
                            <Tab
                                icon={<Box sx={{ width: '20px', height: '20px', mr: '7px', pointerEvents: 'none', backgroundImage: () => state == 'claim' ? BG_URL(PUBLIC_URL(`${giftWhite}`)) : BG_URL(PUBLIC_URL(`${gift}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />}
                                text={`Claim NFT Gift`}
                                id={"claim"}
                                onClick={(e) => setState(e.target.id)}
                                selected={state == 'claim'}
                            />
                            <Tab
                                icon={<Sync size="16px" sx={{ mr: '4px', pointerEvents: 'none' }} />}
                                text={`Turnover`}
                                id={"turnover"}
                                onClick={(e) => setState(e.target.id)}
                                selected={state == 'turnover'}
                            />
                        </Tabs>


                        <ScrollablePanel id="scrollable-profile-panel-inside"
                            sx={{
                                height: {
                                    xs: 'calc(100vh - 400px)',
                                    md: 'calc(100vh - 300px)'
                                },
                                pb: { xs: '50px', sm: '10px' }, pt: 1,
                                px: { xs: 1, sm: '22px' }
                            }}>
                            {state == 'charge-wallet' && <ChargeWallet />}
                            {/* {state == 'withdraw' && <WithdrawPanel />} */}
                            {state == 'transfer' && <TransferGift />}
                            {state == 'claim' && <WithdrawPanel />}
                            {state == 'turnover' && <Turnover />}
                        </ScrollablePanel>

                    </Panel>
                </ShowPanel>

            </Box>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        </Box >
        // </Box >

    );
}

export default Wallet;