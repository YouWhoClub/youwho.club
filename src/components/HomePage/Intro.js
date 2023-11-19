import styled from "@emotion/styled";
import { Box, Typography, keyframes } from "@mui/material";
import ButtonPurple from "../buttons/buttonPurple";
import { ArrowDown, ArrowDown2 } from "iconsax-react";
const changeBG = keyframes`
  0% {
    backgroundImage: "url('/Y-HUG-COIN.svg')",
  }
  50%{
    backgroundImage: "url('/YouWho-hugcoin.svg')",
  }
  100%{
    backgroundImage: "url('/Y-HUG-COIN.svg')",
  }
`

const WrapperIn = styled(Box)(({ theme }) => ({
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))
const YouWhoPic = styled(Box)(({ theme }) => ({
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
    backgroundImage: "url('/YouwhoHugCoin.svg')",
    '&:hover': {
    }
}))
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))

const IntroNew = ({ theme }) => {
    const scrollToId = () => {
        // let target = window.document.getElementById('nft-examples')
        // window.scrollTo(target)

        window.document.getElementById('nft-examples').scrollIntoView({
            behavior: 'smooth'
        })

    }
    return (
        <Wrapper sx={{
        }}>
            <WrapperIn sx={{
                padding: { xs: '60px 20px 80px 20px', sm: '100px 60px 90px 60px' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '44px', sm: '110px' },
            }}>
                <Box sx={{
                    width: { xs: '100%', sm: '350px' },
                    // height: '100%',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', sm: 'start' },
                    display: 'flex', flexDirection: 'column',
                }}>
                    <Typography variant="h4" sx={{
                        color: 'primary.text', margin: 0,
                        fontSize: { xs: '40px', sm: '74px' }, fontWeight: 400,
                        mb: { xs: '25px', sm: '11px' },
                    }}>YouWho</Typography>
                    <Typography variant="h6"
                        sx={{
                            color: 'secondary.text',
                            // margin: 0,
                            mb: { xs: '92px' },
                            fontSize: { xs: '20px', sm: '30px' }, fontWeight: 400
                        }}>A Life Magic For You</Typography>
                    <Typography variant="p"
                        sx={{
                            color: 'primary.gray',
                            margin: 0, mb: { xs: '60px', sm: 5 },
                            textAlign: { xs: 'center', sm: 'start' },
                            fontFamily: "Inter"
                        }}>YouWho is a NFT market place with
                        new unique features.</Typography>
                    <ButtonPurple onClick={scrollToId} text={`YouWho NFTs Examples`} w={'max-content'} icon={<ArrowDown size='12px' />} px={'20px'} />
                </Box>
                <YouWhoPic sx={{
                    width: { xs: '100%', sm: '560px' },
                    height: { xs: '290px', sm: '560px' },
                }}>
                </YouWhoPic>
            </WrapperIn >
        </Wrapper>
    );
}

export default IntroNew;