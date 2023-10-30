import styled from "@emotion/styled";
import PanelLayout from "../../PanelLayout";
import { Box, Typography } from "@mui/material";
import { ContentCopy, ShareOutlined, SettingsOutlined, Sync, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import WithdrawPanel from "./withdrawPanel";
import ChargeWallet from "./chargeWallet";
import TransferGift from "./transferGift";
import PaidCheckouts from "./paidCheckouts";
import UnpaidCheckouts from "./unpaidCheckouts";
import yCoin from '../../../assets/Ycoin.svg'
import Chip from '../../../assets/icons/Chip.svg'
import cardBackground from '../../../assets/cardBackground.png'
import gift from '../../../assets/icons/gift-open-outline.svg'
import giftOpen from '../../../assets/icons/gift-outline.svg'
import giftWhite from '../../../assets/icons/gift-open-outline-white.svg'
import giftOpenWhite from '../../../assets/icons/gift-outline-white.svg'
import { ToastContainer } from 'react-toastify';
import { Tab, Tabs } from "../../utils";
// import yWhite from './w-outline.svg'

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
// const Tab = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     color: '#787878',
//     backgroundColor: '#fff',
//     cursor: 'pointer',
//     padding: '10px 22px 10px 18px',
//     whiteSpace: 'nowrap',
//     borderRadius: '30px',
//     lineHeight: 'normal',
//     boxShadow: ' 0px 0px 4px 1px rgba(0, 0, 0, 0.25) inset',
//     border: '1px solid #DEDEDE',

//     '& .MuiTypography-root': {
//         fontFamily: 'Inter',
//         fontSize: '14px',
//         color: '#787878',
//         lineHeight: 'normal',
//         fontWeight: '400'
//     },
//     '&.active': {
//         boxShadow: ' 0px 0px 5px 1px rgba(0, 0, 0, 0.25)',
//         backgroundColor: '#6A2ABE',
//         color: '#fff',

//         '& .MuiTypography-root': {
//             color: '#fff'
//         }
//     }
// }))


const Wallet = ({ privateKey }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [keyCopied, setKeyCopied] = useState(false)
    const [idCopied, setIdCopied] = useState(false)
    const [state, setState] = useState('charge-wallet')

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
            width: { xs: '100%', sm: 'calc(100% - 80px)' }, color: 'primary.text'
        }}>

            <Box
                sx={(theme) => ({
                    width: '490px',
                    height: '250px',
                    backgroundImage: BG_URL(PUBLIC_URL(`${cardBackground}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                    boxShadow: theme.palette.primary.boxShadow,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    p: '24px 24px 24px 24px', mt: 3,
                    flexDirection: 'column', justifyContent: 'space-between',
                    color: '#FFF'
                })}
            >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '45px', overflow: 'hidden' }}>
                        <Box sx={{ width: '55px', height: '60px', mt: 1.5, ml: '-10px', backgroundImage: BG_URL(PUBLIC_URL(`./w-outline.svg`)), backgroundRepeat: 'no-repeat' }} />
                        <Box sx={{ width: '72px', height: '16px', backgroundImage: BG_URL(PUBLIC_URL(`./w-typography.svg`)), backgroundRepeat: 'no-repeat' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <ContentCopy size={25} sx={{ cursor: 'pointer' }} />
                        <ShareOutlined size={25} sx={{ cursor: 'pointer' }} />
                        <SettingsOutlined size={25} sx={{ cursor: 'pointer' }} />
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
                        <Typography onClick={() => copyIdToClipBoard(globalUser.youwhoID)} sx={{ width: '100%', fontSize: '21px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', textAlign: 'center', mb: '6px' }}>{globalUser.youwhoID}</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{globalUser.username}</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{globalUser.mail}</Typography>
                    </Box>

                </Box>
            </Box>

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
                    <Tab
                        icon={<ArrowUpward size="16px" sx={{ mr: '4px', pointerEvents: 'none' }} />}
                        text={`Withdraw`} id={"withdraw"}
                        onClick={(e) => setState(e.target.id)}
                        selected={state == 'withdraw'}
                    />
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
                    {state == 'withdraw' && <WithdrawPanel />}
                    {state == 'transfer' && <TransferGift />}
                    {state == 'claim' && <WithdrawPanel />}
                    {state == 'turnover' && <UnpaidCheckouts />}
                </Panel>
            </ShowPanel>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        </Box>
        // </Box >

    );
}

export default Wallet;