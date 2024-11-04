const express = require('express');
const axios = require('axios');
const router = express.Router({});

const healthcheck = async (serviceUrl) => {
  const result = {
    uptime: process.uptime(),
    message: 'DOWN',
    timestamp: Date.now(),
    status: 'DOWN',
  };

  try {
    const response = await axios.get(serviceUrl);
    if (response.status === 200) {
      result.message = 'UP';
      result.status = 'UP';
    }
  } catch (error) {
    console.error(`Error connecting to ${serviceUrl}:`, error.message);
  }

  return result;
};

router.get('/gold', async (_req, res) => {
  const serviceUrl = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';
  const goldHealth = await healthcheck(serviceUrl);
  res.status(goldHealth.status === 'UP' ? 200 : 503).send(goldHealth);
});

router.get('/currency', async (_req, res) => {
  const serviceUrl = 'https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10';
  const currencyHealth = await healthcheck(serviceUrl);
  res.status(currencyHealth.status === 'UP' ? 200 : 503).send(currencyHealth);
});

module.exports = router;
