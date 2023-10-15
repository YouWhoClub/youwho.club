import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";
import Login from "../components/user/auth/Login";
import SignUp from "../components/user/auth/Signup";
import AuthLayout from "../components/user/auth/authLayout";

const AuthBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    width: '400px',
    height: '500px',
    borderRadius: '30px',
    // display: "flex",
    flexDirection: "column",
    padding: '30px',
    margin: '100px auto 30px',
    "@media (max-width: 900px)": {
    },
    "@media (max-width: 600px)": {
        width: '100%',
        margin: '0 auto',
        height: '100%',
        padding: '0',
        borderRadius: '0',
        paddingTop: '170px',
        paddingBottom: '40px',
    },

}))
const Slider = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.gray,
    height: '45px',
    borderRadius: '40px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
}))
const ChangeSlide = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    justifyContent: 'center',
    height: '40px',
    borderRadius: '40px',
    display: "flex",
    width: '50%',
    alignItems: "center",
    transition: '500ms ease'
}))
const AuthScrollBox = styled(Box)(({ theme }) => ({
    // width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "column",
    //-------
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '8px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '8px',
        height: '8px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '3px',
        height: '3px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
    //-------

    "@media (max-width: 900px)": {
        // width: '550px',
    },
    "@media (max-width: 600px)": {
        // width: '100%',
        // margin: '0 auto',
        // height: '100vh',
        borderRadius: '0',
        // paddingTop: '80px'
    },
}))
const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text,
    textAlign: 'center'
}))

const Auth = () => {
    const [authState, setAuthState] = useState('signin')
    return (
        <AuthLayout>
            {/* <Box sx={{
            height: 'calc(100vh - 150px)',
            bgcolor: 'primary.light',
            pt: { xs: '130px', sm: '100px' },
            pb: { xs: 0, sm: '50px' },
            display: "flex", justifyContent: 'center',
            // alignItems: 'center',
        }}> */}
            <AuthBox>
                <Box sx={{
                    px: { xs: '20px', sm: 0 }, height: '100%', display: "flex",
                    flexDirection: "column", justifyContent: 'space-between',
                }}>
                    {/* <Slider>
                        <ChangeSlide
                            sx={{ bgcolor: authState == 'signin' ? 'white' : "transparent", color: authState == 'signin' ? 'primary.darkerGray' : "primary.darkGray" }} onClick={() => setAuthState('signin')}>
                            Sign In</ChangeSlide>
                        <ChangeSlide
                            sx={{ bgcolor: authState == 'signup' ? 'white' : "transparent", color: authState == 'signup' ? 'primary.darkerGray' : "primary.darkGray" }} onClick={() => setAuthState('signup')}>
                            Sign Up</ChangeSlide>
                    </Slider> */}
                    <Title>
                        Sign in / Sign up
                    </Title>
                    {authState == 'signin' ?
                        <AuthScrollBox>
                            <Login />
                        </AuthScrollBox>
                        :
                        <AuthScrollBox>
                            <SignUp />
                        </AuthScrollBox>
                    }
                </Box>
            </AuthBox>
            {/* </Box> */}
        </AuthLayout>
    );
}

export default Auth;