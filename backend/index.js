const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');
const parser = new xml2js.Parser();
const app = express();
app.use(cors()); 
const PORT = 3002;

const apiType = process.env.API_TYPE;


// Endpoint API giá vàng tại Việt Nam
if (apiType === 'gold') {
  app.get('/api/gold', async (req, res) => {
    try {
      const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
      const goldData = response.data;
      res.json(goldData);
      console.log("Gold api called sucessfully");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in api gold');
    }
  });
}

// Endpoint API quy đổi giá ngoại tệ
if (apiType === 'currency') {
  app.get('/api/currency', async (req, res) => {
    try {
      const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
      const xmlData = response.data;

      parser.parseString(xmlData, (err, result) => {
        if (err) {
          throw err;
        }
        res.json(result);
        console.log("Currency api called sucessfully");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in api currency');
    }
  });
}

app.use('/health', require('./routers/healthchecker'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));
