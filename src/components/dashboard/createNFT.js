import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrivateKey } from "../../redux/actions";
import { AscSelect, BetweenTwoSelection, ButtonInput, MyInput, SelectInput, SubTab, SubTabs } from "../utils";
import styled from "@emotion/styled";
import FilterSelection from "../filterSelection";
import Selection from "../selection";
import { Add, AddAPhotoOutlined, Close, AddBoxOutlined, BrandingWatermark, CommentOutlined, ConnectedTvRounded, Description, DescriptionOutlined, EmojiSymbols, LinkOutlined, List, Money, TitleOutlined } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import nftImage from '../../assets/sokhabi-nft.svg'
import ButtonPurple from "../buttons/buttonPurple";
import MediaTypeIcon from '../../assets/icons/media-type.svg'
import ButtonOutline from "../buttons/buttonOutline";
import frameIcon from '../../assets/icons/frame.svg'
import CollIcon from '../../assets/icons/collectionIcon.svg'
import { Coin, Link } from "iconsax-react";
import Crop from '../crop/Crop'
import { Input } from "@mui/base";
import { useNavigate } from "react-router";
import { API_CONFIG } from "../../config";
import { toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';
import { Buffer } from 'buffer';


const Container = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.bg,
    padding: '12px 18px 18px 18px',
    gap: '40px',
    borderRadius: '18px',
    boxShadow: theme.palette.primary.boxShadow
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between', width: '100%',
    alignItems: 'center',
}))
const NFTImage = styled(Box)(({ theme }) => ({
    backgroundImage: BG_URL(PUBLIC_URL(`${nftImage}`)),
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
    , borderRadius: '12px',
    width: '100%',
    height: '200px',
    // "@media (min-width: 1440px)": {
    //     height: '250px',
    //   },

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


const CreateNFT = () => {
    const [activeTab, setActiveTab] = useState('create-NFT')
    const globalUser = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [mediaType, setMediaType] = useState(undefined)
    const [aspectRatio, setAspectRatio] = useState(undefined)
    const [openCrop, setOpenCrop] = useState(false)
    const [tokenAmount, setTokenAmount] = useState(undefined)
    const [NFTName, setNFTName] = useState(null)
    const [NFTDescription, setNFTDescription] = useState(null)
    const [NFTCollection, setNFTCollection] = useState(null)
    const colImageInput = useRef()
    const [colImageFile, setColImageFile] = useState(null);
    const [colPhotoURL, setColPhotoURL] = useState(null);
    const toastId = useRef(null);
    const [signer, setSigner] = useState(undefined)
    const [collectionForm, setCollectionForm] = useState({
        gallery_id: null,
        amount: null, // gas fee of creating collection onchain
        col_name: "",
        col_description: "",
        symbol: "",
        owner_cid: "",
        metadata_updatable: false,
        base_uri: "",
        royalties_share: 0, // in-app token amount | 100 means 1%
        royalties_address_screen_cid: "",
        extra: [],
    })


    useEffect(() => {
        getGasFee()
        getPrivateGallery()
    }, [])

    const loading = () => {
        toastId.current = toast.loading("Please wait...")
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const savePrivateKey = (e) => {
        e.preventDefault()
        dispatch(setPrivateKey(signer))
    }
    
    const handleSelectMediaType = (e) => {
        e.preventDefault()
        setMediaType(e.target.id)
    }
    const navigate = useNavigate()

    const handleChange = (e) => {
        if (e.target.type == 'number')
            setCollectionForm(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        else
            setCollectionForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
    }

	const handleColImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setColImageFile(file);
            setColPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    const handleMetadataChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMetadata = [...collectionForm.extra];

        if (isNaN(value))
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: value };
        else
            updatedMetadata[index] = { ...updatedMetadata[index], [name]: Number(value) };


        setCollectionForm((prev) => ({
            ...prev,
            extra: updatedMetadata,
        }));
    };

    const getGasFee = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/get-gas-fee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            setCollectionForm(prev => ({ ...prev, amount: response.data }))
        } else {
            console.log(response.message)
        }
    }
    const getPrivateGallery = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()

        if (!response.is_error) {
            setCollectionForm(prev => ({ ...prev, gallery_id: response.data[0].id }))
        } else {
            console.log(response.message)
        }
    }

	
    // setting polygon-mainnet as web3.js provider

    const provider = "https://polygon-mainnet.infura.io/v3/20f2a17bd46947669762f289a2a0c71c";
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const createCollection = async () => {
        loading();

        if (globalUser.privateKey) {
            const privateKey = Buffer.from(globalUser.privateKey, 'hex');
			let data

			if(collectionForm.extra.length == 0){
				data = {...collectionForm, extra: null}
			}else{
				data = {...collectionForm, extra: JSON.stringify(collectionForm.extra)}
			}

            const dataString = JSON.stringify(data);
            const dataHash = web3.utils.keccak256(dataString);

            const signObject = web3.eth.accounts.sign(dataHash, privateKey);

            const { signature } = signObject;

            const requestData = {
                ...data,
                tx_signature: signature.replace('0x', ''),
                hash_data: dataHash.replace('0x', ''),
            };

            console.log(signObject);
            console.log(requestData);

            const publicKey = web3.eth.accounts.recover(dataHash, signature);
            console.log(publicKey)

            // sending the request

            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/collection/create`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                updateToast(true, response.message)
            } else {
                console.error(response.message)
                updateToast(false, response.message)
            }
        } else {
            updateToast(false, 'please save your private key first')
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
            {globalUser.cid ?
                <>
                {globalUser.privateKey ?
                    <>
                    <SubTabs jc={'center'} mb={'32px'}>
                        <SubTab id={"create-collection"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Collection'} selected={activeTab == 'create-collection'} />
                        <SubTab id={"create-NFT"} onClick={(e) => setActiveTab(e.target.id)} text={'Create NFT'} selected={activeTab == 'create-NFT'} />
                    </SubTabs>
                    {activeTab == 'create-NFT' ?
                        <>
                            <Container sx={{ mb: '32px' }}>
                                <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                        Upload Your NFT
                                    </Typography>
                                    <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                        You Can Upload NFT in Various Types & Sizes
                                    </Typography>
                                </FlexColumn>
                                <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                    <FlexColumn sx={{
                                        gap: { xs: '10px', sm: '16px' }
                                    }}>
                                        <SelectInput tabs={['Image, .PNG', 'Image, .JPG', 'Video, .MP4']} label={'Your NFT Type'}
                                            handleSelect={handleSelectMediaType} value={mediaType} id="nft-type-selection"
                                            width={'100%'} icon={<Icon url={MediaTypeIcon} w={27} h={27} />} />
                                        <ButtonInput label={'Upload NFT File *'} width={'100%'}
                                            icon={<AddAPhotoOutlined sx={{ color: 'primary.light' }} />}
                                            button={<ButtonOutline
                                                height='35px'
                                                onClick={() => colImageInput.current.click()}
                                                text={'Browse'}
                                                br={'30px'} 
												/>
                                            } />
                                        <SelectInput tabs={['16 : 9', '1:1',]} label={'Aspect Ratio'}
                                            handleSelect={(e) => setAspectRatio(e.target.id)} value={aspectRatio} id="nft-aspect-ratio-selection"
                                            width={'100%'} icon={<Icon url={frameIcon} w={27} h={27} />} />
                                    </FlexColumn>
                                    <NFTImage sx={{}} />
                                </FlexRow>
                            </Container>
                            <Container >
                                <FlexColumn sx={{ gap: { xs: '10px', sm: '16px' } }}>
                                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                        NFT Informations
                                    </Typography>
                                    <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '12px' } }}>
                                        Tell Us About Your NFT Details
                                    </Typography>
                                </FlexColumn>
                                <FlexColumn sx={{ gap: '16px' }}>
                                    <FlexRow sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
                                        <MyInput value={tokenAmount}
                                            onChange={(e) => setTokenAmount(e.target.value)}
                                            label={'NFT Price'} width={'100%'}
                                            icon={<Coin color="#BEA2C5" />} type={'number'} id={'nft-price'} />
                                        <MyInput value={NFTName}
                                            onChange={(e) => setNFTName(e.target.value)}
                                            label={'NFT Name*'} width={'100%'}
                                            icon={<BrandingWatermark sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-name'} />
                                    </FlexRow>
                                    <SelectInput tabs={['bla', 'blaa', 'blaaa']} label={'NFT Collection *'}
                                        handleSelect={(e) => setNFTCollection(e.target.id)} value={NFTCollection}
                                        id="nft-collection-selection"
                                        width={'100%'} icon={<Icon url={CollIcon} w={27} h={27} />} />
                                    <MyInput value={NFTDescription}
                                        onChange={(e) => setNFTDescription(e.target.value)}
                                        label={'NFT Description*'} width={'100%'}
                                        icon={<Description sx={{ color: "#BEA2C5" }} />} type={'string'} id={'nft-decription'} />
                                </FlexColumn>
                            </Container>
                            <Box sx={{
                                width: { xs: '100%', sm: '350px' }, mt: '32px', display: 'flex', justifyContent: 'center'
                            }}>
                                <ButtonPurple text={'Create'} w={'100%'} />
                            </Box>
                        </>
                        :
                        <>
                            <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                NFT Contract Information
                            </Typography>
                            <Typography sx={{ color: 'secondary.text', fontSize: { xs: '12px', sm: '14px' } }}>
                                You Can Read Information About Each Field,By Click On The Icon, to Show/Hide The Information.
                            </Typography>

                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    New Collection Introduction
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                            <Typography sx={{ fontSize: '12px' }}>
                                                Type : &nbsp;
                                            </Typography>
                                            <Input color="primary.gray" style={{ outline: "none", fontSize: '12px' }} />
                                        </Box>
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput name={'col_name'} label={'Name *'} width={'100%'} icon={<TitleOutlined sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.col_name}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput name={'symbol'} label={'Symbol *'} width={'100%'} icon={<EmojiSymbols sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.symbol}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' , position:'relative'}}>
                                        <ButtonInput label={'Cover Image *'} width={'100%'}
                                            icon={<ConnectedTvRounded sx={{ color: 'primary.light' }} />}
                                            button={<ButtonOutline
                                                height='35px'
                                                onClick={() => colImageInput.current.click()}
                                                text={'Browse'}
                                                br={'30px'} />
                                            } />

    									<input
                                        	accept="image/*"
                                        	id="nftPhoto"
                                        	type="file"
                                        	style={{ display: 'none' }}
                                        	onChange={handleColImageChange}
                                        	ref={colImageInput}
                                    	/>

										<Box
											sx={{
												width: '68px',
												aspectRatio: 16 / 9,
												borderRadius: '12px',
												backgroundColor: 'primary.gray',
												cursor: 'pointer',
												position:'absolute',
												left:'150px', right:0,
												display:() => {
													return (
														colPhotoURL
															? 'block'
															: 'none'
													)
												},
												background: () => {
													return (
														colPhotoURL
															? `url('${colPhotoURL}') no-repeat center`
															: 'primary.gray'
													)
												},
												backgroundSize: 'cover'
											}}
											onClick={() => colImageInput.current.click()}
										></Box>

                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '12px' }}>
                                        <MyInput name={'col_description'} label={'Description *'} width={'100%'} icon={<DescriptionOutlined sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.col_description}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                </FlexColumn>
                            </Container>
                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    The Collection Metadata
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <MyInput name={'base_uri'} label={'Base URI *'} width={'100%'} icon={<LinkOutlined sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.base_uri}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Metadata Updatable *'} width={'100%'}
                                            icon={<List sx={{ color: 'primary.light' }} />
                                            }
                                            button={<BetweenTwoSelection
                                                color={'secondary.text'}
                                                options={[true, false]}
                                                id={'metaupdate-create-coll'}
                                                name='metadata_updatable'
                                                setOption={value => setCollectionForm((prev) => ({ ...prev, metadata_updatable: value }))}
                                                selected={collectionForm.metadata_updatable}
                                            />
                                            } 
										/>
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <ButtonInput label={'Metadata Addition *'} width={'100%'}
                                            icon={<AddBoxOutlined
                                                sx={{ color: 'primary.light' }}
                                            />
                                            }
                                            button={<Add sx={{ color: 'primary.gray' }}
                                                onClick={() => setCollectionForm((prev) => ({ ...prev, extra: [...prev.extra, { key: "", value: "" }] }))}
                                            />
                                            } />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    {
                                        collectionForm.extra.map((object, index) => {
                                            return (<FlexRow sx={{ mb: '16px' }}>
                                                <span>{index + 1}</span>
                                                <MyInput name={'key'} label={'Key'} width={'40%'}
                                                    onChange={(e) => handleMetadataChange(e, index)}
                                                    value={object.key}
                                                />
                                                <MyInput name={'value'} label={'Value'} width={'40%'}
                                                    onChange={(e) => handleMetadataChange(e, index)}
                                                    value={object.value}
                                                />
                                            </FlexRow>)
                                        })
                                    }

                                </FlexColumn>
                            </Container>
                            <Container sx={{ mt: '32px', }}>
                                <Typography sx={{ color: 'primary.text', fontSize: { xs: '18px', sm: '22px' } }}>
                                    The Collection Finance
                                </Typography>
                                <FlexColumn>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 15px' }}>
                                            <Typography sx={{ fontSize: '12px' }}>
                                                Owner Address : &nbsp;
                                            </Typography>
                                            <Input name="owner_cid" color="primary.gray" style={{ outline: "none", fontSize: '12px' }}
                                                onChange={handleChange}
                                                value={collectionForm.owner_cid}
                                            />
                                        </Box>
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <MyInput type='number' name={'royalties_share'} label={'Royalty Share *'} width={'100%'} icon={<Money sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.royalties_share}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                    <FlexRow sx={{ mb: '16px' }}>
                                        <MyInput name={'royalties_address_screen_cid'} label={'Royalties Address *'} width={'100%'} icon={<AddBoxOutlined sx={{ color: 'primary.light' }} />}
                                            onChange={handleChange}
                                            value={collectionForm.royalties_address_screen_cid}
                                        />
                                        <CommentOutlined sx={{ color: 'primary.light', ml: '8px', cursor: 'pointer' }} />
                                    </FlexRow>
                                </FlexColumn>
								<Modal
                                open={openCrop}
                                onClose={() => setOpenCrop(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        borderRadius: '24px',
                                        width: { xs: '100%', sm: '600px' }, height: { xs: '100%', sm: '600px' },
                                        backgroundColor: 'secondary.bg',
                                        display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'space-between'
                                    }}>
                                        <FlexRow sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                                            <Typography>Crop</Typography>
                                            <div onClick={() => {
                                                setOpenCrop(false)
                                            }}>
                                                <Close sx={{ cursor: 'pointer' }} />
                                            </div>
                                        </FlexRow>
                                        <Crop imageURL={colPhotoURL} aspectRatio={aspectRatio} setOpenCrop={setOpenCrop} setFile={setColImageFile} setPhotoURL={setColPhotoURL} />
                                    </Box>
                                </Box>
                            </Modal>
                            </Container>
                            <Box sx={{
                                width: { xs: '100%', sm: '350px' }, mt: '32px', display: 'flex', justifyContent: 'center'
                            }}>
                                <ButtonPurple
                                 text={'Create'}
                                  w={'100%'}
                                  onClick={createCollection}
                                  disabled={!Object.values(collectionForm).every(value => value !== null && value !== "")}      
                                  />
                            </Box>
                        </>
                    }
                    </>
                    :
                    <Container sx={{ mb: '32px' }}>
                        <Typography sx={{ fontFamily: 'Inter', mt: 2, fontSize: '13px', color: 'primary.text', textAlign: 'center', mb: 2, fontWeight: '400' }}>
                            We have cleared your private key as you logged out. Please provide your private key to continue. <br />Your private key will be securely stored for future transactions.
                        </Typography>
                        <MyInput
                            value={signer}
                            onChange={(e) => setSigner(e.target.value)}
                            placeholder="enter private key"
                            width={'400px'}
                            textColor={'black'}
                            py={'8px'} />
                        <ButtonPurple onClick={savePrivateKey} height='35px' text={'Save'}/>
                    </Container>
                }

                </> :
                // if didnt create wallet yet =======>
                <>
                    <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '32px' }}>
                        <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                            Dear
                            <b>
                                &nbsp;
                                {globalUser.username}
                                &nbsp;
                            </b>
                            to create artworks, private or public galleries in youwho platform ,
                            you must create a youwho wallet first
                        </Typography>
                        <ButtonPurple text={'Create Wallet'} onClick={() => navigate('/wallet')} height='35px' />
                    </FlexColumn>
                </>
            }
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />
        </Box >
    );
}

export default CreateNFT;