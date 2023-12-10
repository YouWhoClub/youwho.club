import { Box } from "@mui/material";
import { useEffect } from "react";

const AssetsTab = () => {
    useEffect(() => {
        window.document.getElementById("scrollable-profile-panel-inside").scrollTo(0, 0);
    }, [])
    return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    </Box>);
}

export default AssetsTab;