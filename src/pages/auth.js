import styled from "@emotion/styled";
import { Box, keyframes } from "@mui/material";
import { useState } from "react";
import Login from "../components/user/auth/Login";
import SignUp from "../components/user/auth/Signup";
import AuthLayout from "../components/user/auth/authLayout";
const changeBG = keyframes`
  0% {
    width:50%;
  }
  50%{
    width:100%;
  }
  100%{
    width:50%;
  }
`
const AuthBox = styled(Box)(({ theme }) => ({

    backgroundColor: theme.palette.secondary.bg,
    position: 'relative',
    boxSizing: 'border-box',
    width: '355px',
    height: '480px',
    borderRadius: '25px',
    display: "flex",
    flexDirection: "column", justifyContent: 'space-between', alignItems: 'center',
    padding: '25px 22px',
    "@media (max-width: 600px)": {
        width: '100%',
        margin: '0 auto',
        height: '100%',
        borderRadius: '25px 25px 0px 0px',
    },
}))
const Slider = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.slider,
    boxSizing: 'border-box',
    height: '40px',
    borderRadius: '35px', padding: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: '500ms ease',
    width: '100%',
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
    transition: '500ms ease',
    "@media (min-width: 900px)": {
        '&:hover': {
            // animation: `${changeBG} 1s linear `,
            width: '100%'
        }
    },
}))
const ProgressBar = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: 'calc(100% - 44px)',
    height: '3px',
    backgroundColor: theme.palette.primary.gray,
    bottom: '4px',
    borderRadius: '25px',
    "@media (max-width: 600px)": {
        width: '100%',
        bottom: '0px',
        borderRadius: '0px',
    },
}))
const Progress = styled(Box)(({ theme }) => ({
    height: '3px', transition: '500ms ease',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '25px',
    "@media (max-width: 600px)": {
        borderRadius: '0px 10px 10px 0px',
    },

}))

const Auth = () => {

    const [progress, setProgress] = useState('0%')
    const [authState, setAuthState] = useState(window.location.hash ? window.location.hash.replace('#', '') : 'signin')
    const [alreadyEmail, setAlreadyEmail] = useState(window.location.search ? window.location.search.replace('?', '') : undefined)

    const handleSlide = (e) => {
        setAuthState(e.target.id)
        window.location.hash = `#${e.target.id}`

    }
    return (
        <AuthLayout>
            <AuthBox>
                <Slider sx={{ mb: '32px', }}>
                    <ChangeSlide
                        id="signin"
                        sx={{
                            bgcolor: authState == 'signin' ? 'secondary.bg' : "transparent",
                            color: authState == 'signin' ? 'primary.text' : "primary.darkGray"
                        }} onClick={handleSlide}>
                        Sign In</ChangeSlide>
                    <ChangeSlide
                        id="signup"
                        sx={{
                            bgcolor: authState == 'signup' ? 'secondary.bg' : "transparent",
                            color: authState == 'signup' ? 'primary.text' : "primary.darkGray"
                        }} onClick={handleSlide}>
                        Sign Up</ChangeSlide>
                </Slider>
                {authState == 'signin' ?
                    <Login setProgress={setProgress} alreadyEmail={alreadyEmail} />
                    :
                    <SignUp setProgress={setProgress} alreadyEmail={alreadyEmail} />
                }
                <ProgressBar>
                    <Progress sx={{ width: progress }} />
                </ProgressBar>
            </AuthBox>
            {/* </Box> */}
        </AuthLayout>
    );
}

export default Auth;