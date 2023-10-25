import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";
import CreateNFT from "./createNFT";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
import { Tab, Tabs } from "../utils";
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
}))

const ProfilePanel = () => {
    const [activeTab, setActiveTab] = useState('create-tab')
    return (
        <Panel sx={{ p: { xs: 'unset', sm: 1 } }}>
            <Tabs
                mb={3}
            >
                <Tab id={"create-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Create NFT'} selected={activeTab == 'create-tab'} />
                <Tab id={"private-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Private Gallery'} selected={activeTab == 'private-gallery-tab'} />
                <Tab id={"public-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Public Gallery'} selected={activeTab == 'public-gallery-tab'} />
                <Tab id={"relations-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Relations'} selected={activeTab == 'relations-tab'} />
                <Tab id={"reactions-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Reactions'} selected={activeTab == 'reactions-tab'} />
            </Tabs>
            <Box sx={{ width: '100%',color:'primary.text' }}>
                {activeTab == 'create-tab' ? <CreateNFT /> :
                    activeTab == 'private-gallery-tab' ? <PrivateGallery />
                        : activeTab == 'public-gallery-tab' ? <PublicGallery /> :
                            <div>{activeTab}</div>
                }
            </Box>
        </Panel>
    );
}

export default ProfilePanel;