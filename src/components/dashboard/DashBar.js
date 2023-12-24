import styled from "@emotion/styled";
import { AddBoxOutlined, CheckRounded, Close, Face, Phone } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Popper, TextField, Modal } from "@mui/material";
import { Box, ClickAwayListener } from "@mui/material";
import { Add, ArrowDown2, ArrowUp2, Check, Clock, Profile, Setting2, TickCircle, Timer } from "iconsax-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_CONFIG } from "../../config";
import { toast } from 'react-toastify';
import { getuser } from "../../redux/actions";
import Crop from "../crop/Crop";
import { useEffect } from "react";
import { ButtonInput, MyInput } from "../utils";




const Bar = styled(Box)(({ theme }) => ({
    height: 'max-content', backgroundColor: theme.palette.secondary.bg,
    borderRadius: '24px',
    // marginBottom: '20px',
    boxShadow: theme.palette.primary.boxShadow, overflow: 'hidden',
    transition: '500ms ease'
}))
const Title = styled(Box)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
border-top-left-radius:24px;
border-top-right-radius:24px;
background: transparent;
width:100%;
justify-content:space-between;
borderBottom: 1px solid #D9D9D9;
height:30px;
@media screen and (max-width: 769px) {
    font-size:14px;
}
  
`;
const AvatarEdit = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundColor: theme.palette.primary.gray,
}))

const BannerEdit = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    width: '60px',
    height: '30px',
    backgroundColor: theme.palette.primary.gray,
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.secondary.text,
    margin: '3px 0'
}))

const Inputt = styled('input')(({ theme }) => ({
    width: '100%',
    outline: 'none',
    color: theme.palette.primary.gray,
    borderColor: theme.palette.primary.gray,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inter',
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

const DashBar = ({ selectValue, tabs, handleSelect, username, w }) => {
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [editProfile, setEditProfile] = useState(false)
    const globalUser = useSelector(state => state.userReducer)
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState(null)
    const [socialLinks, setSocialLinks] = useState([])
    // const [selectedAvatar, setSelectedAvatar] = useState(null)
    // const [selectedBanner, setSelectedBanner] = useState(null)
    const [openAvatarCrop, setOpenAvatarCrop] = useState(false)
    const [openBannerCrop, setOpenBannerCrop] = useState(false)
    const toastId = useRef(null);
    const dispatch = useDispatch();
    const fetchUser = (token) => dispatch(getuser(token));
    const avatarFileInput = useRef()
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPhotoURL, setAvatarPhotoURL] = useState(null);
    const bannerFileInput = useRef()
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPhotoURL, setBannerPhotoURL] = useState(null);

    useEffect(() => {
        if (globalUser.extra) {
            let phoneObject = globalUser.extra.find(obj => obj.hasOwnProperty('phone'))
            let socialObject = globalUser.extra.find(obj => obj.hasOwnProperty("social"))
            if (phoneObject)
                setPhone(phoneObject.phone)
            if (socialObject)
                setSocialLinks(socialObject.social)
        }
    }, [globalUser.extra])


    const loading = () => {
        toastId.current = toast.loading("Please wait...")
        console.log(toastId)
    }

    const updateToast = (success, message) => {
        success ? toast.update(toastId.current, { render: message, type: "success", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setExpanded(!expanded)
        if (!expanded)
            setAnchorEl(event.currentTarget);
        else
            setAnchorEl(null)
    };
    const handleClose = (e) => {
        handleSelect(e)
        // setValue(selectValue)
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setAnchorEl(null);
        setExpanded(false)
    }
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + '...' : str;
        return 'undefined'
    }

    const avatarChangeHandler = e => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPhotoURL(URL.createObjectURL(file));
            setOpenAvatarCrop(true);
        }
    }
    const bannerChangeHandler = e => {
        const file = e.target.files[0];
        if (file) {
            setBannerFile(file);
            setBannerPhotoURL(URL.createObjectURL(file));
            setOpenBannerCrop(true);
        }
    }

    const fileUploadHandler = async event => {
        loading();
        const promises = [];

        if (avatarFile) {
            const myFile = new File([avatarFile], 'image.jpeg', {
                type: avatarFile.type,
            });

            const avatarfd = new FormData();
            avatarfd.append('img', myFile)

            const avatarPromise = fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                },
                body: avatarfd,
            }).then(response => response.json());

            promises.push(avatarPromise);
        }

        if (bannerFile) {
            const myFile = new File([bannerFile], 'image.jpeg', {
                type: bannerFile.type,
            });

            const bannerfd = new FormData();
            bannerfd.append('img', myFile)

            const bannerPromise = fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/banner`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.token}`,
                },
                body: bannerfd,
            }).then(response => response.json());

            promises.push(bannerPromise);
        }

        if (promises.length > 0) {
            Promise.all(promises)
                .then(results => {
                    const areSuccessful = results.every(result => result.status === 200);
                    if (areSuccessful) {
                        updateToast(true, results[0].message);
                        fetchUser(globalUser.token)
                        // Perform other tasks here
                    } else {
                        // Handle error case when at least one API call fails
                        updateToast(false, 'An error occurred');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error case
                    updateToast(false, 'An error occurred');
                });
        } else {
            // Handle case when no API calls are made
            updateToast(false, 'An error occurred');
        }

    }

    const updateBio = async event => {
        loading()
        if (bio) {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/bio`, {
                method: 'POST',
                body: JSON.stringify({ bio: bio }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                fetchUser(globalUser.token)
                updateToast(true, response.message)
            } else {
                updateToast(false, response.message)
            }
        }
    }

    const updatePhoneNum = async event => {
        loading()
        let body;

        if (globalUser.extra !== null) {
            let updatedExtra = JSON.parse(JSON.stringify(globalUser.extra));
            let phoneObject = updatedExtra.find(obj => obj.hasOwnProperty('phone'))


            if (phoneObject) {
                phoneObject.phone = phone
                body = {
                    extra: [
                        ...updatedExtra,
                    ]
                }
            } else {
                body = {
                    extra: [
                        ...updatedExtra,
                        { phone: phone }
                    ]
                }
            }
        } else {
            body = {
                extra: [
                    { phone: phone }
                ]
            }
        }

        if (phone) {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/extra`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                fetchUser(globalUser.token)
                updateToast(true, response.message)
            } else {
                updateToast(false, response.message)
            }
        }
    }

    const handleSocialLinksChange = (e, index) => {
        const { name, value } = e.target;
        const updatedObj = [...socialLinks];

        updatedObj[index] = { ...updatedObj[index], [name]: value };

        setSocialLinks(updatedObj)
    };

    const updateSocialLinks = async event => {
        loading()
        let body;

        if (globalUser.extra !== null) {
            let updatedExtra = JSON.parse(JSON.stringify(globalUser.extra));
            let SocialObject = updatedExtra.find(obj => obj.hasOwnProperty('social'))

            if (SocialObject) {
                SocialObject.social = socialLinks
                body = {
                    extra: [
                        ...updatedExtra,
                    ]
                }
            } else {
                body = {
                    extra: [
                        ...updatedExtra,
                        { social: socialLinks }
                    ]
                }
            }
        } else {
            body = {
                extra: [
                    { social: socialLinks }
                ]
            }
        }

        if (socialLinks.length) {
            let request = await fetch(`${API_CONFIG.AUTH_API_URL}/profile/update/extra`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalUser.token}`,
                }
            })
            let response = await request.json()
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                fetchUser(globalUser.token)
                updateToast(true, response.message)
            } else {
                updateToast(false, response.message)
            }
        }
    }


    return (
        <Bar
            id="dash-bar"
            sx={{
                width: { xs: '100%', lg: w ? w : '325px' }, boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: '16px 12px'
            }}>
            {editProfile ?
                <>
                    <Box
                        sx={{
                            color: 'primary.text', display: 'flex', justifyContent: 'space-between',
                            width: '100%', alignItems: 'center', mb: '15px'
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            Edit Profile
                        </div>
                        <Close sx={{ fontSize: '25px' }} cursor='pointer' onClick={() => setEditProfile(false)} />
                    </Box>
                    <Accordion
                        sx={{
                            my: 1,
                            width: '100%',
                            bgcolor: 'secondary.bg',
                            color: 'primary.text',
                            border: '1px solid', borderColor: 'primary.gray',
                            // border: 'none',
                            '&:before': {
                                bgcolor: 'transparent',
                            },
                            // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                            boxShadow: 'none !important',
                            borderRadius: '24px !important', fontSize: '14px'
                        }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Image</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id={"img"}
                                    accept="image/*"
                                    onChange={avatarChangeHandler}
                                    ref={avatarFileInput}
                                />
                                <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Profile Picture</Typography>
                                <AvatarEdit
                                    sx={{
                                        cursor: 'pointer',
                                        background: () => {
                                            return (
                                                avatarPhotoURL
                                                    ? `url('${avatarPhotoURL}') no-repeat center`
                                                    : globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}') no-repeat center` : 'primary.gray'
                                            )
                                        },
                                        backgroundSize: 'cover'
                                    }}
                                    onClick={() => avatarFileInput.current.click()}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id={"img"}
                                    accept="image/*"
                                    onChange={bannerChangeHandler}
                                    ref={bannerFileInput}
                                />
                                <Typography sx={{ color: 'secondary.text', fontSize: '10px' }}>Set Banner Picture</Typography>
                                <BannerEdit
                                    sx={{
                                        cursor: 'pointer',
                                        background: () => {
                                            return (
                                                bannerPhotoURL
                                                    ? `url('${bannerPhotoURL}') no-repeat center`
                                                    : globalUser.banner ? `url('${API_CONFIG.API_URL}/${globalUser.banner}') no-repeat center` : 'primary.gray'
                                            )
                                        },
                                        backgroundSize: 'cover'
                                    }}
                                    onClick={() => bannerFileInput.current.click()}
                                />
                            </Box>
                            <Box
                                onClick={fileUploadHandler}
                                sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', cursor: 'pointer' }}>
                                <Typography
                                    sx={{ fontSize: '10px' }}
                                >Save </Typography><TickCircle cursor='pointer' size='12px' />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{
                        my: 1,
                        width: '100%',
                        bgcolor: 'secondary.bg',
                        color: 'primary.text',
                        border: '1px solid', borderColor: 'primary.gray',
                        // border: 'none',
                        '&:before': {
                            bgcolor: 'transparent',
                        },
                        // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                        boxShadow: 'none !important',
                        borderRadius: '24px !important', fontSize: '14px'
                    }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Bio</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >
                            <TextField sx={{ width: '100%' }} value={bio}
                                onChange={e => setBio(e.target.value)}
                                placeholder={globalUser.bio ? globalUser.bio : 'please write a few lines about your self'}
                                multiline inputProps={{ style: { fontSize: 12, } }} />
                            <Box
                                onClick={updateBio}
                                sx={{ display: 'flex', mt: 1, justifyContent: 'end', alignItems: 'center', color: 'primary.main', cursor: 'pointer' }}>
                                <Typography
                                    sx={{ fontSize: '10px' }}
                                >
                                    Save</Typography>
                                <TickCircle cursor='pointer' size='12px' />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{
                        my: 1,
                        width: '100%',
                        bgcolor: 'secondary.bg',
                        color: 'primary.text',
                        border: '1px solid', borderColor: 'primary.gray',
                        // border: 'none',
                        '&:before': {
                            bgcolor: 'transparent',
                        },
                        // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                        boxShadow: 'none !important',
                        borderRadius: '24px !important', fontSize: '14px'
                    }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Social Media</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', color: 'primary.main', gap: '20px', p: '20px 8px' }}>
                                <FlexRow sx={{ width: '100%' }}>
                                    <Typography sx={{ fontSize: '14px' }}>Social Media</Typography>
                                    <Typography sx={{ fontSize: '14px' }}>URL Link</Typography>
                                    <Box sx={{ cursor: 'pointer', color: '#3DCA64' }}>
                                        <Add onClick={() => setSocialLinks(prev => [...prev, { name: "", url: "" }])} />
                                    </Box>
                                </FlexRow>
                                {
                                    socialLinks?.map((obj, index) => {
                                        return (
                                            <FlexRow key={`obj_${index}`} sx={{ width: '100%' }}>
                                                <MyInput name={'name'} width={'40%'}
                                                    onChange={(e) => handleSocialLinksChange(e, index)}
                                                    value={obj.name}
                                                />
                                                <MyInput name={'url'} width={'40%'}
                                                    onChange={(e) => handleSocialLinksChange(e, index)}
                                                    value={obj.url}
                                                />
                                            </FlexRow>
                                        )
                                    })
                                }
                                <Box
                                    onClick={updateSocialLinks}
                                    sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center', color: 'primary.main', cursor: 'pointer', width: '60px' }}
                                >
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{
                        my: 1,
                        width: '100%',
                        bgcolor: 'secondary.bg',
                        color: 'primary.text',
                        border: '1px solid', borderColor: 'primary.gray',
                        // border: 'none',
                        '&:before': {
                            bgcolor: 'transparent',
                        },
                        // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                        boxShadow: 'none !important',
                        borderRadius: '24px !important', fontSize: '14px'
                    }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Email</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary.main', }}>
                                <Typography sx={{ my: 1, width: '100%', textAlign: 'center', fontSize: '12px', color: 'primary.text' }}>
                                    {globalUser.mail}
                                </Typography>
                                {/* <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' /> */}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{
                        my: 1,
                        width: '100%',
                        bgcolor: 'secondary.bg',
                        color: 'primary.text',
                        border: '1px solid', borderColor: 'primary.gray',
                        // border: 'none',
                        '&:before': {
                            bgcolor: 'transparent',
                        },
                        // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                        boxShadow: 'none !important',
                        borderRadius: '24px !important', fontSize: '14px'
                    }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Mobile Number</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', color: 'primary.main', gap: '20px', p: '20px 8px' }}>
                                <MyInput label={'enter your phone number'}
                                    icon={<Phone sx={{ color: 'primary.light', fontSize: '20px' }} />}
                                    name={'phone'}
                                    id={'phone'}
                                    type={'tel'}
                                    onChange={(e) => setPhone(e.target.value)}
                                    width={'100%'} />
                                {/* <Inputtt>
                                    <Inputt
                                        placeholder="enter your phone number"
                                        type="tel"
                                        value={phone}
                                        id="phone"
                                        name="phone"
                                        dir="ltr"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Inputtt> */}
                                <Box
                                    onClick={updatePhoneNum}
                                    sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center', color: 'primary.main', cursor: 'pointer', width: '60px' }}
                                >
                                    <Typography sx={{ fontSize: '10px' }}>Save </Typography><TickCircle cursor='pointer' size='12px' />
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>


                    {/* -------- CropModals -------- */}

                    <Modal
                        open={openAvatarCrop}
                        onClose={() => setOpenAvatarCrop(false)}
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
                                        setOpenAvatarCrop(false)
                                    }}>
                                        <Close sx={{ cursor: 'pointer' }} />
                                    </div>
                                </FlexRow>
                                <Crop imageURL={avatarPhotoURL} aspectRatio={1} setOpenCrop={setOpenAvatarCrop} setFile={setAvatarFile} setPhotoURL={setAvatarPhotoURL} />
                            </Box>
                        </Box>
                    </Modal>
                    <Modal
                        open={openBannerCrop}
                        onClose={() => setOpenBannerCrop(false)}
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
                                        setOpenBannerCrop(false)
                                    }}>
                                        <Close sx={{ cursor: 'pointer' }} />
                                    </div>
                                </FlexRow>
                                <Crop imageURL={bannerPhotoURL} aspectRatio={18 / 5} setOpenCrop={setOpenBannerCrop} setFile={setBannerFile} setPhotoURL={setBannerPhotoURL} />
                            </Box>
                        </Box>
                    </Modal>
                </>
                :
                <>
                    <Box sx={{
                        color: 'primary.text', display: 'flex', justifyContent: 'space-between',
                        width: '100%', alignItems: 'center', mb: '15px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <Face sx={{ fontSize: '50px' }} /> &nbsp;
                            {shorten(username)}
                        </div>
                        <Setting2 size='25px' cursor='pointer' onClick={() => setEditProfile(true)} />
                    </Box>
                    <Accordion sx={{
                        width: '100%',
                        bgcolor: 'secondary.bg',
                        color: 'primary.text',
                        border: '1px solid', borderColor: 'primary.gray',
                        // border: 'none',
                        '&:before': {
                            bgcolor: 'transparent',
                        },
                        // boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                        boxShadow: 'none !important',
                        borderRadius: '24px !important', fontSize: '14px'
                    }}>
                        <AccordionSummary
                            expandIcon={<ArrowDown2 size='16px' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ minHeight: '30px !important', height: '30px' }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text' }}>Progressive</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderTop: '1px solid', borderColor: 'primary.gray', transition: '500ms ease' }}
                        >
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Bio</Typography>
                                {globalUser.bio ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>YouWho Wallet</Typography>
                                {globalUser.YouWhoID ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Social Links</Typography>
                                {globalUser.socials ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Email</Typography>
                                {globalUser.mail ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Mail Varification</Typography>
                                {globalUser.isMailVerified ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Phone Varification</Typography>
                                {globalUser.isPhoneVerified ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Invite Friends</Typography>
                                {globalUser.friends ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>Profile Image</Typography>
                                {globalUser.avatar ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>First Mint</Typography>
                                {globalUser.mint ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>First Buy</Typography>
                                {globalUser.buy ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                            <FlexRow>
                                <Typography sx={{ fontSize: '12px' }}>First Sell</Typography>
                                {globalUser.sell ?
                                    <CheckRounded sx={{ color: '#0Cb2B1', fontSize: '14px' }} />
                                    : <Timer color="pink" size='14px' />
                                }
                            </FlexRow>
                        </AccordionDetails>
                    </Accordion>
                </>
            }
        </Bar >
    );
}

export default DashBar;
