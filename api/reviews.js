/* ============================================
   Reviews API — رَفِيق
   Compatible with Netlify Functions & Node.js
   ============================================ */

// In-memory storage (replace with database in production)
const dataDir = process.env.DATA_DIR || './data';
const fs = require('fs');
const path = require('path');

function getFilePath() {
  return path.join(dataDir, 'reviews.json');
}

function readReviews() {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

function writeReviews(reviews) {
  const filePath = getFilePath();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), 'utf-8');
}

// Netlify Function handler
exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    switch (event.httpMethod) {
      case 'GET': {
        const reviews = readReviews();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(reviews)
        };
      }

      case 'POST': {
        const data = JSON.parse(event.body || '{}');
        if (!data.text || data.text.length < 5) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'التعليق قصير جداً (5 أحرف على الأقل)' })
          };
        }

        const reviews = readReviews();
        const review = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: data.name || 'مستخدم رَفِيق',
          text: data.text,
          rating: Math.min(5, Math.max(1, parseInt(data.rating) || 5)),
          date: data.date || new Date().toISOString(),
          approved: false
        };

        reviews.push(review);
        writeReviews(reviews);

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(review)
        };
      }

      case 'PUT': {
        const id = event.path.split('/').pop();
        const data = JSON.parse(event.body || '{}');
        const reviews = readReviews();
        const index = reviews.findIndex(r => r.id === id);

        if (index === -1) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'التقييم غير موجود' })
          };
        }

        reviews[index] = { ...reviews[index], ...data };
        writeReviews(reviews);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(reviews[index])
        };
      }

      case 'DELETE': {
        const id = event.path.split('/').pop();
        const reviews = readReviews();
        const filtered = reviews.filter(r => r.id !== id);

        if (filtered.length === reviews.length) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'التقييم غير موجود' })
          };
        }

        writeReviews(filtered);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Standalone Node.js server
if (require.main === module) {
  const http = require('http');
  const PORT = process.env.PORT || 3001;

  const server = http.createServer(async (req, res) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    };

    if (req.method === 'OPTIONS') {
      res.writeHead(200, headers);
      res.end('');
      return;
    }

    // Simulate Netlify event
    const event = {
      httpMethod: req.method,
      path: req.url,
      body: ''
    };

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(data));
      });
      event.body = body;
    }

    const result = await exports.handler(event);
    res.writeHead(result.statusCode, result.headers);
    res.end(result.body);
  });

  server.listen(PORT, () => {
    console.log(`Reviews API running on http://localhost:${PORT}`);
  });
}
