const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');
const parser = new xml2js.Parser();
const client  = require('prom-client');
const app = express();
app.use(cors()); 
const PORT = 3002;

const apiType = process.env.API_TYPE;

const healthGauge = new client.Gauge({ name: 'api_health', help: 'Health status of APIs',labelNames: ['service'], });

// Endpoint API giá vàng tại Việt Nam
if (apiType === 'gold') {
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in api currency');
    }
  });
}

// Health Endpoint cho API giá vàng
app.get('/health/gold', async (req, res) => {
  try {
    const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
    if (response.status === 200) {
      healthGauge.set({ service: 'Gold API' }, 1); 
      res.status(200).json({ service: 'Gold API', status: 'UP' });
    } else {
      healthGauge.set({ service: 'Gold API' }, 0); 
      res.status(500).json({ service: 'Gold API', status: 'DOWN' });
    }
  } catch (error) {
    healthGauge.set({ service: 'Gold API' }, 0); 
    console.error(error);
    res.status(500).json({ service: 'Gold API', status: 'DOWN' });
  }
});

// Health Endpoint cho API quy đổi ngoại tệ
app.get('/health/currency', async (req, res) => {
  try {
    const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
    if (response.status === 200) {
      healthGauge.set({ service: 'Currency API' }, 1); 
      res.status(200).json({ service: 'Currency API', status: 'UP' });
    } else {
      healthGauge.set({ service: 'Currency API' }, 0); 
      res.status(500).json({ service: 'Currency API', status: 'DOWN' });
    }
  } catch (error) {
    healthGauge.set({ service: 'Currency API' }, 0); 
    console.error(error);
    res.status(500).json({ service: 'Currency API', status: 'DOWN' });
  }
});

// Export Metrics cho Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));
