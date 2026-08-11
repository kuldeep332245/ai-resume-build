const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      console.log('✅ Cache hit:', key);
      return res.json(cachedResponse);
    }
    
    console.log('⏳ Cache miss:', key);
    res.originalJson = res.json;
    res.json = (data) => {
      cache.set(key, data, duration);
      res.originalJson(data);
    };
    next();
  };
};

// Clear cache function (use after create/update/delete)
const clearCache = () => {
  cache.flushAll();
  console.log('🗑️ Cache cleared');
};

module.exports = { cacheMiddleware, clearCache };