import styled from "@emotion/styled";
import { Box } from "@mui/material";
const Bar = styled(Box)(({ theme }) => ({ width:'200px',borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)' }))
const Progressive = () => {
    return (<Bar>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
        <p>zadtan</p>
    </Bar>);
}

export default Progressive;