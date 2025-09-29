#!/bin/bash

# IndexNow API submission for instant indexing
# This will notify Bing/Microsoft immediately about URL updates

INDEXNOW_KEY="47d1e9f3-8b2a-4c5e-9f7a-2d8c6b4e1a9f"
SITE_URL="https://trihariuniversal.com"

# Submit to IndexNow API (Bing/Microsoft)
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "trihariuniversal.com",
    "key": "'$INDEXNOW_KEY'",
    "urlList": [
      "'$SITE_URL'/",
      "'$SITE_URL'/sitemap.xml"
    ]
  }'

echo "IndexNow submission completed for instant Bing indexing"

# Also ping Google manually
curl "https://www.google.com/ping?sitemap=$SITE_URL/sitemap.xml"

echo "Google sitemap ping completed"