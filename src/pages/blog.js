import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import imgbg from '../assets/Y-HUG-COIN.svg'
import Footer from "../components/Footer";
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))
const TopPic = styled(Box)(({ theme }) => ({
    width: '100%', height: '700px', borderRadius: '28px', position: 'relative',
    backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
    //  filter: 'blur(1px)',
    backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${imgbg}`)),

    "@media (max-width: 600px)": {
        height: '330px', borderRadius: '16px',
    },

}))

const TitleWrapper = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    gap: '32px',
    width: 'max-content', padding: '24px 32px', borderRadius: '28px 28px 0px 0px', position: 'absolute',
    backgroundColor: theme.palette.primary.bgOp, bottom: 0, left: '50%', transform: 'translate(-50%, 0)',
    "@media (max-width: 600px)": {
        height: '100%', width: '100%', borderRadius: '16px',
    },

}))

const BlogSingle = ({ theme, switchTheme }) => {
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'secondary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '32px 4px 0px 4px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'secondary.bg',
                    gap: { xs: '50px', md: '100px' }
                }}>
                    <TopPic sx={{
                        bgcolor: 'primary.bg',
                        display: 'flex', alignItems: 'center',
                    }}>
                        <TitleWrapper>
                            <Typography sx={{ color: 'white', fontSize: { xs: '22px', sm: '32px', md: '64px' } }}>
                                Title
                            </Typography>
                            <Typography sx={{ color: 'white', fontSize: { xs: '18px', sm: '22px', md: '32px' } }}>
                                Subtitle
                            </Typography>
                        </TitleWrapper>
                    </TopPic>
                    <Typography sx={{
                        color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter',
                        textTransform: 'capitalize'
                    }}>
                        YouWho is an NFT-based platform powered by blockchain technology. It is built on the Polygon blockchain and offers high speed and security.
                        <br />
                        All users on this platform can use the in-app features of YouWho by creating a cryptocurrency wallet based on blockchain technology. These features include buying and selling YouWho's exclusive in-app tokens, buying and selling NFTs, transferring gift NFTs, creating and storing collections, participating in voting and NFT-based events, and advertising other blockchain collections.
                        <br />
                        All of the features mentioned above are only available with the payment of YouWho's inapp token.
                        <br />
                        It is important to note that in this platform, all of your NFT-based assets are stored on the blockchain. In other words, the security of this platform is based on the security of the blockchain, and as a result, your information cannot be stored on any server.
                        <br />
                        User identification
                        <br />
                        In this platform, each user is identified by their cryptocurrency wallet address, and the transfer of each user's digital assets is possible through this way. In addition, YouWho also gives its users the ability to use their token assets wherever payment is required, and then use the tokens to benefit from all of the features mentioned above on the blockchain.
                        The user authentication in this platform is done through the KYC system dedicated to the YouWho platform, which is a system that is efficient and recognized by many financial institutions and organizations that use it to identify and verify the identity of their customers. This system is based on blockchain wallets.
                        <br />
                        Why YouWho?
                        <br />
                        We recommend you to register because of the unique features that the YouWho platform has:
                        <br />
                        • Speed: YouWho can enable its users to use the platform's services in the shortest possible time and not encounter any problems in terms of speed.
                        <br />
                        • Security: YouWho uses advanced security technologies such as two-factor authentication and cold storage to protect your assets. It is also equipped with a KYC system, which makes your crypto wallet more secure by collecting personal information of the customer and preventing others from accessing the customer's financial services or assets.
                        <br />
                        • User-friendliness: YouWho is a highly user-friendly platform and therefore makes it easy for its users. One of the main, attractive, and user-friendly parts of this platform is the ability to create various galleries for storing, buying, and selling various blockchain and non-blockchain assets.
                        <br />
                        • Variety: YouWho offers a wide range of features from the unlimited world of NFTs. It also gives users the freedom to perform various activities to ensure their ultimate satisfaction. Storing and buying and selling digital art, the ability to create digital collections, games, and other in-app items, and more importantly, the ability to transfer and gift NFTs to friends or loved ones are some of the diverse services of YouWho.
                        <br />
                        • Accessibility: YouWho supports several payment methods. It also guides you from the registration stage to planning your activities, and gives you the ability to use the platform without the need for any special technical knowledge.
                        <br />
                        • Exclusive tokens: YouWho's exclusive token, called !, can be purchased from the platform itself and used to pay for transaction fees, receive rewards, and participate in voting and various events. This token has financial value, and the more you have, the more assets you have and your ability to transfer.
                        <br />
                        • Advertising: YouWho is the first platform in this field that has provided the opportunity to advertise various blockchain collections. YouWho gives you the ability to advertise your NFTs in other markets so that they can be introduced to more audiences and, as a result, the sales of your digital assets can also increase.
                        <br />
                        We value your assets; so we recommend YouWho
                        <br />
                        In addition to the above, YouWho is a rapidly growing platform with a large and active community. It is also committed to providing the best possible experience for its users.                </Typography>

                    <Footer />
                </Box>
            </Wrapper>
        </Box>
    );
}

export default BlogSingle;