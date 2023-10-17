import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Heart, More, Share } from "iconsax-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ButtonOutline from "../buttons/buttonOutline";

const Outter = styled(Box)(({ theme }) => ({
    width: '200px', height: '175px', padding: '5px'
    // display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const Card = styled(Box)(({ theme }) => ({
    // width: '200px', height: '175px',
    width: '100%', height: '100%',
    padding: '7px 7px 14px 7px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '400ms ease',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.text,
}))

const ViewMoreOrLogin = ({ link }) => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Outter>
            <Card>
                {/* {globalUser.isLoggedIn ? */}
                <ButtonOutline text={'view all'} onClick={() => navigate(link)} />
                {/* :
                    <FlexColumn>
                        <p style={{ fontSize: '12px', textAlign: 'center' }}>
                            To See More or Buy, You Must Login
                        </p>
                        <ButtonOutline text={'Sign in'} onClick={() => navigate('/auth')} />
                    </FlexColumn>
                } */}

            </Card>
        </Outter>
    );
}

export default ViewMoreOrLogin;