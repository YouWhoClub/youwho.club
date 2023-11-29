import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../../config";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import ButtonPurple from "../../buttons/buttonPurple";
import FilterSelection from '../../filterSelection'
import GiftOpenIcon from '../../../assets/icons/gift-open-outline-white.svg'
import GiftIcon from '../../../assets/icons/gift-outline-white.svg'
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { ArrowDown } from "iconsax-react";



const Card = styled(Box)(({ theme }) => ({
    width: '100%',
    // maxWidth: '730px',
    borderRadius: '16px',
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
    gap: '16px',
}))

const Icon = styled(Box)(({ theme, url, w, h }) => ({
    width: `${w}px`,
    height: `${h}px`,
    color: '#B897CC',
    backgroundImage: BG_URL(PUBLIC_URL(`${url}`)),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    pointerEvents: 'none'
}))

const Turnover = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [filterValue, setFilterValue] = useState('Unpaid Checkouts')
    const [unpaidCheckouts, setUnpaidCheckouts] = useState([])
    const [paidCheckouts, setPaidCheckouts] = useState([])
    const [userDeposits, setUserDeposits] = useState([])
    const [userWithdrawals, setUserWithdrawals] = useState([])


    const navigate = useNavigate()

    const getUnpaidCheckouts = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/checkout/get/all/unpaid/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
                'Content-Type': 'application/json',
            }
        })

        let response = await request.json()
        console.log(response);
        if (response.status === 200) {
            setUnpaidCheckouts(response.data)
        } else {
            console.log(response)
        }
    }

    const getPaidCheckouts = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/checkout/get/all/paid/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
                'Content-Type': 'application/json',
            }
        })

        let response = await request.json()

        if (response.status === 200) {
            setPaidCheckouts(response.data)
        } else {
            console.log(response)
        }
    }

    const getUserDeposits = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/deposit/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
                'Content-Type': 'application/json',
            }
        })

        let response = await request.json()

        if (response.status === 200) {
            setUserDeposits(response.data)
        } else {
            console.log(response)
        }
    }

    const getUserWithdrawals = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/withdraw/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${globalUser.token}`,
                'Content-Type': 'application/json',
            }
        })

        let response = await request.json()

        if (response.status === 200) {
            setUserWithdrawals(response.data)
        } else {
            console.log(response)
        }
    }


    useEffect(() => {

        if (globalUser.cid && globalUser.token) {
            getUnpaidCheckouts()
            getPaidCheckouts()
            getUserDeposits()
            getUserWithdrawals()
        }

    }, [globalUser.cid, globalUser.token])

    const handleFilterSelect = (e) => {
        e.preventDefault()
        setFilterValue(e.target.id)
    }

    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            gap: '40px'
        }}>
            <Box>
                <FilterSelection
                    width={'280px'}
                    tabs={['Unpaid Checkouts', 'Paid Checkouts', 'Deposits', 'Withdrawals']}
                    text={'Filter'}
                    id={'filter-turnover-wallet'}
                    handleSelect={handleFilterSelect}
                    selectValue={filterValue}
                />
            </Box>


            <Box sx={{
                width: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px'
            }}>

                {
                    filterValue == 'Unpaid Checkouts' &&
                    <>{
                        unpaidCheckouts.length ?
                            unpaidCheckouts.map(checkout => {
                                return (
                                    <Card>
                                        <Box sx={{ width: '84px', height: '84px', borderRadius: '18px', backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ArrowDown size={'50px'} color="white" />
                                        </Box>
                                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3px' }}>
                                            <Typography sx={{ color: 'primary.text', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px' }}>
                                                <Typography sx={{ color: '#F675A8', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px', display: 'inline-block' }}>Fail&nbsp;</Typography>
                                                Charge Wallet
                                            </Typography>
                                            <Typography sx={{ color: 'primary.text', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', lineHeight: '24px' }}>
                                                The attempt to charge your wallet with {checkout.tokens} YouWho tokens failed.
                                            </Typography>
                                            <Typography sx={{ color: 'primary.darkGray', fontFamily: 'inter', fontSize: '12px', fontWeight: '400', lineHeight: '24px' }}>{checkout.iat.substring(0, 10)} {checkout.iat.substring(11, 16)}</Typography>
                                        </Box>
                                    </Card>
                                )
                            })
                            : <Box sx={{ display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <EmptyWallet size={'50px'} color="#787878" /> */}
                                <Typography sx={{
                                    mt: 2, fontSize: '20px',
                                    color: 'primary.darkGray', textAlign: 'center', mb: 2, fontWeight: '500'
                                }}>
                                    There are no Unpaid Checkouts
                                </Typography>
                            </Box>
                    }</>
                }
                {
                    filterValue == 'Paid Checkouts' &&
                    <>{
                        paidCheckouts.length ?
                            paidCheckouts.map(checkout => {
                                return (
                                    <Card>
                                        <Box sx={{ width: '84px', height: '84px', borderRadius: '18px', backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ArrowDown size={'50px'} color="white" />
                                        </Box>
                                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3px' }}>
                                            <Typography sx={{ color: 'primary.text', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px' }}>
                                                <Typography sx={{ color: '#3DCA64', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px', display: 'inline-block' }}>Succcessfull&nbsp;</Typography>
                                                Charge Wallet
                                            </Typography>
                                            <Typography sx={{ color: 'primary.text', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', lineHeight: '24px' }}>
                                                Your wallet has been charged with {checkout.tokens} YouWho-tokens!
                                            </Typography>
                                            <Typography sx={{ color: 'primary.darkGray', fontFamily: 'inter', fontSize: '12px', fontWeight: '400', lineHeight: '24px' }}>{checkout.iat.substring(0, 10)} {checkout.iat.substring(11, 16)}</Typography>
                                        </Box>
                                    </Card>
                                )
                            })
                            : <Box sx={{ display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ mt: 2, fontSize: '20px', color: 'primary.darkGray', textAlign: 'center', mb: 2, fontWeight: '500' }}>
                                    There are no Paid Checkouts
                                </Typography>
                            </Box>
                    }</>
                }
                {
                    filterValue == 'Deposits' &&
                    <>{
                        userDeposits.length ?
                            userDeposits.map(deposite => {
                                return (
                                    <Card>
                                        <Box sx={{ width: '84px', height: '84px', borderRadius: '18px', backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon url={GiftIcon} w={50} h={50} />
                                        </Box>
                                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3px' }}>
                                            <Typography sx={{ color: 'primary.text', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px' }}>
                                                <Typography sx={{ color: '#3DCA64', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px', display: 'inline-block' }}>Succcessfull&nbsp;</Typography>
                                                Deposite NFT Gift
                                            </Typography>
                                            <Typography sx={{ display: 'flex', color: 'primary.text', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', lineHeight: '24px' }}>
                                                You have successfully sent {deposite.amount} YouWho tokens to
                                                <Typography sx={{ width: '5em', overflow: 'hidden', fontFamily: 'Inter', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '400', lineHeight: '24px', display: 'inline-block' }}>
                                                    &nbsp;{deposite.recipient_screen_cid}
                                                </Typography>
                                                !
                                            </Typography>
                                            <Typography sx={{ color: 'primary.darkGray', fontFamily: 'inter', fontSize: '12px', fontWeight: '400', lineHeight: '24px' }}>{deposite.iat.substring(0, 10)} {deposite.iat.substring(11, 16)}</Typography>
                                        </Box>
                                    </Card>
                                )
                            }) : <Box sx={{ display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ mt: 2, fontSize: '20px', color: 'primary.darkGray', textAlign: 'center', mb: 2, fontWeight: '500' }}>
                                    There are no Deposits
                                </Typography>
                            </Box>
                    }</>
                }
                {
                    filterValue == 'Withdrawals' &&
                    <>{
                        userWithdrawals.length ?
                            userWithdrawals.map(withdrawal => {
                                return (
                                    <Card>
                                        <Box sx={{ width: '84px', height: '84px', borderRadius: '18px', backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon url={GiftOpenIcon} w={50} h={50} />
                                        </Box>
                                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3px' }}>
                                            <Typography sx={{ color: 'primary.text', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px' }}>
                                                <Typography sx={{ color: '#3DCA64', fontFamily: 'inter', fontSize: '16px', fontWeight: '500', lineHeight: '26px', display: 'inline-block' }}>Succcessfull&nbsp;</Typography>
                                                Claim NFT Gift
                                            </Typography>
                                            <Typography sx={{ color: 'primary.text', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', lineHeight: '24px' }}>
                                                You successfully claimed YouWho-tokens!                                        </Typography>
                                            <Typography sx={{ color: 'primary.darkGray', fontFamily: 'inter', fontSize: '12px', fontWeight: '400', lineHeight: '24px' }}>{withdrawal.wat.substring(0, 10)} {withdrawal.wat.substring(11, 16)}</Typography>
                                        </Box>
                                    </Card>
                                )
                            }) :
                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ mt: 2, fontSize: '20px', color: 'primary.darkGray', textAlign: 'center', mb: 2, fontWeight: '500' }}>
                                    There are no Withdrawals
                                </Typography>
                            </Box>
                    }</>
                }
            </Box>
        </Box >
    )
}

export default Turnover