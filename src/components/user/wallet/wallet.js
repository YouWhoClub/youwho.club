import styled from "@emotion/styled";
import PanelLayout from "../../PanelLayout";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ArrowDown, ArrowDown2, ArrowUp, Barcode, Copy, Gift, Setting2, Share, TickSquare, Wallet2 } from "iconsax-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import WithdrawPanel from "./withdrawPanel";
import DepositPanel from "./depositPanel";
import PaidCheckouts from "./paidCheckouts";
import UnpaidCheckouts from "./unpaidCheckouts";
import yCoin from '../../../assets/Ycoin.svg'
import { Tab, Tabs } from "../../utils";
import { CardGiftcard, GifTwoTone, Recycling } from "@mui/icons-material";

const ShowPanel = styled(Box)(({ theme }) => ({
    marginTop: '20px', width: '100%',
    marginBottom: '20px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', flexDirection: 'column'
}))
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    width: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
}))
const FlexRow = styled(Box)(({ theme }) => ({
    // width: '100%',
    // justifyContent: 'space-between',
    display: 'flex', alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const YWCard = styled(Box)(({ theme }) => ({
    color: 'white',
    boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
    // height: '250px',
    backgroundColor: theme.palette.secondary.middle,
    borderRadius: '24px',

}))
const YouWhoIcon = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/youwho-w-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const YouWhoTokenIcon = styled(Box)(({ theme }) => ({
    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)),
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
    , width: '20px', height: '20px'
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
            setKeyCopied(undefined);
        }
    };
    const copyIdToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied(undefined);
        }
    };

    return (
        <Box sx={{
            bgcolor: 'primary.bg',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', sm: 'calc(100% - 80px)' }, color: 'primary.text', pt: 1
        }}>
            <YWCard
                sx={{
                    width: { xs: '95%', sm: '450px', md: '500px' },
                }}>
                <Box sx={{
                    p: 3, display: 'flex', alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-between', height: '250px'
                }}>
                    <FlexRow sx={{ width: '100%', justifyContent: 'space-between', }}>
                        <YouWhoIcon />
                        <FlexRow>
                            <Copy color={idCopied ? '#0Cb2B1' : 'white'}
                                onClick={() => copyIdToClipBoard(globalUser.youwhoID)} cursor='pointer' />
                            &nbsp;&nbsp;&nbsp;
                            <Share cursor='pointer' />
                            &nbsp;&nbsp;&nbsp;
                            <Setting2 cursor='pointer' />
                        </FlexRow>
                    </FlexRow>
                    <FlexRow sx={{ justifyContent: 'start', width: '100%' }}>
                        <Barcode />&nbsp;&nbsp;&nbsp;
                        <span>{globalUser.balance}</span>&nbsp;
                        <YouWhoTokenIcon />
                    </FlexRow>
                    <FlexColumn>
                        <FlexRow sx={{ width: '100%', }}>
                            <Typography onClick={() => copyIdToClipBoard(globalUser.youwhoID)}
                                sx={{ cursor: 'pointer', fontWeight: 700 }}>
                                {globalUser.youwhoID}
                            </Typography>
                        </FlexRow>
                        <FlexRow sx={{ width: '100%', }}>
                            <Typography
                                sx={{ fontSize: { xs: '10px', sm: '14px' }, fontWeight: 300 }}>
                                {globalUser.username}
                            </Typography>
                        </FlexRow>
                        <FlexRow sx={{ width: '100%', }}>
                            <Typography
                                sx={{ fontSize: { xs: '10px', sm: '14px' }, fontWeight: 300 }}>
                                {globalUser.mail}
                            </Typography>
                        </FlexRow>
                    </FlexColumn>
                    {privateKey ?
                        <>
                            <FlexRow>
                                <Typography sx={{
                                    cursor: 'pointer',
                                    fontSize: { xs: '10px', sm: '14px' },
                                }}
                                    onClick={() => copyToClipBoard(privateKey)}>
                                    {privateKey}
                                </Typography>
                                <TickSquare style={{ display: keyCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                            </FlexRow>
                        </>
                        : undefined}
                </Box>
            </YWCard>

            <ShowPanel >
                <Tabs jc={'center'} w={'90%'}>
                    <Tab id={"deposit"}
                        icon={<ArrowDown size='14px' />}
                        onClick={(e) => setState(e.target.id)}
                        text={`Charge Wallet`}
                        selected={state == 'deposit'} />
                    <Tab id={"withdraw"}
                        icon={<ArrowUp size='14px' />}
                        onClick={(e) => setState(e.target.id)}
                        text={`Withdraw`}
                        selected={state == 'withdraw'} />
                    <Tab id={"gift"}
                        icon={<Gift size='14px' />}
                        onClick={(e) => setState(e.target.id)}
                        text={`Gift NFT`}
                        selected={state == 'gift'} />
                    <Tab id={"claim"}
                        icon={<CardGiftcard fontSize='14px' />}
                        onClick={(e) => setState(e.target.id)}
                        text={`Claim Gift NFT`}
                        selected={state == 'claim'} />
                    <Tab id={"turnover"}
                        icon={<Recycling fontSize='14px' />}
                        onClick={(e) => setState(e.target.id)}
                        text={`Turnover`}
                        selected={state == 'turnover'} />
                </Tabs>
                <Panel sx={{}}>
                    {state == 'withdraw' && <WithdrawPanel />}
                    {state == 'deposit' && <DepositPanel />}
                    {state == 'claim' && <WithdrawPanel />}
                    {state == 'gift' && <DepositPanel />}
                    {state == 'turnover' && <DepositPanel />}
                    {state == 'paid-checkouts' && <PaidCheckouts />}
                    {state == 'unpaid-checkouts' && <UnpaidCheckouts />}
                </Panel>
            </ShowPanel>
        </Box>

    );
}

export default Wallet;