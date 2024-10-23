const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');
const parser = new xml2js.Parser();
const app = express();
app.use(cors()); 
const PORT = 3002;

// Endpoint giá vàng tại Việt Nam
app.get('/api/gold', async (req, res) => {
  try {
    const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
    const goldData = response.data;

    res.json(goldData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in api gold');
  }
});

// Endpoint quy đổi giá ngoại tệ
app.get('/api/currency', async (req, res) => {
    try {
      const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
      const xmlData = response.data;
  
      parser.parseString(xmlData, (err, result) => {
        if (err) {
          throw err;
        }
        res.json(result);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in api currency');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));
