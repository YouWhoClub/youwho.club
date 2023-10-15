import { useSelector } from "react-redux";
import PanelLayout from "../components/PanelLayout";
import { Box, Modal } from "@mui/material";
import ButtonOutline from "../components/buttons/buttonOutline";
import { useNavigate } from "react-router";
import CreateWallet from "../components/user/wallet/createWallet";
import VerifyPhone from "../components/user/auth/verifyPhone";
import Wallet from "../components/user/wallet/wallet";
import { useState } from "react";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";

const WalletPage = ({ switchTheme , theme }) => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const [privateKey, setPrivateKey] = useState(undefined)
    return (
        <PanelLayout switchTheme={switchTheme} theme={theme}>
            {!globalUser.isLoggedIn ?
                <Box sx={{
                    // height: '100vh',
                    bgcolor: 'primary.bg',
                    display: 'flex',
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
                        <>{globalUser.youwhoID ?
                            <Wallet privateKey={privateKey} /> :
                            <CreateWallet setPvKey={setPrivateKey} />
                        }</>
                        :
                        <Box sx={{
                            width: { xs: '100%', sm: 'calc(100% - 80px)' },
                            height: { xs: 'calc(100vh - 90px)', sm: '100%' },
                            display: 'flex', justifyContent: 'center'
                        }}>
                            <VerifyPhone />
                        </Box>
                    }
                </>
            }

        </PanelLayout>

    );
}

export default WalletPage;