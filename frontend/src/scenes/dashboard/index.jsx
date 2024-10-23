import {Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
        <Header title="Trang chủ" subtitle="Đây là trang chủ" />
        </Box>
    );
   
};

export default Dashboard;