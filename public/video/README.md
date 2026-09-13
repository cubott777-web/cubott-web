Homepage clips. dealer.mp4 / dealer.jpg are in use (muted, 1280px, encoded from the Dealer Overview capture).
Add clinic.mp4 + clinic.jpg and school.mp4 + school.jpg here, then set `video`/`poster` on those entries in content/products.ts.
Encode with: ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart out.mp4
