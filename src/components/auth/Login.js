import { ArrowLeft, Email, Password } from "@mui/icons-material";
import { Box, FormHelperText, FormLabel, Typography } from "@mui/material";
import { useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Input } from "@mui/base";
import ButtonPurple from "../buttons/buttonPurple";
import styled from "@emotion/styled";
import { AUTH_API } from "../../utils/data/auth_api";
import { useDispatch } from "react-redux";
import { getuser } from "../../redux/actions";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router";


const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}))

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState('identifier')
    const [identifier, setIdentifier] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const apiCall = useRef(undefined)
    const fetchUser = (token) => dispatch(getuser(token));

    const submit = async () => {
        setErr(undefined)
        setLoading(true)
        console.log(identifier)
        console.log(password)
        if (!password) {
            setErr('please enter your password')
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
            setTimeout(() => {
                navigate('/dashboard')
            }, 3000);
        }
        catch (err) {
            setSuccess(undefined)
            setErr(err.statusText)
            setLoading(false)
        }
    }
    const idStateChanger = () => {
        if (identifier) {
            setErr(undefined)
            setState('password')
        } else {
            setErr('please enter your identifier')
        }
    }
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', alignItems: 'center',
            }}>
            {state == 'identifier' ?
                <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', mt: { xs: 5, sm: 10 } }}>
                        <Email sx={{ color: 'primary.light', }} />
                        <Inputt placeholder="enter your email , phone , youwho id , ..." onChange={(e) => setIdentifier(e.target.value)} />
                    </Box>
                    <ButtonPurple w={'100%'} text={'next'} onClick={idStateChanger} />
                    <Box>
                        LOGIN WITH GMAIL
                    </Box>
                </>
                :
                <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', mt: 10 }}>
                        <Password sx={{ color: 'primary.light', }} />
                        <Inputt placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <ButtonPurple w={'100%'} text={loading ? '...' : 'next'} onClick={submit} />
                    <Box>
                        FORGOT PASSWORD ?
                    </Box>
                    <Box
                        sx={{
                            diplay: 'flex',
                            justifyContent: 'start',
                            width: '100%'
                        }}
                    >
                        <div
                            onClick={() => {
                                setState('identifier')
                            }}
                            style={{
                                borderBottom: '3px solid',
                                borderColor: '#846894',
                                color: '#846894',
                                width: '200px',
                                fontSize: '18px',
                                display: 'flex',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <ArrowLeft sx={{ color: 'primary.light', }} />back
                        </div>
                    </Box>

                </>
            }
            {err ? <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>{err}</p> : undefined}
            {success ? <p style={{ color: 'green', fontSize: '12px', margin: 0 }}>{success}</p> : undefined}
        </Box>


    );
}

export default Login;