import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toast } from "react-toastify";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogOut = () => {
        setOpen(false);
        toast.success('Đăng xuất thành công');
    };
  return (
    <Box style={{  display:'flex', justifyContent:'space-between' }} p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Tìm kiếm" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
        <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
  
        <IconButton onClick={handleClickOpen}  >
          <PersonOutlinedIcon /> 
        </IconButton>
        
        <Dialog 
          open={open} 
          onClose={handleClose}
          PaperProps={{
              style: { backgroundColor: colors.primary[500] }
          }}
          >
            <DialogTitle>
                <Box>
                <Typography
                    variant="h3"
                    color="#ffffff"
                    fontWeight="700"
                    sx={{ mb: 2}}
                >
                    Xác nhận
                </Typography>
                </Box> 
            </DialogTitle>
            
            <DialogContent>
            <Typography variant="h5">
            Bạn có chắc chắn muốn kết thúc phiên đăng nhập chứ?
            </Typography>
            
            </DialogContent>
            <DialogActions>
               <Button 
              component={Link} to="/login"
              onClick={handleLogOut}
              style={{color: "#ffffff", width: "25%"}}
              color="error"
              variant="contained">
                  Đăng xuất
              </Button>
              <Button 
              onClick={handleClose}
              style={{color: "#ffffff", width: "25%"}}
              color="secondary"
              variant="contained"> Hủy </Button>
            </DialogActions>
        </Dialog>

        </Box>

      
      
    </Box>
  );
};

export default Topbar;
