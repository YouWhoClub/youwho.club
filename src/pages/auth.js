import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";
import Login from "../components/user/auth/Login";
import SignUp from "../components/user/auth/Signup";
import AuthLayout from "../components/user/auth/authLayout";

const AuthBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box',
    width: '355px',
    height: '450px',
    borderRadius: '25px',
    display: "flex",
    flexDirection: "column",
    padding: '25px 22px',
    "@media (max-width: 600px)": {
        width: '100%',
        margin: '0 auto',
        height: '100%',
        borderRadius: '25px 25px 0px 0px',
    },

}))
const Slider = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.gray,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    height: '40px',
    borderRadius: '35px', padding: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
}))
const ChangeSlide = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    cursor: 'pointer',
    justifyContent: 'center',
    borderRadius: '35px', height: '100%',
    display: "flex",
    width: '50%',
    padding: '8px 16px',
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
    console.log(window.location.hash.replace('#', ''))
    const [authState, setAuthState] = useState(window.location.hash ? window.location.hash.replace('#', '') : 'signin')

    const handleSlide = (e) => {
        setAuthState(e.target.id)
        window.location.hash = `#${e.target.id}`

    }
    return (
        <AuthLayout>
            <AuthBox>
                <Slider sx={{ mb: '32px' }}>
                    <ChangeSlide
                        id="signin"
                        sx={{
                            bgcolor: authState == 'signin' ? 'white' : "transparent",
                            color: authState == 'signin' ? 'black' : "primary.darkGray"
                        }} onClick={handleSlide}>
                        Sign In</ChangeSlide>
                    <ChangeSlide
                        id="signup"
                        sx={{
                            bgcolor: authState == 'signup' ? 'white' : "transparent",
                            color: authState == 'signup' ? 'black' : "primary.darkGray"
                        }} onClick={handleSlide}>
                        Sign Up</ChangeSlide>
                </Slider>
                {authState == 'signin' ?
                    <Login />
                    :
                    <AuthScrollBox>
                        <SignUp />
                    </AuthScrollBox>
                }
            </AuthBox>
            {/* </Box> */}
        </AuthLayout>
    );
}

export default Auth;