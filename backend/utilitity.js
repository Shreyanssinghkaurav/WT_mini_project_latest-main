const axios = require('axios');
const cheerio = require('cheerio');

const scrapeAmazonProduct = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }, // To avoid being blocked
    });
    const $ = cheerio.load(data);

    const name = $('#productTitle').text().trim();
    const price = parseFloat($('#priceblock_ourprice, #priceblock_dealprice').text().replace(/[^0-9.]/g, ''));

    if (!name || !price) {
      throw new Error('Failed to scrape product data');
    }

    return { name, price };
  } catch (error) {
    console.error('Error scraping Amazon product:', error.message);
    throw error;
  }
};

module.exports = scrapeAmazonProduct;
