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

// *** Prometheus metrics ***
const register = new client.Registry();
client.collectDefaultMetrics({ register }); // Collect default metrics

// Custom metrics
const serviceStatusGauge = new client.Gauge({
  name: 'service_status',
  help: 'Status of the service: 1 for UP, 0 for DOWN',
  labelNames: ['service'],
});
register.registerMetric(serviceStatusGauge);

const responseTimeHistogram = new client.Histogram({
  name: 'http_response_time_miliseconds',
  help: 'Response time in miliseconds',
  labelNames: ['method', 'route', 'status_code'], // Để lọc theo route hoặc HTTP status
});
register.registerMetric(responseTimeHistogram);

// Middleware
app.use((req, res, next) => {
  const start = Date.now(); // Start time

  res.on('finish', () => {
    const route = req.route && req.route.path ? req.route.path : req.originalUrl;
    const duration = Date.now() - start; // Tính thời gian xử lý request
    // Thời gian phản hồi
    responseTimeHistogram.labels({ method: req.method, route: route, status_code: res.statusCode }).observe(duration);
  });

  next();
});


// *** End Prometheus metrics ***

// *** Endpoints ***

// Endpoint API for gold prices
if (apiType === 'gold') {
  app.get('/api/gold', async (req, res) => {
    try {
      const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
      const goldData = response.data;
      res.json(goldData);
      console.log("Successfully get gold data");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in gold API');
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
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error in currency API');
    }
  });
}

// Health check endpoints
if (apiType === 'gold') {
  app.get('/health/gold', async (req, res) => {
    try {
      await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'); // !xóa btmc simulate api down
      res.status(200).send('Gold API is UP');
    } catch (error) {
      res.status(500).send('Gold API is DOWN');
    }
  });
}
if (apiType === 'currency') {
  app.get('/health/currency', async (req, res) => {
    try {
      const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
      console.log('Currency API response status:', response.status);
      res.status(200).send('Currency API is UP');
    } catch (error) {
      console.log('Currency API error:', error.message);
      res.status(500).send('Currency API is DOWN');
    }
  });
  
}

let goldApiStatus = 0; // Biến lưu trạng thái của Gold API
let currencyApiStatus = 0; // Biến lưu trạng thái của Currency API

let currencyApiTimeoutCount = 0; // Biến đếm số lần timeout của Currency API
let goldApiTimeoutCount = 0; // Biến đếm số lần timeout của Gold API

// Thực hiện health check định kỳ mỗi 30s
setInterval(async () => {
  if (apiType === 'gold') {
    try {
      // Kiểm tra trạng thái của Gold API
      const goldApiResponse = await axios.get('http://localhost:3002/health/gold', { timeout: 15000 });
      goldApiStatus = goldApiResponse.status === 200 ? 1 : 0; // Cập nhật trạng thái Gold API
    } catch (error) {
      goldApiTimeoutCount++; 
      if (goldApiTimeoutCount >= 2) {
        goldApiTimeoutCount = 0; // !Quá 2 lần timeout liên tiếp thì coi như Down
      }
    }
  }
  if (apiType === 'currency') {
    // Kiểm tra trạng thái của Currency API
    try {
      const currencyApiResponse = await axios.get('http://localhost:3002/health/currency', { timeout: 15000 });
      currencyApiStatus = currencyApiResponse.status === 200 ? 1 : 0; // Cập nhật trạng thái Currency API
      currencyApiTimeoutCount = 0; // Reset biến đếm timeout
    } catch (error) {
      currencyApiTimeoutCount++; 
      if (currencyApiTimeoutCount >= 2) {
        currencyApiStatus = 0; // !Quá 2 lần timeout liên tiếp thì coi như Down
      }
    }
  }
}, 30000); // Health check mỗi 30s

// Metrics endpoint cho Prometheus
app.get('/metrics', async (req, res) => {
  // Cập nhật trạng thái service vào serviceStatusGauge
  if (apiType === 'gold') {
    serviceStatusGauge.set({ service: 'gold-api' }, goldApiStatus);
  }
  if (apiType === 'currency') {
    serviceStatusGauge.set({ service: 'currency-api' }, currencyApiStatus);
  }

  // Trả về tất cả metrics
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


// *** End Endpoints ***

// *** Health check ***
// ? to be done
// *** End Health check ***

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));
