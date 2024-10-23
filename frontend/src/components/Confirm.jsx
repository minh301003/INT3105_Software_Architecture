import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { useTheme, Typography, Box } from '@mui/material';
import { tokens } from '../theme';

export default function Confirm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        setOpen(false);
        toast.success('Xoá lượt đăng kiểm thành công');
    };
    return (
        <div>
          <Button onClick={handleClickOpen} variant="contained" color="error" style={{color: "#ffffff"}} startIcon={<DeleteIcon />}>
            Xóa
          </Button>
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
            Bạn có chắc chắn muốn xóa lượt đăng kiểm này chứ?
            </Typography>
            
            </DialogContent>
            <DialogActions>
            <Button 
            onClick={ handleDelete }
            style={{color: "#ffffff", width: "20%"}}
            color="error"
            variant="contained">
                Xóa
            </Button>
            <Button 
            onClick={handleClose}
            style={{color: "#ffffff", width: "20%"}}
            color="secondary"
            variant="contained"> Hủy </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}