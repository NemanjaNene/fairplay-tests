const https = require('https');

const credentials = [
  { username: 'Alois', password: 'Fair2025Play!&MObile8ee&!' },
  { username: 'alois', password: 'Fair2025Play!&MObile8ee&!' },
  { username: 'ALOIS', password: 'Fair2025Play!&MObile8ee&!' },
];

function testAuth(username, password) {
  return new Promise((resolve) => {
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    
    const options = {
      hostname: 'www.dev.yes-to-fairplay.com',
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    };

    const req = https.request(options, (res) => {
      console.log(`\n--- Testing: ${username} ---`);
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Status Message: ${res.statusMessage}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (data) {
          console.log(`Response Body (first 500 chars):`, data.substring(0, 500));
        }
        resolve({ username, statusCode: res.statusCode });
      });
    });

    req.on('error', (e) => {
      console.error(`Error with ${username}:`, e.message);
      resolve({ username, error: e.message });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing Basic Authentication...\n');
  
  for (const cred of credentials) {
    await testAuth(cred.username, cred.password);
  }
}

runTests();
