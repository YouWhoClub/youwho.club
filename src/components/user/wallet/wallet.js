import styled from "@emotion/styled";
import PanelLayout from "../../PanelLayout";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ArrowDown2, TickSquare, Wallet2 } from "iconsax-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import WithdrawPanel from "./withdrawPanel";
import DepositPanel from "./depositPanel";
import PaidCheckouts from "./paidCheckouts";
import UnpaidCheckouts from "./unpaidCheckouts";
import yCoin from '../../../assets/Ycoin.svg'

const ShowPanel = styled(Box)(({ theme }) => ({
    marginTop: '20px',width:'100%',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
}))
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
}))

const Wallet = ({ privateKey }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [keyCopied, setKeyCopied] = useState(false)
    const [idCopied, setIdCopied] = useState(false)
    const [state, setState] = useState('withdraw')
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

            {/* <Box sx={{
            width: { xs: '100%', sm: 'calc(100% - 80px)' }, display: 'flex'
        }}>
            <Box sx={{
                px: 1, display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}> */}
            <Box
                sx={{
                    // width: '100%',
                    height: '250px',
                    bgcolor: 'secondary.middle',
                    borderRadius: '24px',
                    display: 'flex', alignItems: 'center', px: 3,
                    flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', sm: 'start' }
                }}>
                <Wallet2 size={'50px'} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p>
                        Welcome <span style={{ fontWeight: 500 }}>{globalUser.username}</span>
                    </p>
                    {globalUser.youwhoID ?
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Typography>YouWho ID :</Typography> <Typography onClick={() => copyIdToClipBoard(globalUser.youwhoID)} sx={{ cursor: 'pointer', fontSize: { xs: '10px', sm: '14px' } }}>{globalUser.youwhoID}</Typography>
                            <TickSquare style={{ size: { xs: '10px', sm: '14px' }, display: idCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                        </Box>
                        : undefined}
                    {privateKey ? <>
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
                        : undefined}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            Wallet Balance : {globalUser.balance}
                        </div>
                        <Box sx={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
                            , width: '16px', height: '16px'
                        }} />
                    </Box>

                </Box>
            </Box>

            <ShowPanel sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{
                    width: { xs: '100%', sm: '200px' },
                    // mb: 2, 
                    // mr: { xs: 0, sm: '20px' },
                    height: 'max-content',
                    borderRadius: '24px',
                    boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1
                    }}>
                        <Box sx={{ color: 'primary.text', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', my: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Wallet Options
                            </div>
                        </Box>
                        <Accordion sx={{
                            my: 1,
                            width: '100%',
                            bgcolor: 'primary.bg',
                            color: 'primary.text',
                            border: '1px solid', borderColor: 'primary.gray',
                            // border: 'none',
                            '&:before': {
                                bgcolor: 'transparent',
                            },
                            // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                            boxShadow: 'none !important',
                            borderRadius: '24px !important', fontSize: '14px'
                        }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='16px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ minHeight: '30px !important', height: '30px' }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Options</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                            >
                                <Typography onClick={() => { setState('deposit') }} sx={{ cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'secondary.bgOp' } }}>Deposit</Typography>
                                <Typography onClick={() => { setState('withdraw') }} sx={{ cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'secondary.bgOp' } }}>Withdraw</Typography>
                                <Typography onClick={() => { setState('paid-checkouts') }} sx={{ cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'secondary.bgOp' } }}>Paid Checkouts</Typography>
                                <Typography onClick={() => { setState('unpaid-checkouts') }} sx={{ cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'secondary.bgOp' } }}>Unpaid Checkouts</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>

                <Panel sx={{ p: { xs: 'unset', sm: 1 } }}>
                    {state == 'withdraw' && <WithdrawPanel />}
                    {state == 'deposit' && <DepositPanel />}
                    {state == 'paid-checkouts' && <PaidCheckouts />}
                    {state == 'unpaid-checkouts' && <UnpaidCheckouts />}
                </Panel>
            </ShowPanel>
        </Box>
        // </Box >

    );
}

export default Wallet;