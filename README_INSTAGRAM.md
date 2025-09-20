Instagram integration (manual & oEmbed)

Options
1) Manual JSON (no network):
   - Put thumbnails into public/ig-sample/
   - Update public/instagram-latest.json with post link + thumbnail path

2) Auto via oEmbed (best effort):
   - Run: npm run ig:fetch <postUrl1> <postUrl2> ...
   - Example: npm run ig:fetch https://www.instagram.com/p/POSTID1/ https://www.instagram.com/p/POSTID2/
   - Output: public/instagram-latest.json and cached images in public/ig-cache/

Notes
- Works for public posts only. Private posts won't return data.
- If oEmbed fails, entries are added without thumbnails; you can add them later manually.
- Dev server auto-reloads changes at http://localhost:3003/
