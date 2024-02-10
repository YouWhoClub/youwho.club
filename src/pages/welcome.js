import { Box, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { PUBLIC_API } from "../utils/data/public_api";
import { SearchUserCard, WelcomeUserCard } from "../components/utils";
import Pagination from "../components/pagination";

const Welcome = ({ theme, switchTheme }) => {
    const [users, setUsers] = useState(undefined)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const apiCall = useRef(undefined)
    const [selectedTab, setSelectedTab] = useState(1)
    const [pgTabs, setPgTabs] = useState([1])

    const getUsers = async () => {
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-users-wallet-info/?from=${from}&to=${to}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            // setUsers(response)


            let usesrsArr = response.data.data.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
            setUsers(usesrsArr)
            if (response.data.data.length >= 15) {
                let pagTabs = []
                let tabNums = response.data.data.length / 15
                for (let i = 0; i < tabNums; i++) {
                    pagTabs.push(i + 1)
                }
                setPgTabs(pagTabs)
            } else {
                console.log('getting users !')
            }

        }
        catch (err) {
            if (err.status == 404) {
                setUsers([])
            } else {
                setUsers([])
            }
        }
    }

    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        getUsers()
    }, [to])
    useEffect(() => {
        getUsers()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])

    return (
        <Box sx={{
            bgcolor: 'primary.bg', display: "flex",
            flexDirection: 'column', alignItems: 'center',
            color: 'primary.text', gap: '32px', height: '100vh', padding: '0px 30px 30px 30px', boxSizing: 'border-box'

        }}>
            <Navbar navbarType={'dashboard'} theme={theme} switchTheme={switchTheme} />
            <Box sx={(theme) => ({
                bgcolor: 'secondary.bg', display: "flex",
                flexDirection: 'column', alignItems: 'center',
                color: 'primary.text', gap: '16px', height: 'calc(100vh - 87px)',
                borderRadius: '24px',
                width: '100%', boxShadow: theme.palette.primary.boxShadow,
                padding: { xs: '10px', sm: '30px' }, boxSizing: 'border-box'
            })}>
                <Typography sx={{ textTransform: 'capitalize', fontSize: { xs: '14px', sm: '18px', md: '22px' }, color: 'primary.text' }}>
                    welcome to YouWho whitelist
                </Typography>
                <Typography sx={{ textTransform: 'capitalize', fontSize: { xs: '12px', sm: '16px', md: '16px' }, color: 'secondary.text' }}>
                    thank you for choosing us
                </Typography>
                <Typography sx={{ textTransform: 'capitalize', fontSize: { xs: '12px', sm: '16px', md: '16px' }, color: 'secondary.text', fontWeight: 600 }}>
                    YouWho First Users:
                </Typography>
                <Box sx={(theme) => ({
                    bgcolor: 'secondary.bg', display: "flex",
                    flexDirection: 'column', alignItems: 'center',
                    color: 'primary.text', gap: '8px', height: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': { display: 'none', },
                    borderRadius: '24px',
                    width: '100%', boxShadow: theme.palette.primary.boxShadow,
                    padding: '10px', boxSizing: 'border-box'
                })}>
                    {users ?
                        <>
                            {users.map((user) => (<WelcomeUserCard
                                key={user.screen_cid}
                                username={user.username}
                                image={user.avatar}
                                user={user}
                                ywID={user.screen_cid}
                            />))}
                            {users && users.length > 0 ?
                                <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                                : undefined}

                        </>
                        :
                        <CircularProgress />}

                </Box>
            </Box>

        </Box>);
}

export default Welcome;