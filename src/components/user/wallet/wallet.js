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



const ShowPanel = styled(Box)(({ theme }) => ({
    marginTop: '50px', width: '100%',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
}))
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
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
        <Box sx={{
            bgcolor: 'primary.bg',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // width: { xs: '100%', sm: 'calc(100% - 80px)' },
            width: { xs: 'calc(100% - 30px)', sm: 'calc(100% - 80px)' },
            pr: { xs: 'none', sm: '15px', md: '30px' },
            pl: { xs: 'none', sm: '90px' },
            color: 'primary.text'
        }}>

            <Box
                sx={(theme) => ({
                    width: '490px',
                    height: '250px',
                    backgroundImage: () => (globalUser.walletBackground && finalCard.background == 'custom') ? BG_URL(PUBLIC_URL(`${API_CONFIG.API_URL}/${globalUser.walletBackground}`)) : BG_URL(PUBLIC_URL(`${cardBackgroundImage}`)),
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                    boxShadow: theme.palette.primary.boxShadow,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    p: '24px 24px 24px 24px', mt: 3,
                    flexDirection: 'column', justifyContent: 'space-between',
                    color: finalCard.color
                })}
            >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', overflow: 'hidden' }}>
                        <Box sx={{ width: '55px', height: '60px', mt: 1.5, ml: '-10px', backgroundImage: BG_URL(PUBLIC_URL(`./w-outline.svg`)), backgroundRepeat: 'no-repeat' }} />
                        <Box sx={{ width: '72px', height: '16px', backgroundImage: BG_URL(PUBLIC_URL(`./w-typography.svg`)), backgroundRepeat: 'no-repeat' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <div>
                            <ContentCopy size={25} sx={{ cursor: 'pointer' }} />
                        </div>
                        <div>
                            <ShareOutlined size={25} sx={{ cursor: 'pointer' }} />
                        </div>
                        <div onClick={() => setOpenSetting(true)}>
                            <SettingsOutlined size={25} sx={{ cursor: 'pointer' }} />
                        </div>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "32px", px: 2 }}>
                        <Box sx={{ width: '50px', height: '50px', mr: '16px', backgroundImage: BG_URL(PUBLIC_URL(`${Chip}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />
                        <Box sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
                            , width: '35px', height: '35px', mr: '4px'
                        }} />
                        <span>
                            {globalUser.balance}
                        </span>
                        {/* {privateKey ? <>
                                <div style={{ display: 'flex', alignItems: 'center', }}> your private key :
                                    <span style={{
                                        //  fontSize: '13px', color: '#BEA2C5', 
                                        cursor: 'pointer'
                                    }}
                                        onClick={() => copyToClipBoard(privateKey)}>
                                        {privateKey}
                                    </span>
                                    <TickSquare style={{ display: keyCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                                </div>
                                <span style={{ fontSize: '12px', color: '#BEA2C5', }}>
                                    please save this key
                                </span>
                            </>
                                :
                                undefined} */}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2, gap: '6px' }}>
                        <Typography onClick={() => copyIdToClipBoard(globalUser.YouWhoID)} sx={{ width: '100%', fontSize: '21px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', textAlign: 'center', mb: '6px' }}>{globalUser.YouWhoID}</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{globalUser.username}</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{globalUser.mail}</Typography>
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
                                    borderRadius: '24px',
                                    width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                                    backgroundColor: 'secondary.bg',
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
                                    backgroundColor: 'secondary.bg',
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
                                        <Button color="#F675A8" onClick={handleCancel}>cancel</Button>
                                        <Button color="#3DCA64" onClick={handleSave}>save</Button>
                                    </Box>

                                </Box>
                        }
                    </Box>
                </Modal >
            </Box >

            <ShowPanel>
                {/* <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'max-content',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px 20px 26px 20px', gap: '10px', borderBottom: '1px solid #9A9A9A'
                    }}>
                        <Tab onClick={() => { setState('charge-wallet') }} className={state == 'charge-wallet' && 'active'}>
                            <ArrowDownward size="16px" sx={{ mr: '4px' }} />
                            <Typography>
                                Charge Wallet
                            </Typography>
                        </Tab>
                        <Tab onClick={() => { setState('withdraw') }} className={state == 'withdraw' && 'active'}>
                            <ArrowUpward size="16px" sx={{ mr: '4px' }} />
                            <Typography>
                                Withdraw
                            </Typography>
                        </Tab>
                        <Tab onClick={() => { setState('transfer') }} className={state == 'transfer' && 'active'}>
                            <Box sx={{ width: '20px', height: '20px', mr: '7px', backgroundImage: () => state == 'transfer' ? BG_URL(PUBLIC_URL(`${giftOpenWhite}`)) : BG_URL(PUBLIC_URL(`${giftOpen}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />
                            <Typography>
                                Transfer NFT Gift
                            </Typography>
                        </Tab>
                        <Tab onClick={() => { setState('claim') }} className={state == 'claim' && 'active'}>
                            <Box sx={{ width: '20px', height: '20px', mr: '7px', backgroundImage: () => state == 'claim' ? BG_URL(PUBLIC_URL(`${giftWhite}`)) : BG_URL(PUBLIC_URL(`${gift}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />
                            <Typography>
                                Claim NFT Gift
                            </Typography>
                        </Tab>
                        <Tab onClick={() => { setState('turnover') }} className={state == 'turnover' && 'active'}>
                            <Sync size="16px" sx={{ mr: '4px' }} />
                            <Typography>
                                Turnover
                            </Typography>
                        </Tab>
                    </Box>
                </Box> */}

                <Tabs jc={'center'} w={'70%'}>
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

                <Panel sx={{ width: '100%', pt: '26px' }}>
                    {state == 'charge-wallet' && <ChargeWallet />}
                    {/* {state == 'withdraw' && <WithdrawPanel />} */}
                    {state == 'transfer' && <TransferGift />}
                    {state == 'claim' && <WithdrawPanel />}
                    {state == 'turnover' && <Turnover />}
                </Panel>
            </ShowPanel>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        </Box >
        // </Box >

    );
}

export default Wallet;