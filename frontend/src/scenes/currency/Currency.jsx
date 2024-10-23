import {Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";


const CurrencyList = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [currency, setCurrency] = useState([]);
   const [updateTime, setUpdateTime] = useState("");
  
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch("http://localhost:3002/api/currency"); 
          const data = await response.json();

          const dateTime = data.ExrateList.DateTime[0];
          setUpdateTime(dateTime);

          const formattedData = data.ExrateList.Exrate.map((item, index) => {
            const { CurrencyCode, CurrencyName, Buy, Transfer, Sell } = item.$;
            return {
              id: index,  
              CurrencyCode: CurrencyCode.trim(),
              CurrencyName: CurrencyName.trim(),
              Buy: Buy === "-" ? "N/A" : Buy,  
              Transfer: Transfer === "-" ? "N/A" : Transfer,
              Sell: Sell === "-" ? "N/A" : Sell,
            };
          });

          setCurrency(formattedData);
        } catch (error) {
          console.error("Error fetching currency data:", error);
        }
      })();
    }, []);
    console.log(currency)
    console.log(updateTime)

   const columns = [
    {
      field: "CurrencyCode",
      headerName: "Ngoại tệ",
      flex: 1,
    },
    {
      field: "CurrencyName",
      headerName: "Tên ngoại tệ",
      flex: 1,
    },
    {
      field: "Buy",
      headerName: "Mua tiền mặt",
      flex: 1,
    },
    {
        field: "Transfer",
        headerName: "Mua chuyển khoản",
        flex: 1,
    },
    {
        field: "Sell",
        headerName: "Bán tiền mặt",
        flex: 1,
    },
  ];
  
   return (
    <Box m="20px">
        <Header title="Giá quy đổi ngoại tệ" subtitle={`Cập nhật vào: ${updateTime}`} />
        <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        >
            <DataGrid
            rows={currency}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            />
        </Box>

    </Box>
   );
};

export default CurrencyList;