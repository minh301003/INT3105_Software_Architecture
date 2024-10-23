import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { useTheme, Typography, Box } from '@mui/material';
import { tokens } from '../theme';

export default function PopUp() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleFormSubmit = (values) => {
        console.log('Form values:', values);
        setOpen(false);
        toast.success('Cập nhật thành công');
    };

    const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const checkoutSchema = yup.object().shape({
    centerName: yup.string().required("Bắt buộc"),
    startDate: yup.date().required("Bắt buộc"),
    endDate: yup.date().required("Bắt buộc"),
    carID: yup.string().required("Bắt buộc"),
    carPurpose: yup.string().required("Bắt buộc"),
    carColor: yup.string().required("Bắt buộc"),
    ownerName: yup.string().required("Bắt buộc"),
    ownerID : yup.string().required("Bắt buộc"),
    ownerPhone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Bắt buộc"),
    });
    const initialValues = {
        centerName: "",
        startDate:"",
        endDate: "",
        carID: "",
        carPurpose: "",
        carColor: "",
        ownerName: "",
        ownerID : "",
        ownerPhone: "",
    };


    return (
        <div>
        <Button
            onClick={handleClickOpen}
            sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "800",
            padding: "10px 20px"
            }}
            >
                Cập nhật thông tin 
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
                    variant="h2"
                    color="#ffffff"
                    fontWeight="700"
                    sx={{ mb: 3}}
                >
                    Cập nhật thông tin đăng kiểm
                </Typography>
                </Box> 
            </DialogTitle>
            
            <DialogContent>
            <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            }) => (
            <form>
                <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap:'10px' }}>
                    <Box
                    gap="10px"
                    display="grid"
                    >
                    <Typography
                        variant="h4"
                        color="#ffffff"
                        fontWeight="700"
                    >
                        Thông tin đăng kiểm
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Nơi đăng kiểm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.centerName}
                        name="centerName"
                        error={!!touched.centerName && !!errors.centerName}
                        helperText={touched.centerName && errors.centerName}

                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Ngày đăng kiểm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startDate}
                        name="startDate"
                        error={!!touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                       
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Ngày hết hạn"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endDate}
                        name="endDate"
                        error={!!touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                       
                    />
                    </Box>
                    <Box
                    gap="10px"
                    display="grid"
                    >
                    <Typography
                        variant="h4"
                        color="#ffffff"
                        fontWeight="700"
                    >
                        Thông tin ô tô
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Biển số xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.carID}
                        name="carID"
                        error={!!touched.carID && !!errors.carID}
                        helperText={touched.carID && errors.carID}

                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Màu sắc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.carColor}
                        name="carColor"
                        error={!!touched.carColor && !!errors.carColor}
                        helperText={touched.carColor && errors.carColor}
                       
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Mục đích sử dụng"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.carPurpose}
                        name="carPurpose"
                        error={!!touched.carPurpose && !!errors.carPurpose}
                        helperText={touched.carPurpose && errors.carPurpose}
                    />
                
                    </Box>
                    <Box
                    gap="10px"
                    display="grid"
                    >
                    <Typography
                    variant="h4"
                    color="#ffffff"
                    fontWeight="700"
                    >
                        Thông tin chủ xe
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Tên chủ xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ownerName}
                        name="ownerName"
                        error={!!touched.ownerName && !!errors.ownerName}
                        helperText={touched.ownerName && errors.ownerName}

                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Số căn cước"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ownerID}
                        name="ownerID"
                        error={!!touched.ownerID && !!errors.ownerID}
                        helperText={touched.ownerID && errors.ownerID}
                        
                    />
                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Số điện thoại"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ownerPhone}
                        name="ownerPhone"
                        error={!!touched.ownerPhone && !!errors.ownerPhone}
                        helperText={touched.ownerPhone && errors.ownerPhone}
                       
                    /> 
                    </Box>
                </Box>
            </form>
            )}
            </Formik>
            </DialogContent>
            <DialogActions>
            <Button 
            onClick={handleFormSubmit} 
            type="submit"
            style={{color: "#ffffff", width: "20%"}}
            color="success"
            variant="contained">
                Cập nhật
            </Button>
            <Button 
            onClick={handleClose}
            style={{color: "#ffffff", width: "20%"}}
            color="error"
            variant="contained"> Hủy </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}