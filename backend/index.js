const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');
const client = require('prom-client');
const parser = new xml2js.Parser();
const app = express();
app.use(cors()); 
const PORT = 3002;

const apiType = process.env.API_TYPE;

const register = new client.Registry();
client.collectDefaultMetrics({ register }); 

const serviceStatusGauge = new client.Gauge({
  name: 'service_status',
  help: 'Status of the service: 1 for UP, 0 for DOWN',
  labelNames: ['service'],
});
register.registerMetric(serviceStatusGauge);

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestCounter);

// Middleware để đếm số lượng yêu cầu
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

// Endpoint API for gold prices
if (apiType === 'gold') {
  app.get('/api/gold', async (req, res) => {
    try {
      const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
      const goldData = response.data;
      res.json(goldData);
      console.log("Successfully get gold data");
      serviceStatusGauge.set({ service: 'gold-api' }, 1);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in gold API');
      serviceStatusGauge.set({ service: 'gold-api' }, 0);
    }
  });
}

// Endpoint API for currency exchange rates
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
        console.log("Successfully get currency data");
        serviceStatusGauge.set({ service: 'currency-api' }, 1);
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error in currency API');
      serviceStatusGauge.set({ service: 'currency-api' }, 0);
    }
  });
}

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));
