import {Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";



const GoldList = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [goldPrice, setGoldPrice] = useState([])
   
    // Format JSON fields
    const renameKeys = (data) => {
      return data.DataList.Data.map(item => {
          const newItem = {};
          for (const key in item) {
              const newKey = key.replace('@', '').split('_')[0];
              newItem[newKey] = item[key];
          }
          return newItem;
      });
    };

    useEffect(() => {
      (async () => {
        try {
          const response = await fetch("http://localhost:6001/api/gold"); 
          const data = await response.json();
          var renamedData = renameKeys(data)
          const formattedData = renamedData.map(item => ({
            id: item['row'], 
            name: item["n"],
            buyPrice: item["pb"] === "0" ? "N/A" : item["pb"],
            sellPrice: item["ps"] === "0" ? "N/A" : item["ps"],
            date: item["d"],
          }));
          setGoldPrice(formattedData);
        } catch (error) {
          console.error("Error fetching gold price data:", error);
        }
      })();
    }, []);

  
    const columns = [
      {
        field: "name",
        headerName: "Tên giá vàng",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "buyPrice",
        headerName: "Giá mua vào",
        flex: 1,
      },
      {
        field: "sellPrice",
        headerName: "Giá bán ra",
        flex: 1,
      },
      {
          field: "date",
          headerName: "Thời gian nhập giá vàng",
          flex: 1,
      },
    ];
  
   return (
    <Box m="20px">
        <Header title="Giá vàng trong nước" subtitle="" />

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
            rows={goldPrice}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            />
        </Box>

    </Box>
        
    
   );
};

export default GoldList;