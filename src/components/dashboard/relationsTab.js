import { Box, TextField, Typography } from "@mui/material";
import { RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useState } from "react";
const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))

const RelationsTab = () => {
    const [activeTab, setActiveTab] = useState('my-allies')
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <SubTabs jc={'center'}>
                <SubTab id={"my-allies"} onClick={(e) => setActiveTab(e.target.id)} text={'My Allies'} selected={activeTab == 'my-allies'} />
                <SubTab id={"my-friends"} onClick={(e) => setActiveTab(e.target.id)} text={'My Friends'} selected={activeTab == 'my-friends'} />
                <SubTab id={"expansion-of-communication"} onClick={(e) => setActiveTab(e.target.id)} text={'Expansion of communication '} selected={activeTab == 'expansion-of-communication'} />
            </SubTabs>
            <FilterSelectionBox sx={{
                py: 1,
                my: 2,
            }}>
                <span style={{ marginLeft: '16px', width: '180px' }}>
                    Search Username:
                </span>
                <input style={{
                    height: '20px', marginRight: '16px',
                    backgroundColor: 'transparent', border: 'none', outline: 'none',
                    color: '#c2c2c2', width: '100%'
                }} />
            </FilterSelectionBox>
            {activeTab == 'my-allies' &&
                <>
                    <RelationCard image={purpleNFT} username={'Farhad'} allies={true} />
                    <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
                    <RelationCard image={pinkNFT} username={'Shirin'} allies={true} />
                    <RelationCard image={torqNFT} username={'Tequilla__'} friend={true} allies={true} />
                    <RelationCard image={purpleNFT} username={'Farhad'} allies={true} />
                    <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
                    <RelationCard image={pinkNFT} username={'Shirin'} allies={true} />
                    <RelationCard image={torqNFT} username={'Tequilla__'} friend={true} allies={true} />
                    <RelationCard image={purpleNFT} username={'Farhad'} allies={true} />
                    <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
                    <RelationCard image={pinkNFT} username={'Shirin'} allies={true} />
                    <RelationCard image={torqNFT} username={'Tequilla__'} friend={true} allies={true} />
                </>
            }
            {activeTab == 'my-friends' &&
                <>
                    <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
                    <RelationCard image={purpleNFT} username={'Sweet_dreamer'} friend={true} allies={true} />
                    <RelationCard image={blueNft} username={'Shirin'} friend={true} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} friend={true} />
                    <RelationCard image={creamNFT} username={'this.me'} friend={true} />
                    <RelationCard image={torqNFT} username={'Khosro'} friend={true} allies={true} />
                    <RelationCard image={purpleNFT} username={'Sweet_dreamer'} friend={true} allies={true} />
                    <RelationCard image={blueNft} username={'Shirin'} friend={true} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} friend={true} />
                    <RelationCard image={creamNFT} username={'this.me'} friend={true} />
                </>
            }
            {activeTab == 'expansion-of-communication' &&
                <>
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                    <RelationCard image={torqNFT} username={'Khosro'} />
                    <RelationCard image={creamNFT} username={'Farhad'} />
                    <RelationCard image={blueNft} username={'Shirin'} />
                    <RelationCard image={sorkhabiNFT} username={'red_garlic'} />
                    <RelationCard image={creamNFT} username={'this.me'} />
                </>
            }
        </Box>
    );
}

export default RelationsTab;