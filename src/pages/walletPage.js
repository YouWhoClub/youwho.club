import { useSelector } from "react-redux";
import PanelLayout from "../components/PanelLayout";
import { Box, Modal } from "@mui/material";
import ButtonOutline from "../components/buttons/buttonOutline";
import { useNavigate } from "react-router";
import CreateWallet from "../components/user/wallet/createWallet";
import VerifyPhone from "../components/user/auth/verifyPhone";
import Wallet from "../components/user/wallet/wallet";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import VerifyPhoneModal from "../components/user/auth/verifyPhoneModal";

const WalletPage = ({ switchTheme, theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const [privateKey, setPrivateKey] = useState(undefined)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (globalUser.isLoggedIn) {
            if (!globalUser.isPhoneVerified) {
                setOpenModal(true)
            }
        }
    }, [globalUser.isLoggedIn, globalUser.YouWhoID, globalUser.isPhoneVerified])
    return (
        <PanelLayout switchTheme={switchTheme} theme={theme}>
            {!globalUser.isLoggedIn ?
                <Box sx={{
                    height:'calc(100vh - 55px)',
                    bgcolor: 'primary.bg',
                    display: 'flex',color:'primary.text',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '100%', sm: 'calc(100% - 80px)' },
                }}>
                    <p> you are not logged in</p>
                    <ButtonOutline text={'start'} onClick={() => navigate('/auth')} />
                </Box> :
                <>
                    {globalUser.isPhoneVerified ?
                        <>{globalUser.YouWhoID ?
                            <Wallet privateKey={privateKey} /> :
                            <CreateWallet setPvKey={setPrivateKey} />
                        }</>
                        :
                        <>
                            <Box sx={{
                                height:'calc(100vh - 55px)',
                                bgcolor: 'primary.bg',
                                display: 'flex',color:'primary.text',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: { xs: '100%', sm: 'calc(100% - 80px)' },
                            }}>
                                <p>to create a wallet , you have to verify your phone first</p>
                                <ButtonOutline text={'start'} onClick={() => setOpenModal(true)} />
                            </Box>

                            <VerifyPhoneModal openModal={openModal} setOpenModal={setOpenModal} />
                        </>
                        // <Box sx={{
                        //     width: { xs: '100%', sm: 'calc(100% - 80px)' },
                        //     height: { xs: 'calc(100vh - 90px)', sm: '100%' },
                        //     display: 'flex', justifyContent: 'center'
                        // }}>
                        //     <VerifyPhone />
                        // </Box>
                    }
                </>
            }

        </PanelLayout>

    );
}

export default WalletPage;