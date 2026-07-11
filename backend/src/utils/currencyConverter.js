import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export async function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;

  try {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    let rate = cache.get(cacheKey);

    if (!rate) {
      // Use free API like exchangerate-api.com or fixer.io
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      rate = response.data.rates[toCurrency];
      cache.set(cacheKey, rate);
    }

    return (amount * rate).toFixed(2);
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw new Error('Currency conversion failed');
  }
}
