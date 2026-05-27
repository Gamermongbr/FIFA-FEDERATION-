const fs = require('fs');
const https = require('https');

https.get('https://files.catbox.moe/dkbv3z.png', (res) => {
  res.pipe(fs.createWriteStream('./public/icon-512.png'));
  res.pipe(fs.createWriteStream('./public/icon-192.png'));
});
