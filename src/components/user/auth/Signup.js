import { ArrowLeft, Email, Password } from "@mui/icons-material";
import { Box, FormHelperText, FormLabel, Typography } from "@mui/material";
import { useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import ButtonPurple from "../../buttons/buttonPurple";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { getuser } from "../../../redux/actions";
import { AUTH_API } from "../../../utils/data/auth_api";
import { useNavigate } from "react-router";
import { Eye, EyeSlash, Lock } from "iconsax-react";
import { ShadowInput } from "../../utils";
import VerifyMail from "./verifyMail";



const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    cursor: 'pointer',
    border: 'none',
    // borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))
const Inputtt = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const apiCall = useRef(undefined)
    const fetchUser = (token) => dispatch(getuser(token));


    const submit = async (e) => {
        e.preventDefault()
        setErr(undefined)
        setLoading(true)
        console.log(identifier)
        console.log(password)

        if (password !== repeatPassword) {
            setErr('your repeated password is incorrect')
            setLoading(false)
            return
        }

        try {
            apiCall.current = AUTH_API.request({
                path: `/login`,
                method: "post",
                body: { identifier: identifier, password: password },
            });
            let response = await apiCall.current.promise;
            console.log('uuuuseeeeeer', response)
            console.log('uuuuseeeeeer token', response.token)
            if (!response.isSuccess)
                throw response
            localStorage.setItem('lastActive', true)
            // fetchUser(response.token)
            fetchUser(response.headers.cookie.split("::")[0])
            setSuccess(response.message)
            setErr(undefined)
            setLoading(false)

            if (response.data.data.is_mail_verified)
                navigate('/dashboard')
            else setState('mailVerification')

        }
        catch (err) {
            setSuccess(undefined)
            setErr(err.statusText)
            setLoading(false)
        }
    }
    const idStateChanger = (event) => {
        event.preventDefault()
        if (state == 'identifier') {

            if (identifier) {
                setErr(undefined)
                setState('password')
            } else {
                setErr('please enter your identifier')
            }
        } else {
            if (password) {
                setErr(undefined)
                setState('repeatPassword')
            } else {
                setErr('please enter your password')
            }

        }
    }
    return (
        <>
        </>

        
        // <Box
        //     sx={{
        //         width: '100%',
        //         height: '100%',
        //         display: 'flex', flexDirection: 'column',
        //         justifyContent: 'space-between', alignItems: 'center', pt: 10
        //     }}>
        //     {state == 'identifier' ?
        //         <form
        //             style={{
        //                 width: '100%',
        //                 height: '100%',
        //                 display: 'flex', flexDirection: 'column',
        //                 justifyContent: 'space-between', alignItems: 'center',
        //             }} onSubmit={idStateChanger}>
        //             <Box sx={{
        //                 display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'
        //             }}>
        //                 <ShadowInput
        //                     value={identifier}
        //                     icon={<Email sx={{ color: 'primary.light', }} />}
        //                     borderColor={err ? 'primary.error' : success ? 'primary.success' : undefined}
        //                     onChange={(e) => setIdentifier(e.target.value)}
        //                     label={'Email'} width={'99%'} id={'Email'} type="email" />
        //                 {err ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '12px', margin: 0 }}>{err}</Typography> : undefined}
        //                 {success ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.success', fontSize: '12px', margin: 0 }}>{success}</Typography> : undefined}
        //             </Box>
        //             <ButtonPurple w={'100%'} text={'Next'} />
        //         </form>
        //         : state == 'password' ?
        //             <form
        //                 autoComplete="off"
        //                 style={{
        //                     width: '100%',
        //                     height: '100%',
        //                     display: 'flex', flexDirection: 'column',
        //                     justifyContent: 'space-between', alignItems: 'center',
        //                 }} onSubmit={idStateChanger}>
        //                 <Box sx={{
        //                     display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'
        //                 }}>
        //                     <ShadowInput
        //                         icon={<Lock sx={{ color: 'primary.light', }} />}
        //                         borderColor={err ? 'primary.error' : success ? 'primary.success' : undefined}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         label={'Password'}
        //                         width={'99%'}
        //                         id={'Password'}
        //                         value={password}
        //                         type={showPassword ? 'input' : 'password'}
        //                         extraIcon={<>{showPassword ? <EyeSlash
        //                             onClick={() => setShowPassword(false)} /> : <Eye onClick={() => setShowPassword(true)} />}</>} />
        //                     {err ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '12px', margin: 0 }}>{err}</Typography> : undefined}
        //                     {success ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.success', fontSize: '12px', margin: 0 }}>{success}</Typography> : undefined}
        //                 </Box>
        //                 <ButtonPurple disabled={loading} w={'100%'} text={loading ? '...' : 'next'} onClick={idStateChanger} />
        //                 <Box
        //                     sx={{
        //                         diplay: 'flex',
        //                         justifyContent: 'start',
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <div
        //                         onClick={() => {
        //                             setState('identifier')
        //                         }}
        //                         style={{
        //                             borderBottom: '3px solid',
        //                             borderColor: '#846894',
        //                             color: '#846894',
        //                             width: '200px',
        //                             fontSize: '18px',
        //                             display: 'flex',
        //                             justifyContent: 'center',
        //                             cursor: 'pointer',
        //                         }}
        //                     >
        //                         <ArrowLeft sx={{ color: 'primary.light', }} />back
        //                     </div>
        //                 </Box>

        //             </form>
        //             : state == 'repeatPassword' ?
        //                 <form
        //                     autoComplete="off"
        //                     style={{
        //                         width: '100%',
        //                         height: '100%',
        //                         display: 'flex', flexDirection: 'column',
        //                         justifyContent: 'space-between', alignItems: 'center',
        //                     }} onSubmit={idStateChanger}>
        //                     <Box sx={{
        //                         display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'
        //                     }}>
        //                         <ShadowInput
        //                             icon={<Lock sx={{ color: 'primary.light', }} />}
        //                             borderColor={err ? 'primary.error' : success ? 'primary.success' : undefined}
        //                             onChange={(e) => setRepeatPassword(e.target.value)}
        //                             label={'Repeat Password'}
        //                             width={'99%'}
        //                             id={'repeat-password'}
        //                             value={repeatPassword}
        //                             type={showRepeatPassword ? 'input' : 'password'}
        //                             extraIcon={<>{showRepeatPassword ? <EyeSlash onClick={() => setShowRepeatPassword(false)} /> : <Eye onClick={() => setShowRepeatPassword(true)} />}</>} />
        //                         {err ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.error', fontSize: '12px', margin: 0 }}>{err}</Typography> : undefined}
        //                         {success ? <Typography sx={{ alignSelf: 'start !important', color: 'primary.success', fontSize: '12px', margin: 0 }}>{success}</Typography> : undefined}
        //                     </Box>
        //                     <ButtonPurple disabled={loading} w={'100%'} text={loading ? '...' : 'next'} onClick={submit} />
        //                     <Box
        //                         sx={{
        //                             diplay: 'flex',
        //                             justifyContent: 'start',
        //                             width: '100%',
        //                         }}
        //                     >
        //                         <div
        //                             onClick={() => {
        //                                 setState('password')
        //                             }}
        //                             style={{
        //                                 borderBottom: '3px solid',
        //                                 borderColor: '#846894',
        //                                 color: '#846894',
        //                                 width: '200px',
        //                                 fontSize: '18px',
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 cursor: 'pointer',
        //                             }}
        //                         >
        //                             <ArrowLeft sx={{ color: 'primary.light', }} />back
        //                         </div>
        //                     </Box>

        //                 </form>
        //                 :
        //                 <VerifyMail email={identifier} />
        //     }

        // </Box>


    );
}

export default Signup;