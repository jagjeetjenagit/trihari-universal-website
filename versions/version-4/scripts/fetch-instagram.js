#!/usr/bin/env node
/*
 Fetch Instagram oEmbed thumbnails and update public/instagram-latest.json
 Usage:
   node scripts/fetch-instagram.js <postUrl1> <postUrl2> ...

 Notes:
 - For public IG posts, Instagram oEmbed should work without an app token, but reliability varies.
 - If you have a token, set IG_OEMBED_URL and access token accordingly; otherwise it falls back to basic fetch.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_JSON = path.join(PUBLIC_DIR, 'instagram-latest.json');
const CACHE_DIR = path.join(PUBLIC_DIR, 'ig-cache');

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

const urls = process.argv.slice(2).filter(Boolean);
if (urls.length === 0) {
  console.error('No Instagram post URLs provided.');
  process.exit(1);
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error('Status ' + res.statusCode + ' for ' + url));
          res.resume();
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function run() {
  const results = [];
  for (const postUrl of urls) {
    try {
      // Instagram oEmbed endpoint
      // Reference: https://developers.facebook.com/docs/instagram/oembed/
      const oembedUrl = `https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(
        postUrl
      )}&omitscript=true`;
      const data = await fetchJson(oembedUrl);
      const thumb = data.thumbnail_url || data.thumbnail_url_https || data.thumbnail_url_secure || data.thumbnail_url_hd || data.thumbnail_url_large;
      let localPath = null;
      if (thumb) {
        // Save thumbnail locally for reliability
        const fileName = 'ig_' + Buffer.from(postUrl).toString('base64').replace(/[^a-z0-9]/gi, '_') + '.jpg';
        localPath = path.join(CACHE_DIR, fileName);
        await new Promise((resolve, reject) => {
          const file = fs.createWriteStream(localPath);
          https
            .get(thumb, (res) => {
              if (res.statusCode !== 200) {
                file.close();
                fs.unlink(localPath, () => {});
                return resolve();
              }
              res.pipe(file);
              file.on('finish', () => file.close(resolve));
            })
            .on('error', () => {
              file.close();
              fs.unlink(localPath, () => resolve());
            });
        });
      }
      results.push({
        title: data.title || 'Instagram Post',
        caption: (data.author_name ? `${data.author_name} — ` : '') + (data.title || ''),
        link: postUrl,
        thumbnail: localPath ? path.relative(PUBLIC_DIR, localPath).replace(/\\/g, '/') : undefined,
      });
    } catch (e) {
      // Fallback minimal entry
      results.push({ title: 'Instagram Post', caption: '', link: postUrl });
    }
  }

  try {
    fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));
    console.log('Updated', path.relative(ROOT, OUT_JSON));
    console.log('Items:', results.length);
  } catch (e) {
    console.error('Failed to write JSON:', e.message);
    process.exit(1);
  }
}

run();
